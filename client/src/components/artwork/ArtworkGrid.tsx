'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { ArtworkCard } from './ArtworkCard'
import { useInfiniteArtworks } from '@/hooks/useArtworks'
import { Artwork } from '@/types'

interface ArtworkGridProps {
  search?: string
}

export function ArtworkGrid({ search }: ArtworkGridProps) {
  const { ref, inView } = useInView()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteArtworks(search)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isLoading) return <div className="text-white text-center py-8">Loading artworks...</div>
  if (isError) return <div className="text-red-500 text-center py-8">Error: {error?.message}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.pages.map((page, pageIndex) => (
        <div key={`page-${pageIndex}`} style={{ display: 'contents' }}>
          {page.data.map((artwork: Artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ))}

      <div ref={ref} className="col-span-full flex justify-center py-8">
        {isFetchingNextPage && <div className="text-zinc-400">Loading more...</div>}
        {!hasNextPage && data?.pages[0]?.data.length > 0 && (
          <div className="text-zinc-500">No more artworks</div>
        )}
      </div>
    </div>
  )
}