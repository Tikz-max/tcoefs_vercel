"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fade", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out"

    if (!isVisible) {
      switch (animation) {
        case "slide-up":
          return `${baseClasses} opacity-0 translate-y-8`
        case "slide-left":
          return `${baseClasses} opacity-0 translate-x-8`
        case "slide-right":
          return `${baseClasses} opacity-0 -translate-x-8`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <section ref={ref} className={`${getAnimationClasses()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </section>
  )
}
