# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Screenshot:** `docs/design-references/hero-top.png`
- **Interaction model:** Static (transparent over dark hero)

## DOM Structure
```
nav.nav_component (position: relative, z-index: 1000)
  ├── a.nav_brand (logo link)
  │   └── SVG logo (propeller icon + "CreativePropeller" wordmark)
  ├── ul.nav_menu_list (flex row, gap: 8px)
  │   ├── li.nav_list_item → a.nav_menu_link "About" (href="#team")
  │   ├── li.nav_list_item → a.nav_menu_link "PORTFOLIO"
  │   └── li.nav_list_item → a.nav_menu_link "Prices" (href="#pricing")
  ├── div.nav_buttons_wrapper (flex row, gap: 8px)
  │   ├── a.button.is-small "Get Started ↗" (lime green)
  │   └── a.button.is-secondary-small "Login ↗" (blue)
  └── div (language toggle - UK flag + "English" dropdown)
```

## Computed Styles

### nav.nav_component
- display: block
- width: 1280px (max-width container)
- height: 112px
- padding: 32px 0px 16px
- position: relative
- zIndex: 1000
- backgroundColor: rgba(221, 221, 221, 0) (transparent)
- borderRadius: 12px
- color: rgb(255, 255, 255)
- fontFamily: DM Sans, sans-serif

### nav links (.nav_menu_link)
- color: rgb(170, 172, 180) → #AAACB4
- fontSize: 18px
- fontWeight: 400
- text-transform: UPPERCASE (PORTFOLIO stays uppercase, others sentence case)

### "Get Started" button
- backgroundColor: rgb(211, 244, 99) = #D3F463
- color: rgb(23, 24, 27) = #17181B
- borderRadius: 8px
- padding: 12px 16px
- fontSize: 16px
- fontWeight: 700
- display: flex, alignItems: center, gap: 4px
- Has arrow/external link icon ↗

### "Login" button
- backgroundColor: rgb(0, 122, 255) = #007AFF
- color: rgb(23, 24, 27) = #17181B
- borderRadius: 8px
- padding: 12px 16px
- fontSize: 16px
- fontWeight: 700
- Has arrow icon ↗

## States & Behaviors

### Navigation transparent (default)
- Over the dark hero: transparent background, white logo + nav text
- Over light sections below: likely gains a white/dark background
- **Implementation:** scroll listener adding class when scrolled past hero

### Hover states
- Nav links: color lightens to white (rgb(255,255,255))
- Buttons: slight brightness increase

## Logo
The logo is: a propeller/windmill SVG icon in lime green (#D3F463) + "Creative**Propeller**" wordmark
- "Creative" in lighter weight
- "Propeller" in bold
- Icon color: #D3F463 (lime green)

## Text Content (verbatim)
- Brand: "CreativePropeller"
- Links: "About", "PORTFOLIO", "Prices"
- Buttons: "Get Started ↗", "Login ↗"
- Language: "🇬🇧 English ▾"

## Responsive Behavior
- **Desktop (1440px):** Full nav with all links and buttons visible
- **Mobile (390px):** Hamburger menu, links hidden, only logo + menu button
- **Breakpoint:** ~768px
