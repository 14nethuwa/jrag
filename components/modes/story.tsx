'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import styles from './story.module.css'
import type { StoryModeProps } from './types'

gsap.registerPlugin(ScrollTrigger)

export function StoryMode({
  imageUrl,
  imageAlt,
  headline,
  subhead,
  bodyText,
}: StoryModeProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef)
      const image = q('[data-story-image]')
      const text = q('[data-story-text]')

      if (prefersReducedMotion) {
        gsap.set([image, text], { clearProps: 'all' })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        image,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      )
        .fromTo(
          text,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.16, ease: 'power3.out' },
          '-=1.0'
        )
    }, containerRef)

    return (): void => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 1200px"
          priority={false}
          loading="lazy"
          data-story-image
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.headline} data-story-text>
          {headline}
        </h2>
        <h3 className={styles.subhead} data-story-text>
          {subhead}
        </h3>
        <p className={styles.body} data-story-text>
          {bodyText}
        </p>
      </div>
    </section>
  )
}
