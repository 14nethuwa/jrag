'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GrainOverlay } from './grain-overlay'
import styles from './scrollytelling-section.module.css'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 1746

const INTRO_LINES = [
  "Là où les dunes rencontrent l'Atlantique,",
  "les puissants courants d'upwelling",
  "saturent l'eau en nutriments.",
  "C'est dans ce sanctuaire minéral,",
  "riche en phytoplancton, que notre naissain",
  "capte sa première empreinte sauvage."
]

const CHAPTERS = [
  {
    id: 'naissain',
    eyebrow: 'CHAPITRE I',
    title: 'Naissain',
    description: 'Fragile newborn shell textures, precious and serene. The delicate beginning in the Dakhla lagoon'
  },
  {
    id: 'eclosion',
    eyebrow: 'CHAPITRE II',
    title: 'Éclosion',
    description: 'Poetic emergence into luminous water, carried by elegant currents with scientific grace'
  },
  {
    id: 'croissance',
    eyebrow: 'CHAPITRE III',
    title: 'Croissance',
    description: 'Growing on suspended lines. Rhythmic rows, stronger shells, abundance with discipline'
  },
  {
    id: 'purification',
    eyebrow: 'CHAPITRE IV',
    title: 'Purification 42–48h',
    description: 'Pristine depuration environment. Clinical precision, crystal-clear clarity, food-safety luxury'
  },
  {
    id: 'conditionnement',
    eyebrow: 'CHAPITRE V',
    title: 'Conditionnement',
    description: 'Careful premium packaging. Gloved hands, refined presentation, export-ready elegance'
  },
  {
    id: 'chaine-du-froid',
    eyebrow: 'CHAPITRE VI',
    title: 'Chaîne du froid',
    description: 'Protected movement through controlled freshness, soft blue industrial light, uninterrupted'
  },
  {
    id: 'a-table',
    eyebrow: 'CHAPITRE VII',
    title: 'À table',
    description: 'Haute gastronomie plating. Mineral beauty, sensual final reveal'
  }
]

// ─── Debug: fixed scrollY counter ───
export function ScrollYDebug() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(Math.round(window.scrollY))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    // Zero-height sticky rail: sticks to the top of the viewport as the user scrolls.
    // The absolute child hangs off it, bypassing all stacking-context traps.
    <div style={{
      position: 'sticky',
      top: 0,
      height: 0,
      overflow: 'visible',
      zIndex: 2147483647,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        top: 8,
        left: 8,
        background: 'rgba(0,0,0,0.85)',
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 'bold',
        padding: '6px 14px',
        borderRadius: 4,
      }}>
        scrollY: {y}px
      </div>
    </div>
  )
}

