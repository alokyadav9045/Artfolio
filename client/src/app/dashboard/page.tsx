'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Plus, Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'
import { Artwork } from '@/types'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')

  const { data: userArtworks, isLoading } = useQuery({
    queryKey: ['user-artworks', filter],
    queryFn: async () => {
      const params = new URLSearchParams({ author: 'current' })
      if (filter === 'published') params.set('published', 'true')
      if (filter === 'drafts') params.set('published', 'false')

      const res = await fetch(`/api/artworks?${params}`)
      if (!res.ok) throw new Error('Failed to fetch artworks')
      return res.json()
    },
    enabled: !!session?.user,
  })

  // Calculate stats from MongoDB data
  const stats = {
    totalArtworks: userArtworks?.data?.length || 0,
    totalViews: 0, // TODO: implement view tracking
    totalLikes: userArtworks?.data?.reduce((sum: number, artwork: Artwork) => sum + (artwork.likeCount || 0), 0) || 0,
    totalComments: userArtworks?.data?.reduce((sum: number, artwork: Artwork) => sum + (artwork.commentCount || 0), 0) || 0,
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Creator Dashboard</h1>
              <p className="text-zinc-400">Manage your artworks and track your progress</p>
            </div>
            <Link href="/artwork/create">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Artwork
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Artworks</CardTitle>
                <Eye className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalArtworks}</div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalLikes}</div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Comments</CardTitle>
                <MessageCircle className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalComments}</div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalArtworks > 0 ? Math.round(((stats.totalLikes + stats.totalComments) / stats.totalArtworks) * 100) / 100 : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Artworks Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Artworks</h2>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'all' ? 'bg-zinc-700 hover:bg-zinc-600' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'published' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'published' ? 'bg-zinc-700 hover:bg-zinc-600' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
                  onClick={() => setFilter('published')}
                >
                  Published
                </Button>
                <Button
                  variant={filter === 'drafts' ? 'default' : 'outline'}
                  size="sm"
                  className={filter === 'drafts' ? 'bg-zinc-700 hover:bg-zinc-600' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
                  onClick={() => setFilter('drafts')}
                >
                  Drafts
                </Button>
              </div>
            </div>

            {userArtworks?.data?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userArtworks.data.map((artwork: Artwork) => (
                  <div key={artwork.id} className="relative">
                    <ArtworkCard artwork={artwork} />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={artwork.isPublished ? 'default' : 'secondary'}
                        className={artwork.isPublished ? 'bg-green-600' : 'bg-zinc-600'}
                      >
                        {artwork.isPublished ? 'published' : 'draft'}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                      <Link href={`/artwork/${artwork.id}/edit`}>
                        <Button size="sm" variant="secondary" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-zinc-500 mb-4">
                  <Eye className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">No artworks yet</p>
                </div>
                <Link href="/artwork/create">
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Artwork
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Plus className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Create New Artwork</h4>
                  <p className="text-sm text-zinc-400">Upload and share your latest creation</p>
                </CardContent>
              </Card>

              <Link href="/dashboard/analytics">
                <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-1">View Analytics</h4>
                    <p className="text-sm text-zinc-400">Track your artwork performance</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/comments">
                <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-1">Manage Comments</h4>
                    <p className="text-sm text-zinc-400">Respond to your audience</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}