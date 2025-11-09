'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag, TrendingUp } from 'lucide-react'
import { LoadingCard } from '@/components/Loading'
import { QueryError } from '@/components/Error'

interface CategoriesSectionProps {
  className?: string
}

interface TagData {
  _id: string
  count: number
}

export function CategoriesSection({ className }: CategoriesSectionProps) {
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
            <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
            <p className="text-zinc-400">Discover artworks by style and theme</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoadingCard />
            <LoadingCard />
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
            <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover artworks by style, theme, and technique
            </p>
          </div>
          <QueryError error={error} onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  const tags = stats?.popularTags || []

  const popularCategories = [
    'Digital Art', 'Photography', 'Painting', 'Illustration', 'Abstract',
    'Portrait', 'Landscape', 'Concept Art', 'Anime', 'Fan Art', 'Sketches'
  ]

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover artworks by style, theme, and technique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Tags */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 20).map((tag: TagData) => (
                    <Link key={tag._id} href={`/explore?tag=${encodeURIComponent(tag._id)}`}>
                      <Badge
                        variant="secondary"
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer transition-colors"
                      >
                        {tag._id} ({tag.count})
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">No tags available yet</p>
              )}
            </CardContent>
          </Card>

          {/* Category Grid */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-400" />
                Popular Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {popularCategories.map((category) => (
                  <Link key={category} href={`/explore?tag=${encodeURIComponent(category)}`}>
                    <div className="p-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-center cursor-pointer transition-colors">
                      <span className="text-zinc-300 text-sm font-medium">{category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Browse All Artworks
          </Link>
        </div>
      </div>
    </section>
  )
}