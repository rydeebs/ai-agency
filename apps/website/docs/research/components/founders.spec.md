# Founders Section Specification

## Overview
- **Target file:** `src/components/FoundersSection.tsx`
- **Interaction model:** Static
- **Height:** ~1188px

## DOM Structure
```
div.section_founders#team (NOTE: this is a div, not section)
  └── div.padding-section-card
      └── div (dark card)
          ├── div.text_center (header)
          │   ├── span "TEAM" (label)
          │   └── h2 "We're not just entrepreneurs, [we're designers at heart.]"
          ├── p (subtitle) "A global team dedicated to helping make your dream design a reality."
          ├── div.founders_grid (team member cards)
          │   ├── div.founder_card { img, name, role }
          │   └── div.founder_card × N
          └── div.team_video_wrapper (full-width team video)
              └── video (Figma-like collaboration view with team names)
```

## Computed Styles

### Dark card container
- backgroundColor: rgb(23, 24, 27) = #17181B (same as hero)
- borderRadius: 12px
- padding: 80px
- color: rgb(255, 255, 255)
- Background pattern: same CSS grid lines as hero

### "TEAM" label
- fontSize: 12px, letterSpacing: 2px, textTransform: uppercase
- color: rgba(255, 255, 255, 0.5)

### h2
- fontSize: 80px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: rgb(255, 255, 255)
- "we're designers at heart." portion: color: rgb(211, 244, 99) = #D3F463 (lime)
- textAlign: center

### Founder cards
- Each has photo, name, role/title
- Photo: circular or rounded, ~120px
- Name: white, fontWeight: 600
- Role: muted white

### Team video
- Full width of the dark card
- Shows the team in a Figma-like collaboration interface
- Multiple team member name badges visible: Mykhailo, Maxim, Rosario, Benjamin, Mycha
- Autoplay, loop, muted

## Assets
- Team photos: `/images/team-rob.png`, `/images/team-mani.png`
- Founder image: `https://cdn.prod.website-files.com/669ebf75d94a827d6cc17898/6715e9fd44f29fdd838c5f32_benjamin-...`
- Team collaboration video: (full-screen dark video with team name badges)

## Text Content (verbatim)
- Label: "TEAM"
- H2: "We're not just entrepreneurs, we're designers at heart."
- Subtitle: "A global team dedicated to helping make your dream design a reality."

## Responsive Behavior
- **Desktop:** Wide heading, grid of founder cards, full-width video
- **Mobile:** Stacked, heading shrinks
