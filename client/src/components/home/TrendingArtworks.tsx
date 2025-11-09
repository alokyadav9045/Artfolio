'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { CardContent } from '@/components/ui/card'
import { AnimatedCard } from '@/components/ui/animated-card'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, TrendingUp, User } from 'lucide-react'
import { LoadingGrid } from '@/components/Loading'
import { QueryError, EmptyState } from '@/components/Error'

interface TrendingArtworksProps {
  className?: string
}

interface Artwork {
  _id: string
  title: string
  slug: string
  images: Array<{
    url: string
    alt?: string
  }>
  author: {
    name: string
    username: string
    image?: string
  }
  likeCount: number
  commentCount: number
  tags: string[]
  createdAt: string
}

export function TrendingArtworks({ className }: TrendingArtworksProps) {
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
            <h2 className="text-3xl font-bold text-white mb-4">Trending Artworks</h2>
            <p className="text-zinc-400">Popular creations from the last 30 days</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Trending Artworks</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover the most popular creations from the last 30 days
            </p>
          </div>
          <QueryError error={error} onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  const artworks = stats?.trendingArtworks || []

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trending Artworks</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover the most popular creations from the last 30 days
          </p>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork: Artwork, index: number) => {
              const mainImage = artwork.images[0]

              return (
                <AnimatedCard key={artwork._id} delay={index * 100}>
                  <Link href={`/artwork/${artwork._id}`} className="block">
                    <div className="aspect-square relative overflow-hidden">
                      {mainImage ? (
                        <Image
                          src={mainImage.url}
                          alt={mainImage.alt || artwork.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                          <User className="w-12 h-12 text-zinc-600" />
                        </div>
                      )}

                      {/* Trending Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-600 hover:bg-red-700">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    <Link href={`/artwork/${artwork._id}`}>
                      <h3 className="font-semibold text-white truncate hover:text-zinc-300 transition-colors mb-1">
                        {artwork.title}
                      </h3>
                    </Link>

                    <Link
                      href={`/artist/${artwork.author.username}`}
                      className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors mb-3 block"
                    >
                      {artwork.author.name || 'Anonymous'}
                    </Link>

                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{artwork.likeCount || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{artwork.commentCount || 0}</span>
                        </div>
                      </div>
                    </div>

                    {artwork.tags && artwork.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {artwork.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {tag}
                          </Badge>
                        ))}
                        {artwork.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            +{artwork.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No trending artworks yet"
            description="Check back later to see popular creations!"
            icon={TrendingUp}
          />
        )}

        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            View All Artworks
          </Link>
        </div>
      </div>
    </section>
  )
}