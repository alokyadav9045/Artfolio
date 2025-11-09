import * as fs from 'fs'
import * as path from 'path'

// Comprehensive artist profiles with realistic details
const artistProfiles = [
  {
    name: 'Sofia Martinez',
    email: 'sofia.martinez@artfolio.com',
    bio: 'Contemporary digital artist exploring the intersection of nature and technology. 15+ years of experience in sustainable art practices and community engagement. Currently based in Barcelona.',
    location: 'Barcelona, Spain',
    website: 'https://sofiamartinez-art.com',
    image: 'https://picsum.photos/400/400?random=1',
  },
  {
    name: 'James Chen',
    email: 'james.chen@artfolio.com',
    bio: 'Digital artist and illustrator specializing in sci-fi and fantasy concepts. Merging traditional art principles with cutting-edge digital tools. Available for commissions and collaborations.',
    location: 'Tokyo, Japan',
    website: 'https://jameschen-digital.com',
    image: 'https://picsum.photos/400/400?random=2',
  },
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@artfolio.com',
    bio: 'Oil painter and muralist dedicated to bringing color and life to urban spaces. Advocate for public art and creative expression. Teaching workshops in local communities.',
    location: 'London, UK',
    website: 'https://emmajohnson-murals.com',
    image: 'https://picsum.photos/400/400?random=3',
  },
  {
    name: 'Rajesh Patel',
    email: 'rajesh.patel@artfolio.com',
    bio: 'Mixed media artist exploring cultural identity and social justice through art. Combining traditional techniques with modern storytelling. Featured in international exhibitions.',
    location: 'New Delhi, India',
    website: 'https://rajeshpatel-art.com',
    image: 'https://picsum.photos/400/400?random=4',
  },
  {
    name: 'Lucia Rossi',
    email: 'lucia.rossi@artfolio.com',
    bio: 'Watercolor artist specializing in landscapes and botanical illustrations. Each piece tells a story of nature\'s diversity and beauty. Over 20 years of artistic practice.',
    location: 'Venice, Italy',
    website: 'https://lucia-watercolors.com',
    image: 'https://picsum.photos/400/400?random=5',
  },
  {
    name: 'Marcus Stone',
    email: 'marcus.stone@artfolio.com',
    bio: 'Sculpture and installation artist pushing boundaries of spatial perception. Working with sustainable materials and exploring environmental consciousness through art.',
    location: 'Berlin, Germany',
    website: 'https://marcusstone-sculptures.com',
    image: 'https://picsum.photos/400/400?random=6',
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@artfolio.com',
    bio: 'Photographer capturing raw emotions and human stories. Specializing in street photography and documentary work. Published in multiple international magazines.',
    location: 'Kyoto, Japan',
    website: 'https://yukitanaka-photography.com',
    image: 'https://picsum.photos/400/400?random=7',
  },
  {
    name: 'Amara Okonkwo',
    email: 'amara.okonkwo@artfolio.com',
    bio: 'Contemporary textile artist celebrating African heritage and cultural narratives. Using traditional weaving techniques with modern design sensibilities.',
    location: 'Lagos, Nigeria',
    website: 'https://amaraokonkwo-textiles.com',
    image: 'https://picsum.photos/400/400?random=8',
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

// Image URLs from Picsum (reliable placeholder service)
const imageUrls = [
  'https://picsum.photos/1200/900?random=10',
  'https://picsum.photos/1200/900?random=11',
  'https://picsum.photos/1200/900?random=12',
  'https://picsum.photos/1200/900?random=13',
  'https://picsum.photos/1200/900?random=14',
  'https://picsum.photos/1200/900?random=15',
  'https://picsum.photos/1200/900?random=16',
  'https://picsum.photos/1200/900?random=17',
  'https://picsum.photos/1200/900?random=18',
  'https://picsum.photos/1200/900?random=19',
  'https://picsum.photos/1200/900?random=20',
  'https://picsum.photos/1200/900?random=21',
  'https://picsum.photos/1200/900?random=22',
  'https://picsum.photos/1200/900?random=23',
  'https://picsum.photos/1200/900?random=24',
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

async function generateSeedData() {
  try {
    console.log('📊 Generating realistic seed data...\n')

    // Generate seed data structure
    const seedData = {
      users: artistProfiles.map((profile, index) => ({
        _id: `user_${index + 1}`,
        ...profile,
        emailVerified: new Date().toISOString(),
        artworks: [] as string[],
        likes: [] as string[],
        comments: [] as string[],
      })),
      images: [] as any[],
      artworks: [] as any[],
      comments: [] as any[],
      likes: [] as any[],
    }

    // Generate artworks and images
    let imageId = 0
    artworkTemplates.forEach((template, artworkIndex) => {
      const artistIndex = artworkIndex % artistProfiles.length
      const image = {
        _id: `image_${imageId + 1}`,
        url: imageUrls[artworkIndex % imageUrls.length],
        alt: template.title,
        filename: `${template.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        mimeType: 'image/jpeg',
        width: 1200,
        height: 900,
      }
      seedData.images.push(image)

      const viewCount = Math.floor(Math.random() * 8000) + 150
      const likeCount = Math.floor(viewCount * (Math.random() * 0.2 + 0.05))
      const commentCount = Math.floor(likeCount * (Math.random() * 0.4))

      const artwork = {
        _id: `artwork_${artworkIndex + 1}`,
        title: template.title,
        description: template.description,
        tags: template.tags,
        author: `user_${artistIndex + 1}`,
        images: [image._id],
        isPublished: true,
        viewCount,
        likeCount,
        commentCount,
        likes: [] as string[],
        comments: [] as string[],
      }

      seedData.artworks.push(artwork)
      seedData.users[artistIndex].artworks.push(artwork._id)
      imageId++
    })

    // Generate comments
    let commentId = 0
    seedData.artworks.forEach(artwork => {
      const commentCount = artwork.commentCount
      for (let i = 0; i < commentCount; i++) {
        let randomUserIndex = Math.floor(Math.random() * artistProfiles.length)
        if (randomUserIndex === parseInt(artwork.author.split('_')[1]) - 1) {
          randomUserIndex = (randomUserIndex + 1) % artistProfiles.length
        }

        const comment = {
          _id: `comment_${commentId + 1}`,
          content: commentExamples[Math.floor(Math.random() * commentExamples.length)],
          author: `user_${randomUserIndex + 1}`,
          artwork: artwork._id,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        }

        seedData.comments.push(comment)
        artwork.comments.push(comment._id)
        seedData.users[randomUserIndex].comments.push(comment._id)
        commentId++
      }
    })

    // Generate likes
    let likeId = 0
    seedData.artworks.forEach(artwork => {
      const likeCount = artwork.likeCount
      const usedUsers = new Set<number>()

      for (let i = 0; i < likeCount; i++) {
        let randomUserIndex = Math.floor(Math.random() * artistProfiles.length)
        let attempts = 0

        while (
          (usedUsers.has(randomUserIndex) ||
            randomUserIndex === parseInt(artwork.author.split('_')[1]) - 1) &&
          attempts < 5
        ) {
          randomUserIndex = Math.floor(Math.random() * artistProfiles.length)
          attempts++
        }

        if (
          usedUsers.has(randomUserIndex) ||
          randomUserIndex === parseInt(artwork.author.split('_')[1]) - 1
        ) {
          continue
        }

        usedUsers.add(randomUserIndex)

        const like = {
          _id: `like_${likeId + 1}`,
          user: `user_${randomUserIndex + 1}`,
          artwork: artwork._id,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        }

        seedData.likes.push(like)
        artwork.likes.push(like._id)
        seedData.users[randomUserIndex].likes.push(like._id)
        likeId++
      }
    })

    // Save to JSON file
    const seedFilePath = path.join(__dirname, 'seed-data.json')
    fs.writeFileSync(seedFilePath, JSON.stringify(seedData, null, 2))

    console.log('✅ Seed data generated successfully!')
    console.log('\n📊 Summary:')
    console.log(`  👥 Artists: ${seedData.users.length}`)
    console.log(`  🎨 Artworks: ${seedData.artworks.length}`)
    console.log(`  📸 Images: ${seedData.images.length}`)
    console.log(`  💬 Comments: ${seedData.comments.length}`)
    console.log(`  ❤️  Likes: ${seedData.likes.length}`)
    console.log(`\n📁 Seed data saved to: ${seedFilePath}`)
    console.log('\n🔧 Next steps:')
    console.log('  1. Ensure MongoDB Atlas IP whitelist includes your IP')
    console.log('  2. Check MongoDB connection string in .env.local')
    console.log('  3. Run: npm run db:seed')
  } catch (error) {
    console.error('❌ Error generating seed data:', error)
    process.exit(1)
  }
}

generateSeedData()
