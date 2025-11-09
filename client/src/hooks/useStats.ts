import { useQuery } from '@tanstack/react-query'

interface StatsData {
  stats: {
    totalArtworks: number
    totalArtists: number
    totalComments: number
    totalLikes: number
  }
  trendingArtworks: any[]
  featuredArtists: any[]
  popularTags: any[]
  recentActivity: any[]
}

export function useStats() {
  return useQuery<StatsData>({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats', {
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      // Handle rate limiting gracefully
      if (res.status === 429) {
        console.warn('Rate limited on stats fetch, using fallback data')
        return {
          stats: {
            totalArtworks: 0,
            totalArtists: 0,
            totalComments: 0,
            totalLikes: 0,
          },
          trendingArtworks: [],
          featuredArtists: [],
          popularTags: [],
          recentActivity: [],
        }
      }

      if (!res.ok) {
        if (res.status >= 500) {
          // Server error - return fallback data
          return {
            stats: {
              totalArtworks: 0,
              totalArtists: 0,
              totalComments: 0,
              totalLikes: 0,
            },
            trendingArtworks: [],
            featuredArtists: [],
            popularTags: [],
            recentActivity: [],
          }
        }
        throw new Error('Failed to fetch stats')
      }

      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error instanceof Error && 'status' in error) {
        const status = (error as any).status
        if (status >= 400 && status < 500) return false
      }
      return failureCount < 2
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  })
}