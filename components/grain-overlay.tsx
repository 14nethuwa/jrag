import React from 'react'
import styles from './grain-overlay.module.css'

/**
 * ⚡ Bolt Performance Optimization:
 * We use React.memo here because GrainOverlay is used inside ScrollyTellingSection,
 * which updates its state (`progress`) continuously on every scroll tick via GSAP.
 * Since GrainOverlay's props don't change during the scroll animation, memoizing it
 * prevents it from unnecessarily re-rendering on every single frame, reducing React
 * render cycle overhead and ensuring a smoother 60fps scroll experience.
 */
export const GrainOverlay = React.memo(function GrainOverlay() {
  return <div className={styles.grain} aria-hidden="true" />
})
