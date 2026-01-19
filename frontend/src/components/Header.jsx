import { motion } from 'framer-motion';
import { Moon, Sun, Activity } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, apiStatus }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 glass-effect shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
              🔍
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                DeepTrust
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                AI Deepfake Detection
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {/* API Status */}
            <div className="flex items-center gap-2 text-sm">
              <Activity
                className={`w-4 h-4 ${
                  apiStatus === 'healthy'
                    ? 'text-green-500'
                    : apiStatus === 'checking'
                    ? 'text-yellow-500 animate-pulse'
                    : 'text-red-500'
                }`}
              />
              <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">
                {apiStatus === 'healthy'
                  ? 'Online'
                  : apiStatus === 'checking'
                  ? 'Checking...'
                  : 'Offline'}
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
