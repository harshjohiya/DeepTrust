"""Grad-CAM implementation - uses pytorch-grad-cam library as in notebook."""
import torch
import numpy as np
import cv2
from PIL import Image
from typing import Optional

from pytorch_grad_cam import GradCAM as PytorchGradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image


class GradCAM:
    """Generate Grad-CAM visualizations - exact implementation from notebook."""
    
    def __init__(self, model: torch.nn.Module, target_layers = None):
        """Initialize Grad-CAM using pytorch-grad-cam library.
        
        Args:
            model: PyTorch model
            target_layers: List of target layers (defaults to model.conv_head)
        """
        self.model = model
        self.model.eval()
        
        # Use conv_head as in notebook
        if target_layers is None:
            target_layers = [model.conv_head]
        
        # Initialize pytorch-grad-cam
        self.cam = PytorchGradCAM(
            model=model,
            target_layers=target_layers
        )
    
    def generate_cam(
        self, 
        input_tensor: torch.Tensor, 
        target_class: Optional[int] = None
    ) -> np.ndarray:
        """Generate Grad-CAM heatmap - exact notebook logic.
        
        Args:
            input_tensor: Input image tensor [1, 3, H, W]
            target_class: Target class index (uses predicted class if None)
            
        Returns:
            Grad-CAM heatmap as numpy array
        """
        # Get prediction if target_class not specified
        if target_class is None:
            with torch.no_grad():
                outputs = self.model(input_tensor)
                target_class = outputs.argmax(dim=1).item()
        
        # Create target
        targets = [ClassifierOutputTarget(target_class)]
        
        # Generate Grad-CAM (returns grayscale_cam for first image)
        grayscale_cam = self.cam(
            input_tensor=input_tensor,
            targets=targets
        )[0]
        
        return grayscale_cam
    
    def overlay_cam(
        self, 
        image: Image.Image, 
        cam: np.ndarray,
        use_rgb: bool = True
    ) -> np.ndarray:
        """Overlay Grad-CAM on original image - exact notebook logic.
        
        Args:
            image: Original PIL Image
            cam: Grad-CAM heatmap
            use_rgb: Whether to use RGB format
            
        Returns:
            Overlay visualization as numpy array
        """
        # Convert image to float numpy array
        img_np = np.array(image).astype(np.float32) / 255.0
        
        # Use pytorch-grad-cam's show_cam_on_image function (as in notebook)
        visualization = show_cam_on_image(
            img_np,
            cam,
            use_rgb=use_rgb
        )
        
        return visualization
    
    def generate_and_overlay(
        self,
        image: Image.Image,
        input_tensor: torch.Tensor,
        target_class: Optional[int] = None
    ) -> tuple:
        """Generate Grad-CAM and overlay - convenience method.
        
        Args:
            image: Original PIL Image
            input_tensor: Preprocessed input tensor
            target_class: Target class index
            
        Returns:
            Tuple of (grayscale_cam, visualization, predicted_class)
        """
        # Get prediction
        with torch.no_grad():
            outputs = self.model(input_tensor)
            pred_class = outputs.argmax(dim=1).item()
        
        # Generate CAM
        cam = self.generate_cam(input_tensor, target_class or pred_class)
        
        # Create overlay
        visualization = self.overlay_cam(image, cam)
        
        return cam, visualization, pred_class
