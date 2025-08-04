import { motion } from 'framer-motion';
import { useState } from 'react';

const PWAIntro = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const advantages = [
    {
      title: "True Background Processing",
      description: "Service Workers enable background updates and sync",
      icon: "⚙️"
    },
    {
      title: "Push Notifications", 
      description: "Receive alerts even when browser is closed",
      icon: "🔔"
    },
    {
      title: "Standalone Display Mode",
      description: "Launch fullscreen without browser UI",
      icon: "📱"
    },
    {
      title: "Offline Reading",
      description: "Read articles during commutes without internet",
      icon: "📡"
    },
    {
      title: "App Launcher Integration",
      description: "Install to home screen with quick actions",
      icon: "🏠"
    },
    {
      title: "Persistent Storage",
      description: "Guaranteed storage for offline content",
      icon: "💾"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-4 mt-4 mb-6"
    >
      {/* Main PWA Badge */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">⚡</span>
              <h3 className="font-bold text-lg">More than a website...</h3>
            </div>
            <p className="text-gray-300 text-sm">
               An app-like experience!
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Expandable Advantages */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-2 gap-2 mt-4">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0, 
                y: isExpanded ? 0 : 10 
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-2"
            >
              <div className="text-lg mb-1">{advantage.icon}</div>
              <h4 className="font-bold text-black text-xs mb-1">
                {advantage.title}
              </h4>
              <p className="text-gray-600 text-xs leading-tight">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Key Difference Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            y: isExpanded ? 0 : 10 
          }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <span className="text-sm mt-0.5">💡</span>
            <div>
              <p className="text-xs text-gray-700 font-medium mb-1">
                <strong>What Regular Websites Cannot Do:</strong>
              </p>
              <ul className="text-xs text-gray-600 leading-relaxed space-y-1">
                <li>• True background processing when browser is closed</li>
                <li>• Push notifications without browser running</li>
                <li>• Install to home screen with app launcher integration</li>
                <li>• Background sync of content when offline</li>
                <li>• Guaranteed persistent storage for offline reading</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PWAIntro;