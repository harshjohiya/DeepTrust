import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ImageAnalysis = ({ result, file, onReset }) => {
  const isFake = result.prediction === 'FAKE';
  const preview = URL.createObjectURL(file);

  const chartData = [
    { name: 'Real', value: result.probabilities.real * 100 },
    { name: 'Fake', value: result.probabilities.fake * 100 },
  ];

  const COLORS = {
    Real: '#10b981',
    Fake: '#ef4444',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card p-8 ${
          isFake
            ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
            : 'border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-900/10'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {isFake ? (
              <AlertTriangle className="w-12 h-12 text-red-500" />
            ) : (
              <CheckCircle className="w-12 h-12 text-green-500" />
            )}
            <div>
              <h2 className="text-3xl font-bold">
                {isFake ? (
                  <span className="text-red-600 dark:text-red-400">FAKE DETECTED</span>
                ) : (
                  <span className="text-green-600 dark:text-green-400">AUTHENTIC</span>
                )}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="btn btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another
          </motion.button>
        </div>

        {/* Confidence Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full h-4 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden"
          style={{ transformOrigin: 'left' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full ${
              isFake ? 'bg-red-500' : 'bg-green-500'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Probability Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Probability Distribution
          </h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Real Probability:</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {(result.probabilities.real * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Fake Probability:</span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {(result.probabilities.fake * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Original Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold mb-4">Original Image</h3>
          <img
            src={preview}
            alt="Original"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Grad-CAM Visualization */}
      {result.gradcam && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold mb-4">🔥 Grad-CAM Visualization</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Heatmap showing which regions the AI model focused on for its decision
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-center">Original</p>
              <img
                src={preview}
                alt="Original"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-center">Heatmap</p>
              <img
                src={result.gradcam.heatmap}
                alt="Heatmap"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-center">Overlay</p>
              <img
                src={result.gradcam.overlay}
                alt="Overlay"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageAnalysis;
