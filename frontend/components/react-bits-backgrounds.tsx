'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Galaxy = dynamic(() => import('@/components/Galaxy'), {
  ssr: false,
})
const LiquidEther = dynamic(() => import('@/components/LiquidEther'), {
  ssr: false,
})

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

export function HeroLiquidBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div className="hero-liquid-fallback" aria-hidden="true" />
  }

  return (
    <div className="hero-liquid-layer" aria-hidden="true">
      <LiquidEther
        mouseForce={17}
        cursorSize={50}
        isViscous={false}
        viscous={30}
        iterationsPoisson={8}
        resolution={0.25}
        colors={['#837c7c', '#323131', '#000000']}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        isBounce={false}
      />
    </div>
  )
}

export function WaitlistGalaxyBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div className="waitlist-galaxy-fallback" aria-hidden="true" />
  }

  return (
    <div className="waitlist-galaxy-layer" aria-hidden="true">
      <Galaxy
        starSpeed={0.8}
        density={0.5}
        hueShift={140}
        speed={1}
        glowIntensity={0.3}
        saturation={0}
        mouseInteraction={false}
        mouseRepulsion={false}
        repulsionStrength={2}
        twinkleIntensity={0.3}
        rotationSpeed={0}
        transparent
      />
    </div>
  )
}
