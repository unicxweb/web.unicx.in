# Release Timeline Component — Design Documentation

> **Component:** `TimeLine_01` · **File:** `components/ui/release-time-line.tsx`  
> **Purpose:** A scroll-reactive, viewport-proximity release timeline component. Only the card currently aligned with the vertical center of the viewport expands to show full details, items, and action CTAs. Other cards automatically collapse.

---

## 1. Component Architecture

```
TimeLine_01 (Client Component)
├── Header & Subtitle Block
└── Entries Container (Grid & Flex Layouts)
    ├── Sticky Meta Column       — Icon badge, Title, Subtitle (sticks on desktop)
    ├── Proximity Sentinel       — Invisible sentinel used to track scroll coordinates
    └── Expandable Content Card  — B&W/color header image, description, and list items
```

---

## 2. API & Properties

The component accepts the following props:

```typescript
export interface TimeLine_01Props {
  title?: string;        // Main timeline title
  description?: string;  // Subtitle/intro text
  entries?: TimeLine_01Entry[]; // List of timeline entries
  className?: string;    // Custom CSS wrapper classes
}
```

### TimeLine_01Entry Schema
Each entry has the following structure:
*   `icon`: A Lucide icon component.
*   `title`: Entry title (e.g. release version name).
*   `subtitle`: Badge info (e.g. date & minor version).
*   `description`: Short summary paragraph.
*   `items`: Optional array of bullet points for release notes features.
*   `image`: Optional header/cover image URL.
*   `button`: Optional action link object (`url`, `text`).

---

## 3. Scroll Proximity Engine

Rather than relying on click inputs, the component dynamically measures scroll coordinates to determine which item is in focus:

1.  **Invisible Sentinels:** Each timeline card includes an absolute-positioned invisible sentinel element placed near the title.
2.  **Intersection Monitoring:** A `requestAnimationFrame` animation loop continuously queries the `getBoundingClientRect()` of all sentinels.
3.  **Proximity Formula:** It calculates the distance between the center of each sentinel and the top third of the viewport (`window.innerHeight / 3`).
4.  **State Selection:** Whichever card is closest to this sweet spot becomes the `activeIndex` and expands.

---

## 4. Layout & Visual Transition

*   **Responsive Columns:** On mobile viewports, the sticky meta column stacks inline above the card. On desktop (`md:`), the meta column sticks to the top (`md:sticky md:top-8`) next to the scrollable card list.
*   **Accordion Transition:** The expandable list container uses Tailwind's CSS grid transitions (`grid-rows-[0fr] opacity-0` to `grid-rows-[1fr] opacity-100`) combined with `transition-all duration-500` to expand smoothly.
*   **Shadows & Accents:** Focus card uses a premium transition drop shadow (`shadow-lg`).
