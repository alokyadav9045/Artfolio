'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { LoadingCard } from '@/components/Loading'
import { QueryError, EmptyState } from '@/components/Error'
import { useStats } from '@/hooks/useStats'

interface RecentActivityProps {
  className?: string
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

  const activities = stats?.recentActivity || []

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

        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Activity Icon */}
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-zinc-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm mb-1">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <span>{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>

                    {/* Activity Type Badge */}
                    <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                      {activity.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No recent activity"
            description="Activity will appear here as users interact with the platform!"
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