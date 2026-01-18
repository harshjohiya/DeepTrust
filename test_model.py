"""Quick test script to verify model loading and inference."""
import sys
sys.path.append('src')

def check_dependencies():
    """Check if required packages are installed."""
    required = ['torch', 'timm', 'mediapipe', 'cv2', 'PIL', 'streamlit']
    missing = []
    
    for package in required:
        try:
            if package == 'cv2':
                __import__('cv2')
            elif package == 'PIL':
                __import__('PIL')
            else:
                __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print("❌ Missing dependencies:")
        for pkg in missing:
            print(f"   - {pkg}")
        print("\nPlease install with: pip install -r requirements.txt")
        return False
    
    print("✅ All dependencies installed")
    return True

def test_model_loading():
    """Test that the model loads correctly."""
    import torch
    from pathlib import Path
    from src.models.efficientnet import load_model_from_checkpoint
    
    print("\nTesting model loading...")
    
    model_path = "models/best_efficientnet_b0.pth"
    
    if not Path(model_path).exists():
        print(f"❌ Model not found at {model_path}")
        print("Please ensure you have the trained model in the models/ directory")
        return False
    
    try:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Using device: {device}")
        
        model = load_model_from_checkpoint(model_path, num_classes=2, device=device)
        
        # Test forward pass
        dummy_input = torch.randn(1, 3, 224, 224).to(device)
        with torch.no_grad():
            output = model(dummy_input)
        
        print(f"✅ Model loaded successfully!")
        print(f"Output shape: {output.shape}")
        
        # Check probabilities
        probs = torch.softmax(output, dim=1)
        print(f"Sample probabilities: Fake={probs[0][0]:.4f}, Real={probs[0][1]:.4f}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("="*50)
    print("DeepTrust Model Verification")
    print("="*50)
    
    # Check dependencies first
    if not check_dependencies():
        sys.exit(1)
    
    # Test model loading
    success = test_model_loading()
    
    if success:
        print("\n" + "="*50)
        print("✅ All checks passed! Ready to run Streamlit app:")
        print("   streamlit run streamlit_app.py")
        print("="*50)
    
    sys.exit(0 if success else 1)
