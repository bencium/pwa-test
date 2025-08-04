# 📱 PWA News Reader

A modern, cross-platform Progressive Web App (PWA) news reader built with React, TypeScript, and Vite. Features offline functionality, smooth animations, and a native app-like experience.

![PWA News Reader](https://img.shields.io/badge/PWA-Ready-green) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![React](https://img.shields.io/badge/React-19-blue) ![Netlify](https://img.shields.io/badge/Netlify-Deployed-success)

## ✨ Features

### 🚀 Progressive Web App Capabilities
- **Offline Reading** - Read articles without internet connection
- **Install to Home Screen** - True app-like experience on mobile and desktop
- **Background Sync** - Automatic content updates when back online
- **Push Notifications** - Breaking news alerts (future enhancement)
- **Fullscreen Mode** - Immersive reading experience without browser UI

### 🎨 Modern User Experience
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Custom Splash Screen** - Branded loading experience with progress indicators
- **Responsive Design** - Mobile-first approach with tablet and desktop support
- **Dark/Light Themes** - Automatic theme switching based on system preferences
- **Touch Optimized** - 44px minimum touch targets for mobile usability

### 📰 News Features
- **Real RSS Feeds** - Integration with design and tech news sources
- **Offline Caching** - Articles stored locally for offline reading
- **Favorites System** - Save articles for later reading
- **Reading Time** - Estimated read time for each article
- **Image Optimization** - Lazy loading and responsive images

### 🛠 Technical Excellence
- **TypeScript** - Full type safety and developer experience
- **Service Worker** - Advanced caching strategies and offline functionality
- **Comprehensive Testing** - 47+ tests with Jest and React Testing Library
- **Performance Optimized** - <500KB bundle size, <3s load time
- **SEO Ready** - Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bencium/pwa-test.git
   cd pwa-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Local: http://localhost:3000
   - Network: http://192.168.1.105:3000 (for mobile testing)

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 PWA Installation

### Android (Chrome)
1. Visit the app in Chrome browser
2. Look for the "Install" prompt in the address bar
3. Tap "Install" to add to home screen
4. Launch from app drawer for fullscreen experience

### iOS (Safari)
1. Visit the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Confirm installation

### Desktop
1. Visit the app in Chrome/Edge
2. Click the install icon in the address bar
3. Confirm installation
4. Launch from applications folder

## 🏗 Architecture

### Tech Stack
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Framer Motion** - Production-ready animations
- **TailwindCSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── SplashScreen.tsx # Custom splash screen
│   ├── PWAIntro.tsx    # PWA advantages section
│   └── ...
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── __tests__/          # Test files
```

### PWA Configuration
- **Manifest**: `public/manifest.webmanifest`
- **Service Worker**: Auto-generated with Vite PWA plugin
- **Icons**: Various sizes for different platforms
- **Offline Strategy**: Network-first with fallback

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode
npm run test:ci
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Visit [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Netlify will automatically use `netlify.toml` configuration

3. **Automatic Deployment**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - PWA headers and caching configured automatically

### Manual Deployment

```bash
# Build and deploy to preview
npm run deploy:preview

# Build and deploy to production
npm run deploy:prod
```

## 🛠 Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run typecheck       # Run TypeScript checks
npm run test            # Run tests
npm run generate-pwa-assets  # Generate PWA icons
```

### Development Features

- **Hot Module Replacement** - Instant updates during development
- **TypeScript Checking** - Real-time type checking
- **ESLint Integration** - Code quality enforcement
- **Mobile Testing** - Network access for device testing

### Adding New Features

1. Create components in `src/components/`
2. Add types in `src/types/`
3. Write tests in `src/__tests__/`
4. Update documentation

## 📊 Performance

- **Lighthouse PWA Score**: 90+
- **Bundle Size**: <500KB (optimized)
- **Load Time**: <3 seconds on 3G
- **Offline Functionality**: 100% article reading
- **Service Worker Cache**: Intelligent caching strategies

## 🔧 Configuration

### Environment Variables
Currently, no environment variables are required. RSS feeds are configured in `src/utils/rss-parser.ts`.

### PWA Customization
- Update `vite.config.ts` for manifest changes
- Modify `public/icons/` for custom icons
- Edit `src/components/SplashScreen.tsx` for splash screen

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern news apps
- RSS feeds from design and technology publications
- PWA best practices from Google Developers
- Animation patterns from Framer Motion community

---

**Built with ❤️ by Bence** | [GitHub](https://github.com/bencium) | [Live Demo](https://pwa-news-reader.netlify.app)