# Model registry — local binary checkpoint

The Git repository currently has no tracked model weights. Put the **trusted V3** `best.pt` downloaded from Kaggle at `models/best.pt` locally. `.gitignore` deliberately excludes `*.pt`. Do not upload or redistribute the checkpoint unless redistribution rights and source-data conditions have been checked.

- Family: Torchvision **MobileNetV3-Small** (ImageNet-pretrained then fine-tuned).
- Prediction class order: `['unripe','ripe','overripe']`.
- Model input: one RGB image → resize 256×256 → center crop 224×224 → ImageNet normalize → `[1, 3, 224, 224]` tensor.
- Output: three logits; backend computes softmax and returns probabilities + max-score stage. Score calibration unverified.
- V3 champion epoch: **7**, validation macro-F1 **0.977043673**.
- Recorded V3 SHA-256: `8c6fccb462e6a427aada769ed90b531f6f06e9ed2fadb991c2683eedc1cd881f` from `reports/run_config.json`. This describes the Kaggle artifact; it **does not prove** a local checkpoint matches until you compute and compare it.

Check locally in PowerShell:

```powershell
Get-FileHash .\models\best.pt -Algorithm SHA256
```

The backend loads an explicit model `state_dict` via safe `weights_only=True` and validates class ordering. If you only possess V2 weights, do not label them V3. Keep your own model registry, checksum and download origin record. [Model card](../docs/en/model_card.md) · [API](../backend/README.md).
