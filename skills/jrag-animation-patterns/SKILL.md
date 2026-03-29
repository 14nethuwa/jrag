# JRAG Animation Patterns

**Problem this skill solves:** GSAP animations need to be consistent across the site and tuned for JRAG's restrained, smooth aesthetic.

**When to invoke:** Before implementing any scroll-triggered or interactive animation.

## Overview

JRAG's animation language is **smooth, deliberate, and purposeful.** Animations reveal content, guide attention, and never distract.

This skill documents the approved animation patterns and performance requirements.

## Core Animation Philosophy

### What JRAG Animations Do

✅ **Reveal** — Animation uncovers content or clarifies hierarchy  
✅ **Guide** — Animation draws attention to what matters  
✅ **Smooth** — Animation feels liquid and intentional  
✅ **Fast** — Animation doesn't slow the user down  

### What JRAG Animations Don't Do

❌ Bounce or toy-like effects  
❌ Auto-play without scroll trigger  
❌ Distract from content  
❌ Jank on mid-range devices  
❌ Break accessibility (ignored with prefers-reduced-motion)  

## Approved Animation Patterns

### Pattern 1: Parallax Scroll

**When:** Hero sections, intro moments, cinematic backgrounds

**Code:**
```typescript
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.parallax-layer', {
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1, // 1-second catch-up
          markers: false, // No debug markers in prod
        },
        y: -100, // Move up as user scrolls down
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-96">
      <div className="parallax-layer">
        {/* Content moves at different speeds */}
      </div>
    </div>
  )
}
```

**Tuning:**
- `scrub: 1` = 1-second smoothing (feels intentional, not instant)
- `y: -100` = 100px movement (subtle, not dramatic)
- Test on Chrome DevTools with throttling (CPU: 4x)

**Used on:** Homepage hero, parallax sections

---

### Pattern 2: Scroll-Triggered Fade-Up

**When:** Text reveals, section introductions, subtle emphasis

**Code:**
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.fade-up-item', {
      scrollTrigger: {
        trigger: '.fade-up-section',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1, // Each item 0.1s apart
      ease: 'power2.out',
    })
  })

  return () => ctx.revert()
}, [])
```

**Tuning:**
- `duration: 0.6` = Animation finishes in 0.6s (feels snappy)
- `stagger: 0.1` = Nice cascade effect without overdoing it
- `ease: 'power2.out'` = Easing-out feels natural
- `toggleActions: 'play none none reverse'` = Plays forward, reverses on scroll back

**Used on:** Section introductions, word reveals

---

### Pattern 3: Frame Sequence (Scrubbing)

**When:** Multi-image animations, scrollytelling, complex sequences

**Code:**
```typescript
'use client'
import { useEffect, useRef, useState } from 'react'

