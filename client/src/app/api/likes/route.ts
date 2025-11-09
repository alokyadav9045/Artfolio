import { NextResponse } from 'next/server'
import { Like, Artwork } from '@/lib/models'
import { getCurrentUser } from '@/lib/auth'
import { withDatabase } from '@/lib/mongodb'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { artworkId } = await req.json()

  return await withDatabase(
    async () => {
      // Check if like already exists
      const existing = await Like.findOne({ user: user._id, artwork: artworkId })

      if (existing) {
        // Unlike: remove the like
        await Like.findByIdAndDelete(existing._id)

        // Update artwork like count
        await Artwork.findByIdAndUpdate(artworkId, { $inc: { likeCount: -1 } })

        return NextResponse.json({ liked: false })
      } else {
        // Like: create new like
        const like = new Like({ user: user._id, artwork: artworkId })
        await like.save()

        // Update artwork like count
        await Artwork.findByIdAndUpdate(artworkId, { $inc: { likeCount: 1 } })

        return NextResponse.json({ liked: true })
      }
    },
    NextResponse.json(
      { error: 'Database connection unavailable. Cannot toggle like.', liked: false },
      { status: 503 }
    )
  )
}