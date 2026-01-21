// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API Service
class ApiService {
  /**
   * Analyze an image for deepfake detection
   * @param {File} file - Image file to analyze
   * @returns {Promise} Analysis result
   */
  async analyzeImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to analyze image');
      }

      const result = await response.json();
      
      // Convert heatmap URL to full URL if it exists
      if (result.heatmap_url) {
        result.heatmap_url = `${API_BASE_URL}${result.heatmap_url}`;
      }
      
      return result;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }

  /**
   * Analyze a video for deepfake detection
   * @param {File} file - Video file to analyze
   * @returns {Promise} Analysis result with frame-by-frame data
   */
  async analyzeVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze/video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to analyze video');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error analyzing video:', error);
      throw error;
    }
  }

  /**
   * Check API health status
   * @returns {Promise} Health status
   */
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'offline', error: error.message };
    }
  }

  /**
   * Cleanup files after analysis
   * @param {string} fileId - File ID to cleanup
   */
  async cleanup(fileId: string) {
    try {
      await fetch(`${API_BASE_URL}/api/cleanup/${fileId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }
}

export const apiService = new ApiService();
export default apiService;
