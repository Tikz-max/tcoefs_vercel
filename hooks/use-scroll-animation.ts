"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export function useStaggeredAnimation(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = []
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems((prev) => [...prev, i])
        }, i * delay)
        timeouts.push(timeout)
      }
      return () => timeouts.forEach(clearTimeout)
    }
  }, [isVisible, itemCount, delay])

  return { ref, visibleItems, isVisible }
}
