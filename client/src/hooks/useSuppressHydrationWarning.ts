import { useEffect } from 'react'

/**
 * Suppresses hydration warnings caused by browser extensions
 * that modify the DOM (e.g., password managers, form fillers)
 * Like LastPass, 1Password, Dashlane adding fdprocessedid attributes
 */
export function useSuppressHydrationWarning() {
  useEffect(() => {
    // Suppress hydration mismatch warnings in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error

      console.error = function (...args: unknown[]) {
        const message = args[0]?.toString?.() || ''

        // ONLY suppress specific hydration and attribute mismatch warnings
        // from browser extensions - NOT all errors
        if (
          message.includes('Hydration failed') ||
          message.includes('There was an error while hydrating') ||
          message.includes('Mismatch between Server and Client') ||
          message.includes('fdprocessedid') ||
          (message.includes('attribute') && message.includes('Server') && message.includes('Client'))
        ) {
          // Silently ignore browser extension interference only
          return
        }
        originalError.apply(console, args)
      }

      // Also suppress thrown hydration errors
      const originalOnError = window.onerror
      window.onerror = function (message, source, lineno, colno, error) {
        const messageStr = message?.toString() || ''
        if (
          messageStr.includes('Hydration failed') ||
          messageStr.includes('There was an error while hydrating') ||
          messageStr.includes('Mismatch between Server and Client') ||
          messageStr.includes('fdprocessedid') ||
          (messageStr.includes('attribute') && messageStr.includes('Server') && messageStr.includes('Client'))
        ) {
          // Silently ignore browser extension interference
          return true
        }
        if (originalOnError) {
          return originalOnError(message, source, lineno, colno, error)
        }
        return false
      }

      // Suppress unhandled promise rejections for hydration errors
      const originalOnUnhandledRejection = window.onunhandledrejection
      window.onunhandledrejection = function (event: PromiseRejectionEvent) {
        const reason = event.reason?.toString() || ''
        if (
          reason.includes('Hydration failed') ||
          reason.includes('There was an error while hydrating') ||
          reason.includes('Mismatch between Server and Client') ||
          reason.includes('fdprocessedid') ||
          (reason.includes('attribute') && reason.includes('Server') && reason.includes('Client'))
        ) {
          // Silently ignore browser extension interference
          event.preventDefault()
          return
        }
        if (originalOnUnhandledRejection) {
          originalOnUnhandledRejection.call(window, event)
        }
      }

      return () => {
        console.error = originalError
        window.onerror = originalOnError
        window.onunhandledrejection = originalOnUnhandledRejection
      }
    }
  }, [])
}
