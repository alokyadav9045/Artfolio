# 🎨 Artfolio - Portfolio Builder for Artists

A gallery that breathes — creators upload light and color, visitors leave echoes (likes, comments). A modern, production-ready portfolio platform for artists built with Next.js 15, featuring secure authentication, cloud storage, real-time interactions, and an interactive 3D GridScan background effect.

![Artfolio](client/public/nextjs.png)

## ✨ Features

- 🎨 **Artist Portfolio Creation** - Beautiful, responsive galleries for artists
- 🔐 **Secure Authentication** - NextAuth.js with OAuth (Google, GitHub)
- ☁️ **Cloud Storage** - AWS S3 or Cloudinary integration for image uploads
- 💬 **Social Interactions** - Likes, comments, and engagement features
- 🎯 **Interactive 3D Effects** - GridScan component with teal color scheme and mouse-responsive animations
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔧 **TypeScript** - Full type safety throughout the application
- 🧪 **Comprehensive Testing** - Jest unit tests and Playwright E2E tests
- 🚀 **Production Ready** - Optimized for Vercel deployment
- 📊 **Analytics & Monitoring** - Vercel Analytics and Sentry error tracking
- 🛡️ **Security First** - Rate limiting, security headers, and middleware
- 🎯 **Performance Optimized** - Bundle analysis and Web Vitals tracking

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **3D Graphics:** Three.js + Postprocessing effects
- **Storage:** AWS S3 / Cloudinary
- **Deployment:** Vercel
- **Monitoring:** Sentry + Vercel Analytics
- **Testing:** Jest + Playwright
- **State Management:** TanStack Query

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- AWS S3 bucket or Cloudinary account (for image storage)
- OAuth applications (Google/GitHub) for authentication

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/artfolio.git
cd artfolio
```

### 2. Install dependencies

```bash
cd client
npm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables (see `.env.example` for detailed instructions).

### 4. Database Setup

**For Local MongoDB:**
```bash
# Install MongoDB Community Edition
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: Follow official documentation

# Start MongoDB service
mongod

# Or use MongoDB Compass for GUI management
```

**For MongoDB Atlas (Cloud):**
1. Create account at https://cloud.mongodb.com/
2. Create a new cluster
3. Get connection string from Atlas dashboard

### 5. Environment Setup

Update your `.env.local` file:
```bash
# Database
MONGODB_URI="mongodb://localhost:27017/artfolio"
# OR for MongoDB Atlas:
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/artfolio"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-nextauth-key-minimum-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Interactive 3D GridScan Effect

Artfolio features a stunning interactive 3D GridScan background effect built with Three.js:

- **Teal Color Scheme** - Grid lines in #008080, scan effect in #00CED1
- **Mouse Responsive** - Grid reacts to mouse movement for immersive interaction
- **Postprocessing Effects** - Bloom and chromatic aberration for visual depth
- **Performance Optimized** - WebGL rendering with efficient shader code
- **Background Layer** - 40% opacity overlay on hero section

The GridScan component creates an engaging, modern aesthetic that complements the artistic nature of the platform.

```
client/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   │   ├── grid-scan.tsx    # Interactive 3D GridScan component
│   │   │   ├── button.tsx       # UI components
│   │   │   └── ...
│   │   ├── hero.tsx       # Hero section with GridScan background
│   │   ├── navbar.tsx     # Navigation
│   │   └── footer.tsx     # Footer
│   └── lib/
│       ├── utils.ts       # Utility functions
│       └── rate-limit.ts  # Rate limiting logic
├── public/                # Static assets
├── .env.example           # Environment template
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── jest.config.js         # Jest configuration
├── playwright.config.ts   # Playwright configuration
├── eslint.config.mjs      # ESLint configuration
└── vercel.json            # Vercel deployment config
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

### End-to-End Tests

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### ✅ Current Status: Ready for Production

The project has been cleaned and optimized for deployment:
- All ESLint errors resolved
- Extra files removed (documentation, backups, sensitive data)
- Build tested successfully
- GridScan component with teal colors integrated

### Vercel Deployment

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Configure build settings

2. **Environment Variables**
   - Add all variables from `.env.example`
   - Configure production database URL

3. **Deploy**
   - Vercel will automatically deploy on git push
   - Preview deployments for pull requests

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📊 Monitoring & Analytics

### Performance Monitoring

```bash
# Analyze bundle size
npm run analyze

# View bundle analysis
npm run analyze:view
```

### Error Tracking

- Sentry automatically captures errors in production
- Configure your Sentry DSN in environment variables

### Analytics

- Vercel Analytics tracks page views and performance
- Web Vitals monitoring included

## � Development Scripts

```bash
npm run dev           # Start development server with Turbopack
npm run build         # Build for production
npm run start         # Start production server
npm run preview       # Build and preview locally
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues automatically
npm run type-check    # Run TypeScript checks
npm run test          # Run unit tests
npm run test:watch    # Watch mode tests
npm run test:coverage # Test coverage report
npm run db:seed       # Seed database with sample data
npm run db:seed:direct # Direct database seeding
npm run clean         # Clean build artifacts and cache
npm run analyze       # Bundle analysis
npm run analyze:view  # View bundle analysis in browser
npm run deploy:check  # Pre-deployment checks (lint + type-check + build)
```

## 🔒 Security Features

- **Rate Limiting** - API rate limiting with Upstash Redis
- **Security Headers** - Comprehensive security headers
- **CORS Configuration** - Proper CORS setup for API routes
- **Input Validation** - Zod schema validation
- **Authentication** - Secure OAuth implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Ensure code passes linting
- Test on multiple browsers

## 📄 Environment Variables

See `.env.example` for all required environment variables:

- **Database:** `MONGODB_URI`
- **Authentication:** `NEXTAUTH_SECRET`, OAuth credentials
- **Storage:** AWS S3 or Cloudinary configuration
- **Monitoring:** Sentry and Vercel Analytics
- **Security:** Rate limiting and CSRF protection

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   ```bash
   # Check MongoDB connection with MongoDB Compass
   # Or use mongosh CLI
   mongosh "mongodb://localhost:27017/artfolio"
   ```

2. **Build Errors**
   ```bash
   npm run clean     # Clear cache
   npm run build     # Retry build
   ```

3. **Test Failures**
   ```bash
   npm run test:coverage  # Run with coverage
   npm run test:e2e       # Run E2E tests
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [MongoDB](https://mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform
- [Sentry](https://sentry.io/) - Error monitoring

---

⭐ If Artfolio helped you showcase your art, please give it a star!

## 📋 Recent Updates

### ✅ Latest Features
- **Interactive 3D GridScan Effect** - Teal-colored (#008080, #00CED1) mouse-responsive grid background
- **Production Ready** - All ESLint errors resolved, build optimized for Vercel
- **Clean Codebase** - Removed development artifacts, sensitive files, and build cache
- **Performance Optimized** - Turbopack development, bundle analysis, and Web Vitals monitoring

### 🚀 Deployment Status
- **Build Status:** ✅ Passing
- **ESLint:** ✅ Clean
- **TypeScript:** ✅ Valid
- **Ready for:** Vercel deployment

### 🎨 Visual Features
- GridScan component with Three.js postprocessing effects
- Teal color scheme throughout the application
- Responsive design with mobile-first approach
- Modern UI with shadcn/ui components
