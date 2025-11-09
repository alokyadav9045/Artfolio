import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/lib/models'
import dbConnect from '@/lib/mongodb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react'
import { ArtworkGrid } from '@/components/artwork/ArtworkGrid'

interface ArtistProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ArtistProfilePage({ params }: ArtistProfilePageProps) {
  await dbConnect()

  const { username } = await params
  const user = await User.findOne({ username })
    .populate({
      path: 'artworks',
      match: { isPublished: true },
      populate: { path: 'images' },
      options: { sort: { createdAt: -1 } }
    })

  if (!user) {
    notFound()
  }

  const totalArtworks = user.artworks?.length || 0
  const totalLikes = user.artworks?.reduce((sum: number, artwork: { likeCount?: number }) => sum + (artwork.likeCount || 0), 0) || 0
  const totalComments = user.artworks?.reduce((sum: number, artwork: { commentCount?: number }) => sum + (artwork.commentCount || 0), 0) || 0

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'Artist'}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-zinc-700"
                />
              ) : (
                <div className="w-30 h-30 bg-zinc-700 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-zinc-300 font-bold">
                    {(user.name || user.email)?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{user.name || 'Anonymous Artist'}</h1>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                  artist
                </Badge>
              </div>

              {user.bio && (
                <p className="text-zinc-300 mb-4 max-w-2xl">{user.bio}</p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 mb-6">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer"
                       className="hover:text-zinc-300 transition-colors">
                      Website
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalArtworks}</div>
                  <div className="text-sm text-zinc-400">Artworks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalLikes}</div>
                  <div className="text-sm text-zinc-400">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalComments}</div>
                  <div className="text-sm text-zinc-400">Comments</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Follow
              </Button>
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Gallery</h2>
          <p className="text-zinc-400">Explore {user.name || 'this artist'}&apos;s creative works</p>
        </div>

        {user.artworks && user.artworks.length > 0 ? (
          <ArtworkGrid />
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">No artworks yet</p>
            <Link href="/artwork/create">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                Create First Artwork
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}