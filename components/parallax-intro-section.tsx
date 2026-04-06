'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { WebGLWater } from './webgl-water'
import styles from './parallax-intro-section.module.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function ParallaxIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Removed legacy shore-blend scroll event listener to improve performance

  useEffect(() => {
    // Utilize GSAP Context for proper React 18 strict-mode cleanup
    // and scoping to the `container` element.
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      // Instead of pinning, the container natively scrolls, and the timeline
      // is mapped strictly to traversing that container's height. 
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Animate SVG layers (using stable data attributes scoped inside the context)
      tl.fromTo('[data-layer="sky"]', { y: 0 }, { y: -200 }, 0)
        // Travels precisely from off-screen bottom to mathematically hit the shoreline without crossing it.
        // Starts at 600 to remain completely hidden below Y=800 on page load.
        .fromTo('[data-layer="cloud1"]', { y: 600 }, { y: -200 }, 0)
        .fromTo('[data-layer="cloud2"]', { y: -150 }, { y: -300 }, 0)
        .fromTo('[data-layer="cloud3"]', { y: -50 }, { y: -400 }, 0)
        .fromTo('[data-layer="mountBg"]', { y: -10 }, { y: -100 }, 0)
        .fromTo('[data-layer="mountMg"]', { y: -30 }, { y: -250 }, 0)
        .fromTo('[data-layer="mountFg"]', { y: -50 }, { y: -600 }, 0)

        const arrowBtn = document.getElementById('parallax-arrow-btn')
        if (arrowBtn) {
          const onEnter = () => gsap.to('#parallax-arrow', { y: 10, duration: 0.8, ease: 'back.inOut(3)', overwrite: 'auto' })
          const onLeave = () => gsap.to('#parallax-arrow', { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
          const onClick = () => gsap.to(window, { scrollTo: window.innerHeight * 2.5, duration: 1.5, ease: 'power1.inOut' })

          arrowBtn.addEventListener('mouseenter', onEnter)
          arrowBtn.addEventListener('mouseleave', onLeave)
          arrowBtn.addEventListener('click', onClick)

          // Stash for cleanup
          ;(container as any)._arrowCleanup = () => {
            arrowBtn.removeEventListener('mouseenter', onEnter)
            arrowBtn.removeEventListener('mouseleave', onLeave)
            arrowBtn.removeEventListener('click', onClick)
          }
        }

        // ─── Generated Animated SVG Wave Mask ───
        
        function createWave(pathId: string, options: any) {
          options = options || {}
          let wave = {
            amplitude: options.amplitude || 200,
            duration: options.duration || 2,
            frequency: options.frequency || 4,
            height: options.height || 600,
            points: [] as any[],
            segments: options.segments || 100,
            tweens: [] as any[],
            waveHeight: options.waveHeight || 300,
            width: options.width || 500,
            x: options.x || 0,
            y: options.y || 0,
            init: () => {},
            draw: () => {},
            kill: () => {
              wave.tweens.forEach(t => t.kill())
              wave.tweens.length = 0
              wave.points.length = 0
            }
          }

          wave.init = () => {
            wave.kill()
            let segments = wave.segments
            let interval = wave.width / segments
            for (let i = 0; i <= segments; i++) {
              let norm = i / segments
              let point = { x: wave.x + i * interval, y: 1 }
              let tween = gsap
                .to(point, { duration: wave.duration, y: -1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
                .progress(norm * wave.frequency)
              wave.tweens.push(tween)
              wave.points.push(point)
            }
          }

          wave.draw = () => {
            const pathElement = document.getElementById(pathId)
            if (!pathElement) return
            let points = wave.points
            let len = points.length
            let startY = wave.waveHeight
            let height = wave.amplitude / 2

            const pathCommands = [`M ${points[0].x} ${startY + points[0].y * height}`]
            for (let i = 1; i < len; i++) {
              let point = points[i]
              pathCommands.push(`L ${point.x} ${startY + point.y * height}`)
            }
            // Close shape dynamically deep down the SVG to guarantee total masking coverage below the wave
            pathCommands.push(
              `L ${wave.x + wave.width} ${wave.y + wave.height}`,
              `L ${wave.x} ${wave.y + wave.height}`,
              'Z'
            )

            // Optimization: join string parts for setting attribute rather than using string concatenation in high frequency ticker loop.
            pathElement.setAttribute('d', pathCommands.join(' '))
          }

          wave.init()
          return wave
        }

        const vw = 1200
        const vh = 800
        const maskDepth = vh + 2000

        // Each wave draws into TWO paths simultaneously: one for sweep-mask (erase) and one for reveal-mask (show)
        function createWavePair(sweepId: string, revealId: string, options: any) {
          const w = createWave(sweepId, options)
          const origDraw = w.draw.bind(w)
          w.draw = () => {
            // draw into sweep target
            origDraw()
            // mirror into reveal target
            const sweep = document.getElementById(sweepId)
            const reveal = document.getElementById(revealId)
            if (sweep && reveal) reveal.setAttribute('d', sweep.getAttribute('d') || '')
          }
          return w
        }

        // Tightened starting heights so the 3 layers act as one cohesive, dense wave instead of separating wildly.
        let wave1 = createWavePair('wave1s', 'wave1r', { amplitude: 10, duration: 4, frequency: 2.5, width: vw, height: maskDepth, segments: 100, waveHeight: 200 })
        let wave2 = createWavePair('wave2s', 'wave2r', { amplitude: 15, duration: 4, frequency: 1.5, width: vw, height: maskDepth, segments: 100, waveHeight: 215 })
        let wave3 = createWavePair('wave3s', 'wave3r', { amplitude: 20, duration: 4, frequency: 0.5, width: vw, height: maskDepth, segments: 100, waveHeight: 230 })
        let waves = [wave1, wave2, wave3]

        // Keep the vertical "bobbing/breathing" extremely subtle (just 20px) instead of 200px!
        gsap.to(waves, { duration: 6, waveHeight: '+=20', ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to(wave1, { duration: 2, amplitude: 15, ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to(wave2, { duration: 3, amplitude: 25, ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to(wave3, { duration: 4, amplitude: 40, ease: 'sine.inOut', repeat: -1, yoyo: true })

        const updateWavePaths = () => { waves.forEach(w => w.draw()) }
        gsap.ticker.add(updateWavePaths)

        return () => {
          gsap.ticker.remove(updateWavePaths)
          waves.forEach(w => w.kill())
          if ((container as any)._arrowCleanup) (container as any)._arrowCleanup()
        }
      }, containerRef)

    // React cleanup reverts all GSAP ScrollTriggers and timelines perfectly
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        {/* ─── SVG Stage ─── */}
        <div className={styles.main}>
          <svg
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* ─── Sweep Mask: white canvas above the wave, black (erase) below ─── */}
              <mask id="sweep-mask">
                <rect fill="#fff" width="100%" height="8000" y="-4000" />
                <g data-layer="cloud1">
                  <path id="wave1s" fill="#000" opacity="0.3" />
                  <path id="wave2s" fill="#000" opacity="0.6" />
                  <path id="wave3s" fill="#000" opacity="1.0" />
                </g>
              </mask>

              {/* ─── Reveal Mask: shows DAKHLA text only below the wave ─── */}
              <mask id="reveal-mask">
                <g data-layer="cloud1">
                  <path id="wave1r" fill="#fff" opacity="0.3" />
                  <path id="wave2r" fill="#fff" opacity="0.6" />
                  <path id="wave3r" fill="#fff" opacity="1.0" />
                </g>
              </mask>
            </defs>

            {/* ─── 1. The Parallax Background (Swept away to reveal the Canvas) ─── */}
            <g mask="url(#sweep-mask)">
            <image
              data-layer="sky"
              xlinkHref="/images/parallax/sky.jpg"
              width="1200"
              height="800"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Clouds sit BEHIND the mountains — rendered first in SVG order */}
            <image
              data-layer="cloud2"
              xlinkHref="https://assets.codepen.io/721952/cloud2.png"
              width="1200"
              height="800"
            />
            <image
              data-layer="cloud3"
              xlinkHref="https://assets.codepen.io/721952/cloud3.png"
              width="1200"
              height="800"
            />
            <image
              data-layer="mountBg"
              xlinkHref="/images/parallax/mountBg.png"
              width="1200"
              height="800"
              y="-150"
              preserveAspectRatio="xMidYMid slice"
            />
            <image
              data-layer="mountMg"
              xlinkHref="/images/parallax/mountMg.png"
              width="1200"
              height="800"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* ─── Foreground Dune + Dynamic WebGL Water ─── */}
            {/* Wrapped together so GSAP moves them upwards perfectly in sync! */}
            <g data-layer="mountFg">
              <image
                xlinkHref="/images/parallax/mountFg.png"
                width="1200"
                height="800"
                y="350"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* ─── Dynamic Raymarched WebGL Water! (Renders ON TOP of mountFg's static water) ─── */}
              {/* The y-offset nudges the WebGL horizon down to align exactly with the beach edge */}
              <foreignObject width="1200" height="800" y="60">
                <WebGLWater />
              </foreignObject>
            </g>

            {/* ─── Hero Text (White — visible initially) ─── */}
            <text
              className={styles.heroSentence}
              fill="#fff"
              x="600"
              y="180"
              textAnchor="middle"
            >
              <tspan x="600" dy="0">De la lagune de Dakhla</tspan>
              <tspan x="600" dy="1.05em">à votre assiette</tspan>
            </text>

            {/* ─── Scroll Arrow ─── */}
            <polyline
              id="parallax-arrow"
              fill="#fff"
              points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
            />
            </g>

            {/* ─── 2. Masked Text (Revealed directly over the Canvas!) ─── */}
            <g mask="url(#reveal-mask)">
              <text
                className={styles.heroText}
                x="600"
                y="200"
                fill="#fff"
                textAnchor="middle"
              >
                DAKHLA
              </text>
            </g>

            {/* ─── Invisible Click Target for Arrow ─── */}
            <rect
              id="parallax-arrow-btn"
              width="100"
              height="100"
              opacity="0"
              x="550"
              y="220"
              style={{ cursor: 'pointer' }}
            />
          </svg>

        </div>
      </div>
    </div>
  )
}
