# What We Do Section Specification

## Overview
- **Target file:** `src/components/WhatWeDoSection.tsx`
- **Interaction model:** Static (possibly list items animate in)
- **Height:** ~890px

## DOM Structure
```
section.section_what_we_do
  └── div.padding-section-card
      └── div.padding-top.padding-xhuge
          └── div.container-large
              └── div.card_stack_grid (2-column CSS grid)
                  ├── div.dark-card-wrapper (LEFT — dark card with heading + service list)
                  │   ├── span "WHAT DO WE DO?" (label)
                  │   ├── h2 "Netflix for design: pay once per month, [ask for anything as much as you want.]"
                  │   │   (bracketed portion in lime green)
                  │   └── div.service_list_wrapper (scrolling list of services)
                  │       ├── ul.service_list (first pass)
                  │       │   ├── li "• Brand guidelines"
                  │       │   ├── li "• Design systems"
                  │       │   ├── li "• Brochures"
                  │       │   ├── li "• Sales deck design"
                  │       │   └── li "• Digital ads"
                  │       └── ul.service_list (second pass — duplicate for scroll loop)
                  └── div.light-card-wrapper (RIGHT — light card with video)
                      └── video (design platform UI mockup, autoplay loop muted)
```

## Computed Styles

### .card_stack_grid
- display: grid
- gridTemplateColumns: 1fr 1fr (equal halves)
- gap: 16px
- height: 738px

### Dark card (left)
- backgroundColor: rgb(46, 47, 52) or similar dark (not pure black, slightly lighter than #17181B)
- borderRadius: 16px
- padding: 48px
- overflow: hidden
- height: 100%

### "WHAT DO WE DO?" label
- fontSize: 12px, letterSpacing: 2px, textTransform: uppercase
- color: rgba(255,255,255,0.5)

### h2 in dark card
- fontSize: 40px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(255, 255, 255)
- "ask for anything as much as you want." portion: color: rgb(211, 244, 99) = #D3F463

### Service list items
- fontSize: 20px
- color: rgba(255, 255, 255, 0.7)
- fontFamily: DM Sans
- display: flex, alignItems: center, gap: 8px
- "•" bullet in lime (#D3F463)
- Items scroll/animate upward on loop

### Light card (right)
- backgroundColor: rgb(230, 230, 230) or #E8E8E8 (very light gray)
- borderRadius: 16px
- overflow: hidden
- display: flex, alignItems: center, justifyContent: center
- Contains a design platform UI video (Figma-like interface)

### Video element
- autoPlay, loop, muted, playsInline
- objectFit: cover or contain
- width: 100%, height: 100%

## Service Items (verbatim from extraction)
Sales deck design, Digital ads, Website design, Brand guidelines, Design systems, Brochures
(repeated for scroll loop: Sales deck design, Digital ads, ...)

## States & Behaviors

### Service list scroll animation
- The list items scroll upward in a slow loop
- Similar to a vertical ticker/marquee
- **Implementation:** CSS animation translateY(-50%) on the list container

## Responsive Behavior
- **Desktop:** 2-column grid (dark card left, light card right)
- **Mobile:** Stacks vertically, light card on top or below
- **Breakpoint:** ~768px
