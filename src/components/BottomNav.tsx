import { motion } from 'framer-motion';

interface BottomNavProps {
  currentView: 'home' | 'favorites' | 'search' | 'profile';
  onViewChange: (view: 'home' | 'favorites' | 'search' | 'profile') => void;
}

const BottomNav = ({ currentView, onViewChange }: BottomNavProps) => {
  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'favorites' as const,
      label: 'Favorites',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'search' as const,
      label: 'Search',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 relative ${
              currentView === item.id
                ? 'text-black bg-gray-100'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
            aria-label={item.label}
          >
            {/* Active indicator */}
            {currentView === item.id && (
              <motion.div
                layoutId="activeNavItem"
                className="absolute inset-0 bg-gray-100 rounded-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            <motion.div
              animate={{
                scale: currentView === item.id ? 1.1 : 1,
                color: currentView === item.id ? '#000000' : '#6b7280'
              }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {item.icon}
            </motion.div>
            
            <motion.span 
              animate={{
                scale: currentView === item.id ? 1.05 : 1,
                fontWeight: currentView === item.id ? 600 : 500
              }}
              transition={{ duration: 0.2 }}
              className="text-xs relative z-10"
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;