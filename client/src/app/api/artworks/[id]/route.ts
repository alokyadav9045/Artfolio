import { NextResponse } from 'next/server'
import { Artwork, Comment, Like, Image } from '@/lib/models'
import { getCurrentUser } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()

  const { id } = await params
  const artwork = await Artwork.findById(id)
    .populate('images')
    .populate('author')
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'name username image' },
      options: { sort: { createdAt: 1 } }
    })
    .populate('likes')

  if (!artwork) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Get counts
  const likeCount = await Like.countDocuments({ artwork: id })
  const commentCount = await Comment.countDocuments({ artwork: id })

  // Transform the data to match frontend expectations
  const transformedArtwork = {
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
    likeCount: likeCount,
    commentCount: commentCount,
    isPublished: artwork.isPublished,
    createdAt: artwork.createdAt,
    updatedAt: artwork.updatedAt,
    publishedAt: artwork.isPublished ? artwork.createdAt : null,
    comments: artwork.comments.map((comment: Record<string, any>) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      id: comment._id.toString(),
      content: comment.content,
      userId: comment.user._id.toString(),
      artworkId: artwork._id.toString(),
      author: {
        id: comment.user._id.toString(),
        name: comment.user.name,
        username: comment.user.username,
        image: comment.user.image,
      },
      createdAt: comment.createdAt,
      editedAt: comment.editedAt,
    })),
    likes: artwork.likes.map((like: Record<string, any>) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      id: like._id.toString(),
      userId: like.userId.toString(),
      artworkId: artwork._id.toString(),
      createdAt: like.createdAt,
    })),
  }

  return NextResponse.json(transformedArtwork)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()

  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { title, description, images = [], tags = [], isPublished } = body

  const existing = await Artwork.findById(id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (existing.author.toString() !== user._id.toString() && user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Update artwork
  const updateData: Partial<Record<string, unknown>> & { images?: string[] } = {
    title,
    description,
    tags,
    isPublished,
  }

  // Handle images if provided
  if (images.length > 0) {
    // Delete existing images
    await Image.deleteMany({ artwork: id })

    // Create new images
    const imageDocs = await Image.insertMany(
      images.map((imgUrl: string, idx: number) => ({
        url: imgUrl,
        filename: `artwork-image-${idx}`,
        size: 0,
        mimeType: 'image/jpeg',
        artwork: id,
        uploadedBy: user._id,
      }))
    )
    updateData.images = imageDocs.map(img => img._id)
  }

  const updated = await Artwork.findByIdAndUpdate(id, updateData, { new: true })
    .populate('images')
    .populate('author', 'id name username image')

  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()

  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const artwork = await Artwork.findById(id)
  if (!artwork) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (artwork.author.toString() !== user._id.toString() && user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await Artwork.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}