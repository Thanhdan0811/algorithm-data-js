# 🎬 StreamVault — UI/UX Design Document

> Production-grade streaming platform template (Vimeo / Mux / Netflix style)
> Use as design reference alongside or instead of Google Stitch.

---

## 1. Design Philosophy

| Principle | Description |
|---|---|
| **Minimalist** | Every element earns its place. No decorative noise. |
| **Classic** | Timeless layout — no trendy gimmicks that age poorly. |
| **Soft Dark** | Dark background, but warm-tinted, never cold pure black. |
| **Content-first** | Posters and thumbnails are the hero. UI steps back. |
| **Low friction** | Homepage → watching in under 3 clicks. |
| **Performance-first** | Skeleton loaders, lazy images, zero layout shift. |
| **Mobile-native** | Touch gestures, bottom nav, fullscreen player feel natural. |

---

## 2. Color System

### Philosophy
> Avoid pure `#000000` black — it creates harsh contrast and eye strain.
> Use warm-tinted near-blacks and desaturated surfaces for a cinematic feel.

```
── Backgrounds ──────────────────────────────────────────
Page Background      : #111115   (warm near-black, not cold)
Surface / Card       : #19191F   (slightly elevated)
Surface Raised       : #222229   (modals, dropdowns)
Surface Hover        : #2A2A33

── Borders ──────────────────────────────────────────────
Border Subtle        : #2E2E38   (dividers, card edges)
Border Default       : #3A3A46
Border Focus         : #6060A0   (input focus ring)

── Brand Accent ─────────────────────────────────────────
Accent Primary       : #C8A96E   (warm gold — classic, premium feel)
Accent Hover         : #DFC08A
Accent Muted         : #C8A96E26 (bg tint for badges)

── Text ─────────────────────────────────────────────────
Text Primary         : #EEEEF2   (off-white, easier on eyes than #FFF)
Text Secondary       : #9898A8
Text Muted           : #5A5A6A
Text Inverse         : #111115

── Semantic ─────────────────────────────────────────────
Success              : #4ADE80
Warning              : #FBBF24
Error                : #F87171
Info                 : #60A5FA

── Special ──────────────────────────────────────────────
Hero Gradient        : linear-gradient(to top, #111115 0%, #111115CC 40%, transparent 100%)
Shimmer Base         : #19191F
Shimmer Highlight    : #2A2A33
```

### Rationale
- `#111115` is warmer than `#111111` — slight purple undertone gives cinematic depth
- `#C8A96E` gold accent feels classic and premium, unlike generic red or blue
- Off-white `#EEEEF2` reduces eye strain on long watch sessions

---

## 3. Typography

```
── Font Families ────────────────────────────────────────
Display  : "DM Serif Display"  — headlines, movie titles (elegant, classic serif)
UI       : "Inter"             — all interface text (clean, readable)
Mono     : "JetBrains Mono"    — timestamps, codes, debug

── Scale ────────────────────────────────────────────────
xs       : 11px
sm       : 13px
base     : 15px   ← slightly smaller than 16px feels more refined
md       : 17px
lg       : 20px
xl       : 24px
2xl      : 32px
3xl      : 44px
4xl      : 60px

── Usage ────────────────────────────────────────────────
Hero Title      : DM Serif Display, 60px, weight 400, tracking -0.01em
Section Heading : Inter, 20px, weight 600, tracking 0.03em, uppercase, muted color
Movie Title     : DM Serif Display, 24px, weight 400
Card Label      : Inter, 13px, weight 500
Body Text       : Inter, 15px, weight 400, line-height 1.65
Caption         : Inter, 11px, weight 400, color: Text Muted
```

---

## 4. Spacing & Grid

