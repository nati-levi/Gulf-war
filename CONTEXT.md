# Gulf War Educational Site — Session Context

## Project Overview
A single-page educational website about the First Gulf War (1990–1991), built as a scrolling timeline with 12 sections, animations, and interactive elements.

## Branch
- **Branch**: `claude/gulf-war-educational-site-cxd7T`
- **Remote**: `origin`

## Current State

### What's DONE
1. **Full HTML structure** — `index.html` has all 12 sections with complete English content:
   - Hero, Background, Invasion of Kuwait, International Response, Desert Shield, Ultimatum, Desert Storm, Ground War, Highway of Death, Ceasefire, Key Figures, Legacy
   - Includes SVG maps (Persian Gulf region, Left Hook tactical map)
   - Animated counters, bar charts, mini-timelines, stat cards, force comparisons
   - Oil fire SVG animations, night sky tracer dots
   - Desktop sidebar nav + mobile bottom bar nav

2. **Full CSS system** (8 files imported via `css/main.css`):
   - `variables.css` — Design tokens (colors, fonts, spacing) — **ALREADY updated to Hebrew fonts** (Secular One, Heebo, Frank Ruhl Libre)
   - `reset.css` — CSS reset
   - `base.css` — Typography base styles — **STILL HAS `text-transform: uppercase` on h3/h4 — NEEDS REMOVAL for Hebrew**
   - `layout.css` — Grid, container, section layout — **ALREADY updated skip-link to `right`**
   - `components.css` — All UI components — **ALREADY converted to RTL** (border-right, padding-right, Hebrew letter-spacing, direction:ltr for numbers, image styles added)
   - `sections.css` — Section-specific styles — **PARTIALLY updated** (border-right for highway quote done, but hero subtitle still has `text-transform: uppercase`)
   - `animations.css` — Scroll animations, SVG draw, oil fire flicker, reduced-motion — **fade-left/fade-right may need swapping for RTL**
   - `timeline-nav.css` — Sidebar + mobile nav — **ALREADY converted to RTL**

3. **JavaScript modules** (5 files via `js/main.js`):
   - `scroll-animations.js` — IntersectionObserver reveal animations
   - `timeline-nav.js` — Active section tracking for both navs
   - `counters.js` — Animated number counters (count up on scroll)
   - `svg-animations.js` — SVG stroke draw, bar chart fill, oil fire animations
   - All JS is language-agnostic (no text strings) — **no changes needed**

### What STILL NEEDS TO BE DONE

1. **Convert `index.html` to Hebrew** (THE BIG TASK):
   - Change `<html lang="en">` → `<html lang="he" dir="rtl">`
   - Update Google Fonts link: replace `Black+Ops+One`, `Merriweather`, `Oswald` with `Secular+One`, `Frank+Ruhl+Libre`, `Heebo`
   - Translate ALL text content to Hebrew (all 12 sections)
   - Update `<meta name="description">` to Hebrew
   - Update `<title>` to Hebrew
   - Keep SVG diagrams but translate their text labels to Hebrew
   - Keep all `data-animate`, `data-target`, class names, and IDs unchanged
   - Navigation labels (timeline-nav__label, mobile aria-labels) → Hebrew
   - Skip link text → Hebrew
   - Footer text → Hebrew
   - Scroll indicator text → Hebrew

2. **Update `css/base.css`**:
   - Remove `text-transform: uppercase` from h3 and h4 rules
   - Reduce `letter-spacing` for Hebrew (0.05em → 0.02em, 0.03em → 0.01em)

3. **Update `css/sections.css`**:
   - Remove `text-transform: uppercase` from `.hero__subtitle` (line 47)
   - Remove `text-transform: uppercase` from `.scroll-indicator` (line 76)
   - Reduce `letter-spacing` values for Hebrew

4. **Consider `css/animations.css`**:
   - `fade-left` uses `translateX(-40px)` and `fade-right` uses `translateX(40px)`
   - In RTL, these directions are visually swapped — may want to swap the values or leave as-is (browser handles RTL transform differently)

## File Structure
```
Gulf-war/
├── index.html          # Main page (ENGLISH — needs Hebrew conversion)
├── css/
│   ├── main.css        # Import hub
│   ├── variables.css   # ✅ Updated for Hebrew fonts
│   ├── reset.css       # ✅ No changes needed
│   ├── base.css        # ❌ Needs text-transform removal
│   ├── layout.css      # ✅ Updated for RTL
│   ├── components.css  # ✅ Updated for RTL
│   ├── sections.css    # ❌ Needs text-transform removal
│   ├── animations.css  # ⚠️ May need RTL direction swap
│   └── timeline-nav.css# ✅ Updated for RTL
├── js/
│   ├── main.js         # ✅ Entry point
│   ├── scroll-animations.js  # ✅ No changes needed
│   ├── timeline-nav.js       # ✅ No changes needed
│   ├── counters.js           # ✅ No changes needed
│   └── svg-animations.js     # ✅ No changes needed
```

## Key Design Decisions
- **Color palette**: Desert/military theme — cream, sand, olive, burnt orange, terracotta, charcoal
- **Fonts (Hebrew)**: Secular One (display), Heebo (headings), Frank Ruhl Libre (body)
- **Animations**: Scroll-triggered reveals (fade-up, fade-left, fade-right, scale-in), animated counters, SVG stroke-draw, bar chart fills, oil fire flicker
- **Accessibility**: Skip link, aria-labels, reduced-motion media query, semantic HTML
- **RTL**: Full right-to-left layout with `direction: ltr` isolation on numeric values

## Git History
```
e0c68b9 Add RTL support, Hebrew fonts, and image styling to CSS
f0de060 Build Gulf War educational single-page website
bf68043 Initial commit
```
