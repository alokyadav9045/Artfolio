# 🎨 Artfolio

A modern, full-stack portfolio platform for artists to showcase their creative work. Built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

![Artfolio Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Artfolio+Preview)

## ✨ Features

- **🎨 Artist Portfolios**: Create stunning portfolios with multiple images
- **🔍 Advanced Search**: Find artworks by tags, artists, titles, and descriptions
- **❤️ Social Features**: Like and comment on artworks
- **📱 Responsive Design**: Perfect experience on all devices
- **🔐 Authentication**: Secure login with Google/GitHub OAuth
- **☁️ Cloud Storage**: AWS S3 integration for image uploads
- **⚡ Performance**: Optimized with Next.js 15 and React Query
- **🎯 TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS S3 account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alokyadav9045/artfolio.git
   cd artfolio/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with OAuth
- **Storage**: AWS S3 / Cloudinary
- **State Management**: React Query (TanStack Query)
- **Deployment**: Vercel

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── artist/         # Artist profile pages
│   │   ├── artwork/        # Artwork pages
│   │   └── dashboard/      # Creator dashboard
│   ├── components/         # Reusable UI components
│   │   ├── artwork/        # Artwork-specific components
│   │   └── ui/             # Base UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   └── types/              # TypeScript type definitions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── vercel.json            # Vercel deployment config
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all required environment variables. Key configurations:

- **Database**: PostgreSQL connection string
- **OAuth**: Google/GitHub client credentials
- **Storage**: AWS S3 or Cloudinary credentials
- **Auth**: NextAuth configuration

### Database Schema

The application uses Prisma with the following main models:
- `User`: Artist profiles and authentication
- `Artwork`: Creative works with metadata
- `Image`: Image files associated with artworks
- `Like`: User interactions with artworks
- `Comment`: User comments on artworks
- `Tag`: Categorization system for artworks

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect Next.js settings

2. **Environment Variables**
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Update `NEXTAUTH_URL` to your Vercel domain

3. **Database**
   - Use PlanetScale, Vercel Postgres, or Supabase
   - Update `DATABASE_URL` in environment variables

4. **Deploy**
   ```bash
   # Vercel will handle the build automatically
   # Your app will be live at https://your-app.vercel.app
   ```

### Manual Deployment

For other platforms, ensure:

- Node.js 18+ runtime
- PostgreSQL database
- Environment variables configured
- Build command: `npm run build`
- Start command: `npm start`

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Tree-shaken and optimized
- **Image Optimization**: Next.js automatic optimization

## 🔒 Security

- **Authentication**: Secure OAuth implementation
- **Authorization**: Role-based access control
- **Input Validation**: Server-side validation
- **Rate Limiting**: API rate limiting
- **HTTPS**: Enforced SSL/TLS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/alokyadav9045/artfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alokyadav9045/artfolio/discussions)
- **Email**: alokyadav9045@gmail.com

---

Built with ❤️ by [Alok Yadav](https://github.com/alokyadav9045)
