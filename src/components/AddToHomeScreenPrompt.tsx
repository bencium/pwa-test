import { useState, useEffect } from 'react';
import { detectPlatform, type PlatformInfo } from '../utils/platform-detection';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AddToHomeScreenPromptProps {
  onDismiss: () => void;
}

const AddToHomeScreenPrompt = ({ onDismiss }: AddToHomeScreenPromptProps) => {
  const [platform, setPlatform] = useState<PlatformInfo | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { canPrompt, promptInstall } = usePWAInstall();

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  const handleInstallClick = async () => {
    if (canPrompt) {
      await promptInstall();
    }
    handleDismiss();
  };

  if (!platform || !isVisible || platform.isStandalone) {
    return null;
  }

  // Don't show if already installable via native prompt
  if (canPrompt && platform.isAndroid) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
        <div className="bg-blue-50 rounded-lg shadow-lg border border-blue-200 p-4 mx-auto max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 text-sm">Install MedHubAI App</h3>
                <p className="text-xs text-blue-600">Get the full app experience</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-blue-400 hover:text-blue-600 p-1"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Not now
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS Instructions
  if (platform.isIOS) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
        <div className="bg-blue-50 rounded-lg shadow-lg border border-blue-200 p-4 mx-auto max-w-sm relative">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-blue-400 hover:text-blue-600 p-1"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pr-6">
            <p className="text-sm text-blue-800 mb-4">
              Install this web app on your iPhone: tap{' '}
              <span className="inline-flex items-center mx-1">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4z"/>
                  <path d="M20 10v9c0 1.1-.9 2-2 2H6c0-1.1-.9-2-2-2v-9h4v2h8v-2h4z"/>
                </svg>
              </span>
              {' '}and then{' '}
              <strong>"Add to Home Screen"</strong>.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </div>
              <span>Full screen • Offline access • App-like experience</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop/Other Instructions
  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-blue-50 rounded-lg shadow-lg border border-blue-200 p-4 mx-auto max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 text-sm">Install MedHubAI App</h3>
              <p className="text-xs text-blue-600">Look for the install icon in your browser</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-400 hover:text-blue-600 p-1"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToHomeScreenPrompt;