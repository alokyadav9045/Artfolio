'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Clock, User } from 'lucide-react'
import { LoadingCard } from '@/components/Loading'
import { QueryError, EmptyState } from '@/components/Error'
import { useStats } from '@/hooks/useStats'

interface RecentActivityProps {
  className?: string
}

interface Artwork {
  _id: string
  title: string
  images: Array<{
    url: string
    alt?: string
  }>
  author: {
    name: string
    username: string
    image?: string
  }
  createdAt: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  const { data: stats, isLoading, error, refetch } = useStats()

  if (isLoading) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recent Activity</h2>
            <p className="text-zinc-400">Latest artworks added to the platform</p>
          </div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recent Activity</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Stay updated with the latest artworks added to our community
            </p>
          </div>
          <QueryError error={error} onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  const artworks = stats?.recentActivity || []

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Recent Activity</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Stay updated with the latest artworks added to our community
          </p>
        </div>

        {artworks.length > 0 ? (
          <div className="space-y-4">
            {artworks.map((artwork: Artwork) => {
              const mainImage = artwork.images[0]

              return (
                <Link key={artwork._id} href={`/artwork/${artwork._id}`}>
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Artwork Thumbnail */}
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                          {mainImage ? (
                            <Image
                              src={mainImage.url}
                              alt={mainImage.alt || artwork.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-6 h-6 text-zinc-600" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={artwork.author.image} alt={artwork.author.name} />
                              <AvatarFallback className="text-xs">
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-white font-medium text-sm">
                              {artwork.author.name}
                            </span>
                            <span className="text-zinc-500 text-sm">uploaded</span>
                          </div>

                          <h3 className="text-white font-medium truncate group-hover:text-zinc-300 transition-colors mb-1">
                            {artwork.title}
                          </h3>

                          <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(artwork.createdAt)}</span>
                          </div>
                        </div>

                        {/* New Badge */}
                        <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                          New
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No recent activity"
            description="Be the first to upload an artwork and start the activity!"
            icon={Clock}
          />
        )}

        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Explore All Artworks
          </Link>
        </div>
      </div>
    </section>
  )
}