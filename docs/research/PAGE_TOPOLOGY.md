# Page Topology — creativepropeller.com

## Page Overview
Dark-themed design agency landing page. Light gray body bg (#EFEFEF) with dark hero and dark founders/footer sections.
Page height: ~10,825px. Scroll-driven animations throughout.

## Section Order (top to bottom)

| # | Working Name | Selector | Height | Interaction Model | Notes |
|---|---|---|---|---|---|
| 1 | Navbar | `.nav_component` | 112px | Static (transparent) | Fixed z-index, overlaps hero |
| 2 | Hero | `.section_hero` | 954px | Static | Dark bg, grid pattern, glowing lime element |
| 3 | ClientLogoBanner | `.client_logo_banner` | 128px | CSS marquee animation | Inside hero, pill-shaped logo containers |
| 4 | Reviews | `#reviews.section_client_feedback` | 1574px | Click (carousel) | Floating avatars, testimonial cards, portfolio grid |
| 5 | WhatWeDo | `.section_what_we_do` | 890px | Static | Two-column: dark card + light card with video |
| 6 | StickyCards | `.section_sticky_cards` | 2516px | Scroll-driven stacking | 8 cards stack as you scroll, left heading is sticky |
| 7 | TickerStrips | `.section_ticker_strips` | 408px | CSS marquee animation | 2 strips: dark + yellow, scrolling design service tags |
| 8 | Pricing | `.section_pricing` | 1001px | Static/Click | Subscription cards, book a call card |
| 9 | Founders | `.section_founders` | 1188px | Static | Dark section, large heading, team photo |
| 10 | FAQ | `.section_faq` | 741px | Click (accordion) | Left: heading + CTA link, Right: accordion items |
| 11 | SecondFeedback | `.section_client_feedback` (2nd) | 548px | Static | Small testimonial section |
| 12 | CTA | `.section_cta` | 682px | Static | Full-width CTA with bg image |
| 13 | Footer | `.section_footer` | 324px | Static | Black bg, 3 columns |

## Z-index Layers
- Navbar: z-index 1000, position: relative (scrolls with page)
- Hero dark card: position: relative, overflow: hidden
- Stacking cards: z-index 10 container

## Global Layout
- Main wrapper: `.main-wrapper` (no fixed scroll container)
- No Lenis or custom smooth scroll detected
- Body bg: rgb(239, 239, 239) = #EFEFEF
- Dark sections (hero, founders, footer): bg rgb(23, 24, 27) = #17181B