```
── Base Unit: 4px ───────────────────────────────────────
2px  4px  8px  12px  16px  20px  24px  32px  48px  64px  96px

── Container ────────────────────────────────────────────
Max width     : 1440px
Padding       : 0 56px   (desktop lg)
              : 0 32px   (tablet md)
              : 0 16px   (mobile)

── Movie Grid ───────────────────────────────────────────
Mobile (xs)   : 2 columns, gap 8px
Mobile (sm)   : 3 columns, gap 10px
Tablet (md)   : 4 columns, gap 12px
Desktop (lg)  : 5 columns, gap 14px
Wide (xl)     : 6 columns, gap 16px

── Card Dimensions ──────────────────────────────────────
Poster ratio  : 2:3  (standard movie poster)
Backdrop ratio: 16:9 (episode / hero cards)
Border radius : 6px  (subtle — not overly rounded)
```

---

## 5. Key Screens & Wireframes

### 5.1 Homepage

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                     │
│  [Logo]   Browse   New   Top Rated   Search    [Login]      │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  HERO  (100vw × 85vh, backdrop image + gradient overlay)    │
│                                                             │
│           ┌─────────────────────┐                           │
│           │  MOVIE TITLE        │  ← DM Serif, large       │
│           │  ★ 8.4 · 2024 · R   │                           │
│           │  Action · Thriller  │                           │
│           │                     │                           │
│           │  Brief synopsis...  │                           │
│           │                     │                           │
│           │  [▶ Watch Now]      │                           │
│           │  [+ Add to List]    │                           │
│           └─────────────────────┘                           │
│                                                             │
│  ○ ○ ● ○ ○   ← hero pagination dots                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  TRENDING THIS WEEK ──────────────────────── [View all →]  │
│  [Card] [Card] [Card] [Card] [Card] [Card]   ← horizontal  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  NEW RELEASES ────────────────────────────── [View all →]  │
│  [Card] [Card] [Card] [Card] [Card] [Card]                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  TOP RATED ALL TIME ──────────────────────── [View all →]  │
│  [Card] [Card] [Card] [Card] [Card] [Card]                 │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.2 Movie Card — Default & Hover States

**Default:**
```
┌────────────┐
│            │
│  [POSTER]  │  ← 2:3 ratio, border-radius 6px
│            │
│            │
└────────────┘
  Movie Title     ← Inter 13px, weight 500, Text Primary
  2024 · HD       ← Inter 11px, Text Muted
```

**Hover (desktop):**
```
┌────────────────────────────────┐  ← scale(1.04), shadow-lg, z-20
│  [POSTER]                      │
│                                │
│  ░░░░░ gradient overlay ░░░░░  │
│  ▶ [15s preview autoplay]      │  ← trailer clip
│  ─────────────────────────     │
│  Movie Title                   │
│  ★ 8.4  ·  2h 15m  ·  2024    │
│  [▶ Watch]   [+ List]   [♥]   │
└────────────────────────────────┘
```

---

