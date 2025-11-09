import 'dotenv/config'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Artwork, Image, Like, Comment } from '../src/lib/models'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

// Comprehensive artist profiles with realistic details
const artistProfiles = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@artfolio.com',
    bio: 'Contemporary digital artist exploring the intersection of nature and technology. 15+ years of experience in sustainable art practices and community engagement. Currently based in Mumbai.',
    location: 'Mumbai, India',
    website: 'https://priyasharma-art.com',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', // Painting artist portrait
  },
  {
    name: 'Arjun Patel',
    email: 'arjun.patel@artfolio.com',
    bio: 'Digital artist and illustrator specializing in sci-fi and fantasy concepts. Merging traditional art principles with cutting-edge digital tools. Available for commissions and collaborations.',
    location: 'Delhi, India',
    website: 'https://arjunpatel-digital.com',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop', // Artist with paintbrush
  },
  {
    name: 'Ananya Singh',
    email: 'ananya.singh@artfolio.com',
    bio: 'Oil painter and muralist dedicated to bringing color and life to urban spaces. Advocate for public art and creative expression. Teaching workshops in local communities.',
    location: 'Jaipur, India',
    website: 'https://ananyasingh-murals.com',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', // Female artist portrait
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@artfolio.com',
    bio: 'Mixed media artist exploring cultural identity and social justice through art. Combining traditional techniques with modern storytelling. Featured in international exhibitions.',
    location: 'Kolkata, India',
    website: 'https://rajeshkumar-art.com',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop', // Male artist portrait
  },
  {
    name: 'Kavita Reddy',
    email: 'kavita.reddy@artfolio.com',
    bio: 'Watercolor artist specializing in landscapes and botanical illustrations. Each piece tells a story of nature\'s diversity and beauty. Over 20 years of artistic practice.',
    location: 'Hyderabad, India',
    website: 'https://kavitareddy-watercolors.com',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', // Watercolor artist
  },
  {
    name: 'Vikram Joshi',
    email: 'vikram.joshi@artfolio.com',
    bio: 'Sculpture and installation artist pushing boundaries of spatial perception. Working with sustainable materials and exploring environmental consciousness through art.',
    location: 'Pune, India',
    website: 'https://vikramjoshi-sculptures.com',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop', // Sculpture artist
  },
  {
    name: 'Meera Gupta',
    email: 'meera.gupta@artfolio.com',
    bio: 'Photographer capturing raw emotions and human stories. Specializing in street photography and documentary work. Published in multiple international magazines.',
    location: 'Chennai, India',
    website: 'https://meera-photography.com',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', // Photographer artist
  },
  {
    name: 'Rohan Malhotra',
    email: 'rohan.malhotra@artfolio.com',
    bio: 'Contemporary textile artist celebrating Indian heritage and cultural narratives. Using traditional weaving techniques with modern design sensibilities.',
    location: 'Ahmedabad, India',
    website: 'https://rohanmalhotra-textiles.com',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop', // Textile artist
  },
]

