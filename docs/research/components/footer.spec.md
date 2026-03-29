# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** Static
- **Height:** ~324px

## DOM Structure
```
footer.section_footer.background-color-black
  └── div.padding-section-card
      └── div.container-large
          └── div.footer_grid (3-column grid)
              ├── div.footer_brand (LEFT)
              │   └── p "We're not just entrepreneurs, we're designers at heart"
              ├── div.footer_links (CENTER — 2 sub-columns)
              │   ├── div.footer_links_col
              │   │   ├── a "Why us?"
              │   │   ├── a "Our Works"
              │   │   └── a "Services"
              │   └── div.footer_links_col
              │       ├── a "Pricing"
              │       └── a "Reviews"
              └── div.footer_cta (RIGHT)
                  └── a.button "Book a call ↗" (lime green, with circle icon)
          └── div.footer_bottom
              └── p "© 2026 Creative Propeller. Based in Switzerland"
```

## Computed Styles

### footer
- backgroundColor: rgb(0, 0, 0) = black
- color: rgba(255, 255, 255, 0.6)
- paddingTop: 64px
- paddingBottom: 40px

### Footer grid
- display: grid
- gridTemplateColumns: 1fr 1fr 1fr (or 2fr 1fr 1fr)
- gap: 40px
- alignItems: start

### Brand text
- fontSize: 16px
- color: rgba(255, 255, 255, 0.5)
- maxWidth: 240px
- lineHeight: 1.5

### Footer links
- fontSize: 16px
- color: rgba(255, 255, 255, 0.6)
- display: block, marginBottom: 12px
- Hover: color: white

### "Book a call" button
- backgroundColor: rgb(211, 244, 99) = #D3F463
- color: rgb(23, 24, 27)
- borderRadius: 100px (fully rounded)
- padding: 16px 24px
- fontSize: 16px, fontWeight: 700
- Has external arrow icon in a dark circle

### Copyright line
- fontSize: 14px
- color: rgba(255, 255, 255, 0.4)
- marginTop: 48px
- borderTop: 1px solid rgba(255, 255, 255, 0.1)
- paddingTop: 24px

## Text Content (verbatim)
- Brand: "We're not just entrepreneurs, we're designers at heart"
- Links: "Why us?", "Our Works", "Services", "Pricing", "Reviews"
- CTA: "Book a call ↗"
- Copyright: "© 2026 Creative Propeller. Based in Switzerland"

## Responsive Behavior
- **Desktop:** 3-column grid
- **Mobile:** Stack to single column