export function FrameSequence({ totalFrames }: { totalFrames: number }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const element = containerRef.current
      const rect = element.getBoundingClientRect()
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.max(0, Math.min(1, 
        1 - (rect.top / window.innerHeight)
      ))
      
      const frameIndex = Math.floor(progress * totalFrames)
      setCurrentFrame(frameIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalFrames])

  return (
    <div ref={containerRef} className="h-screen">
      <img
        src={`/frames/frame-${String(currentFrame + 1).padStart(4, '0')}.jpg`}
        alt="Frame"
        className="w-full h-full object-cover"
      />
    </div>
  )
}
```

**Tuning:**
- Lazy-load frames (only load current + next 2)
- Use `requestAnimationFrame` for smooth updates
- Test with slow scroll (Chrome DevTools Network → Slow 3G)

**Used on:** Scrollytelling oyster story

---

### Pattern 4: Wave Animation (Procedural)

**When:** Procedural effects, organic motion, background elements

**Code:**
```typescript
useEffect(() => {
  const canvas = containerRef.current
  if (!canvas) return

  const ctx = gsap.context(() => {
    // Animate rotation to drive wave motion
    gsap.to({ rotation: 0 }, {
      rotation: Math.PI * 2,
      duration: 6,
      repeat: -1,
      ease: 'none',
      onUpdate: function() {
        const rotation = this.getProperty(this.targets()[0], 'rotation')
        updateWavePath(rotation)
      },
    })
  })

  return () => ctx.revert()
}, [])
```

**Used on:** Homepage wave effects, background animations

---

### Pattern 5: Count-Up Animation

**When:** Metrics, statistics, numbers that should feel meaningful

**Code:**
```typescript
export function CountMetric({ target, label }: { target: number; label: string }) {
  const numRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({ count: 0 }, {
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top center',
          once: true, // Only animate once
        },
        count: target,
        duration: 2,
        ease: 'power2.out',
        snap: { count: 1 },
        onUpdate: function() {
          if (numRef.current) {
            numRef.current.textContent = Math.floor(this.getProperty(this.targets()[0], 'count')).toLocaleString()
          }
        },
      })
    }, numRef)

    return () => ctx.revert()
  }, [target])

  return (
    <div className="text-center">
      <div ref={numRef} className="font-quicksand text-5xl font-bold text-orange">
        {target}
      </div>
      <div className="mt-2 font-roboto-condensed text-sm text-sand">{label}</div>
    </div>
  )
}
```

**Used on:** Metrics sections, stats pages

---

## Performance Checklist

Before shipping ANY animated section:

- [ ] Animation runs at 60fps (Chrome DevTools Performance tab)
- [ ] No layout thrashing (batch reads/writes with GSAP)
- [ ] Animated properties are `transform` or `opacity` only
- [ ] Test on throttled CPU (Chrome DevTools → 4x CPU throttle)
- [ ] Test on mid-range device (or emulate Moto G4)
- [ ] Scroll performance smooth (DevTools → Rendering → Frame Rate)
- [ ] Memory usage stable (no leaks over 30-second scroll)
- [ ] Animation cleans up on unmount (ctx.revert())

---

## Accessibility Requirements

Every animation MUST respect `prefers-reduced-motion`:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!prefersReducedMotion) {
  // Animate normally
} else {
  // Instant, no animation
}
```

**Example:**
```typescript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const ctx = gsap.context(() => {
    gsap.to('.animated', {
      scrollTrigger: { trigger: container },
      opacity: 1,
      duration: prefersReducedMotion ? 0 : 0.6,
    })
  })

  return () => ctx.revert()
}, [])
```

---

## Mobile Optimization

### Desktop vs Mobile Considerations

**Desktop:** Full parallax, frame sequences, complex animations OK

**Mobile:** Simplify if performance drops

```typescript
const isMobile = window.innerWidth < 768

if (isMobile) {
  // Reduce animation complexity
  gsap.to('.element', { duration: 0.3 }) // Faster
} else {
  // Full animation
  gsap.to('.element', { duration: 0.8 }) // Smoother
}
```

---

## Debugging Animations

### "Animation is jittery"

1. **Profile with DevTools Performance tab**
   - Record 2-second scroll
   - Look for red bars (layout thrashing)
   - Check FPS (should be 60)

2. **Check animated properties**
   - Bad: `width`, `height`, `margin`
   - Good: `transform`, `opacity`

3. **Use `will-change` CSS**
   ```css
   .animated {
     will-change: transform, opacity;
   }
   ```

### "Animation is slow on mobile"

1. Reduce `duration` on mobile
2. Remove parallax on small screens
3. Use `prefers-reduced-motion` to detect low-performance devices
4. Test on actual device (emulation not accurate)

### "Memory keeps growing"

1. Check that `ctx.revert()` runs on unmount
2. Look for event listeners not being removed
3. Use DevTools Memory tab to profile leaks

---

## Animation Checklist (Before Ship)

- [ ] Animation has a purpose (reveals content, guides attention)
- [ ] Animation is smooth (60fps on mid-range devices)
- [ ] Animation cleans up (ctx.revert() on unmount)
- [ ] Animation respects prefers-reduced-motion
- [ ] Animation uses transform/opacity only
- [ ] Animation tested on mobile/tablet/desktop
- [ ] No console errors or warnings
- [ ] Approved by design lead for feel

---

**Invoke with:** "How should I animate [element/section]?"  
**Owned by:** Frontend Dev + Design Lead  
**Tech:** GSAP, ScrollTrigger, Three.js (for 3D), Canvas (for procedural)
