# RipenessMeter backend

FastAPI endpoints: GET `/api/v1/health`, GET `/api/v1/ready`, GET `/api/v1/classes`, POST `/api/v1/predict` (`multipart/form-data`, field `image`).

Checkpoint requirement: `models/best.pt` must be a trusted V3 PyTorch checkpoint with `model` state_dict, `classes=['unripe','ripe','overripe']`, and `img_size=224`.

From backend directory: `py -3.11 -m venv .venv`, activate, `pip install -r requirements.txt`, `uvicorn app.main:app --reload`.

Run tests: `pytest -q`. Open docs at http://localhost:8000/docs.
