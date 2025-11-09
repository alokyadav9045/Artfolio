import { NextResponse } from 'next/server'
import { Comment, Artwork } from '@/lib/models'
import { getCurrentUser } from '@/lib/auth'
import { withDatabase } from '@/lib/mongodb'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { artworkId, content, parentId } = await req.json()

  return await withDatabase(
    async () => {
      const comment = new Comment({
        content,
        user: user._id,
        artwork: artworkId,
        parentComment: parentId || undefined,
      })

      await comment.save()

      // Update artwork comment count
      await Artwork.findByIdAndUpdate(artworkId, { $inc: { commentCount: 1 } })

      // Populate author data
      await comment.populate('user', 'name username image')

      return NextResponse.json(comment, { status: 201 })
    },
    NextResponse.json(
      { error: 'Database connection unavailable. Cannot create comment.' },
      { status: 503 }
    )
  )
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const artworkId = url.searchParams.get('artworkId')
  if (!artworkId) return NextResponse.json({ error: 'artworkId required' }, { status: 400 })

  return await withDatabase(
    async () => {
      const comments = await Comment.find({ artwork: artworkId })
        .populate('user', 'name username image')
        .sort({ createdAt: 1 })

      return NextResponse.json(comments)
    },
    NextResponse.json([])
  )
}