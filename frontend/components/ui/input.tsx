import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-12 w-full rounded-sm border border-white/[0.1] bg-panel px-4 py-3 text-sm text-primary placeholder:text-muted transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-55',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input'