export function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Ensure each frame starts from a cleared canvas before drawing.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalDrawImage = (ctx as any).drawImage.bind(ctx)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ctx as any).drawImage = (...args: any[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      originalDrawImage(...args)
    }
    // ─── Ensure Canvas Dimensions Match Viewport ───
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // ─── Lazy Frame Loading ───
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)

    const loadFrame = (index: number): HTMLImageElement | null => {
      if (index < 0 || index >= FRAME_COUNT) return null

      let img = frames[index]
      if (!img) {
        img = new Image()
        // Frames on disk are 1-based: frame-0001.jpg ... frame-1746.jpg
        const frameNumber = index + 1
        img.src = `/videos/scrollytelling-frames/frame-${String(frameNumber).padStart(4, '0')}.jpg`
        frames[index] = img
      }

      return img
    }

    // ─── Draw Function mimicking object-fit: cover ───
    const drawFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT) return

      const img = loadFrame(index)
      if (!img) return

      let targetImg: HTMLImageElement | null = img

      if (!targetImg.complete) {
        let fallbackIdx = index - 1
        while (fallbackIdx >= 0) {
          const fallbackImg = loadFrame(fallbackIdx)
          if (fallbackImg && fallbackImg.complete) {
            targetImg = fallbackImg
            break
          }
          fallbackIdx--
        }

        if (!targetImg || !targetImg.complete) {
          return
        }
      }

      const canvasRatio = canvas.width / canvas.height
      const imgRatio = targetImg.width / targetImg.height
      let drawWidth = canvas.width
      let drawHeight = canvas.height
      let offsetX = 0
      let offsetY = 0

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio
        offsetX = (canvas.width - drawWidth) / 2
      } else {
        drawHeight = canvas.width / imgRatio
        offsetY = (canvas.height - drawHeight) / 2
      }

      ctx.drawImage(targetImg, offsetX, offsetY, drawWidth, drawHeight)
    }

    if (frames[0]) {
      frames[0].onload = () => drawFrame(0)
    }

    // ─── GSAP ScrollTrigger Setup ───
    const proxy = { frameIdx: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'scrolly-timeline',
        trigger: container,
        start: 1895, // Start of scrollytelling section
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.textContent = String(Math.round(self.progress * 100))
          }
          drawFrame(Math.floor(proxy.frameIdx))
        }
      }
    })

    const elementReveal = container.querySelector('#scrolly-element-reveal')
    const wipeWords = container.querySelectorAll('.wipe-word')

    if (elementReveal) {
      // 1) The swipe-off image appears fully
      tl.fromTo(elementReveal,
        { width: 0, autoAlpha: 1 },
        { width: '100%', autoAlpha: 1, duration: 0.15, ease: 'none' },
        0
      )

      // Sync the text reveal over the exact same 0 -> 0.15 duration window
      if (wipeWords.length) {
        tl.fromTo(wipeWords,
          { autoAlpha: 0, y: 70, scale: 1.15, transformOrigin: 'left bottom' },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.05, ease: 'power2.out', stagger: { amount: 0.10 } },
          0
        )
      }
      
      // 2) Then the scrollytelling moves on to frame two (index 1)
      tl.fromTo(proxy, 
        { frameIdx: 0 },
        { frameIdx: 1, duration: 0.01, ease: 'none' },
        0.15
      )

      // 3) The wipe off image disappears INSTANTLY after
      tl.set(elementReveal, { autoAlpha: 0 }, 0.16)
      // Intro Text remains completely untouched here to linger beautifully down the page

      // 4) Then the scrollytelling flow resumes as normal and goes to frame 3 onward
      tl.to(proxy, {
        frameIdx: FRAME_COUNT - 1,
        duration: 0.84,
        ease: 'none',
      }, 0.16)
    } else {
      tl.to(proxy, {
        frameIdx: FRAME_COUNT - 1,
        duration: 1.0,
        ease: 'none',
      }, 0)
    }

    // 3) Add staggered fade/slide animations to each chapter text block as they scroll down
    const chapterNodes = container.querySelectorAll(`.${styles.chapterContent}`)
    const chapterTriggers: ScrollTrigger[] = []
    chapterNodes.forEach((node) => {
      const st = ScrollTrigger.create({
        trigger: node,
        start: 'top 85%', // starts animating when top of text hits 85% down viewport
        end: 'top 50%',   // completes when top of text hits vertical center
        scrub: true,
        animation: gsap.fromTo(node, 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, ease: 'power2.out' }
        )
      })
      chapterTriggers.push(st)
    })

    // 4) Independent scroll timeline mapped EXACTLY to absolute scroll values mapped by the user
    // Fades the intro words out word-by-word sequentially!
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        id: 'intro-fadeout',
        start: 4160,
        end: 4570,
        scrub: true
      }
    })
    if (wipeWords.length) {
      fadeOutTl.to(wipeWords, {
        autoAlpha: 0,
        stagger: 0.1,
        ease: 'none'
      })
    }

    const onResize = () => {
        resizeCanvas()
        drawFrame(Math.floor(proxy.frameIdx))
    }
    window.addEventListener('resize', onResize)

    return () => {
      ScrollTrigger.getById('scrolly-timeline')?.kill()
      ScrollTrigger.getById('intro-fadeout')?.kill()
      chapterTriggers.forEach(t => t.kill())
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      {/* ─── Sticky Background Canvas ─── */}
      <div ref={stickyRef} className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.video} />
        
        {/* Animated Element Image (Behind Grain) */}
        <div id="scrolly-element-reveal" className={styles.elementReveal}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="scrolly-element" src="/images/element.png" alt="Animated scenic element" className={styles.elementImage} />
        </div>

        <GrainOverlay />
        
        {/* ─── Intro Wipe Text ─── */}
        <h1 id="intro-wipe-container" className={styles.introWipeText}>
          {INTRO_LINES.map((line, i) => (
            <div key={i} style={{ whiteSpace: 'nowrap' }}>
              {line.split(' ').map((word, j) => (
                <span key={j}>
                  <span className="wipe-word" style={{ opacity: 0, display: 'inline-block', willChange: 'opacity, transform' }}>{word}</span>
                  {' '}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <div className={styles.counter}>
          <span ref={progressRef} className={styles.counterNumber}>
            0
          </span>
          <span className={styles.counterLabel}>%</span>
        </div>
      </div>

      {/* ─── Scrolling HTML Overlay Chapters ─── */}
      <div className={styles.overlay}>
        {CHAPTERS.map((chapter) => (
          <div key={chapter.id} data-id={chapter.id} className={styles.chapter}>
            <div className={styles.chapterContent}>
              <span className={styles.chapterEyebrow}>{chapter.eyebrow}</span>
              <h2 className={styles.chapterTitle}>{chapter.title}</h2>
              <p className={styles.chapterDesc}>{chapter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
