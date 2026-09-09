# Sticky Cards Section Specification

## Overview
- **Target file:** `src/components/StickyCardsSection.tsx`
- **Interaction model:** SCROLL-DRIVEN stacking — NOT click-driven
- **Height:** 2516px (tall section to accommodate scroll-driven reveals)

## DOM Structure
```
section.section_sticky_cards#why-us
  └── div.padding-section-card
      └── div.container-large
          └── div (2-column grid)
              ├── div.stacking_card_heading (LEFT — sticky as you scroll)
              │   ├── span "WHY US?"
              │   ├── h2 "Exceptional designs without compromise."
              │   │   (where "without compromise." is purple/lavender colored)
              │   └── p "We know what it is to need your design ASAP and perfect; we created this service with this in mind."
              └── div.stacking_card_wrapper (RIGHT — cards stack here)
                  ├── div.stacking_card.is_first (lime green)
                  ├── div.stacking_card.is_second (purple)
                  ├── div.stacking_card.is_third (pink)
                  ├── div.stacking_card.is_fourth (yellow)
                  ├── div.stacking_card.is_fifth (lime green)
                  ├── div.stacking_card.is_sixth (purple)
                  ├── div.stacking_card.is_seventh (pink)
                  └── div.stacking_card.is_eighth (yellow)
```

## Computed Styles

### Section container
- backgroundColor: transparent (body bg shows through: #EFEFEF)
- paddingTop: 128px, paddingBottom: 128px

### Left heading (.stacking_card_heading)
- position: sticky
- top: 128px (sticks 128px from top of viewport)
- height: fit-content
- padding: 0

### h2 (section heading)
- fontSize: 64px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(23, 24, 27) = #17181B
- "without compromise." portion: color: rgb(141, 150, 253) = #8D96FD (purple)

### label "WHY US?"
- fontSize: 12px
- fontWeight: 600
- letterSpacing: 2px
- color: rgb(93, 97, 106) = #5D616A
- textTransform: uppercase

### paragraph
- fontSize: 18px
- color: rgb(93, 97, 106) = #5D616A
- maxWidth: 400px

### Each stacking card (.stacking_card)
- height: ~272-288px
- borderRadius: 16px
- display: flex
- overflow: hidden
- marginBottom: 16px
- position: sticky with increasing top offset (stacking effect)
- Two columns inside: left (text) / right (video)

## The 8 Cards (content, bg color, video)

### Card 1 — is_first
- backgroundColor: rgb(216, 246, 111) = #D8F66F (lime)
- heading: "Ultra-fast delivery"
- text: "If it takes us two hours, you'll get it in two hours, not days."
- video: `/videos/card-1-ultra-fast.mp4`

### Card 2 — is_second
- backgroundColor: rgb(141, 150, 253) = #8D96FD (purple)
- heading: "Any design asset, from web to motion"
- text: "We have experts in countless design fields; we'll handle each request perfectly."
- video: `/videos/card-2-netflix-design.mp4`

### Card 3 — is_third
- backgroundColor: rgb(255, 125, 132) = #FF7D84 (pink/coral)
- heading: "Flexible: pay monthly, pause anytime"
- text: "If you don't need the service, just pause it: no questions asked."
- video: (card 3 video)

### Card 4 — is_fourth
- backgroundColor: rgb(255, 225, 118) = #FFE176 (yellow)
- heading: "Dedicated project management platform"
- text: "No more doubt: the status of any design request is at your fingertips."
- video: (card 4 video)

### Card 5 — is_fifth
- backgroundColor: rgb(216, 246, 111) = #D8F66F (lime)
- heading: "We're always there, 100% uptime"
- text: "No matter what, we'll always manage your request: no sick days."
- video: `/videos/card-5-support.mp4`

### Card 6 — is_sixth
- backgroundColor: rgb(141, 150, 253) = #8D96FD (purple)
- heading: "Unlimited revision rounds"
- text: "We're done with the design once you're 100% satisfied."
- video: `/videos/card-6-revisions.mp4`

### Card 7 — is_seventh
- backgroundColor: rgb(255, 125, 132) = #FF7D84 (pink)
- heading: "100% unique designs"
- text: "We're done with the design once you're 100% satisfied."
- video: `/videos/card-7-unique-designs.mp4`

### Card 8 — is_eighth
- backgroundColor: rgb(255, 225, 118) = #FFE176 (yellow)
- heading: "Dedicated project manager"
- text: "No more doubt: the status of any design request is at your fingertips."
- video: `/videos/card-8-project-manager.mp4`

## States & Behaviors

### Stacking scroll behavior (CRITICAL)
- **Interaction model:** SCROLL-DRIVEN — cards stack as user scrolls DOWN
- **Implementation:** Each card has `position: sticky` with increasing `top` values
  - Card 1: top: 160px
  - Card 2: top: 176px (+16px)
  - Card 3: top: 192px (+16px)
  - etc. (each card peeks above the previous one)
- As user scrolls, cards stack on top of each other
- The left heading column also has `position: sticky; top: 128px`
- **DO NOT implement as click-driven tabs**

### Card layout (inside each card)
- Left half: heading + description text (padding: 32px)
- Right half: video element (autoplay, loop, muted, covers full right half)
- Card heading: Darker Grotesque, ~32-40px, fontWeight: 700, color: #17181B
- Card text: DM Sans, 16px, color: rgba(23,24,27,0.7)

## Responsive Behavior
- **Desktop:** 2-column (left sticky + right stacking cards)
- **Mobile:** Single column, cards lose sticky behavior, stacking becomes simple vertical list
- **Breakpoint:** ~768px
