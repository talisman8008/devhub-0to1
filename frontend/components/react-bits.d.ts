declare module '@/components/Galaxy' {
  import type { ComponentType, HTMLAttributes } from 'react'

  export type GalaxyProps = HTMLAttributes<HTMLDivElement> & {
    focal?: [number, number]
    rotation?: [number, number]
    starSpeed?: number
    density?: number
    hueShift?: number
    disableAnimation?: boolean
    speed?: number
    mouseInteraction?: boolean
    glowIntensity?: number
    saturation?: number
    mouseRepulsion?: boolean
    repulsionStrength?: number
    twinkleIntensity?: number
    rotationSpeed?: number
    autoCenterRepulsion?: number
    transparent?: boolean
  }

  const Galaxy: ComponentType<GalaxyProps>
  export default Galaxy
}

declare module '@/components/LiquidEther' {
  import type { ComponentType, HTMLAttributes } from 'react'

  export type LiquidEtherProps = HTMLAttributes<HTMLDivElement> & {
    mouseForce?: number
    cursorSize?: number
    isViscous?: boolean
    viscous?: number
    iterationsViscous?: number
    iterationsPoisson?: number
    dt?: number
    BFECC?: boolean
    resolution?: number
    isBounce?: boolean
    colors?: string[]
    autoDemo?: boolean
    autoSpeed?: number
    autoIntensity?: number
    takeoverDuration?: number
    autoResumeDelay?: number
    autoRampDuration?: number
  }

  const LiquidEther: ComponentType<LiquidEtherProps>
  export default LiquidEther
}
