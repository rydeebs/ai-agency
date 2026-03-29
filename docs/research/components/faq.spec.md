# FAQ Section Specification

## Overview
- **Target file:** `src/components/FAQSection.tsx`
- **Interaction model:** Click-driven accordion
- **Height:** ~741px

## DOM Structure
```
section.section_faq
  └── div.padding-section-card
      └── div.container-large
          └── div (2-column grid)
              ├── div (LEFT — heading + CTA)
              │   ├── span "FAQ" (label)
              │   ├── h2 "Frequently asked questions"
              │   └── p "Didn't find the answer to your question? Then [Book a Call ↗] it right now."
              └── div.js-accordion (RIGHT — accordion items)
                  ├── div.js-accordion-item.active (first item, open)
                  │   ├── div.js-accordion-header (question text + ⊕ icon)
                  │   └── div.js-accordion-body (answer text)
                  └── div.js-accordion-item × 4 (closed items)
```

## Computed Styles

### Section
- backgroundColor: transparent (#EFEFEF body bg)
- paddingTop: 128px, paddingBottom: 128px

### Left column
- maxWidth: ~480px

### "FAQ" label
- fontSize: 12px, letterSpacing: 2px, textTransform: uppercase
- color: #5D616A

### h2 "Frequently asked questions"
- fontSize: 64px
- fontFamily: Darker Grotesque
- fontWeight: 500
- color: #17181B

### "Book a Call" inline link
- color: #17181B
- fontWeight: 700
- Has a small arrow icon in a circle (lime bg)

### Accordion item (.js-accordion-item)
- borderBottom: 1px solid rgb(220, 220, 220)
- padding: 24px 0

### Accordion header (.js-accordion-header)
- display: flex
- justifyContent: space-between
- alignItems: center
- cursor: pointer
- fontSize: 18px
- fontWeight: 600
- color: #17181B

### Toggle icon (.js-accordion-icon)
- width: 32px, height: 32px
- borderRadius: 50%
- backgroundColor: rgb(211, 244, 99) = #D3F463 (lime)
- color: #17181B
- display: flex, alignItems: center, justifyContent: center
- Text: "+" (closed) or "−" (open)

### Accordion body (.js-accordion-body)
- fontSize: 16px
- color: #5D616A
- lineHeight: 1.6
- paddingTop: 12px
- Hidden when closed (height: 0 or display: none)
- Shown when open with animation

## States & Behaviors

### Accordion toggle
- Click header → toggle open/closed
- **Open state:** body visible, icon changes from + to −
- **Closed state:** body hidden
- **Animation:** height transition 0.3s ease, or max-height trick
- **First item:** open by default on load

## FAQ Items (verbatim)

**Q1:** What services are included in the subscription?
**A1:** Your subscription gives you access to unlimited designs, from websites to motion design. We'll work on one request at a time.

**Q2:** How do I submit design requests?
**A2:** You can submit design requests through our designated software platform, providing detailed instructions and context for each task.

**Q3:** What if I need help after the launch?
**A3:** The turnaround time varies based on task complexity. We strive to complete tasks promptly during regular working hours (9 a.m. to 5 p.m. Swiss time, Monday to Friday).

**Q4:** Can I request revisions for my designs?
**A4:** Yes, our service includes unlimited revision rounds. You can request revisions until you are satisfied, as long as the requests are reasonable and not entirely new tasks.

**Q5:** How long does a project take?
**A5:** Imagine you want to build a house. If you want a one-meter square house, it will take much less time than a mansion. The same principle applies to our design services.

## Responsive Behavior
- **Desktop:** 2-column (left heading, right accordion)
- **Mobile:** Stacked (heading on top, accordion below)
- **Breakpoint:** ~768px
