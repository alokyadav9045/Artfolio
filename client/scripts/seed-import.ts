import 'dotenv/config'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import { User, Artwork, Image, Like, Comment } from '../src/lib/models'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

async function importSeedData() {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set')
    }

    console.log('🔗 Connecting to MongoDB Atlas...')
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
    })
    console.log('✅ Connected to MongoDB\n')

    // Load seed data from JSON file
    const seedFilePath = path.join(__dirname, 'seed-data.json')
    if (!fs.existsSync(seedFilePath)) {
      throw new Error(`Seed data file not found at ${seedFilePath}. Run 'npx tsx scripts/seed-local.ts' first.`)
    }

    console.log('📂 Loading seed data from JSON...')
    const seedDataRaw = fs.readFileSync(seedFilePath, 'utf-8')
    const seedData = JSON.parse(seedDataRaw)
    console.log('✅ Seed data loaded successfully\n')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Promise.all([
      User.deleteMany({}),
      Artwork.deleteMany({}),
      Image.deleteMany({}),
      Like.deleteMany({}),
      Comment.deleteMany({}),
    ])
    console.log('✅ Cleared existing data\n')

    // Import users
    console.log('👥 Importing users...')
    const importedUsers = await User.insertMany(
      seedData.users.map((user: any) => {
        const { _id, artworks, likes, comments, ...userData } = user
        return userData
      })
    )
    console.log(`✅ Imported ${importedUsers.length} users`)

    // Create ID mapping for users
    const userIdMap: Record<string, string> = {}
    importedUsers.forEach((user, index) => {
      userIdMap[seedData.users[index]._id] = user._id.toString()
    })

    // Import artworks FIRST (without images initially)
    console.log('🎨 Importing artworks...')
    const importedArtworks = await Artwork.insertMany(
      seedData.artworks.map((artwork: any) => {
        const { _id, ...artworkData } = artwork
        return {
          ...artworkData,
          author: userIdMap[artwork.author],
          images: [], // Will be filled after creating images
          likes: [],
          comments: [],
        }
      })
    )
    console.log(`✅ Imported ${importedArtworks.length} artworks`)

    // Create artwork ID mapping
    const artworkIdMap: Record<string, string> = {}
    importedArtworks.forEach((artwork, index) => {
      artworkIdMap[seedData.artworks[index]._id] = artwork._id.toString()
    })

    // NOW import images with artwork references
    console.log('📸 Importing images...')
    const importedImages = await Image.insertMany(
      seedData.images.map((image: any, index: number) => {
        const { _id, ...imageData } = image
        const artworkIndex = index % seedData.artworks.length
        return {
          ...imageData,
          uploadedBy: importedUsers[index % importedUsers.length]._id,
          artwork: artworkIdMap[seedData.artworks[artworkIndex]._id],
          size: 2048576, // Default size
        }
      })
    )
    console.log(`✅ Imported ${importedImages.length} images`)

    // Create image ID mapping
    const imageIdMap: Record<string, string> = {}
    importedImages.forEach((image, index) => {
      imageIdMap[seedData.images[index]._id] = image._id.toString()
    })

    // Update artworks with image references
    console.log('🔗 Linking images to artworks...')
    for (let i = 0; i < importedArtworks.length; i++) {
      const importedArtwork = importedArtworks[i]
      const imageIndex = i % importedImages.length
      
      await Artwork.findByIdAndUpdate(importedArtwork._id, {
        $set: {
          images: [importedImages[imageIndex]._id],
        },
      })
    }
    console.log('✅ Linked images to artworks')

    // Import comments
    console.log('💬 Importing comments...')
    const importedComments = await Comment.insertMany(
      seedData.comments.map((comment: any) => {
        const { _id, ...commentData } = comment
        return {
          content: comment.content,
          user: userIdMap[comment.author],
          artwork: artworkIdMap[comment.artwork],
          createdAt: comment.createdAt,
          replies: [],
        }
      })
    )
    console.log(`✅ Imported ${importedComments.length} comments`)

    // Create comment ID mapping
    const commentIdMap: Record<string, string> = {}
    importedComments.forEach((comment, index) => {
      commentIdMap[seedData.comments[index]._id] = comment._id.toString()
    })

    // Import likes
    console.log('❤️  Importing likes...')
    const importedLikes = await Like.insertMany(
      seedData.likes.map((like: any) => {
        const { _id, ...likeData } = like
        return {
          ...likeData,
          user: userIdMap[like.user],
          artwork: artworkIdMap[like.artwork],
        }
      })
    )
    console.log(`✅ Imported ${importedLikes.length} likes\n`)

    // Update relationships
    console.log('🔗 Updating relationships...')
    
    for (let i = 0; i < importedArtworks.length; i++) {
      const artwork = seedData.artworks[i]
      const importedArtwork = importedArtworks[i]

      // Map comment and like references
      const commentRefs = artwork.comments.map((cId: string) => commentIdMap[cId])
      const likeRefs = artwork.likes.map((lId: string) => 
        importedLikes.find(like => like._id.toString() === seedData.likes.find((sl: any) => sl._id === lId)._id)
          ?._id.toString() || ''
      ).filter(Boolean)

      await Artwork.findByIdAndUpdate(importedArtwork._id, {
        $set: {
          comments: commentRefs,
          likes: likeRefs,
        },
      })
    }

    // Update user relationships
    for (let i = 0; i < importedUsers.length; i++) {
      const user = seedData.users[i]
      const importedUser = importedUsers[i]

      const artworkRefs = user.artworks.map((aId: string) => artworkIdMap[aId])
      const commentRefs = user.comments.map((cId: string) => commentIdMap[cId])
      const likeRefs = user.likes.map((lId: string) => {
        const like = importedLikes.find(il => il._id.toString() === seedData.likes.find((sl: any) => sl._id === lId)._id)
        return like?._id.toString() || ''
      }).filter(Boolean)

      await User.findByIdAndUpdate(importedUser._id, {
        $set: {
          artworks: artworkRefs,
          comments: commentRefs,
          likes: likeRefs,
        },
      })
    }

    console.log('✅ Updated all relationships\n')

    // Summary
    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  👥 Artists: ${importedUsers.length}`)
    console.log(`  🎨 Artworks: ${importedArtworks.length}`)
    console.log(`  📸 Images: ${importedImages.length}`)
    console.log(`  💬 Comments: ${importedComments.length}`)
    console.log(`  ❤️  Likes: ${importedLikes.length}`)
    console.log('\n✅ All data seeded with realistic details and interactions!')

  } catch (error) {
    console.error('❌ Error importing seed data:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n✅ Closed MongoDB connection')
    process.exit(0)
  }
}

importSeedData()
