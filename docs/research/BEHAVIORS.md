# Behaviors — creativepropeller.com

## Global Behaviors
- No Lenis/Locomotive smooth scroll detected (native browser scroll)
- Custom cursor element: `.cursor` div (green dot that follows mouse)
- Body background: #EFEFEF (light gray) — provides contrast for dark sections

## Section-by-Section Behaviors

### Navbar
- **Scroll behavior:** Transparent over hero, likely gains bg on scroll (check with JS scroll listener)
- **Position:** relative (scrolls with page), z-index: 1000
- **No shrink animation observed**

### Hero
- **Glowing element:** `.glowing-wrapper-glow` — conic-gradient in lime green (#D3F463), likely rotates via CSS animation
- **Stats:** +50, +1000, +300 — animate in (likely countup or fade-in on load)
- **Background:** dark card with CSS grid pattern (grid lines via background-image or SVG)

### Client Logo Banner (within Hero)
- **Interaction model:** CSS marquee/ticker animation
- **46 wrapper items, 8 unique logos** repeated — creates infinite scroll effect
- **Implementation:** CSS `@keyframes` scrolling, or JS-driven marquee

### Sticky Cards Section
- **CRITICAL: Scroll-driven stacking, NOT click-driven**
- Left side: heading + description is `position: sticky` as you scroll
- Right side: 8 cards stack on top of each other as you scroll down
- Each card has a different background color and a video
- Cards: lime, purple, pink, yellow, lime, purple, pink, yellow pattern
- **Implementation:** position:sticky on left, right cards use translateY or IntersectionObserver

### Ticker Strips
- **2 strips:** Row 1 dark (black bg), Row 2 yellow (#FFE176)
- Items have checkmark icons + service name text
- **Infinite marquee animation:** CSS `@keyframes` scroll left

### FAQ
- **Accordion:** clicking question expands answer
- First item is open by default
- Toggle icon: "+" (closed) → some state (open)
- Uses `.js-accordion-item` / `.js-accordion-header` / `.js-accordion-body` classes

### Reviews Section
- Floating avatar badges appear in background (absolutely positioned)
- Testimonial cards scroll horizontally (or auto-carousel)
- Portfolio grid below testimonials (masonry-like layout)

## Hover States
- Buttons: slight scale or brightness change
- Nav links: color change to white
- Cards: slight lift (box-shadow)
- Portfolio items: overlay/caption appears

## Animations
- Hero h1 text: large (144px), Darker Grotesque font
- Section headings: Darker Grotesque, bold weight
- Green highlight text on headings: color #D3F463
- Purple highlight text: color #8D96FD
