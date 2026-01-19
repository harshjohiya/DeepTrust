import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, RefreshCw, Film, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const VideoAnalysis = ({ result, file, onReset }) => {
  const isFake = result.prediction === 'FAKE';
  const preview = URL.createObjectURL(file);

  // Prepare chart data
  const chartData = result.frame_predictions.map((pred, index) => ({
    frame: `F${index + 1}`,
    confidence: pred.confidence * 100,
    prediction: pred.prediction,
  }));

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
                Average Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Analyzed {result.frames_analyzed} frames
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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Fake Frames</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {result.summary.fake_frames}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Real Frames</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.summary.real_frames}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Video and Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Film className="w-5 h-5 text-primary-600" />
            Original Video
          </h3>
          <video
            src={preview}
            controls
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Frame-by-Frame Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            Frame-by-Frame Analysis
          </h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="frame" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-dark-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700">
                        <p className="font-semibold">{payload[0].payload.frame}</p>
                        <p className="text-sm">
                          {payload[0].payload.prediction}
                        </p>
                        <p className="text-sm">
                          Confidence: {payload[0].value.toFixed(2)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="confidence" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.prediction === 'FAKE' ? '#ef4444' : '#10b981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Frame Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-xl font-bold mb-4">Detailed Frame Predictions</h3>
        <div className="space-y-2">
          {result.frame_predictions.map((pred, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                pred.prediction === 'FAKE'
                  ? 'bg-red-50 dark:bg-red-900/10'
                  : 'bg-green-50 dark:bg-green-900/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Frame {pred.frame}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pred.prediction === 'FAKE'
                      ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200'
                  }`}
                >
                  {pred.prediction}
                </span>
              </div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {(pred.confidence * 100).toFixed(2)}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoAnalysis;
