'use client'

import { useEffect, useRef } from 'react'
import { usePerformanceMonitoring } from '@/hooks/usePerformance'

declare global {
  interface Window {
    va?: (command: string, payload?: Record<string, unknown>) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function PerformanceMonitor() {
  const lastMetricsLogRef = useRef<number>(0)
  
  const { collectMetrics } = usePerformanceMonitoring({
    enabled: true,
    onMetricsCollected: (metrics) => {
      // Throttle console logging to avoid spam
      const now = Date.now()
      if (now - lastMetricsLogRef.current > 5000) { // Log max once per 5 seconds
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metrics)
        }
        lastMetricsLogRef.current = now
      }

      // Send custom metrics to analytics
      if (typeof window !== 'undefined') {
        // Send to Vercel Analytics
        if (window.va) {
          window.va('event', {
            name: 'custom-performance-metrics',
            value: metrics,
          })
        }

        // Send to Google Analytics if available
        if (window.gtag) {
          Object.entries(metrics).forEach(([key, value]) => {
            window.gtag!('event', 'performance_metric', {
              metric_name: key,
              metric_value: value,
              page_location: window.location.href
            })
          })
        }
      }
    }
  })

  useEffect(() => {
    // Web Vitals tracking for Vercel Analytics
    const reportWebVitals = (metric: {
      name: string
      value: number
      id: string
    }) => {
      // Send to Vercel Analytics if available
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
          name: 'web-vitals',
          value: {
            name: metric.name,
            value: metric.value,
            id: metric.id,
          },
        })
      }

      // Also send to Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          web_vitals_metric_name: metric.name,
          web_vitals_metric_value: metric.value,
          web_vitals_metric_id: metric.id,
          page_location: window.location.href
        })
      }
    }

    // Import web-vitals dynamically
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(reportWebVitals)
      webVitals.onFID(reportWebVitals)
      webVitals.onFCP(reportWebVitals)
      webVitals.onLCP(reportWebVitals)
      webVitals.onTTFB(reportWebVitals)
    })

    // Track page visibility changes for performance
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible again, collect fresh metrics
        setTimeout(() => collectMetrics(), 100)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Track navigation timing
    const handleNavigation = () => {
      setTimeout(() => collectMetrics(), 100)
    }

    window.addEventListener('popstate', handleNavigation)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [collectMetrics])

  return null
}