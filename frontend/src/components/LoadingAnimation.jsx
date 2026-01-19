import { motion } from 'framer-motion';
import { Loader2, Brain, Scan } from 'lucide-react';

const LoadingAnimation = ({ analysisType }) => {
  const stages = [
    { icon: Scan, text: 'Detecting faces...', delay: 0 },
    { icon: Brain, text: 'Analyzing with AI...', delay: 1 },
    { icon: Loader2, text: 'Processing results...', delay: 2 },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-12"
      >
        <div className="text-center">
          {/* Main Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400" />
          </motion.div>

          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Analyzing {analysisType === 'image' ? 'Image' : 'Video'}...
          </h3>

          {/* Processing Stages */}
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stage.delay * 0.5 }}
                className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: stage.delay * 0.5,
                  }}
                >
                  <stage.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <span>{stage.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
