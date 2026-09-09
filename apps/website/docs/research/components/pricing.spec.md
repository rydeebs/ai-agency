# Pricing Section Specification

## Overview
- **Target file:** `src/components/PricingSection.tsx`
- **Interaction model:** Static (no tabs, straightforward card layout)
- **Height:** ~1001px

## DOM Structure
```
section.section_pricing#pricing
  └── div.padding-section-card
      └── div.container-large
          ├── div.pricing_info_wrapper (header area)
          │   ├── span "PRICING" (label)
          │   ├── h2 "One subscription for all your design needs."
          │   ├── div.strip_banner_tags (feature tag pills)
          │   │   ├── "1 request at a time"
          │   │   ├── "Average 24 hour delivery"
          │   │   ├── "Unlimited brands"
          │   │   ├── "Webflow development"
          │   │   └── "Unlimited revision rounds"
          │   └── div (upsell CTA) → "Not sure if it's for you? Get a full-time designer for 5 days at $1000..."
          └── div.pricing_card_holder (cards grid)
              ├── div.pricing_card (main subscription card)
              │   ├── h3 "Design On-demand"
              │   ├── p "Netflix for design: pay once per month..."
              │   ├── div.price "$4,995/month"
              │   └── a.button "Book a Call ↗" (dark button)
              └── div.pricing_card.alt (pitch deck upsell)
                  ├── logo "↗ PitchDeckCreators.com"
                  ├── p "Need a full pitch deck custom made?..."
                  └── a "Get more info ↗"
```

## Computed Styles

### Section
- backgroundColor: transparent (#EFEFEF shows)
- paddingTop: 128px, paddingBottom: 128px

### "PRICING" label
- fontSize: 12px
- fontWeight: 600
- letterSpacing: 2px
- color: rgb(93, 97, 106) = #5D616A
- textTransform: uppercase

### h2 heading
- fontSize: 84px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(23, 24, 27) = #17181B
- "for all your design needs." in purple #8D96FD

### Feature tag pills (.strip_banner_tag)
- display: inline-flex
- alignItems: center
- border: 1px solid rgb(170, 172, 180)
- borderRadius: 100px
- padding: 8px 16px
- fontSize: 14px
- color: rgb(93, 97, 106)
- gap: 8px between tags

### Main pricing card
- backgroundColor: rgb(255, 255, 255) or light
- borderRadius: 16px
- padding: 40px
- border: 1px solid #E0E0E0

### Price display
- Number: large text, Darker Grotesque, fontSize: ~56px, color: #17181B
- "/month" label: smaller, color: #5D616A
- "$4,995/month" = $4,995 in large + /month in small

### "Book a Call" button
- backgroundColor: rgb(23, 24, 27) = #17181B (dark)
- color: rgb(255, 255, 255) = white
- borderRadius: 8px
- padding: 16px 28px
- fontSize: 18px
- fontWeight: 700
- width: 100% or large button

## States & Behaviors

### Hover on cards
- Slight box-shadow lift: boxShadow: 0 8px 32px rgba(0,0,0,0.12)
- transition: all 0.2s ease

## Text Content (verbatim)
- Label: "PRICING"
- H2: "One subscription for all your design needs."
- Tags: "1 request at a time", "Average 24 hour delivery", "Unlimited brands", "Webflow development", "Unlimited revision rounds"
- Card title: "Design On-demand"
- Card subtitle: "Netflix for design: pay once per month, ask for anything as much as you want."
- Price: "$4,995/month"
- Button: "Book a Call ↗"
- Upsell: "Not sure if it's for you? Get a full-time designer for 5 days at $1000, satisfied or refunded."
- Pitch deck: "↗ PitchDeckCreators.com — Need a full pitch deck custom made? Let's work together."

## Responsive Behavior
- **Desktop:** 2-column pricing cards side by side
- **Mobile:** Stack vertically
