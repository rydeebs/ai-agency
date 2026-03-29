# Reviews / Client Feedback Section Specification

## Overview
- **Target file:** `src/components/ReviewsSection.tsx`
- **Interaction model:** Static (floating avatars are positioned absolutely, testimonial cards scroll or are static)
- **Height:** ~1574px (first occurrence)

## DOM Structure
```
section#reviews.section_client_feedback
  └── div.padding-section-card
      └── div.container-large
          ├── div.floating_avatars (absolutely positioned avatar bubbles)
          │   ├── div.avatar_bubble { img + span "Amazing buddy!" (lime) } — left
          │   ├── div.avatar_bubble { img + span "Perfect" (blue) } — center-right
          │   └── div.avatar_bubble { img + span "All good" (yellow) } — far right
          ├── div.section_header
          │   ├── span "CLIENT REVIEWS" (label)
          │   └── h2 "Don't take our word for it."
          ├── div.testimonial_card_row (horizontal scroll row of testimonial cards)
          │   └── div.testimonial_card × 5+ (each has author + quote)
          └── div.portfolio_grid (grid of project screenshots)
              └── div.portfolio_item × 6+ (each project card with image + title)
```

## Computed Styles

### Section background
- backgroundColor: rgb(239, 239, 239) = #EFEFEF (body bg, no special bg)

### Floating avatar bubbles
- position: absolute
- display: flex, alignItems: center, gap: 8px
- Avatar: width 64px, height 64px, borderRadius: 50%, border: 2px solid white
- Badge label: borderRadius: 8px, padding: 6px 12px, fontSize: 14px, fontWeight: 600
  - "Amazing buddy!" = backgroundColor: rgb(211, 244, 99) = #D3F463 lime, color: #17181B
  - "Perfect" = backgroundColor: rgb(0, 122, 255) = #007AFF blue, color: white
  - "All good" = backgroundColor: rgb(255, 225, 118) = #FFE176 yellow, color: #17181B

### "CLIENT REVIEWS" label
- fontSize: 12px, letterSpacing: 2px, textTransform: uppercase
- color: rgb(93, 97, 106) = #5D616A

### h2 "Don't take our word for it."
- fontSize: 80px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(23, 24, 27) = #17181B

### Testimonial card
- backgroundColor: rgb(255, 255, 255) = white
- borderRadius: 16px
- padding: 32px
- border: 1px solid #E8E8E8
- minWidth: ~360px
- display: flex, flexDirection: column, gap: 16px

### Author info in testimonial card
- Name: fontSize: 16px, fontWeight: 700, color: #17181B
- Title/Company: fontSize: 14px, color: #5D616A
- LinkedIn icon: small blue icon

### Quote text in testimonial card
- fontSize: 16px, color: #5D616A, lineHeight: 1.6

### Video testimonial card
- Shows a video thumbnail with play button overlay
- Author name + title in bottom overlay
- borderRadius: 16px
- aspectRatio: ~3/4 or square

### Portfolio grid
- CSS Grid, 3+ columns
- Each item: image fills card, hover shows overlay with project name

## Testimonial Data (from extraction)

| Name | Title | Company | Quote |
|------|-------|---------|-------|
| Rob Blatt | Co-Founder | envoyatHome | "Impressed us working with Benjamin and his team. The first was the ability to really understand our business..." |
| Manni Sidhu | CEO | Modoru | "The team is fantastic and they have a great proposition..." |
| Darren Webb | Co-Founder & CEO | Mindset | (review text) |
| Hyungsuk Kang | CEO | Standard Labs | (video testimonial) |
| CJ van der Westhuizen | Co-Founder | Culabr | "They've been really responsive..." |
| Katherine Galvin | Co-Founder & CEO | AIFluence | (review text) |
| Abraham Micael | Product Strategy & Operations | LaunchXR | "His turnaround times were incredible..." |
| Stephan van Sint Fiet | CEO | Vivici | (video testimonial) |
| Tom Fitzgerald | Strategy Lead | Iterum | "They've been really responsive, great at communicating..." |

## Portfolio Grid Items (from screenshots)
- 535West (dark themed, investment deck mockup)
- Veratad (purple/orange, identity verification platform)
- Upwardli (purple bg, mobile app screens)
- More items...

## Assets
- Avatars: `/images/avatar-darren.avif`, `/images/avatar-cj.avif`, `/images/avatar-katherine.avif`, `/images/avatar-abraham.avif`
- Floating badge avatars: use same avatar images

## States & Behaviors

### Floating avatars
- position: absolute with specific coordinates
- Static (no animation needed — they just float visually)
- Left avatar: bottom-left area
- Center-right avatar: top-right quadrant
- Far-right avatar: right edge

### Testimonial cards
- Horizontal overflow-x scroll OR static wrapping grid
- Video cards: show poster image with ▶ play overlay

## Responsive Behavior
- **Desktop:** Wide heading, horizontal card scroll
- **Mobile:** Stacked cards, heading shrinks
