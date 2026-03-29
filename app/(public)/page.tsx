import { ParallaxIntroSection } from '@/components/parallax-intro-section'
import { ScrollytellingSection, ScrollYDebug } from '@/components/scrollytelling-section'

export default function HomePage() {
  return (
    <>
      {/* Debug: scrollY counter — lives here so transform on child containers doesn't trap it */}
      <ScrollYDebug />

      {/* TODO: Split entry choice (Professionnels / Particuliers) goes here */}

      {/* Parallax SVG Intro */}
      <ParallaxIntroSection />

      {/* Scrollytelling — shared across both audience paths */}
      <ScrollytellingSection />
    </>
  )
}