// Comprehensive artwork data
const artworkTemplates = [
  {
    title: 'Urban Landscape at Sunset',
    description: 'A vibrant digital painting capturing the essence of city life during golden hour. The warm hues reflect on modern skyscrapers while pedestrians walk through illuminated streets. This piece explores the intersection of nature and urban development, created over 3 months of digital painting experimentation.',
    tags: ['digital-art', 'landscape', 'urban', 'sunset', 'contemporary'],
  },
  {
    title: 'Abstract Serenity',
    description: 'An exploration of color and form, this abstract piece uses flowing shapes and muted tones to evoke feelings of calm and introspection. Created using mixed media techniques combining acrylic and digital elements. The layers represent the complexity of human emotions and consciousness.',
    tags: ['abstract', 'mixed-media', 'contemporary', 'serene', 'experimental'],
  },
  {
    title: 'Portrait: The Thinker',
    description: 'A classical portrait study using traditional oil painting techniques. The subject\'s thoughtful expression and detailed facial features showcase months of careful observation and study of human anatomy. Inspired by Renaissance masters, yet uniquely contemporary.',
    tags: ['portrait', 'oil-painting', 'classical', 'realistic', 'character-study'],
  },
  {
    title: 'Cosmic Journey Through Galaxies',
    description: 'A stunning digital illustration depicting a space odyssey through distant galaxies. The artwork combines scientific accuracy with artistic imagination, featuring nebulae, black holes, and distant stars in breathtaking detail. A meditation on humanity\'s place in the universe.',
    tags: ['digital-illustration', 'space', 'sci-fi', 'cosmic', 'surreal'],
  },
  {
    title: "Nature's Palette: Forest Haven",
    description: 'An immersive landscape painting capturing the tranquility of an ancient forest. Detailed trees, undergrowth, and dappled light create a sense of peace and connection with nature. Perfect for meditation spaces and nature lovers seeking artistic escape.',
    tags: ['landscape', 'nature', 'watercolor', 'forest', 'environmental'],
  },
  {
    title: 'Modern Architecture Study',
    description: 'Architectural illustration featuring contemporary building designs from around the world. Each structure showcases unique design principles and innovative approaches to sustainable urban development. A celebration of human creativity in architectural design.',
    tags: ['architecture', 'illustration', 'modern', 'design', 'urban-planning'],
  },
  {
    title: 'Digital Dreams: Surrealism Meets Tech',
    description: 'A cutting-edge digital artwork blending surrealism with technology aesthetics. Floating elements, impossible geometries, and neon colors create a dreamlike environment exploring the boundary between digital and physical reality. Winner of Digital Art Excellence Award 2024.',
    tags: ['surreal', 'digital-art', 'tech', 'experimental', 'futuristic'],
  },
  {
    title: 'Cultural Fusion: East Meets West',
    description: 'An innovative artwork combining Eastern and Western artistic traditions. Traditional calligraphy blends with contemporary street art style, creating a unique visual dialogue between cultures and time periods. Celebrates the beauty of cultural exchange and artistic diversity.',
    tags: ['cultural', 'fusion', 'street-art', 'traditional', 'contemporary'],
  },
  {
    title: "The Ocean's Whisper",
    description: 'A serene watercolor painting of coastal waves at dawn. The artist captures the subtle interplay of water, light, and atmosphere, inviting viewers to experience the peaceful solitude of the seaside. Each brushstroke reflects hours of study of natural light and water movement.',
    tags: ['watercolor', 'ocean', 'landscape', 'coastal', 'serene'],
  },
  {
    title: 'Mechanical Symphonies',
    description: 'An intricate steampunk-inspired artwork featuring intricate gears, cogs, and mechanical elements arranged in harmonious patterns. The piece celebrates the beauty of industrial design and precision engineering. Meticulously detailed with historical accuracy in mechanical elements.',
    tags: ['steampunk', 'mechanical', 'industrial', 'detailed', 'fantasy'],
  },
  {
    title: 'Threads of Culture',
    description: 'A textile art piece combining traditional African weaving patterns with contemporary geometric designs. Hand-dyed fabrics showcase natural colors extracted from local plants. Represents the artist\'s celebration of heritage and environmental sustainability.',
    tags: ['textile-art', 'cultural', 'traditional', 'sustainable', 'african-art'],
  },
  {
    title: 'Street Wisdom',
    description: 'Documentary photography series capturing unscripted moments of human connection in urban environments. Twenty photographs documenting the lives of street vendors, artists, and everyday heroes. A powerful commentary on resilience and community.',
    tags: ['photography', 'documentary', 'street-photography', 'human', 'social-commentary'],
  },
  {
    title: 'Sculptural Landscape',
    description: 'Large-scale installation combining reclaimed materials and natural elements. This environmental sculpture invites viewers to reconsider their relationship with waste and nature. Installed in public spaces across three European cities.',
    tags: ['sculpture', 'installation', 'environmental', 'sustainable', 'public-art'],
  },
  {
    title: 'Digital Botanicals',
    description: 'A series of hyper-realistic digital illustrations of endangered plant species. Created to raise awareness about biodiversity loss. Each piece includes detailed botanical information and conservation tips.',
    tags: ['digital-illustration', 'botanical', 'environmental', 'educational', 'conservation'],
  },
  {
    title: 'Nostalgia in Pigment',
    description: 'Oil painting series exploring childhood memories through abstract representation. Vibrant colors mixed with muted tones create visual representations of forgotten moments. Deeply personal yet universally relatable.',
    tags: ['oil-painting', 'abstract', 'nostalgic', 'personal', 'expressive'],
  },
]

// Image URLs from Unsplash (high-quality painting images)
const imageUrls = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Abstract painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Oil painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Watercolor painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Acrylic painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Landscape painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Portrait painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Still life painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Modern art painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Contemporary painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Mixed media painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Expressionist painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Impressionist painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Surreal painting
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=900&fit=crop', // Minimalist painting
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&h=900&fit=crop', // Colorful abstract painting
]

