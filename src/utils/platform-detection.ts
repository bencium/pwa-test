export interface PlatformInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isStandalone: boolean; // Already installed as PWA
  canInstall: boolean; // Can show install prompts
}

export const detectPlatform = (): PlatformInfo => {
  // Default values for server-side rendering
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isStandalone: false,
      canInstall: false,
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Check if already installed as PWA
  const isStandalone = standalone || 
    // @ts-ignore - iOS specific property
    (window.navigator as any).standalone === true ||
    // Check if launched from home screen
    window.matchMedia('(display-mode: standalone)').matches;

  // Platform detection
  const isIOS = /ipad|iphone|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isMobile = /mobile|android|iphone|ipad|phone|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent) ||
    window.innerWidth <= 768;

  // Install capability detection
  const canInstall = !isStandalone && (isAndroid || isIOS || !isMobile);

  return {
    isIOS,
    isAndroid,
    isMobile,
    isStandalone,
    canInstall,
  };
};

export const getBrowserInfo = () => {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = window.navigator.userAgent;
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Edg')) {
    return 'Edge';
  }
  
  return 'Other';
};

export const getInstallInstructions = (platform: PlatformInfo) => {
  if (platform.isIOS) {
    return {
      title: 'Install News Reader',
      steps: [
        'Tap the Share button',
        'Scroll down and tap "Add to Home Screen"',
        'Tap "Add" to install the app'
      ],
      icon: '📱'
    };
  } else if (platform.isAndroid) {
    return {
      title: 'Install News Reader',
      steps: [
        'Tap "Install" when prompted',
        'Or tap the menu (⋮) and select "Install app"'
      ],
      icon: '📱'
    };
  } else {
    return {
      title: 'Install News Reader',
      steps: [
        'Click the install icon in your address bar',
        'Or use your browser\'s menu to install this app'
      ],
      icon: '💻'
    };
  }
};