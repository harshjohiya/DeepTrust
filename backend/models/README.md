# Model Directory

Place your trained model file here:
- `best_efficientnet_b0.pth`

The model should be an EfficientNet-B0 trained on deepfake detection with 2 classes (fake, real).

## Training the Model

Use the provided Jupyter notebook at `notebook/deepfake1.ipynb` to train your model.

The notebook includes:
- Data preprocessing and face extraction
- Model training with EfficientNet-B0
- Evaluation and testing
- Model saving

## Model Format

The saved model should be a PyTorch state dict containing:
```python
{
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    ...
}
```
