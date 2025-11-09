'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export default function ProtectedRoute({
  children,
  redirectTo = '/login',
  requireAuth = true
}: ProtectedRouteProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (requireAuth && status === 'unauthenticated') {
      router.push(redirectTo)
    }
  }, [status, router, redirectTo, requireAuth])

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mx-auto mb-4" />
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  // If authentication is required and user is not authenticated, don't render
  if (requireAuth && status === 'unauthenticated') {
    return null
  }

  return <>{children}</>
}