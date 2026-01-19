import { motion } from 'framer-motion';
import { Info, Brain, Zap, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'EfficientNet-B0',
      description: 'State-of-the-art deep learning model for accurate detection',
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Fast processing with immediate results for images and videos',
    },
    {
      icon: Shield,
      title: 'Explainable AI',
      description: 'Grad-CAM visualizations show exactly what the model focuses on',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 max-w-5xl mx-auto"
    >
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold">About DeepTrust</h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            DeepTrust is an AI-powered deepfake detection system that uses advanced deep
            learning techniques to identify manipulated media. Built with EfficientNet-B0
            and trained on the Celeb-DF dataset, it provides accurate analysis with
            explainable results.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
              >
                <feature.icon className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
            <h3 className="font-bold mb-3">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Detects faces using MediaPipe face detection</li>
              <li>Preprocesses images to 224×224 with ImageNet normalization</li>
              <li>Classifies as REAL or FAKE using EfficientNet-B0</li>
              <li>For videos: applies majority voting across sampled frames</li>
              <li>Generates Grad-CAM visualizations for explainability</li>
            </ol>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> No detection system is 100% accurate. Results should
              be interpreted carefully and used as one factor in media verification.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
