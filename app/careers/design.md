# Careers Page — Design Documentation

> **Route:** `/careers` · **Files:** `page.tsx`, `CareersClient.tsx`  
> **Purpose:** The Careers/Recruitment page — displays workplace culture, benefits, active job listings, and testimonial signatures. Features a light-to-dark-to-light visual transition.

---

## 1. Page Architecture

The page is split into two files:

| File | Role |
|---|---|
| `page.tsx` | Next.js server component — exports SEO metadata, renders `<CareersClient />` |
| `CareersClient.tsx` | `"use client"` — all interactivity, layout, and accordion state |

```
page.tsx (server)
└── CareersClient.tsx (client)
    ├── <Navbar />                 — fixed, z-50, site-wide with dynamic theme override
    ├── <div className="font-sans">— typography wrapper (Inter / Plus Jakarta Sans)
    │   ├── Hero Section           — light theme (#fafafa) introduction
    │   ├── Workplace Gallery      — 3-column asymmetrical black & white masonry grid
    │   ├── Environment/Pillars    — dark theme (#000) square-cornered card deck
    │   ├── Current Openings       — accordion rows with inline Job Seeker form trigger
    │   ├── Why Join & Testimonial — light theme (#fafafa) benefits and Ron Simpson quote signature
    │   └── Custom Careers CTA     — dark theme recruitment CTA linked to general application form
    └── <Footer />                 — site-wide footer
```

---

## 2. SEO & Metadata (`page.tsx`)

| Field | Value |
|---|---|
| `<title>` | Careers at UNICX \| Join Our Design & Development Team |
| `description` | Join our remote-first team at UNICX. View open positions in UI/UX design, frontend and backend engineering, AI, and creative graphics. |
| `og:url` | `https://web.unicx.in/careers` |
| `og:image` | `/og-careers.jpg` (1200 × 630) |
| **Keywords** | careers, jobs, web design jobs, engineering jobs, remote jobs, Next.js developer, UI/UX designer |

---

## 3. Navbar Overrides

The global `<Navbar />` is modified on the `/careers` route to handle the light-themed sections.

*   **Path Normalization:** Checks pathname normalizations to match `/careers` (strips trailing slashes).
*   **Static Top Styling:** When scroll is at the top (`!isScrolled`), overrides standard dark styles with:
    *   Background: `bg-[#fafafa]/80 backdrop-blur-md`
    *   Border: `border-b border-zinc-200/50`
    *   Text links: `text-zinc-950 hover:text-zinc-600`
    *   Logo: Grayscale invert filters (`brightness-0`) to convert elements to dark style.
*   **Scrolled Styling:** Instantly snaps back to standard dark mode styling once scrolled past the top of the viewport.

---

## 4. Hero Section (Light Theme)

*   **Background:** `bg-[#fafafa]` (warm off-white)
*   **Typography:** Bold and medium weighting in high-contrast dark tones (`text-zinc-950` / `text-zinc-500`).
*   **Layout:** Simple, elegant left-aligned columns containing large mixed-case headlines and support paragraphs.

---

## 5. Workplace Gallery Masonry Grid

*   **Layout:** Flat, asymmetrical 3-column grid featuring optimised office assets (`pillar-01.webp` through `pillar-06.webp`).
*   **Aesthetics:** Flat square corners (`rounded-none`). Images are set to grayscale with scale adjustments on hover (`grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500`).
*   **Grid Structure:**
    *   **Left Column:** `pillar-01` (4:3) and `pillar-04` (2:3)
    *   **Middle Column:** `pillar-02` (2:3) and `pillar-05` (4:3)
    *   **Right Column:** `pillar-03` (4:3) and `pillar-06` (2:3)

---

## 6. Environment & Pillars Section (Dark Theme)

*   **Theme:** Deep black background (`bg-black text-white`).
*   **Layout:** A square-cornered, thin-bordered card deck (`rounded-none` container, `border-white/10` card dividers) explaining core workspace values.

---

## 7. Current Openings (Dark Theme)

*   **Branding Indicator:** A slanted red-orange header bar (`h-12 w-[3px] bg-[#FF3B00] rotate-[15deg]`).
*   **Layout:** Indented position list aligning with the title's baseline offset (`md:pl-[13%] lg:pl-[16%]`).
*   **Accordion Row Interactivity:**
    *   Titles underline on hover (`group-hover:underline`).
    *   Row arrows transition smoothly from diagonal `↗` to flat right-facing `→` (`group-hover:rotate-45`).
    *   Accordion detail drawer opens/closes using `framer-motion` height transitions.
*   **Form Trigger:** Renders `<JobSeekerPopup>` using `asChild` to safely wrap the action buttons (`Apply Now` and `Ask a Question`) without HTML tag nesting issues.

---

## 8. Why Join & Testimonials (Light Theme)

*   **Theme:** Return to warm light background (`bg-[#fafafa]`).
*   **Structure:** Three columns explaining the benefits (Environment, Growth, Collaboration), followed by a team quote divider.
*   **Testimonial Block:**
    *   Label: `/ What Our Team Says` with a literal red/orange slash character `/`.
    *   Quote: Left-aligned blockquote in light weight (`font-light text-zinc-900`).
    *   Signature Block: Custom signature metadata featuring **Ron Simpson** (`Visual Director`) and a square grayscale portrait (`/images/ron-simpson.png`) with rounded corners (`rounded-xl`). Separated into distinct elements to prevent JSX spacing collapse.

---

## 9. Custom Careers CTA (Dark Theme)

*   **Theme:** Dark theme wrapping block (`bg-black`).
*   **Content:** Customized recruitment-themed messaging (*"Shape the future of digital products"*).
*   **Interactivity:** The `Apply Now` CTA button triggers the general application popup via `JobSeekerPopup defaultPosition="General Application"`. Relaxes typography tracking to `tracking-tight` to preserve word spacing on sans-serif fonts.

---

## 10. Design Tokens & Styling Helpers

```css
/* Color Accent */
--accent-orange: #FF3B00; /* Used for slashes, indicators, and labels */
--theme-light:    #fafafa; /* Hero, Gallery, and Why Join background */

/* Typography Override */
.font-sans {
  /* Enforces Inter / Plus Jakarta Sans for standard page layouts */
  font-family: var(--font-sans), sans-serif;
}
```
