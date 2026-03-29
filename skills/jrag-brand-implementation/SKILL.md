# JRAG Brand Implementation

**Problem this skill solves:** Agents need clear guidance on how to apply JRAG's "noble vs rigorous" archetype to every design and feature decision.

**When to invoke:** Before designing any page, component, or feature. When brand direction feels unclear or conflicted.

## Overview

JRAG works because of a specific brand tension: premium desire + operational rigor must coexist. The "noble vs rigorous" archetype system is how we make this tension visible in every pixel.

This skill operationalizes that system for your entire team.

## The Two Archetypes

### Noble Archetype (Desire)

**Situations:**
- Homepage hero
- Product showcase
- About/story pages
- Terroir/origin content
- Emotional brand moments

**Visual Language:**
- Large, confident images (50-100% of section height)
- Spacious white space (80px+ padding)
- Soft premium typography (Quicksand + Lato)
- Lyrical, elevated copy
- Parallax, fade-up, text reveal animations
- High emotion, low information density

**Example:** Hero section with full-width oyster image, minimal text, smooth parallax as user scrolls

### Rigorous Archetype (Proof)

**Situations:**
- Product specs
- Certifications page
- B2B fact sheets
- Logistics & supply info
- Operational transparency

**Visual Language:**
- Tight grids (2-3 columns max)
- Structured data blocks (label + value alignment)
- Condensed typography (Roboto Condensed)
- Direct, factual copy (specifications, not stories)
- No animation (or background-only)
- High information density, low decoration

**Example:** Grid showing 6 product certifications with badges, storage requirements, and lead times

## Decision Framework

### For Every Design Decision, Ask These Questions

1. **Is this page meant to inspire or inform?**
   - Inspire? → Use Noble archetype (image-led, emotional)
   - Inform? → Use Rigorous archetype (proof-led, factual)
   - Both? → Include both (see "Important Pages" below)

2. **What's the primary user emotion?**
   - "I want to desire this product" → Noble
   - "I want to trust this supplier" → Rigorous
   - "I want both" → Important page rule applies

3. **What's the audience mode?**
   - Professionnels (B2B) → Usually Rigorous (trust, proof, capacity)
   - Particuliers (B2C) → Usually Noble (inspiration, desire)
   - Shared → Can be both

4. **Are we showing or telling?**
   - Showing (images, visual storytelling) → Noble
   - Telling (specs, facts, labels) → Rigorous

### For Important Pages: The "Both" Rule

Key pages MUST include both archetypes in visible, distinct sections:

**Homepage Example:**
```
[Section 1 - Noble] Parallax intro hero
[Section 2 - Noble] Scrollytelling story
[Section 3 - Rigorous] Structured proof block (certifications)
[Section 4 - Noble] Product showcase
[Section 5 - Route] Audience choice
```

**Landing Page (Professionnels) Example:**
```
[Section 1 - Rigorous] "We export 250+ tonnes annually"
[Section 2 - Rigorous] Certifications grid
[Section 3 - Noble] Origin story with image
[Section 4 - Rigorous] Supply specs table
[Section 5 - Rigorous] "Contact Pro" CTA
```

### For B2C/B2B Copy: Tone Test

**Professionnels copy should use:**
- "Nous exportons," "standards," "production," "certifications," "capacity"
- Direct commands: "Contact us," "Request dossier"
- Numbers: tonnage, certifications count, years in business

**Particuliers copy should use:**
- "Découvrez," "terroir," "heritage," "saison," "craft," "pure"
- Invitations: "Explore," "Try," "Experience"
- Stories: origin, seasonal availability, recipes

**If you're mixing language, you haven't chosen your archetype.**

## Implementation Checklist

Before shipping any page/feature:

- [ ] Archetype is consciously chosen (Noble, Rigorous, or Both)
- [ ] If "Both," both are visibly distinct (usually a section break)
- [ ] Visual language matches archetype (spacing, typography, animation)
- [ ] Copy tone matches archetype (lyrical vs factual)
- [ ] Imagery matches archetype (emotional vs informational)
- [ ] CTA aligns to audience mode (Professional "Contact Pro" vs B2C "Shop")
- [ ] No archetype mixing within a section (don't put specs inside emotional copy block)
- [ ] CEO has approved archetype choice

## Examples

### Example 1: Oyster Product Page (B2C)

**Structure:**
```
[Noble] Hero image of oyster on ice
[Noble] Lyrical description + tasting notes
[Rigorous] Specs grid (origin, grade, shelf-life)
[Noble] Recipe card with usage ideas
[Route] "Add to Cart" button
```

**Red flags that would fail CEO review:**
- ❌ Hero image is small (should be dominant)
- ❌ Copy says "Grade A certified oysters" (too rigorous for B2C hero)
- ❌ Specs section has animation/decorations (should be clean grids)
- ❌ No "Add to Cart" CTA

### Example 2: Professionnels Certifications Page (B2B)

**Structure:**
```
[Rigorous] "Industry certifications" headline
[Rigorous] Grid of 8 certification badges with links
[Rigorous] Compliance table (standard, requirement, status)
[Rigorous] "Request full audit trail" link
```

**Red flags:**
- ❌ Hero image (should go straight to facts)
- ❌ Lyrical copy (be direct, prove it)
- ❌ Generic phrasing (be specific about standards)
- ❌ Missing CTA (what does admin do next?)

### Example 3: Homepage (Both Archetypes)

**Structure:**
```
[Noble] Full-screen parallax intro + "Dakhla" reveal
        (parallax, animation, minimal text)
        
[Noble] Scrollytelling oyster production story
        (1,746 frame animation, emotional narration)
        
[Rigorous] Proof block with hard numbers
           - 250 tonnes/year
           - 15 years experience
           - 5 international certifications
           (Grid, numbers, facts, no animation)
           
[Noble] Product showcase with beautiful images
        (Cinematic product photography, minimal specs)
        
[Route] "Choose your journey: Professionnels vs Particuliers"
```

This homepage works because:
- Clear archetype shifts (noble → rigorous → noble → route)
- Both sides of the brand visible
- User knows what to do next (choose audience)
- Premium feel + credibility

## When to Call This Skill

1. **Before designing a new page** — "What archetype should this page be?"
2. **During design review** — "Does this feel right for the archetype?"
3. **During copywriting** — "Is this tone matching the archetype?"
4. **During code review** — "Does the animation/spacing match the visual language?"
5. **When brand feels drifted** — "Are we keeping both sides of the tension?"

---

**Invoke with:** "How should I apply the noble vs rigorous archetype to [page/feature]?"  
**Owned by:** CEO + Design Lead  
**Affects:** All pages, all features, all copy, all design decisions
