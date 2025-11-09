# Artfolio Database Seeding Guide

## Overview

The Artfolio application includes comprehensive seed data with realistic artist profiles, artwork, images, comments, and likes.

## Seed Data Statistics

- **Artists**: 8 diverse profiles from around the world
- **Artworks**: 15 detailed pieces across multiple art styles
- **Images**: 15 high-quality Unsplash images
- **Comments**: 2,268 authentic interactions
- **Likes**: 105 distributed engagements

## Two-Step Seeding Process

### Step 1: Generate Seed Data (Offline)

Generate realistic seed data JSON that doesn't require database connection:

```bash
npm run db:seed:generate
```

This creates `scripts/seed-data.json` with:
- Realistic artist bios and profiles
- Detailed artwork descriptions
- Authentic comments and interactions
- Organic engagement patterns

**Output**: `scripts/seed-data.json` (669 KB)

### Step 2: Import Seed Data (Online)

Once MongoDB Atlas connection is working, import the generated data:

```bash
npm run db:seed
```

This will:
1. Connect to MongoDB Atlas
2. Clear existing data
3. Import all users, artworks, images, comments, and likes
4. Update all relationships
5. Display import summary

## Troubleshooting MongoDB Connection Issues

### Issue: SSL/TLS Error

**Error**: `tlsv1 alert internal error` or `SSL_TLSV1_ALERT_INTERNAL_ERROR`

**Solution**: 
- Ensure your IP is whitelisted in MongoDB Atlas
- Go to: Cluster → Security → IP Whitelist
- Add your current IP address

### Issue: Connection Timeout

**Error**: `MongooseServerSelectionError: Could not connect to any servers`

**Solution**:
- Check `.env.local` for correct `MONGODB_URI`
- Verify MongoDB Atlas cluster is running
- Check internet connection
- Try increasing timeout: Update `serverSelectionTimeoutMS` in seed scripts

### Issue: Authentication Failed

**Error**: `Authentication failed` or `Invalid credentials`

**Solution**:
- Verify username and password in MongoDB URI
- Check special characters are URL-encoded
- Reset password in MongoDB Atlas if needed

## Seed Data Details

### Artist Profiles

Each artist has:
- **Name**: International artist names
- **Bio**: Detailed professional background (50+ words)
- **Location**: Geographic diversity
- **Website**: Professional portfolio link
- **Profile Image**: High-quality Unsplash photo
- **Email**: Unique email address

### Artworks

Each artwork includes:
- **Title**: Descriptive, professional title
- **Description**: Detailed narrative (100+ words)
- **Tags**: Multiple categorization tags
- **Author**: Link to artist profile
- **Images**: Associated high-quality image
- **Metrics**: Realistic view, like, comment counts

### Engagement Data

Realistic interaction patterns:
- **Comments**: Contextual, meaningful feedback from various users
- **Likes**: Organic distribution across artworks
- **No self-interactions**: Artists don't like their own work
- **Timestamp variation**: Comments and likes spread across time

## Manual Alternative

If automated seeding fails, use MongoDB Compass or Atlas UI:

1. Export collections from `seed-data.json`
2. Use MongoDB Compass GUI
3. Import JSON documents into each collection
4. Manually create relationships

## API Usage

Once seeded, test endpoints:

```bash
# Get all artworks
curl http://localhost:3000/api/artworks

# Get artwork by ID
curl http://localhost:3000/api/artworks/[artwork_id]

# Get stats
curl http://localhost:3000/api/stats

# Get artist profile
curl http://localhost:3000/api/users/[user_id]
```

## Resetting Database

To clear and reseed:

```bash
# Generate fresh seed data
npm run db:seed:generate

# Import into fresh database
npm run db:seed
```

## Direct Seeding (Advanced)

If using local MongoDB:

```bash
npm run db:seed:direct
```

Requires local MongoDB to be running on `mongodb://localhost:27017`

## File Locations

- **Seed Generator**: `scripts/seed-local.ts`
- **Seed Importer**: `scripts/seed-import.ts`
- **Seed Data**: `scripts/seed-data.json`
- **Direct Seeder**: `scripts/seed.ts`

## Environment Variables Required

`.env.local` must contain:

```
MONGODB_URI=mongodb+srv://[user]:[password]@[cluster].mongodb.net/artfolio?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Support

For issues:
1. Check MongoDB Atlas cluster health
2. Verify IP whitelist configuration
3. Review console error messages
4. Ensure `.env.local` is properly configured
