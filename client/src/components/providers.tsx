'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { useSuppressHydrationWarning } from '@/hooks/useSuppressHydrationWarning'

function HydrationWarningSupressor() {
  useSuppressHydrationWarning()
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Better caching strategy
        staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
        gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (error instanceof Error && 'status' in error) {
            const status = (error as any).status
            if (status >= 400 && status < 500) return false
          }
          // Retry up to 3 times for other errors
          return failureCount < 3
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Enable background refetching but less frequently
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false, // Prevent unnecessary refetches on mount
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        refetchInterval={15 * 60} // Refetch session every 15 minutes instead of 5
        refetchOnWindowFocus={false} // Disable refetch on window focus
        refetchWhenOffline={false} // Don't refetch when offline
      >
        <HydrationWarningSupressor />
        {children}
      </SessionProvider>
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}