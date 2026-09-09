# CTA Section Specification

## Overview
- **Target file:** `src/components/CTASection.tsx`
- **Interaction model:** Static
- **Height:** ~682px

## DOM Structure
```
section.section_cta
  └── div.padding-section-card
      └── div.cta_card (full-width card with background image)
          ├── img.cta_bg_image (avif background image)
          ├── div.cta_content (centered overlay content)
          │   ├── h2 "Get any design, incredibly fast"
          │   ├── p "Click here, and we will be in touch within 24 hours."
          │   └── div.cta_buttons
          │       ├── a.button.is-large "Get Started ↗" (lime)
          │       └── a.button.is-secondary "Book a Call ↗" (dark/white)
```

## Computed Styles

### .cta_card
- position: relative
- borderRadius: 16px
- overflow: hidden
- minHeight: 500px
- display: flex, alignItems: center, justifyContent: center

### Background image
- position: absolute, inset: 0
- objectFit: cover, width: 100%, height: 100%
- Image: `/images/cta-background.avif` (dark with some texture/gradient)
- zIndex: 0

### .cta_content
- position: relative
- zIndex: 10
- textAlign: center
- display: flex, flexDirection: column, alignItems: center, gap: 24px
- color: white

### h2
- fontSize: 80px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(255, 255, 255)

### p
- fontSize: 20px
- color: rgba(255, 255, 255, 0.7)

### "Get Started" button
- backgroundColor: rgb(211, 244, 99) = #D3F463
- color: #17181B
- borderRadius: 8px
- padding: 20px 40px
- fontSize: 18px, fontWeight: 700

### "Book a Call" button
- backgroundColor: rgb(255, 255, 255)
- color: #17181B
- borderRadius: 8px
- padding: 20px 40px
- fontSize: 18px, fontWeight: 700

## Text Content (verbatim)
- H2: "Get any design, incredibly fast"
- P: "Click here, and we will be in touch within 24 hours."
- Button 1: "Get Started ↗"
- Button 2: "Book a Call ↗"

## Responsive Behavior
- **Desktop:** Large centered text on background image
- **Mobile:** Smaller text, buttons stack vertically
