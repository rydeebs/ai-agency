# Ticker Strips Section Specification

## Overview
- **Target file:** `src/components/TickerStrips.tsx`
- **Interaction model:** CSS marquee animation (2 strips, opposite directions)
- **Height:** ~408px total

## DOM Structure
```
section.section_ticker_strips.overflow-hidden
  ├── div.ticker_strip (strip 1 — dark black background)
  │   └── div.ticker_inner (animates left, contains 2x duplicated items)
  │       └── div.ticker_item × N
  │           ├── div.ticker_check_icon ✓
  │           └── span "Service Name"
  └── div.ticker_strip (strip 2 — yellow background)
      └── div.ticker_inner (animates right/reverse)
          └── div.ticker_item × N
              ├── div.ticker_check_icon ✓
              └── span "Service Name"
```

## Computed Styles

### section
- overflow: hidden
- backgroundColor: transparent (body bg #EFEFEF shows)

### Strip 1 (dark)
- backgroundColor: rgb(23, 24, 27) = #17181B (black)
- height: ~184px
- display: flex
- alignItems: center
- overflow: hidden

### Strip 2 (yellow)
- backgroundColor: rgb(255, 225, 118) = #FFE176 (yellow)
- height: ~184px (could be shorter ~120px)
- Same layout as strip 1

### Ticker item
- display: inline-flex
- alignItems: center
- gap: 12px
- padding: 0 24px
- whiteSpace: nowrap

### Check icon
- backgroundColor: dark/lime circle
- borderRadius: 50%
- width: 28px, height: 28px
- Contains checkmark ✓

### Item text (strip 1 — dark)
- color: rgb(255, 255, 255) = white
- fontSize: 20px
- fontWeight: 500
- fontFamily: DM Sans

### Item text (strip 2 — yellow)
- color: rgb(23, 24, 27) = #17181B (dark)
- fontSize: 20px
- fontWeight: 500

### Check icon (strip 1)
- backgroundColor: rgb(211, 244, 99) = #D3F463 (lime) on dark strip
- color: #17181B

### Check icon (strip 2)
- backgroundColor: rgb(23, 24, 27) = #17181B on yellow strip

## States & Behaviors

### Strip 1 animation
- **Direction:** Left (content scrolls right to left)
- `animation: marquee 30s linear infinite`

### Strip 2 animation
- **Direction:** Right (content scrolls left to right — reverse)
- `animation: marquee-reverse 30s linear infinite`

## Service Items (Strip 1 — dark)
Stationery, Infographics, LinkedIn carousel, Email graphics, Merchandise, Icons, Logos & brand identities, Wireframes, + more

## Service Items (Strip 2 — yellow)
Business cards, Resumes, Digital ads, Mobile apps UI, SAAS UI, Brand guidelines, Signages, Trade show banners, + more

## Responsive Behavior
- Same on all breakpoints, just smaller text
- Overflow hidden clips the edges
