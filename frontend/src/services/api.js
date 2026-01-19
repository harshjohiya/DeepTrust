import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const apiService = {
  // Health check
  async healthCheck() {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  },

  // Predict image
  async predictImage(file, generateGradcam = true) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('generate_gradcam', generateGradcam);

    const response = await api.post('/api/predict/image', formData);
    return response.data;
  },

  // Predict video
  async predictVideo(file, numFrames = 5) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('num_frames', numFrames);

    const response = await api.post('/api/predict/video', formData);
    return response.data;
  },
};

export default apiService;
