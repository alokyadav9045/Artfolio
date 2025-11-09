'use client'

import { useEffect, useCallback } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

interface UsePerformanceMonitoringOptions {
  enabled?: boolean
  onMetricsCollected?: (metrics: PerformanceMetrics) => void
}

export function usePerformanceMonitoring({
  enabled = true,
  onMetricsCollected
}: UsePerformanceMonitoringOptions = {}) {
  const collectMetrics = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    const metrics: PerformanceMetrics = {}

    // Use Performance Observer API for modern browsers
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metrics.fcp = lastEntry.startTime
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metrics.lcp = lastEntry.startTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEventTiming
        metrics.fid = lastEntry.processingStart - lastEntry.startTime
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries() as LayoutShift[]
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        metrics.cls = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }

    // Time to First Byte (TTFB)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      metrics.ttfb = navigation.responseStart - navigation.requestStart
    }

    // Call the callback with collected metrics
    if (onMetricsCollected && Object.keys(metrics).length > 0) {
      onMetricsCollected(metrics)
    }

    return metrics
  }, [enabled, onMetricsCollected])

  useEffect(() => {
    if (!enabled) return

    // Collect metrics on page load
    const timer = setTimeout(() => {
      collectMetrics()
    }, 0)

    // Also collect metrics when the page becomes visible (e.g., tab switch)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        collectMetrics()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled, collectMetrics])

  return { collectMetrics }
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Log slow renders (> 16ms for 60fps)
      if (renderTime > 16) {
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`)
      }

      // Send to analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'component_render_time', {
          component_name: componentName,
          render_time: renderTime,
          page_location: window.location.href
        })
      }
    }
  }, [componentName])
}

// Hook for measuring user interaction performance
export function useInteractionPerformance(actionName: string) {
  const startInteraction = useCallback(() => {
    return performance.now()
  }, [])

  const endInteraction = useCallback((startTime: number, metadata?: Record<string, unknown>) => {
    const endTime = performance.now()
    const duration = endTime - startTime

    // Log slow interactions (> 100ms)
    if (duration > 100) {
      console.warn(`${actionName} took ${duration.toFixed(2)}ms`)
    }

    // Send to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'user_interaction_time', {
        action_name: actionName,
        duration: duration,
        ...metadata
      })
    }

    return duration
  }, [actionName])

  return { startInteraction, endInteraction }
}