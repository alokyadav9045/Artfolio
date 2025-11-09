# 🚀 Artfolio Production Deployment Checklist

## Pre-Deployment Preparation

### ✅ Environment Setup
- [ ] Copy `.env.example` to `.env.local` (development) and configure all variables
- [ ] Set up production environment variables in Vercel/dashboard
- [ ] Configure production database (PlanetScale, Vercel Postgres, or Supabase)
- [ ] Set up OAuth applications (Google, GitHub) with production domains
- [ ] Configure AWS S3 bucket or Cloudinary account for image storage

### ✅ Database Configuration
- [ ] Set up MongoDB database (local or MongoDB Atlas)
- [ ] Configure `MONGODB_URI` in environment variables
- [ ] Test database connection
- [ ] Run `npm run db:seed` for initial data (optional)

### ✅ Security & Authentication
- [ ] Configure NextAuth.js with production URLs
- [ ] Set up OAuth redirect URIs for production domain
- [ ] Generate secure `NEXTAUTH_SECRET` (minimum 32 characters)
- [ ] Configure rate limiting (Upstash Redis KV)
- [ ] Set up Sentry DSN and project configuration

### ✅ Storage & Media
- [ ] Create AWS S3 bucket with proper CORS configuration
- [ ] Set up IAM user with S3 permissions
- [ ] Configure Cloudinary (alternative to S3)
- [ ] Test image upload functionality
- [ ] Verify file permissions and access controls

## Deployment Steps

### ✅ Vercel Configuration
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings (Node.js version, build command, output directory)
- [ ] Add all environment variables to Vercel project settings
- [ ] Set up custom domain (optional)
- [ ] Configure preview deployments for pull requests

### ✅ Build & Test
- [ ] Run `npm run deploy:check` locally (lint + type-check + build)
- [ ] Execute full test suite (`npm run test` + `npm run test:e2e`)
- [ ] Verify bundle size with `npm run analyze`
- [ ] Test application in production build mode

### ✅ Monitoring Setup
- [ ] Configure Sentry error tracking
- [ ] Set up Vercel Analytics
- [ ] Enable performance monitoring
- [ ] Configure log aggregation (optional)

## Post-Deployment Verification

### ✅ Functionality Testing
- [ ] Test user registration and login (OAuth flows)
- [ ] Verify image upload and display
- [ ] Test portfolio creation and editing
- [ ] Check social features (likes, comments)
- [ ] Validate responsive design on mobile/desktop

### ✅ Performance & Security
- [ ] Run Lighthouse audit for performance metrics
- [ ] Test security headers and CORS configuration
- [ ] Verify rate limiting is working
- [ ] Check SSL certificate and HTTPS setup
- [ ] Validate CSP (Content Security Policy)

### ✅ Monitoring & Analytics
- [ ] Confirm Sentry error tracking is active
- [ ] Verify Vercel Analytics data collection
- [ ] Test Web Vitals monitoring
- [ ] Set up uptime monitoring (optional)

## Production Maintenance

### 🔄 Regular Tasks
- [ ] Monitor error rates and performance metrics
- [ ] Review and update dependencies monthly
- [ ] Backup database regularly
- [ ] Monitor storage usage and costs
- [ ] Update SSL certificates (if not automatic)

### 🚨 Emergency Procedures
- [ ] Rollback deployment procedure
- [ ] Database backup restoration
- [ ] Emergency contact procedures
- [ ] Incident response plan

## Environment Variables Checklist

### Required Variables
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `NEXTAUTH_SECRET` - Authentication secret
- [ ] `NEXTAUTH_URL` - Production domain URL
- [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - OAuth
- [ ] `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - OAuth
- [ ] `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` - S3 storage
- [ ] `AWS_REGION` & `AWS_S3_BUCKET` - S3 configuration
- [ ] `SENTRY_DSN` & `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- [ ] `VERCEL_ANALYTICS_ID` - Analytics (optional)

### Optional Variables
- [ ] `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - Email notifications
- [ ] `CLOUDINARY_CLOUD_NAME`, etc. - Alternative storage
- [ ] `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW` - Custom rate limits

## Troubleshooting Guide

### Common Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection**
   - Verify connection string format
   - Check database server status
   - Validate user permissions

3. **Authentication Issues**
   - Confirm OAuth redirect URIs
   - Check NextAuth configuration
   - Verify secrets are set correctly

4. **Image Upload Problems**
   - Check S3 bucket permissions
   - Verify CORS configuration
   - Test file size limits

5. **Performance Issues**
   - Run bundle analyzer
   - Check database query optimization
   - Review image optimization settings

## Success Metrics

- [ ] Application loads within 3 seconds
- [ ] Core Web Vitals scores > 75
- [ ] Zero critical security vulnerabilities
- [ ] 99.9% uptime
- [ ] Successful user registration/login flow
- [ ] Image upload and display working
- [ ] All pages responsive and functional

---

✅ **Deployment Complete** - Artfolio is now live in production!