import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useInfiniteArtworks(search?: string) {
  return useInfiniteQuery({
    queryKey: ['artworks', search],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({ page: pageParam.toString() })
      if (search) params.set('q', search)

      try {
        const res = await fetch(`/api/artworks?${params}`, {
          signal: AbortSignal.timeout(10000),
        })

        // Handle rate limiting gracefully
        if (res.status === 429) {
          console.warn('Rate limited on artworks fetch, using fallback data')
          return { data: [], meta: { page: pageParam, perPage: 12 } }
        }

        if (!res.ok) {
          if (res.status >= 500) {
            return { data: [], meta: { page: pageParam, perPage: 12 } }
          }
          throw new Error('Failed to fetch artworks')
        }
        return res.json()
      } catch (error) {
        if (error instanceof TypeError || (error instanceof Error && error.name === 'AbortError')) {
          console.warn('API connection error, using fallback data:', error.message)
          return { data: [], meta: { page: pageParam, perPage: 12 } }
        }
        throw error
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < lastPage.meta.perPage) return undefined
      return lastPage.meta.page + 1
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for artworks
    gcTime: 5 * 60 * 1000, // 5 minutes cache
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

export function useLikeArtwork() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (artworkId: string) => {
      try {
        const res = await fetch('/api/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ artworkId }),
          signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) throw new Error('Failed to toggle like')
        return res.json()
      } catch (error) {
        if (error instanceof TypeError) {
          console.warn('Like operation failed due to connection error:', error.message)
          throw new Error('Could not save like. Please check your connection.')
        }
        throw error
      }
    },
    onSuccess: (_, artworkId) => {
      // Invalidate and refetch artwork data
      queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] })
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
    },
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ artworkId, content }: { artworkId: string; content: string }) => {
      try {
        const res = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ artworkId, content }),
          signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) throw new Error('Failed to post comment')
        return res.json()
      } catch (error) {
        if (error instanceof TypeError) {
          console.warn('Comment operation failed due to connection error:', error.message)
          throw new Error('Could not post comment. Please check your connection.')
        }
        throw error
      }
    },
    onSuccess: (_, { artworkId }) => {
      queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] })
    },
  })
}