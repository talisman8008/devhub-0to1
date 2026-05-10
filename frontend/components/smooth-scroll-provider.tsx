'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    let destroyed = false
    let frame = 0
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let removeVisibilityListener: (() => void) | null = null

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      const lenisInstance = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        autoResize: true
      })
      lenis = lenisInstance

      const raf = (time: number) => {
        frame = 0
        if (destroyed || document.hidden) return
        lenisInstance.raf(time)
        scheduleFrame()
      }

      const scheduleFrame = () => {
        if (frame || destroyed || document.hidden) return
        frame = requestAnimationFrame(raf)
      }

      const handleVisibilityChange = () => {
        if (document.hidden && frame) {
          cancelAnimationFrame(frame)
          frame = 0
          return
        }

        scheduleFrame()
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      removeVisibilityListener = () => document.removeEventListener('visibilitychange', handleVisibilityChange)
      scheduleFrame()
    })

    return () => {
      destroyed = true
      if (frame) cancelAnimationFrame(frame)
      removeVisibilityListener?.()
      lenis?.destroy()
    }
  }, [])

  return null
}
