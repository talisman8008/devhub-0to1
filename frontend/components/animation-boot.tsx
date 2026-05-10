'use client'

import { useEffect } from 'react'

type AnimeTimeline = {
  add: (options: Record<string, unknown>, offset?: string | number) => AnimeTimeline
}

type AnimeApi = {
  timeline: (options?: Record<string, unknown>) => AnimeTimeline
}

export function AnimationBoot() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav-shell')
    const updateNavTone = () => {
      if (!nav) return
      nav.classList.toggle('nav-on-dark', window.scrollY > window.innerHeight * 0.82)
    }

    updateNavTone()
    window.addEventListener('scroll', updateNavTone, { passive: true })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll<HTMLElement>('.reveal, .nav-shell, .hero-badge, .hero-word, .hero-copy, .hero-actions, .secure-kicker, .secure-title-line, .mini-proof, .waitlist-field')
        .forEach((element) => {
          element.style.opacity = '1'
          element.style.transform = 'none'
        })
      return () => window.removeEventListener('scroll', updateNavTone)
    }

    let cancelled = false
    let observer: IntersectionObserver | null = null

    import('animejs').then((module) => {
      if (cancelled) return
      const anime = (module.default ?? module) as unknown as AnimeApi

      anime
        .timeline({ easing: 'easeOutQuad', duration: 700 })
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
            anime
              .timeline({ easing: 'easeOutQuad', duration: 620 })
              .add({ targets: target, opacity: [0, 1], translateY: [24, 0] })
              .add({ targets: microTargets, opacity: [0, 1], translateY: [18, 0], delay: animeStagger(55) }, '-=420')
            observer?.unobserve(target)
          })
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
      )

      document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => observer?.observe(element))
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      window.removeEventListener('scroll', updateNavTone)
    }
  }, [])

  return null
}

function animeStagger(interval: number) {
  return (_element: Element, index: number) => index * interval
}
