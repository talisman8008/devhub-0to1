'use client'

import { useEffect, useRef } from 'react'

const fluidConfig = {
  backColor: { r: 255, g: 255, b: 255 },
  transparent: false,
  dyeColor: { r: 50, g: 50, b: 50 },
  velocityDiffusion: 0.98,
  densityDiffusion: 0.97
}

const smokeBlobs = [
  { x: 0.12, y: 0.44, radius: 0.34, alpha: 0.22, speed: 0.6 },
  { x: 0.33, y: 0.24, radius: 0.3, alpha: 0.12, speed: 0.42 },
  { x: 0.52, y: 0.58, radius: 0.4, alpha: 0.2, speed: 0.36 },
  { x: 0.84, y: 0.36, radius: 0.32, alpha: 0.16, speed: 0.5 },
  { x: 0.14, y: 0.92, radius: 0.13, alpha: 0.44, speed: 0.28 }
] as const

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let frame = 0
    let resizeFrame = 0
    let running = false
    let isVisible = true
    let width = 0
    let height = 0
    let lastDrawTime = 0
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const frameInterval = 1000 / 30

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      const maxRatio = window.innerWidth < 768 ? 1 : 1.25
      const ratio = Math.min(window.devicePixelRatio || 1, maxRatio)
      const nextWidth = Math.max(Math.floor(rect.width * ratio), 1)
      const nextHeight = Math.max(Math.floor(rect.height * ratio), 1)

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth
        canvas.height = nextHeight
      }

      width = nextWidth
      height = nextHeight
    }

    const draw = (time = 0) => {
      if (!width || !height) updateCanvasSize()

      context.clearRect(0, 0, width, height)
      const { backColor, dyeColor, densityDiffusion, velocityDiffusion } = fluidConfig
      context.fillStyle = `rgb(${backColor.r}, ${backColor.g}, ${backColor.b})`
      context.fillRect(0, 0, width, height)

      smokeBlobs.forEach((blob, index) => {
        const phase = running ? time * 0.00015 * blob.speed * velocityDiffusion + index : index
        const x = (blob.x + Math.sin(phase) * 0.035) * width
        const y = (blob.y + Math.cos(phase * 1.35) * 0.045) * height
        const radius = blob.radius * Math.max(width, height)
        const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius)
        gradient.addColorStop(0, `rgba(${dyeColor.r}, ${dyeColor.g}, ${dyeColor.b}, ${blob.alpha})`)
        gradient.addColorStop(0.52, `rgba(${dyeColor.r}, ${dyeColor.g}, ${dyeColor.b}, ${blob.alpha * densityDiffusion * 0.44})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()

        const ribbon = context.createLinearGradient(x - radius, y - radius * 0.2, x + radius, y + radius * 0.42)
        ribbon.addColorStop(0, 'rgba(255,255,255,0)')
        ribbon.addColorStop(0.46, `rgba(${dyeColor.r}, ${dyeColor.g}, ${dyeColor.b}, ${blob.alpha * 0.14})`)
        ribbon.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = ribbon
        context.beginPath()
        context.ellipse(x, y, radius * 0.92, radius * 0.22, phase, 0, Math.PI * 2)
        context.fill()
      })

      const bottomFade = context.createLinearGradient(0, height * 0.76, 0, height)
      bottomFade.addColorStop(0, 'rgba(255,255,255,0)')
      bottomFade.addColorStop(1, 'rgba(0,0,0,0.34)')
      context.fillStyle = bottomFade
      context.fillRect(0, height * 0.76, width, height * 0.24)
    }

    const scheduleFrame = () => {
      if (frame || !running) return
      frame = requestAnimationFrame(loop)
    }

    const loop = (time: number) => {
      frame = 0

      if (!running) return

      if (time - lastDrawTime >= frameInterval) {
        lastDrawTime = time
        draw(time)
      }

      scheduleFrame()
    }

    const updateRunningState = () => {
      const shouldRun = isVisible && !document.hidden && !reducedMotionQuery.matches
      if (running === shouldRun) return

      running = shouldRun

      if (running) {
        scheduleFrame()
        return
      }

      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }

      draw(lastDrawTime)
    }

    const handleResize = () => {
      if (resizeFrame) return
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0
        updateCanvasSize()
        draw(lastDrawTime)
      })
    }

    const handleVisibilityChange = () => updateRunningState()
    const handleReducedMotionChange = () => updateRunningState()
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true
        updateRunningState()
      },
      { threshold: 0.01 }
    )

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    observer.observe(canvas)

    updateCanvasSize()
    draw()
    updateRunningState()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-95" />
}
