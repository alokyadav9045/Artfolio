'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Users, MessageCircle, Heart } from 'lucide-react'
import { LoadingStats } from '@/components/Loading'
import { QueryError } from '@/components/Error'
import { useStats } from '@/hooks/useStats'

interface StatsSectionProps {
  className?: string
}

export function StatsSection({ className }: StatsSectionProps) {
  const { data: stats, isLoading, error, refetch } = useStats()

  if (isLoading) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Artfolio in Numbers</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Join a thriving community of creators and art enthusiasts
            </p>
          </div>
          <LoadingStats />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Artfolio in Numbers</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Join a thriving community of creators and art enthusiasts
            </p>
          </div>
          <QueryError error={error} onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  const statCards = [
    {
      title: 'Total Artworks',
      value: stats?.stats?.totalArtworks || 0,
      icon: Palette,
      color: 'text-purple-400',
    },
    {
      title: 'Artists',
      value: stats?.stats?.totalArtists || 0,
      icon: Users,
      color: 'text-blue-400',
    },
    {
      title: 'Comments',
      value: stats?.stats?.totalComments || 0,
      icon: MessageCircle,
      color: 'text-green-400',
    },
    {
      title: 'Likes',
      value: stats?.stats?.totalLikes || 0,
      icon: Heart,
      color: 'text-red-400',
    },
  ]

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Artfolio in Numbers</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Join a thriving community of creators and art enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}