import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  canPrompt: boolean;
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
}

export const usePWAInstall = (): PWAInstallState => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        // @ts-ignore - iOS specific property
        (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
    };

    // Check installation status on mount
    checkInstalled();

    // Listen for install prompt event (Android Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Listen for display mode changes (when PWA is launched)
    const handleDisplayModeChange = () => {
      checkInstalled();
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const promptInstall = async (): Promise<void> => {
    if (!deferredPrompt) {
      console.log('No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
    } finally {
      // Clear the deferred prompt
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const dismissPrompt = () => {
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return {
    isInstallable: isInstallable && !isInstalled,
    isInstalled,
    canPrompt: !!deferredPrompt && !isInstalled,
    promptInstall,
    dismissPrompt,
  };
};