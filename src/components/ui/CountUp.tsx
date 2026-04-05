"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

/**
 * CountUp
 * ───────
 * Animates a number from 0 → target when it scrolls into view.
 * Uses requestAnimationFrame + ease-out cubic for smooth motion.
 */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * end))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
