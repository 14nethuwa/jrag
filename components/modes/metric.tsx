'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './metric.module.css'
import type { MetricModeProps } from './types'

gsap.registerPlugin(ScrollTrigger)

export function MetricMode({ metrics }: MetricModeProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        metrics.forEach((metric, index) => {
          const element = numberRefs.current[index]
          if (element) {
            element.textContent = metric.value.toLocaleString()
          }
        })
        return
      }

      numberRefs.current.forEach((element, index) => {
        if (!element) {
          return
        }

        const targetValue = metrics[index]?.value ?? 0
        const obj = { val: 0 }

        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            element.textContent = Math.round(obj.val).toLocaleString()
          },
        })
      })
    }, containerRef)

    return (): void => ctx.revert()
  }, [metrics])

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        {metrics.map((metric, index) => (
          <div key={`${metric.label}-${metric.value}`} className={styles.metricItem}>
            <div className={styles.numberWrapper}>
              <span
                className={styles.number}
                ref={(element) => {
                  numberRefs.current[index] = element
                }}
              >
                0
              </span>
              {metric.suffix && <span className={styles.suffix}>{metric.suffix}</span>}
            </div>
            <span className={styles.label}>{metric.label}</span>
            {metric.description && <p className={styles.description}>{metric.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
