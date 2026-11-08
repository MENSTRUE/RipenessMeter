"""RipenessMeter image classification API. Never trust unverified pickle checkpoints."""
from __future__ import annotations

import io
import os
from contextlib import asynccontextmanager
from pathlib import Path
from threading import Lock
from typing import Annotated

import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps, UnidentifiedImageError
from pydantic import BaseModel
from torchvision import transforms
from torchvision.models import mobilenet_v3_small

BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = Path(os.environ.get('MODEL_PATH', str(BASE_DIR / 'models' / 'best.pt'))).expanduser()
MAX_BYTES = int(os.environ.get('MAX_UPLOAD_MB', '8')) * 1024 * 1024
MAX_PIXELS = 25_000_000
CLASSES = ['unripe', 'ripe', 'overripe']
DEVICE = torch.device('cuda' if os.environ.get('USE_CUDA', '0') == '1' and torch.cuda.is_available() else 'cpu')
MEAN, STD = [0.485, 0.456, 0.406], [0.229, 0.224, 0.225]
Image.MAX_IMAGE_PIXELS = MAX_PIXELS

MODEL = None
MODEL_META: dict = {}
MODEL_ERROR = 'Model not loaded'
MODEL_LOCK = Lock()

class StagePrediction(BaseModel):
    stage: str
    probability: float

class PredictResult(BaseModel):
    prediction: str
    confidence: float
    probabilities: list[StagePrediction]
    uncertain: bool
    model: str
    filename: str
    disclaimer: str


def load_checkpoint() -> None:
    global MODEL, MODEL_META, MODEL_ERROR
    MODEL, MODEL_META = None, {}
    MODEL_ERROR = 'Checkpoint not found'
    if not MODEL_PATH.is_file():
        return
    try:
        # weights_only=True is essential: never load untrusted arbitrary pickle objects.
        try:
            ck = torch.load(MODEL_PATH, map_location='cpu', weights_only=True)
        except TypeError as exc:
            raise RuntimeError('PyTorch must support weights_only=True') from exc
        if not isinstance(ck, dict) or not isinstance(ck.get('model'), dict):
            raise ValueError('Checkpoint missing model state_dict')
        classes = ck.get('classes')
        if classes != CLASSES:
            raise ValueError(f'Unexpected class ordering: {classes!r}')
        size = ck.get('img_size', ck.get('image_size', 224))
        if size != 224:
            raise ValueError(f'Unsupported image size: {size!r}')
        model = mobilenet_v3_small(weights=None)
        model.classifier[-1] = torch.nn.Linear(model.classifier[-1].in_features, len(CLASSES))
        model.load_state_dict(ck['model'], strict=True)
        model.to(DEVICE).eval()
        MODEL = model
        MODEL_META = {'best_epoch': ck.get('best_epoch'), 'classes': classes, 'device': str(DEVICE)}
        MODEL_ERROR = ''
    except Exception as exc:
        MODEL_ERROR = f'{type(exc).__name__}: {exc}'


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_checkpoint()
    yield

app = FastAPI(title='RipenessMeter API', version='1.0.0', lifespan=lifespan)
allowed_origins = [x.strip() for x in os.environ.get('CORS_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',') if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, allow_credentials=False, allow_methods=['GET', 'POST'], allow_headers=['*'])

@app.get('/api/v1/health')
def health():
    return {'status': 'ok', 'service': 'RipenessMeter', 'model_ready': MODEL is not None}

@app.get('/api/v1/ready')
def ready():
    return {'ready': MODEL is not None, 'checkpoint': str(MODEL_PATH), 'model': 'MobileNetV3-Small', 'error': MODEL_ERROR if MODEL is None else None, **MODEL_META}

@app.get('/api/v1/classes')
def classes():
    return {'classes': CLASSES, 'labels': {'unripe': 'Unripe', 'ripe': 'Ripe', 'overripe': 'Overripe'}}

@app.post('/api/v1/predict', response_model=PredictResult)
async def predict(image: Annotated[UploadFile, File(description='JPEG, PNG, or WebP banana image')]):
    if MODEL is None:
        raise HTTPException(503, detail='Model not ready. Put the V3 Kaggle best.pt in models/best.pt and restart backend.')
    if image.content_type not in {'image/jpeg', 'image/png', 'image/webp'}:
        raise HTTPException(415, detail='Only JPG, PNG, and WebP images are supported.')
    try:
        raw = await image.read(MAX_BYTES + 1)
    finally:
        await image.close()
    if len(raw) > MAX_BYTES:
        raise HTTPException(413, detail=f'File exceeds {MAX_BYTES // (1024*1024)} MB limit.')
    if not raw:
        raise HTTPException(400, detail='Empty image')
    try:
        with Image.open(io.BytesIO(raw)) as original:
            if original.format not in {'JPEG', 'PNG', 'WEBP'}:
                raise HTTPException(415, detail='Unexpected image encoding.')
            if original.width * original.height > MAX_PIXELS:
                raise HTTPException(413, detail='Image dimensions too large.')
            rgb = ImageOps.exif_transpose(original).convert('RGB')
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(422, detail='Image could not be decoded safely.') from exc
    # This mirrors V3 evaluation exactly: 256 square resize, center crop 224, ImageNet normalization.
    preprocessing = transforms.Compose([
        transforms.Resize((256, 256)), transforms.CenterCrop(224),
        transforms.ToTensor(), transforms.Normalize(MEAN, STD),
    ])
    tensor = preprocessing(rgb).unsqueeze(0).to(DEVICE)
    with MODEL_LOCK, torch.inference_mode():
        logits = MODEL(tensor)
        probs = torch.softmax(logits, dim=1)[0].cpu().tolist()
    best = max(range(len(probs)), key=lambda i: probs[i])
    confidence = round(float(probs[best]), 6)
    return PredictResult(
        prediction=CLASSES[best], confidence=confidence,
        probabilities=[StagePrediction(stage=stage, probability=round(float(probs[i]), 6)) for i, stage in enumerate(CLASSES)],
        uncertain=confidence < 0.75,
        model='MobileNetV3-Small · dual dataset V3',
        filename=Path(image.filename or 'upload').name[:128],
        disclaimer='AI visual estimate only; confidence is not a calibrated probability of correctness. Not a food-safety or maturity certification.',
    )
