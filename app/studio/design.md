# Studio Page — Design Documentation

> **Route:** `/studio` · **Files:** `page.tsx`, `StudioClient.tsx`  
> **Purpose:** The "About / Studio" page — tells the UNICX brand story through an immersive, full-screen scroll experience.

---

## 1. Page Architecture

The page is split into two files:

| File | Role |
|---|---|
| `page.tsx` | Next.js server component — exports SEO metadata, renders `<StudioClient />` |
| `StudioClient.tsx` | `"use client"` — all interactivity, animations, and layout |

```
page.tsx (server)
└── StudioClient.tsx (client)
    ├── <Navbar />              — fixed, z-50, site-wide
    ├── Hero Section            — Framer Motion, 200vh scroll trap
    └── <FlowArt>               — GSAP / ScrollTrigger story scroll
        ├── FlowSection 01 — Who we are   (orange #fd5200)
        ├── FlowSection 02 — The mission  (black #000)
        ├── FlowSection 03 — How it works (cream #F5F0E8)
        ├── FlowSection 04 — The vision   (blue #1A3DE8)
        └── FlowSection 05 — Join us      (black #000)
    └── <Footer sticky />
```

---

## 2. SEO & Metadata (`page.tsx`)

| Field | Value |
|---|---|
| `<title>` | About UNICX \| Professional Web Design & Development Company |
| `description` | Learn about UNICX — focused on creating premium digital systems. |
| `og:url` | `https://web.unicx.in/about` |
| `og:image` | `/og-about.jpg` (1200 × 630) |
| **Keywords** | about UNICX, web design company, digital agency, professional web services, UNICX team |

---

## 3. Navbar

Rendered from `<Navbar />` — fixed at `top-0 left-0 right-0 z-50`.

- **Transparent** on load, transitions to `bg-black/85 backdrop-blur-md` pill after 18 px scroll
- **Logo:** `/images/SU10.png` (96 × 36 px, `object-contain object-left`)
- **Links:** Home · Services (dropdown) · **Studio** (active) · Careers · Contact
- **CTA:** `<MarqueeCTA />` inside `<ContactPopup />` trigger
- **Social links:** `<SocialDock />` — separated by `border-l border-white/10`
- **Mobile hamburger:** 3-bar icon with gradient `#FF6A00 → #FF9F00 → #FFC400`, animates to X on open; triggers `<CurvedNavbar />` fullscreen overlay

---

## 4. Hero Section

**Layout:** `relative h-[200vh] bg-black` — creates a 200 vh scroll-trap so the hero pins while the user begins scrolling.

**Inner sticky panel:** `sticky top-0 flex h-screen flex-col items-center justify-center bg-black px-6`

### Framer Motion scroll transforms (desktop only)

| Property | Input range (scrollYProgress) | Output range |
|---|---|---|
| `opacity` | `[0.5, 1]` | `[1, 0]` — fades out in the second half of the hero scroll |
| `scale` | `[0.5, 1]` | `[1, 0.95]` — subtle scale-down |
| Scroll indicator opacity | `[0, 0.15]` | `[1, 0]` — disappears immediately after scroll begins |

> On mobile (`< 1024 px`) the Motion transforms are **disabled** via `useIsDesktop()` hook — layout stays static.

### Hero content

```
[Badge pill]   "UNICX STUDIO"
               border-white/10, backdrop-blur-2xl
               white gradient text (from-white to-white/50)

[H1]           "Clarity over clutter."
               "Results over noise."   ← white/45 (muted second line)

[Subtitle]     Paragraph — text-white/70, font-light, max-w-2xl

[Scroll hint]  Vertical "SCROLL" label + 48 px gradient line — desktop only, fades away
```

**Typography scale:**

| Element | Classes |
|---|---|
| Badge | `text-[11px] font-semibold uppercase tracking-[0.4em]` |
| H1 | `text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem]` · `font-medium` · `tracking-[-0.05em]` · `leading-[1.05]` |
| Subtitle | `text-base sm:text-xl` · `font-light` · `leading-relaxed` · `tracking-wide` |

---

## 5. FlowArt Story Scroll

> **Component:** `components/ui/story-scroll.tsx`  
> **Engine:** GSAP + `ScrollTrigger` (scrub-based) + `@gsap/react`

### Mechanism

1. Each `<FlowSection>` is a **full-screen panel** (`min-h-screen w-full`).
2. Each inner `.flow-art-container` starts **rotated 30° from bottom-left** (`transformOrigin: 'bottom left'`).
3. As the section enters the viewport (`top bottom → top 25%`), GSAP scrubs `rotation: 30 → 0` — the card "unfolds" onto the screen.
4. Each section except the last is **pinned** at `bottom bottom → bottom top` with `pinSpacing: false`, so the next card stacks on top of the pinned one.
5. `prefers-reduced-motion` is fully respected — all GSAP animations are skipped if the system setting is enabled.

### FlowSection layout

Each section uses `flex-col justify-between gap-6` with `px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]`.

Content hierarchy per section:

```
[Section label]      — text-xs, font-bold, uppercase, tracking-[0.2em]
[HR divider]
[Giant H2]           — clamp(3.5rem, 12vw, 14rem), font-bold, leading-[0.85], uppercase
[HR divider]
[Body paragraph]     — clamp(1rem, 2.5vw, 2rem), max-w-[50ch], leading-relaxed
[HR divider]         (when columns follow)
[3-column grid]      — flex-wrap, gap-[3vw], each column min-w-[180px] flex-1
```

