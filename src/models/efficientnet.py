"""EfficientNet model loading - matches deepfake1.ipynb exactly."""
import torch
import torch.nn as nn
import timm
from typing import Optional


def load_efficientnet_b0(
    num_classes: int = 2, 
    pretrained: bool = True
) -> nn.Module:
    """Load EfficientNet-B0 model using timm - exact notebook implementation.
    
    Args:
        num_classes: Number of output classes
        pretrained: Whether to load ImageNet pretrained weights
        
    Returns:
        EfficientNet-B0 model from timm
    """
    # Exact implementation from notebook
    model = timm.create_model(
        "efficientnet_b0",
        pretrained=pretrained,
        num_classes=num_classes
    )
    
    return model


def load_model_from_checkpoint(
    checkpoint_path: str,
    num_classes: int = 2,
    device: str = 'cpu'
) -> nn.Module:
    """Load model from checkpoint - exact notebook format.
    
    Args:
        checkpoint_path: Path to .pth checkpoint file
        num_classes: Number of output classes
        device: Device to load model on
        
    Returns:
        Loaded model
    """
    # Create model
    model = load_efficientnet_b0(num_classes=num_classes, pretrained=False)
    
    # Load checkpoint (notebook saves with 'model_state_dict' key)
    ckpt = torch.load(checkpoint_path, map_location=device)
    
    # Handle both formats: direct state_dict or dict with 'model_state_dict' key
    if isinstance(ckpt, dict) and 'model_state_dict' in ckpt:
        model.load_state_dict(ckpt['model_state_dict'])
    else:
        model.load_state_dict(ckpt)
    
    model.to(device)
    model.eval()
    
    return model


def get_target_layer(model):
    """Get target layer for Grad-CAM - conv_head as in notebook.
    
    Args:
        model: EfficientNet model
        
    Returns:
        Target layer for Grad-CAM
    """
    return model.conv_head
