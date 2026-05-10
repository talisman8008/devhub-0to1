'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let destroyed = false
    let frame = 0
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        frame = requestAnimationFrame(raf)
      }

      frame = requestAnimationFrame(raf)
    })

    return () => {
      destroyed = true
      if (frame) cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return null
}
