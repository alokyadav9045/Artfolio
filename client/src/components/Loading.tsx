import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <Loader2 className={`animate-spin text-zinc-400 ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingCardProps {
  className?: string
  rows?: number
}

export function LoadingCard({ className = '', rows = 3 }: LoadingCardProps) {
  return (
    <Card className={`bg-zinc-900/50 border-zinc-800 ${className}`}>
      <CardContent className="p-6">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-3/4 h-4 bg-zinc-700 rounded"></div>
              <div className="w-1/4 h-4 bg-zinc-700 rounded"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
  children?: React.ReactNode
}

export function LoadingGrid({ count = 6, className = '', children }: LoadingGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="w-16 h-16 bg-zinc-700 rounded-full mx-auto"></div>
              <div className="h-4 bg-zinc-700 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-zinc-700 rounded w-1/2 mx-auto"></div>
              {children}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface LoadingStatsProps {
  count?: number
  className?: string
}

export function LoadingStats({ count = 4, className = '' }: LoadingStatsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-zinc-700 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}