### 5.3 Movie Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│  FULL-WIDTH BACKDROP  (parallax, 55vh)                      │
│  ░░░░░░░░░░░░░░░░░░░░░░░ gradient to bg ░░░░░░░░░░░░░░░░░  │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ [POSTER] │  MOVIE TITLE                                     │
│          │  ─────────────────────────────                   │
│ 2:3 img  │  ★ 8.4 / 10   ·   2h 15m   ·   2024   ·   R    │
│          │  [ HD ]  [ SUB ]  [ DUB ]                        │
│          │                                                  │
│          │  [ ▶  WATCH NOW ]   ← primary CTA, large        │
│          │  [ + Watchlist ]    [ ↓ Download ]              │
│          │                                                  │
│          │  Genres:    Action, Thriller, Mystery            │
│          │  Director:  Christopher Nolan                    │
│          │  Cast:      Actor A, Actor B, Actor C...         │
│          │                                                  │
├──────────┴──────────────────────────────────────────────────┤
│  SYNOPSIS                                                   │
│  Lorem ipsum description of the movie...                    │
├─────────────────────────────────────────────────────────────┤
│  EPISODES  (if series)          Season  [1 ▼]              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ Ep 1 16:9│ │ Ep 2 16:9│ │ Ep 3 16:9│  →               │
│  └──────────┘ └──────────┘ └──────────┘                    │
├─────────────────────────────────────────────────────────────┤
│  YOU MAY ALSO LIKE ──────────────────── [View all →]        │
│  [Card] [Card] [Card] [Card] [Card]                         │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.4 Video Player

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 VIDEO FRAME  (16:9, bg #000)                │
│                                                             │
│                         [  ⏸  ]                            │
│                                                             │
│  ← 10s                                                10s → │
│                                                             │
│  ───────────────────────                                    │
│  ← buffered ████████████░░░░░░░░░░░░ →  38:24 / 1:52:06   │
│  ─────────────────────────────────────────────────────────  │
│  ▶  ⏭  🔊 ──────  [CC]  [⚙ Quality]  [PiP]  [ ⛶ ]       │
└─────────────────────────────────────────────────────────────┘
```

**Controls behavior:**
- Controls fade out after 3s of inactivity, fade in on mouse move
- Double-tap left/right: seek ±10s (mobile)
- Swipe vertical right: volume
- Swipe vertical left: brightness
- Long-press: 2× speed mode
- [Skip Intro] button appears at 00:00–01:30

**Quality options:** Auto · 1080p · 720p · 480p · 360p

**Next episode:** Countdown overlay at last 15 seconds — dismiss or auto-play

---

### 5.5 Search & Browse

```
┌─────────────────────────────────────────────────────────────┐
│  [ 🔍  Search titles, genres, actors...              ]      │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  POPULAR SEARCHES                                           │
│  [ Action ] [ 2024 ] [ Sci-Fi ] [ Award Winners ]          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  FILTERS:  Genre ▼    Year ▼    Rating ▼    Sort by ▼      │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  RESULTS  (grid, responsive)                                │
│  [Card] [Card] [Card] [Card] [Card]                         │
│  [Card] [Card] [Card] [Card] [Card]                         │
│                                                             │
│  [ Load more ]  ← or infinite scroll                        │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.6 Pricing / Subscription

```
┌─────────────────────────────────────────────────────────────┐
│                  CHOOSE YOUR PLAN                           │
│           [ Monthly ]  /  [ Yearly — save 20% ]            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐  │
│  │    FREE     │   │    BASIC    │   │    PREMIUM      │  │
│  │    $0 / mo  │   │   $5 / mo  │   │   $12 / mo     │  │
│  │─────────────│   │────────────│   │─────────────────│  │
│  │ ✓ 480p      │   │ ✓ 720p    │   │ ✓ 1080p / 4K   │  │
│  │ ✓ Ads       │   │ ✗ No ads  │   │ ✗ No ads       │  │
│  │ ✗ 1 screen  │   │ ✓ 2 screens│   │ ✓ 4 screens    │  │
│  │ ✗ Download  │   │ ✗ Download │   │ ✓ Download × 5  │  │
│  │             │   │            │   │ ✓ Early access  │  │
│  │  [Current]  │   │ [Get Basic]│   │ [Get Premium]  │  │
│  └─────────────┘   └────────────┘   └─────────────────┘  │
│                                       ↑ highlighted CTA    │
└─────────────────────────────────────────────────────────────┘
```

---

### 5.7 Admin Dashboard (Template)

```
┌────────────┬────────────────────────────────────────────────┐
│  SIDEBAR   │  DASHBOARD                                     │
│            │  ──────────────────────────────────────────    │
│  Overview  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  Movies    │  │  Users   │ │ Revenue  │ │  Bandwidth   │  │
│  Series    │  │  1,240   │ │  $4,520  │ │  2.1 TB/mo   │  │
│  Users     │  └──────────┘ └──────────┘ └──────────────┘  │
│  Revenue   │                                               │
│  Settings  │  ACTIVE USERS (7-day chart)                   │
│  ──────    │  ─────────────────────────────────────────    │
│  [Logout]  │  RECENT UPLOADS                               │
│            │  Title | Size | Status | Date | Actions       │
│            │  ─────────────────────────────────────────    │
│            │  Movie A | 4.2GB | ✓ Ready | May 27 | ...    │
│            │  Movie B | 3.8GB | ⏳ Processing | ...       │
└────────────┴────────────────────────────────────────────────┘
```

---

## 6. Component Specs

### Buttons

```
Variant     Background          Text            Border      Hover
─────────────────────────────────────────────────────────────────
Primary     #C8A96E             #111115         none        #DFC08A bg
Secondary   #222229             #EEEEF2         1px #3A3A46 #2A2A33 bg
Ghost       transparent         #EEEEF2         1px #3A3A46 #19191F bg
Danger      #7F1D1D             #EEEEF2         none        #991B1B bg

Size        Padding             Font-size       Border-radius
─────────────────────────────────────────────────────────────────
sm          8px 14px            13px            4px
md          10px 20px           15px            5px   ← default
lg          14px 28px           17px            6px
```

### Cards

```
Movie Card
  Background   : #19191F
  Border       : 1px solid #2E2E38
  Border-radius: 6px
  Hover shadow : 0 8px 32px rgba(0,0,0,0.5)
  Transition   : 200ms ease

Episode Card
  Aspect ratio : 16:9
  Border-radius: 5px

Person Card (cast)
  Shape        : circle
  Size         : 80px × 80px
```

### Badges & Tags

```
Genre tag    : pill, bg #222229, border 1px #3A3A46, text 11px
Quality (HD) : pill, bg #C8A96E22, border 1px #C8A96E66, text #C8A96E
Quality (4K) : pill, bg #60A5FA22, border 1px #60A5FA66, text #60A5FA
Age Rating   : square 28px, bg #2E2E38, text 11px bold
```

### Form Inputs

```
Background   : #19191F
Border       : 1px solid #2E2E38
Border-radius: 5px
Focus border : #6060A0
Text         : #EEEEF2
Placeholder  : #5A5A6A
Padding      : 10px 14px
```

---

## 7. Navigation

### Desktop Navbar
```
Height       : 64px
Background   : #111115 with backdrop-blur (translucent on scroll)
Position     : fixed top, z-50
Border-bottom: 1px solid #2E2E38  (visible when scrolled)

Items: Logo | Browse | New Releases | Top Rated | [Search icon] | [User avatar ▼]
```

### Mobile Bottom Navigation
```
Height       : 60px
Background   : #19191F
Border-top   : 1px solid #2E2E38
Position     : fixed bottom

Tabs: Home | Search | My List | Account
Icon size    : 22px
Active color : #C8A96E
Inactive     : #5A5A6A
```

---

## 8. Responsive Breakpoints

```
xs   : 0   – 480px    (mobile portrait)
sm   : 481 – 767px    (mobile landscape)
md   : 768 – 1024px   (tablet)
lg   : 1025– 1280px   (desktop)
xl   : 1281– 1440px   (large desktop)
2xl  : 1441px +       (ultrawide)
```

---

## 9. Motion & Animation

```
Card hover scale   : 1.04, 200ms ease-out
Card hover shadow  : 0 8px 32px rgba(0,0,0,0.5)
Page transition    : opacity 0→1 + translateY(8px→0), 280ms ease
Modal entrance     : scale(0.96)→scale(1) + fade, 220ms ease
Skeleton shimmer   : background-position left→right, 1.5s infinite
Player controls    : opacity toggle, 300ms ease, 3s idle timeout
Hero crossfade     : opacity 600ms ease (between slides)
```

---

## 10. Accessibility

```
Minimum contrast ratio : 4.5:1 (WCAG AA)
Focus rings            : 2px solid #6060A0, offset 2px
Keyboard navigation    : all interactive elements reachable
Video player           : keyboard shortcuts (Space, ←→, M, F)
Reduced motion         : respect prefers-reduced-motion
Alt text               : required on all poster/backdrop images
```

---

## 11. Google Stitch Export Checklist

- [ ] Homepage — hero section + row layout
- [ ] Movie card (default state)
- [ ] Movie card (hover/expanded state)
- [ ] Movie detail page
- [ ] Video player with controls
- [ ] Search + filter page
- [ ] Pricing / subscription page
- [ ] Login / register screens
- [ ] Mobile layout (bottom nav + touch states)
- [ ] Admin dashboard overview
