import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NewsArticle } from './types/news';
import useLocalStorage from './hooks/useLocalStorage';
import { useRSSFeed } from './hooks/useRSSFeed';
import { detectPlatform } from './utils/platform-detection';
import AppBanner from './components/AppBanner';
import NewsGrid from './components/NewsGrid';
import DetailView from './components/DetailView';
import BottomNav from './components/BottomNav';
import AddToHomeScreenPrompt from './components/AddToHomeScreenPrompt';
import LoadingGrid from './components/LoadingGrid';
import SplashScreen from './components/SplashScreen';
import PWAIntro from './components/PWAIntro';

type ViewType = 'home' | 'favorites' | 'search' | 'profile';

// Animation variants for smooth transitions
const pageVariants = {
  initial: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3 } 
  },
  in: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 } 
  },
  out: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3 } 
  }
};

const slideVariants = {
  initial: { 
    x: '100%'
  },
  in: { 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  },
  out: { 
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  }
};

const fadeVariants = {
  initial: { opacity: 0, scale: 0.98 },
  in: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 } 
  },
  out: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.2 } 
  }
};

function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [favorites, setFavorites] = useLocalStorage<string[]>('news-favorites', []);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installPromptDismissed, setInstallPromptDismissed] = useLocalStorage<boolean>('install-prompt-dismissed', false);
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  
  // RSS Feed integration
  const { articles, loading, error, refresh, isOnline } = useRSSFeed();

  useEffect(() => {
    // Mark app as ready when articles are loaded or after initial loading attempt
    if (!loading && (articles.length > 0 || error)) {
      setAppReady(true);
    }
  }, [loading, articles, error]);

  useEffect(() => {
    // Show install prompt after app is ready and splash is hidden
    const platform = detectPlatform();
    
    if (!installPromptDismissed && !platform.isStandalone && !showSplash && appReady) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [installPromptDismissed, showSplash, appReady]);

  const toggleFavorite = (articleId: string) => {
    setFavorites(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToGrid = () => {
    setSelectedArticle(null);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSelectedArticle(null); // Close article when switching views
  };

  const handleInstallPromptDismiss = () => {
    setShowInstallPrompt(false);
    setInstallPromptDismissed(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const getFilteredArticles = () => {
    switch (currentView) {
      case 'favorites':
        return articles.filter(article => favorites.includes(article.id));
      case 'home':
      default:
        return articles;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'favorites':
        return 'Favorites';
      case 'search':
        return 'Search';
      case 'profile':
        return 'Profile';
      case 'home':
      default:
        return 'MedHubAI';
    }
  };

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Fixed Top Navigation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AppBanner title={getViewTitle()} />
        {/* MedHubAI Branding */}
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2">
          <p className="text-center text-xs text-blue-700 font-medium">
            Brought to you by MedHubAI.pro
          </p>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key="detail-view"
              variants={slideVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="absolute inset-0 z-10 bg-gray-50"
            >
              <DetailView 
                article={selectedArticle}
                isFavorite={favorites.includes(selectedArticle.id)}
                onBack={handleBackToGrid}
                onToggleFavorite={() => toggleFavorite(selectedArticle.id)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`main-view-${currentView}`}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="h-full"
            >
              {currentView === 'search' ? (
                <motion.div 
                  variants={fadeVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  className="flex items-center justify-center h-96"
                >
                  <p className="text-black text-xl font-bold">Search functionality coming soon</p>
                </motion.div>
              ) : currentView === 'profile' ? (
                <motion.div 
                  variants={fadeVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  className="flex items-center justify-center h-96"
                >
                  <p className="text-black text-xl font-bold">Profile settings coming soon</p>
                </motion.div>
              ) : loading ? (
                <motion.div
                  variants={fadeVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                >
                  <LoadingGrid />
                </motion.div>
              ) : error ? (
                <motion.div 
                  variants={fadeVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  className="flex flex-col items-center justify-center h-96 px-4"
                >
                  <div className="text-center">
                    <p className="text-black text-xl font-bold mb-2">Failed to load news</p>
                    <p className="text-gray-700 text-base mb-4">{error}</p>
                    {!isOnline && (
                      <p className="text-gray-600 text-sm mb-4">You appear to be offline. Showing cached articles.</p>
                    )}
                    <motion.button
                      onClick={refresh}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Try Again
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  variants={fadeVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  className="relative"
                >
                  {/* PWA Introduction - only show on home view */}
                  {currentView === 'home' && <PWAIntro />}
                  
                  <NewsGrid 
                    articles={getFilteredArticles()}
                    onArticleClick={handleArticleClick}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                  {/* Pull to refresh indicator */}
                  {!isOnline && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <p className="text-gray-600 text-sm">📡 Offline mode - Showing cached articles</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Fixed Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <BottomNav 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
      </motion.div>

      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <AddToHomeScreenPrompt onDismiss={handleInstallPromptDismiss} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;