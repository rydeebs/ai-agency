# Client Logo Banner Specification

## Overview
- **Target file:** `src/components/ClientLogoBanner.tsx`
- **Interaction model:** CSS marquee animation (infinite horizontal scroll)

## DOM Structure
```
div.client_logo_banner (height: 128px, overflow: hidden)
  └── div.client_logo_container (display: flex, animation: marquee)
      ├── div.client_logo_wrapper × 8 (pill shape, each unique logo)
      │   └── svg.client_logo.[name] (inline SVG logo)
      └── div.client_logo_wrapper × 8 (duplicate set for infinite loop)
```

## Computed Styles

### .client_logo_banner
- height: 128px
- overflow: hidden
- backgroundColor: transparent (sits on dark hero card)
- padding: 0 (edge-to-edge)

### .client_logo_container
- display: flex
- flexDirection: row
- alignItems: center
- gap: 16px (approx)
- animation: marquee 30s linear infinite
- width: fit-content (wider than viewport)

### .client_logo_wrapper (each pill)
- border: 1px solid rgb(170, 172, 180) = #AAACB4
- borderRadius: 1440px (fully rounded pill)
- width: varies (226px–274px range)
- height: 128px
- display: flex
- alignItems: center
- justifyContent: center
- padding: 0 32px
- backgroundColor: transparent

## Logo Names (8 unique, each repeated ~5-6 times for 46 total)
1. **decko** — "DECK○ THE DECK COMPANY" logo (bull icon + wordmark)
2. **prosper** — "Prosper" wordmark
3. **keenee** — "Keenee" wordmark
4. **bryd** — logo
5. **luckybet** — logo
6. **sekuure** — logo
7. **bchar** — logo
8. **mad** — logo

Also visible in screenshots: Lumina (diamond icon), "Goa Ventures", "Your Friends Are Boring ☺", "535West", "CryptoLock", "AInfluence", "Off the Grid", "Veratad", "Upwardli"

## States & Behaviors

### Marquee Animation
- **Trigger:** Page load (always plays)
- **Direction:** Left (content moves right to left)
- **Speed:** ~30s per loop
- **Implementation:**
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  /* Duplicate the logo set, animate the full container */
  ```
- The logo container contains 2 complete sets of logos (16 total wrappers with 8 unique logos)
- translateX(-50%) moves exactly one set width, creating seamless loop

## Text Content
Use these logo names for text fallbacks if SVGs are not available:
Decko, Prosper, Keenee, Bryd, LuckyBet, Sekuure, Bchar, Mad

## Responsive Behavior
- **Desktop:** Full-width marquee
- **Mobile:** Same marquee at smaller scale
- Overflow hidden on parent ensures clean edges
