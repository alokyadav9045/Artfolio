import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QueryErrorProps {
  error: Error | string
  onRetry?: () => void
  className?: string
}

export function QueryError({ error, onRetry, className = '' }: QueryErrorProps) {
  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <Card className={`bg-red-900/20 border-red-800 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="w-5 h-5" />
          Failed to load data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-zinc-300">
          We couldn&apos;t load the requested data. This might be a temporary issue.
        </p>
        <details className="text-sm text-zinc-400">
          <summary className="cursor-pointer hover:text-zinc-300">
            Error details
          </summary>
          <pre className="mt-2 p-2 bg-zinc-900 rounded text-xs overflow-auto">
            {errorMessage}
          </pre>
        </details>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-800 text-red-400 hover:bg-red-800/20"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <Card className={`bg-zinc-900/50 border-zinc-800 ${className}`}>
      <CardContent className="p-12 text-center">
        {Icon && <Icon className="w-12 h-12 text-zinc-600 mx-auto mb-4" />}
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-zinc-400 mb-6">{description}</p>
        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}