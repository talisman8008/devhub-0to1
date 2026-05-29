'use client'

import { useLayoutEffect } from 'react'
import _anime from 'animejs'
type AnimeTimeline = {
  add: (options: Record<string, unknown>, offset?: string | number) => AnimeTimeline
  pause?: () => void
}

type AnimeApi = {
  timeline: (options?: Record<string, unknown>) => AnimeTimeline
}

export function AnimationBoot() {
  useLayoutEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav-shell')
    const journeySection = document.querySelector<HTMLElement>('#journey')
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const stagedChildren = Array.from(
      document.querySelectorAll<HTMLElement>('.secure-kicker, .secure-title-line, .devhub-mark, .mini-proof, .waitlist-field, .waitlist-submit')
    )
    let journeyFrame = 0
    let journeyIsActive = false
    const setJourneyProgress = (progress: number) => {
      if (!journeySection) return
      const clampedProgress = Math.min(Math.max(progress, 0), 1)
      journeySection.style.setProperty('--journey-progress', clampedProgress.toFixed(4))
      journeySection.style.setProperty('--journey-progress-y', `${(clampedProgress * 100).toFixed(2)}%`)
    }
    const updateJourneyProgress = () => {
      journeyFrame = 0
      if (!journeySection || document.hidden || !journeyIsActive) return

      const rect = journeySection.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const startOffset = viewportHeight * 0.22
      const travelDistance = Math.max(rect.height + viewportHeight * 0.05, 1)
      const rawProgress = (startOffset - rect.top) / travelDistance
      setJourneyProgress(rawProgress)
    }
    const requestJourneyProgressUpdate = () => {
      if (!journeySection || journeyFrame) return
      journeyFrame = window.requestAnimationFrame(updateJourneyProgress)
    }
    const requestScrollUpdates = () => {
      requestJourneyProgressUpdate()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setJourneyProgress(0)
      document
        .querySelectorAll<HTMLElement>('.reveal, .nav-shell, .hero-badge, .hero-word, .hero-copy, .hero-actions, .secure-kicker, .secure-title-line, .devhub-mark, .mini-proof, .waitlist-field, .waitlist-submit')
        .forEach((element) => {
          element.classList.add('is-visible')
          element.style.opacity = '1'
          element.style.transform = 'none'
        })
      return () => {
        if (journeyFrame) window.cancelAnimationFrame(journeyFrame)
      }
    }

    window.addEventListener('scroll', requestScrollUpdates, { passive: true })

    ;[...revealElements, ...stagedChildren].forEach((element) => {
      element.style.opacity = '0.01'
    })

    let cancelled = false
    let observer: IntersectionObserver | null = null
    let journeyObserver: IntersectionObserver | null = null
    const timelines: AnimeTimeline[] = []

    if (journeySection) {
      journeyObserver = new IntersectionObserver(
        ([entry]) => {
          journeyIsActive = Boolean(entry?.isIntersecting)

          if (journeyIsActive) {
            requestJourneyProgressUpdate()
            return
          }

          const rect = journeySection.getBoundingClientRect()
          setJourneyProgress(rect.top < 0 ? 1 : 0)
        },
        { rootMargin: '35% 0px 35% 0px', threshold: 0 }
      )
      journeyObserver.observe(journeySection)
      requestJourneyProgressUpdate()
      window.addEventListener('resize', requestJourneyProgressUpdate)
      document.addEventListener('visibilitychange', requestJourneyProgressUpdate)
    }

    if (cancelled) return
    const anime = (((_anime as any).default) ?? _anime) as unknown as AnimeApi

    const introTimeline = anime.timeline({ easing: 'easeOutQuad', duration: 620 })
      timelines.push(introTimeline)

      introTimeline
        .add({ targets: '.nav-shell', opacity: [0, 1], translateY: [-18, 0] })
        .add({ targets: '.hero-badge', opacity: [0, 1], translateY: [12, 0] }, '-=420')
        .add({ targets: '.hero-word', opacity: [0, 1], translateY: [44, 0], delay: animeStagger(80) }, '-=260')
        .add({ targets: '.hero-copy, .hero-actions', opacity: [0, 1], translateY: [20, 0] }, '-=260')
        .add(
          {
            targets: '.counter',
            innerHTML: (element: Element) => [0, Number((element as HTMLElement).dataset.target ?? 0)],
            round: 1,
            duration: 1600
          },
          '-=260'
        )

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const target = entry.target as HTMLElement
            const microTargets = target.querySelectorAll<HTMLElement>('.secure-kicker, .secure-title-line, .devhub-mark, .mini-proof, .waitlist-field, .waitlist-submit')
            const sectionTimeline = anime
              .timeline({
                easing: 'easeOutQuad',
                duration: 420,
                complete: () => {
                  target.classList.add('is-visible')
                  microTargets.forEach((element) => element.classList.add('is-visible'))
                }
              })
              .add({ targets: target, opacity: [0.01, 1] })
              .add({ targets: microTargets, opacity: [0.01, 1], delay: animeStagger(28) }, '-=300')

            timelines.push(sectionTimeline)
            observer?.unobserve(target)
          })
        },
        { threshold: 0.01, rootMargin: '0px 0px -8% 0px' }
      )

      revealElements.forEach((element) => observer?.observe(element))

    return () => {
      cancelled = true
      observer?.disconnect()
      journeyObserver?.disconnect()
      timelines.forEach((timeline) => timeline.pause?.())
      ;[...revealElements, ...stagedChildren].forEach((element) => {
        element.style.opacity = ''
        element.style.transform = ''
      })
      if (journeyFrame) window.cancelAnimationFrame(journeyFrame)
      window.removeEventListener('scroll', requestScrollUpdates)
      window.removeEventListener('resize', requestJourneyProgressUpdate)
      document.removeEventListener('visibilitychange', requestJourneyProgressUpdate)
    }
  }, [])

  return null
}

function animeStagger(interval: number) {
  return (_element: Element, index: number) => index * interval
}
