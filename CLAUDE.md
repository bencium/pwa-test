# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cross-platform Progressive Web App (PWA) news reader built with React 18, TypeScript, and Vite. The app focuses on mobile-first design with platform-specific install prompts for Android and iOS.

## Development Commands

```bash
# Initial setup (if not already done)
npm create vite@latest . -- --template react-ts
npm install

# Core dependencies
npm install @vitejs/plugin-react vite-plugin-pwa
npm install -D tailwindcss postcss autoprefixer
npm install clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-slot

# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build locally
npm run lint            # Run ESLint (if configured)
npm run typecheck       # Run TypeScript type checking
```

# dev approach
- never use mock data, find real rss
- push to github after every feature

## Architecture & Key Patterns

### PWA-First Architecture
- **Service Worker**: Auto-generated via `vite-plugin-pwa` for offline caching
- **Platform Detection**: Custom utility to differentiate iOS/Android/Desktop behavior
- **Install Prompts**: Platform-specific UI for "Add to Home Screen" functionality
- **Local Storage**: Custom hooks for persistent user preferences and favorites

### Component Organization
```
src/
├── components/
│   ├── ui/           # Shadcn UI components (mobile-compatible only)
│   ├── AppBanner.tsx        # App header
│   ├── NewsGrid.tsx         # Responsive article grid
│   ├── NewsCard.tsx         # Individual article cards
│   ├── DetailView.tsx       # Modal article reader
│   └── AddToHomeScreenPrompt.tsx  # Platform-specific install UI
├── hooks/
│   ├── useLocalStorage.ts   # Safe localStorage with SSR compatibility
│   └── usePWAInstall.ts     # PWA install state management
├── utils/
│   ├── platform-detection.ts  # iOS/Android/Desktop detection
│   └── mock-news-data.ts      # Development data
└── types/
    └── news.ts              # NewsArticle and UserPreferences interfaces
```

### State Management Philosophy
- **Local React state** for UI interactions (no external state library initially)
- **localStorage** via custom hooks for user preferences and favorites
- **Modal-based navigation** instead of routing (simpler PWA experience)

### Styling Approach
- **TailwindCSS** with monochrome, minimal design using warm greys and pastels
- **Flat design** with no shadows or depth effects
- **Mobile-first** responsive breakpoints
- **44px minimum touch targets** for mobile interaction

## PWA-Specific Development

### Testing PWA Features
1. **Development**: Chrome DevTools > Application tab to test service worker and manifest
2. **Mobile Simulation**: Chrome DevTools device emulation for Android behavior
3. **iOS Testing**: Safari responsive design mode (limited PWA features)
4. **Real Device Testing**:
   - Android: Chrome browser with custom install prompt
   - iOS: Safari with manual "Add to Home Screen" instructions

### Platform-Specific Behaviors
- **Android**: Uses `beforeinstallprompt` event for native-like install experience
- **iOS**: Custom instructional banner (no install API available)
- **Desktop**: Optional install banner for supported browsers

### Critical PWA Configuration
- **Manifest**: Located in `public/manifest.json` with proper icons (192x192, 512x512)
- **Service Worker**: Auto-generated, handles offline caching and network-first strategies
- **Icons**: Must be present in `public/icons/` for proper installation

## Development Considerations

### TypeScript Interfaces
Key types are defined in `src/types/news.ts`:
- `NewsArticle`: Core article structure with required fields
- `UserPreferences`: Favorites, read articles, theme settings

### Performance Requirements
- Bundle size target: <500KB initial load
- Mobile load time: <3 seconds
- Lighthouse PWA score: >90

### Future RSS Integration
Plan includes RSS feed parsing for real news sources. Current mock data structure in `utils/mock-news-data.ts` should match expected RSS article format.

## Deployment & Distribution

### Supported Platforms
- **Netlify: Primary deployment targets with HTTPS required for PWA


### Device Testing Steps
1. Deploy to staging URL with HTTPS
2. Test installation flow on real Android device (Chrome)
3. Test manual installation on real iOS device (Safari)
4. Verify offline functionality works on both platforms
5. Check service worker updates correctly

### Distribution Strategy
PWA distribution via web URL shared through landing page or direct link - no app store required.