---

## 6. Section Colour Map

| # | Label | Background | Foreground | Notes |
|---|---|---|---|---|
| 01 | Who we are | `#fd5200` UNICX Orange | `#fff` | Dividers black, body `text-black/80` |
| 02 | The mission | `#000000` | `#fff` | Body `text-slate-300`, columns `text-slate-400` |
| 03 | How it works | `#F5F0E8` Warm cream | `#000` | Body `text-black/70`, dividers `text-black/60` |
| 04 | The vision | `#1A3DE8` Electric blue | `#fff` | Body `text-white/90`, columns `text-white/70` |
| 05 | Join us | `#000000` | `#fff` | Body `text-slate-300` |

---

## 7. Section-by-Section Content

### 01 — Who we are
- **Headline:** CREATE / WITHOUT / LIMITS
- **Body:** "We believe every brand deserves a platform that puts clarity first. No algorithms, no noise — just pure intent and the people who drive it."
- **Columns:** *(none)*

### 02 — The mission
- **Headline:** CLARITY / FIRST / ALWAYS
- **Body:** "A digital studio built for growth, by experts. We're rewriting the rules of how premium brands get seen, scaled, and valued."
- **Columns:** Discovery · Systems · Value

### 03 — How it works
- **Headline:** SHOW / UP. / STAND / OUT.
- **Body:** "Three steps. Zero complexity. Your digital transformation starts moving the moment we engage."
- **Columns:** 01 — Audit · 02 — Architecture · 03 — Launch

### 04 — The vision
- **Headline:** FUTURE / OF / DIGITAL
- **Body:** "We're not just building a product. We're building a premium standard."
- **Columns:** Open access · Global reach · Client-first

### 05 — Join us
- **Headline:** READY / TO / BEGIN?
- **Body:** "Take control of your brand's trajectory. Partner with us and let's shape the future of your digital presence together."
- **Columns:** *(none)*

---

## 8. Footer

`<Footer sticky={true} />` rendered below `<FlowArt>`. The `sticky` prop applies a sticky-footer pattern anchoring it below the last section.

---

## 9. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile `< 1024 px` | Framer Motion scroll transforms **off**; hero is fully static. Hamburger menu replaces desktop nav. |
| Desktop `≥ 1024 px` | Hero fades + scales on scroll. Scroll indicator shown. Full desktop nav visible. |
| FlowArt sections | Fully fluid — all sizing via `clamp()` and `vw` units, no fixed breakpoints inside sections. |
| Navbar pill | Activates after 18 px scroll on standard routes; always active on fullscreen service pages. |

---

## 10. Animation Inventory

| Element | Library | Technique | Timing |
|---|---|---|---|
| Navbar entry | Framer Motion | `opacity 0→1, y -24→0` | 0.7 s, ease `[0.22,1,0.36,1]` |
| Services dropdown | Framer Motion | `opacity + y + scale` + `AnimatePresence` | 200 ms, `[0.25,0.46,0.45,0.94]` |
| Mobile menu overlay | Framer Motion | `AnimatePresence` → `<CurvedNavbar />` | Custom |
| Hero fade-out | Framer Motion | `useScroll` + `useTransform` scrub | Tied to scroll |
| FlowSection unfold | GSAP ScrollTrigger | `rotation: 30 → 0`, scrub, `transformOrigin: bottom left` | Scrub |
| FlowSection pin | GSAP ScrollTrigger | `pin: true, pinSpacing: false` | Scroll-driven |
| Scroll indicator | Framer Motion | `opacity 1→0` at scroll `[0, 0.15]` | Tied to scroll |

---

## 11. Design Tokens (Studio page context)

```css
/* Brand colours */
--unicx-orange:   #fd5200;
--unicx-blue:     #1A3DE8;
--unicx-cream:    #F5F0E8;
--unicx-black:    #000000;

/* Fluid type scale */
--hero-heading:        clamp(2.25rem, 6.5vw, 6.5rem);
--section-heading:     clamp(3.5rem, 12vw, 14rem);
--section-body:        clamp(1rem, 2.5vw, 2rem);
--section-column-body: clamp(0.85rem, 1.3vw, 1.05rem);

/* Spacing */
--section-x-pad:   4vw;
--section-top-pad: clamp(2rem, 8vw, 4vw);
--col-gap:         3vw;
```

---

## 12. Files & Dependencies

| File | Role |
|---|---|
| `app/studio/page.tsx` | Server component — SEO metadata |
| `app/studio/StudioClient.tsx` | Full page client component |
| `components/ui/story-scroll.tsx` | `FlowArt` + `FlowSection` primitives (GSAP) |
| `components/Navbar.tsx` | Site-wide navigation |
| `components/Footer.tsx` | Site-wide footer (`sticky` mode) |
| `components/ContactPopup.tsx` | CTA popup trigger |
| `components/MarqueeCTA.tsx` | Animated marquee CTA button |
| `components/SocialIcons.tsx` | `<SocialDock />` icon row |
| `components/ui/page-transition.tsx` | `<TransitionLink />` wrapper |
| `components/ui/curved-menu.tsx` | Mobile fullscreen overlay nav |

**External libraries:**

| Library | Usage |
|---|---|
| `framer-motion` | Hero scroll transforms, navbar entry, dropdown, mobile menu |
| `gsap` + `gsap/ScrollTrigger` | FlowArt section pinning and rotation unfold |
| `@gsap/react` | `useGSAP` hook for scoped GSAP context |