// Realistic comment examples
const commentExamples = [
  'This is absolutely stunning! The attention to detail is incredible. How long did this take you?',
  'Love the use of color in this piece. Really captivates the viewer and draws you into the composition.',
  'Such a unique perspective. This speaks to me on a deeper level. Truly inspiring work!',
  'The composition here is masterful. The balance and flow are perfectly executed!',
  'This captures the essence perfectly. Beautiful work that resonates with emotion.',
  'Incredible talent. Looking forward to seeing more from you. Have you considered selling prints?',
  'The way you\'ve handled the light and shadow is phenomenal. Outstanding technique!',
  'This piece resonates with so much emotion. Bravo! Truly moving.',
  'WOW! This is museum-quality work. You\'re incredibly talented.',
  'The technical skill combined with artistic vision makes this exceptional.',
  'I keep coming back to look at this. It\'s mesmerizing and thought-provoking.',
  'This is the kind of art that makes you feel something. Really powerful work.',
  'Your style is so distinctive and recognizable. Love following your journey!',
  'The details are insane. You can see the dedication and passion in every stroke.',
  'This changed my perspective on what art can be. Thank you for creating this.',
]

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set')
    }

    console.log('🔗 Connecting to MongoDB Atlas...')
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    })
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Promise.all([
      User.deleteMany({}),
      Artwork.deleteMany({}),
      Image.deleteMany({}),
      Like.deleteMany({}),
      Comment.deleteMany({}),
    ])
    console.log('✅ Cleared existing data')

    // Create comprehensive artist profiles
    console.log('👥 Creating detailed artist profiles...')
    const users = await User.insertMany(
      artistProfiles.map(profile => ({
        ...profile,
        emailVerified: new Date(),
      }))
    )
    console.log(`✅ Created ${users.length} artist profiles`)

    // Create artworks with images and interactions
    console.log('🎨 Creating comprehensive artworks...')
    const createdArtworks = []
    
    for (let i = 0; i < artworkTemplates.length; i++) {
      const template = artworkTemplates[i]
      const artist = users[i % users.length]

      // Create artwork first
      const artwork = await Artwork.create({
        title: template.title,
        description: template.description,
        tags: template.tags,
        author: artist._id,
        images: [], // Will be populated after image creation
        isPublished: true,
        viewCount: Math.floor(Math.random() * 8000) + 150,
        likeCount: 0, // Will be calculated later
        commentCount: 0, // Will be calculated later
      })

      // Create image with required fields
      const imageData = await Image.create({
        url: imageUrls[i % imageUrls.length],
        alt: template.title,
        filename: `${template.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        mimeType: 'image/jpeg',
        width: 1200,
        height: 900,
        size: 245760, // 240KB in bytes
        artwork: artwork._id,
        uploadedBy: artist._id,
      })

      // Update artwork with image reference
      await Artwork.findByIdAndUpdate(artwork._id, {
        $push: { images: imageData._id },
      })

      // Update user artworks
      await User.findByIdAndUpdate(artist._id, {
        $push: { artworks: artwork._id },
      })

      // Calculate realistic metrics
      const viewCount = Math.floor(Math.random() * 8000) + 150
      const likeCount = Math.floor(viewCount * (Math.random() * 0.2 + 0.05))
      const commentCount = Math.floor(likeCount * (Math.random() * 0.4))

      // Update artwork with final metrics
      await Artwork.findByIdAndUpdate(artwork._id, {
        viewCount,
        likeCount,
        commentCount,
      })

      // Create a copy with updated metrics for the array
      const updatedArtwork = await Artwork.findById(artwork._id)
      createdArtworks.push(updatedArtwork!)
      console.log(`  ✅ "${template.title}" by ${artist.name}`)
    }

    // Create comprehensive comments
    console.log('💬 Creating detailed comments...')
    let totalComments = 0
    
    for (const artwork of createdArtworks) {
      const commentCount = artwork.commentCount
      
      for (let i = 0; i < commentCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        
        if (randomUser._id.toString() === artwork.author.toString()) continue

        const commentText = commentExamples[Math.floor(Math.random() * commentExamples.length)]
        
        const comment = await Comment.create({
          content: commentText,
          user: randomUser._id,
          artwork: artwork._id,
        })

        await Artwork.findByIdAndUpdate(artwork._id, {
          $push: { comments: comment._id },
        })

        await User.findByIdAndUpdate(randomUser._id, {
          $push: { comments: comment._id },
        })

        totalComments++
      }
    }
    console.log(`✅ Created ${totalComments} detailed comments`)

    // Create comprehensive likes
    console.log('❤️  Creating realistic likes and interactions...')
    let totalLikes = 0
    
    for (const artwork of createdArtworks) {
      const likeCount = artwork.likeCount
      const usedUsers = new Set()
      
      for (let i = 0; i < likeCount; i++) {
        let randomUser = users[Math.floor(Math.random() * users.length)]
        
        // Avoid duplicate likes
        let attempts = 0
        while ((usedUsers.has(randomUser._id.toString()) || randomUser._id.toString() === artwork.author.toString()) && attempts < 5) {
          randomUser = users[Math.floor(Math.random() * users.length)]
          attempts++
        }

        if (usedUsers.has(randomUser._id.toString()) || randomUser._id.toString() === artwork.author.toString()) {
          continue
        }

        usedUsers.add(randomUser._id.toString())

        const like = await Like.create({
          user: randomUser._id,
          artwork: artwork._id,
        })

        await Artwork.findByIdAndUpdate(artwork._id, {
          $push: { likes: like._id },
        })

        await User.findByIdAndUpdate(randomUser._id, {
          $push: { likes: like._id },
        })

        totalLikes++
      }
    }
    console.log(`✅ Created ${totalLikes} likes and user interactions`)

    // Summary
    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  👥 Artists: ${users.length}`)
    console.log(`  🎨 Artworks: ${createdArtworks.length}`)
    console.log(`  💬 Comments: ${totalComments}`)
    console.log(`  ❤️  Likes: ${totalLikes}`)
    console.log(`  📸 Images: ${createdArtworks.length}`)
    console.log('\n✅ All data seeded with realistic details and interactions!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('✅ Closed MongoDB connection')
    process.exit(0)
  }
}

seed()