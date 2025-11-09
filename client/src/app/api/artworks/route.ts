import { NextResponse } from 'next/server'
import { Artwork, Image } from '@/lib/models'
import { getCurrentUser } from '@/lib/auth'
import { withDatabase } from '@/lib/mongodb'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get('page') ?? 1)
  const q = url.searchParams.get('q') ?? ''
  const tag = url.searchParams.get('tag') ?? ''
  const author = url.searchParams.get('author') ?? ''
  const published = url.searchParams.get('published') ?? ''
  const take = 12
  const skip = (page - 1) * take

  const where: Record<string, unknown> = {}

  // Handle author filtering
  if (author === 'current') {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    where.author = user._id
  } else if (author) {
    // If author is a specific user ID or username, you could add logic here
    where.author = author
  } else {
    // Only show published artworks for public requests
    where.isPublished = true
  }

  // Handle published filter (overrides the default for author=current)
  if (published === 'true') {
    where.isPublished = true
  } else if (published === 'false') {
    where.isPublished = false
  }

  if (q) {
    where.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ]
  }

  if (tag) {
    where.tags = { $in: [new RegExp(tag, 'i')] }
  }

  return await withDatabase(
    async () => {
      const [artworks, total] = await Promise.all([
        Artwork.find(where)
          .populate('images')
          .populate('author', 'id name username image')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(take)
          .lean(),
        Artwork.countDocuments(where),
      ])

      // Transform MongoDB documents to match frontend types
      const transformedArtworks = artworks.map((artwork: Record<string, any>) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const transformed = {
          id: artwork._id.toString(),
          title: artwork.title,
          slug: artwork.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          description: artwork.description,
          authorId: artwork.author._id.toString(),
          author: {
            id: artwork.author._id.toString(),
            name: artwork.author.name,
            username: artwork.author.username,
            image: artwork.author.image,
          },
          images: artwork.images.map((img: Record<string, any>) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
            id: img._id.toString(),
            url: img.url,
            width: img.width,
            height: img.height,
            alt: img.alt,
            artworkId: artwork._id.toString(),
            order: img.order || 0,
          })),
          tags: artwork.tags || [],
          likeCount: artwork.likeCount || 0,
          commentCount: artwork.commentCount || 0,
          isPublished: artwork.isPublished,
          createdAt: artwork.createdAt,
          updatedAt: artwork.updatedAt,
          publishedAt: artwork.isPublished ? artwork.createdAt : null,
        }
        return transformed
      })

      return NextResponse.json({ data: transformedArtworks, meta: { total, page, perPage: take } })
    },
    // Fallback data when database is unavailable
    NextResponse.json({
      data: [],
      meta: { total: 0, page, perPage: take },
      message: 'Database connection unavailable. Showing empty results.'
    })
  )
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, description, images = [], tags = [], isPublished = false } = body

  return await withDatabase(
    async () => {
      // Create artwork
      const artwork = new Artwork({
        title,
        description,
        tags,
        author: user._id,
        isPublished,
        images: [],
      })

      // Create images
      if (images.length > 0) {
        const imageDocs = await Image.insertMany(
          images.map((imgUrl: string, idx: number) => ({
            url: imgUrl,
            filename: `artwork-image-${idx}`,
            size: 0, // You might want to calculate this
            mimeType: 'image/jpeg', // You might want to detect this
            artwork: artwork._id,
            uploadedBy: user._id,
          }))
        )
        artwork.images = imageDocs.map(img => img._id)
      }

      await artwork.save()

      // Populate the response
      await artwork.populate('images')
      await artwork.populate('author', 'id name username image')

      return NextResponse.json(artwork, { status: 201 })
    },
    // Fallback when database is unavailable
    NextResponse.json(
      { error: 'Database connection unavailable. Cannot create artwork.' },
      { status: 503 }
    )
  )
}