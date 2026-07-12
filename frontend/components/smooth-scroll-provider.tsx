'use client'

import { useEffect } from 'react'

type LenisInstance = {
  raf: (time: number) => void
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      easing?: (value: number) => number
      lock?: boolean
      force?: boolean
      immediate?: boolean
    }
  ) => void
  destroy: () => void
}

const ANCHOR_OFFSET = -72
const anchorEasing = (value: number) => 1 - Math.pow(1 - value, 4)

export function SmoothScrollProvider() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')

    if (reducedMotionQuery.matches || coarsePointerQuery.matches) {
      return
    }

    let destroyed = false
    let frame = 0
    let lenis: LenisInstance | null = null
    let removeVisibilityListener: (() => void) | null = null
    let removeAnchorListener: (() => void) | null = null

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return
      const lenisInstance = new Lenis({
        lerp: 0.22,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.38,
        touchMultiplier: 1,
        autoResize: true,
        prevent: (node: Element) => Boolean(node.closest('[data-lenis-prevent], dialog'))
      }) as LenisInstance
      lenis = lenisInstance

      const raf = (time: number) => {
        frame = 0
        if (destroyed || document.hidden) return
        try {
          lenisInstance.raf(time)
        } catch {
          // Swallow errors from Lenis raf to prevent loop death
        }
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

      // Self-healing: if the rAF loop dies for any reason, restart it
      // when the user tries to scroll again
      const handleScrollAttempt = () => {
        if (!destroyed && !document.hidden && !frame) {
          scheduleFrame()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      removeVisibilityListener = () => document.removeEventListener('visibilitychange', handleVisibilityChange)

      window.addEventListener('wheel', handleScrollAttempt, { passive: true })
      window.addEventListener('touchmove', handleScrollAttempt, { passive: true })
      const removeScrollRecovery = () => {
        window.removeEventListener('wheel', handleScrollAttempt)
        window.removeEventListener('touchmove', handleScrollAttempt)
      }

      const handleAnchorClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return
        }

        const target = event.target
        if (!(target instanceof Element)) return

        const anchor = target.closest('a[href^="#"]')
        if (!(anchor instanceof HTMLAnchorElement) || anchor.target || anchor.hasAttribute('download')) return

        const hash = anchor.hash
        if (!hash || hash === '#') return

        let targetId = hash.slice(1)
        try {
          targetId = decodeURIComponent(targetId)
        } catch {
          return
        }

        const targetElement = document.getElementById(targetId)
        if (!targetElement) return

        event.preventDefault()
        lenisInstance.scrollTo(targetElement, {
          offset: ANCHOR_OFFSET,
          duration: 0.65,
          easing: anchorEasing,
          lock: false
        })
        window.history.pushState(null, '', hash)
      }

      document.addEventListener('click', handleAnchorClick)
      removeAnchorListener = () => {
        document.removeEventListener('click', handleAnchorClick)
        removeScrollRecovery()
      }
      scheduleFrame()
    })

    return () => {
      destroyed = true
      if (frame) cancelAnimationFrame(frame)
      removeVisibilityListener?.()
      removeAnchorListener?.()
      lenis?.destroy()
    }
  }, [])

  return null
}
