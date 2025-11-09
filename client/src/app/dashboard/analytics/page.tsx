'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Eye, Heart, MessageCircle, Calendar, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ArtworkAnalytics {
  id: string
  title: string
  views: number
  likes: number
  comments: number
  publishedAt: string
}

export default function AnalyticsPage() {
  // Mock analytics data - in production, fetch from API
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['user-analytics'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return {
        totalViews: 1250,
        totalLikes: 89,
        totalComments: 34,
        artworks: [
          {
            id: '1',
            title: 'Sunset Dreams',
            views: 450,
            likes: 25,
            comments: 12,
            publishedAt: '2025-11-01'
          },
          {
            id: '2',
            title: 'Urban Reflections',
            views: 320,
            likes: 18,
            comments: 8,
            publishedAt: '2025-10-28'
          },
          {
            id: '3',
            title: 'Fantasy Character',
            views: 480,
            likes: 46,
            comments: 14,
            publishedAt: '2025-10-25'
          }
        ],
        monthlyStats: [
          { month: 'Aug', views: 120, likes: 8, comments: 3 },
          { month: 'Sep', views: 280, likes: 15, comments: 7 },
          { month: 'Oct', views: 450, likes: 32, comments: 12 },
          { month: 'Nov', views: 400, likes: 34, comments: 12 }
        ]
      }
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics</h1>
              <p className="text-zinc-400">Track your artwork performance and audience engagement</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analytics?.totalViews?.toLocaleString()}</div>
              <p className="text-xs text-zinc-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analytics?.totalLikes?.toLocaleString()}</div>
              <p className="text-xs text-zinc-500">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analytics?.totalComments?.toLocaleString()}</div>
              <p className="text-xs text-zinc-500">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Chart Placeholder */}
        <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Chart visualization coming soon</p>
                <p className="text-sm">Monthly data: {analytics?.monthlyStats?.length} months tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Artworks */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing Artworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.artworks?.map((artwork: ArtworkAnalytics, index: number) => (
                <div key={artwork.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{artwork.title}</h4>
                      <p className="text-zinc-400 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Published {new Date(artwork.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-white font-medium">{artwork.views}</div>
                      <div className="text-zinc-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium">{artwork.likes}</div>
                      <div className="text-zinc-500">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium">{artwork.comments}</div>
                      <div className="text-zinc-500">Comments</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-zinc-900/50 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-green-400 font-medium">Great Performance!</h4>
                    <p className="text-zinc-300 text-sm">
                      Your artworks are gaining traction. Keep creating high-quality content to maintain this growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium">Engage with Your Audience</h4>
                    <p className="text-zinc-300 text-sm">
                      Responding to comments can increase engagement by up to 30%. Try replying to your top commenters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}