# Hero Section Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/hero-top.png`
- **Interaction model:** Static with CSS animation (glowing element spins)

## DOM Structure
```
section.section_hero (height: 954px, overflow: hidden, position: relative)
  ├── div.padding-section-card
  │   ├── nav.nav_component [see navbar spec]
  │   ├── div.hero_content (left side content)
  │   │   ├── div.tag_badge "🇨🇭 Based in Switzerland"
  │   │   ├── h1.hero-header-text "Design\nOn-demand"
  │   │   ├── ul.feature_list
  │   │   │   ├── li "✦ Same day delivery*"
  │   │   │   ├── li "✦ Dedicated project manager"
  │   │   │   └── li "✦ Any Design asset"
  │   │   └── a.button.is-large "Get Started ↗" (lime green, large)
  │   └── div.success_number_wrapper (stats row)
  │       ├── div "+50\nprojects completed"
  │       ├── div "+1000\nhours of creative work"
  │       └── div "+300\nHours Spent Finding the Perfect Font"
  ├── div.glowing-wrapper (animated lime glow, positioned right side)
  │   └── div.glowing-wrapper-glow (conic-gradient spinner)
  └── div.client_logo_banner (scrolling logos, see separate spec)
```

## Computed Styles

### section.section_hero
- height: 954px
- display: flex
- flexDirection: column
- overflow: hidden
- position: relative
- color: rgb(255, 255, 255)

### Dark card container (wraps hero content)
- backgroundColor: rgb(23, 24, 27) = #17181B
- borderRadius: 12px
- position: relative
- overflow: hidden
- Background pattern: CSS grid lines — linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px) repeating at ~160px intervals

### h1.hero-header-text
- fontSize: 144px
- fontFamily: Darker Grotesque, sans-serif
- fontWeight: 500
- color: rgb(255, 255, 255)
- lineHeight: ~1.0 (very tight)
- letterSpacing: -2px approximately
- "Design" and "On-demand" on separate lines

### Badge "Based in Switzerland"
- Small pill/tag with CH flag emoji
- border: 1px solid rgba(255,255,255,0.3)
- borderRadius: 100px
- padding: 6px 14px
- fontSize: 14px
- color: white
- display: inline-flex, alignItems: center, gap: 8px

### Feature list items
- "✦" icon in lime green (#D3F463) before each item
- fontSize: 16px
- color: rgb(255, 255, 255) or rgba(255,255,255,0.8)
- display: flex, alignItems: center, gap: 8px

### "Get Started" button (large)
- backgroundColor: rgb(211, 244, 99) = #D3F463
- color: rgb(23, 24, 27) = #17181B
- borderRadius: 8px
- padding: 20px 32px
- fontSize: 18px or 20px
- fontWeight: 700
- display: inline-flex, alignItems: center, gap: 8px

### Stats row (success_number_wrapper)
- display: flex, gap: 24px+
- positioned at bottom of hero
- Number: large text, color: #D3F463 (lime)
- Label: small text, color: rgba(255,255,255,0.6)

### Glowing element
- Position: absolute, right side of hero
- `.glowing-wrapper-glow`: conic-gradient(rgba(211, 244, 99, 0.5) 0deg, transparent 60deg, transparent 310deg, rgba(211, 244, 99, 0.5) 360deg)
- Animation: rotate 360deg, duration ~8s linear infinite
- Size: ~400-600px circle
- Blur: filter: blur(60px) or similar

## States & Behaviors

### Glowing element spin
- **Trigger:** page load (always animates)
- **Animation:** CSS @keyframes rotate 360deg, 8s linear infinite
- **Implementation:** `animation: spin-slow 8s linear infinite` on the gradient element

## Assets
- No image assets needed for the hero itself
- Grid pattern: pure CSS
- Flag emoji: text or small SVG (flag-uk.svg for English locale)

## Text Content (verbatim)
- H1: "Design\nOn-demand" (two lines, giant text)
- Badge: "🇨🇭 Based in Switzerland"
- List items: "✦ Same day delivery*", "✦ Dedicated project manager", "✦ Any Design asset"
- Button: "Get Started ↗"
- Stats: "+50 projects completed", "+1000 hours of creative work", "+300 Hours Spent Finding the Perfect Font"

## Responsive Behavior
- **Desktop (1440px):** Full layout, h1 at 144px
- **Mobile (390px):** h1 shrinks to ~60-80px, stacks vertically
- **Breakpoint:** ~768px
