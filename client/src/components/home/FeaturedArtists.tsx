'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Palette, User } from 'lucide-react'
import { LoadingGrid } from '@/components/Loading'
import { QueryError, EmptyState } from '@/components/Error'

interface FeaturedArtistsProps {
  className?: string
}

interface Artist {
  _id: string
  name: string
  username: string
  image?: string
  bio?: string
  artworkCount: number
}

export function FeaturedArtists({ className }: FeaturedArtistsProps) {
  const { data: stats, isLoading, error, refetch } = useQuery({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats')
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Artists</h2>
            <p className="text-zinc-400">Discover talented creators on our platform</p>
          </div>
          <LoadingGrid />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Artists</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover talented creators showcasing their work on Artfolio
            </p>
          </div>
          <QueryError error={error} onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  const artists = stats?.featuredArtists || []

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Artists</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover talented creators showcasing their work on Artfolio
          </p>
        </div>

        {artists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist: Artist) => (
              <Link key={artist._id} href={`/artist/${artist.username || artist._id}`}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <AvatarImage src={artist.image} alt={artist.name} />
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-zinc-300 transition-colors">
                      {artist.name}
                    </h3>

                    <p className="text-zinc-400 text-sm mb-3">@{artist.username}</p>

                    <div className="flex items-center justify-center gap-2">
                      <Palette className="w-4 h-4 text-zinc-500" />
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {artist.artworkCount} artworks
                      </Badge>
                    </div>

                    {artist.bio && (
                      <p className="text-zinc-500 text-sm mt-3 line-clamp-2">
                        {artist.bio}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No artists yet"
            description="Be the first to join our creative community!"
            icon={User}
          />
        )}

        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            View All Artists
          </Link>
        </div>
      </div>
    </section>
  )
}