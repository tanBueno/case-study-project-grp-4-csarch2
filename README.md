<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- INCREMENTAL README — MID-MILESTONE SUBMISSION (July 2026)        -->
<!-- This document sits ON TOP of the original proposal (below).      -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# From ASCII to Real-Time: The Evolution of Computer Graphics

**Course:** CSARCH2 — Term 3, AY 2025-2026  
**Group:** RetroSpec (Group #4)  
**Members:** 
* Bueno, Jonathan R.
* Dela Cruz, Louiz Alfredo DV. 
* Ibañez, Kane Joshua 
* Ignacio, Miguel Angelo
* Solomon, Adonis Mikel

> **GitHub:** [github.com/kimsajaang/case-study-project-grp-4-csarch2](https://github.com/kimsajaang/case-study-project-grp-4-csarch2)  
> **Live Site (GitHub Pages):** https://kimsajaang.github.io/case-study-project-grp-4-csarch2/  
> **Alternate (Render):** https://case-study-project-grp-4-csarch2-e39f.onrender.com

---

# Incremental Development Log

> This section documents the full development journey of our project — the discoveries, the struggles, the creative choices, and the technical lessons we picked up along the way. It sits on top of the original proposal document (preserved below) to show how the project evolved from concept to working exhibit.

---

## Development Summary

The project is an **interactive virtual museum exhibit** that traces the evolution of computer graphics from the 1960s to the 2020s. Users scroll horizontally through a "Living Terminal" — a Fallout-inspired timeline where each era is represented by an interactive exhibit node ("planet") with era-specific visuals, color themes, and technical explanations.

The exhibit features a CRT boot-up intro, floating ambient particles, 3D perspective grids, scroll-driven background color shifts, and 7 era-specific interactive React components — all wrapped in a retro-futuristic museum aesthetic.

### Current Status: Core Experience Functional

| Feature | Status | Notes |
|---|---|---|
| Horizontal scrolling timeline | ✅ Complete | Custom `requestAnimationFrame` lerp-based scroll |
| CRT boot-up intro screen | ✅ Complete | Animated TV with scale zoom transition |
| Curator terminal (instructions modal) | ✅ Complete | Terminal-style help overlay |
| 1960s — ASCII Character Art exhibit | ✅ Complete | CRT TV with switchable ASCII face expressions |
| 1970s — Early Bitmaps & Rasterization exhibit | ✅ Complete | Pixel grid with rasterization visualization |
| 1980s — 8-Bit Pixel Blocks exhibit | ✅ Complete | Retro sprite/pixel block renderer |
| 1990s — 3D Polygons & Hardware GPUs exhibit | ✅ Complete | 3D polygon wireframe viewer |
| 2000s — Vector Maps & Edge Detection exhibit | ✅ Complete | Vector/edge detection visualization |
| 2010s — Volumetric Lighting & VR exhibit | ✅ Complete | Volumetric light ray simulation |
| 2020s+ — Flawless Photorealism exhibit | ✅ Complete | Ray tracing visualization with bouncing rays |
| Bibliography / Sources modal | ✅ Complete | Themed scrollable modal with all references |
| Scroll progress indicator | ✅ Complete | Gradient bar at bottom of viewport |
| Ambient particles & star field | ✅ Complete | CSS-only, GPU-accelerated floating particles |
| Scroll-driven background color shifts | ✅ Complete | `IntersectionObserver`-driven per-era glow |
| Museum footer with era label | ✅ Complete | Dynamic label updates on scroll |
| 3D floor/ceiling perspective grids | ✅ Complete | CSS `perspective` + `rotateX` transforms |
| Welcome homepage with navigation | ✅ Complete | Landing page with exhibit overview |
| GitHub Pages deployment (CI/CD) | ✅ Complete | GitHub Actions workflow with Astro build |
| Performance optimization | 🔄 In Progress | Ongoing — GPU-heavy effects cause lag on low-end devices |
| Additional information on each era | 🔄 In Progress | Expanding descriptions and interactivity |
| Keyboard navigation (arrow keys) | 📋 Planned | Jump between era nodes with ← → keys |
| Mobile responsiveness polish | 📋 Planned | Touch gestures and responsive layout tweaks |

---

## Development Process

### Aha Moments

**1. The horizontal scroll breakthrough.**  
At the start, we genuinely didn't know what direction to take. We were going back and forth between doing a normal vertical scrolling page and a slideshow-type thing, and nothing really felt right for a "museum" vibe. Then someone suggested — what if we make it scroll horizontally instead, like you're actually walking through an exhibit hall? That was the moment everything clicked. We started calling it the "Living Terminal" because we were inspired by the Pip-Boy from the game Fallout, which has a similar retro-futuristic aesthetic. From there, the whole concept just came together naturally. The horizontal scroll metaphor gave us a physical sense of moving through time, which is exactly what a timeline exhibit should feel like.

**2. `IntersectionObserver` for ambient atmosphere.**  
We were originally planning to manually calculate scroll positions to figure out which era the user was looking at, so we could change the background color and update the footer label. That would've been a nightmare of `getBoundingClientRect()` calls inside a scroll handler. But then we discovered the `IntersectionObserver` API — it detects which era card is in the center of the viewport using a configured `rootMargin`, and then the background glow blobs, the footer label, everything just updates on its own through a single observer callback. It saved us a ton of headache and made the code much cleaner. The key insight was setting `rootMargin: '0px -30% 0px -30%'` so only the era card in the center 40% of the viewport would trigger.

**3. CRT scanlines are just CSS.**  
We thought we'd need a `<canvas>` element or some kind of image overlay to create the CRT scanline effect for the intro TV and the 1960s exhibit. Turns out you can do it entirely with CSS gradients and `box-shadow`:
```css
background-image:
  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 3px);
```
No JavaScript needed at all. That was a big aha moment because it meant we got the retro aesthetic basically for free, performance-wise.

**4. The EraCard "planet" design emerged by accident.**  
Originally, the era cards were going to be rectangular panels arranged along the timeline. But during prototyping, one of us accidentally set `border-radius: 50%` on a card, and it looked like a floating planet. We immediately pivoted — now each era is a glowing orb with orbit rings, an atmosphere glow, and a 3D tilt effect on hover (using `perspective` and mouse-position-based `rotateX`/`rotateY`). The "planet" metaphor works perfectly with the space/corridor aesthetic we were already building.

**5. `requestAnimationFrame` lerp for buttery scrolling.**  
The browser's native `scroll-behavior: smooth` was absolutely terrible for horizontal scrolling — it was sluggish, felt unresponsive, and you couldn't control the easing curve. We wrote our own scroll animation in about 20 lines using `requestAnimationFrame` with linear interpolation (lerp):
```js
currentScroll += (targetScroll - currentScroll) * 0.07;
```
The difference in feel was night and day. The scroll now responds instantly to wheel input but eases smoothly to the target position.

### Things We Learned

**Astro's Island Architecture.**  
Working with Astro was new for most of us, and the island architecture took some getting used to. The key concept is that Astro components are static by default — they render to pure HTML at build time. To make a React component interactive on the client, you have to explicitly add a `client:load` directive. This tripped us up multiple times early on (we'd build an interactive component and wonder why the buttons didn't work), but once we understood the pattern, it actually made a lot of sense. Each React component hydrates independently, so the 1960s ASCII component loading doesn't block the 2020s ray tracer from rendering.

**MDX for content/code separation.**  
Using `.mdx` files for each era let us keep the written content (descriptions, titles, colors) separate from the interactive React components. The `EraCard` component acts as a standardized wrapper — it handles the planet node shape, the tilt effect, the modal overlay, and the plaque label — and then each era just plugs in its own unique interactive child component. This made it much easier to work in parallel without merge conflicts.

**Custom scroll physics.**  
One thing we didn't expect was how much control you need over scroll behavior for a horizontal timeline. The browser's default vertical-to-horizontal wheel translation is nonexistent — you have to intercept `wheel` events, check if `deltaY > deltaX`, call `preventDefault()`, and manually update a target scroll position. We learned about lerp-based animation loops, how `requestAnimationFrame` gives you a 60fps update cycle, and why you need to synchronize the "target" with the actual `scrollLeft` when the user scrolls manually (e.g., via trackpad or scrollbar drag).

**Tailwind CSS v4 migration pains.**  
Tailwind v4 changed its config file structure significantly from v3. The `content` array, the `theme.extend` pattern, and some utility class names all work differently. We had to read through the v4 docs multiple times and debug several cases where classes silently didn't apply. The `@tailwindcss/vite` plugin also required specific integration with Astro's Vite config. Once set up correctly, though, the utility-first approach was perfect for rapidly iterating on visual design.

**CSS `perspective` transforms for 3D depth.**  
The 3D grids on the floor and ceiling of the timeline were a key learning. We used `perspective(800px)` with `rotateX(75deg)` on a grid background to create the illusion of a digital corridor stretching into the distance. The `mask-image: radial-gradient(...)` technique was also new to us — it fades the grid edges smoothly so they don't have a hard cutoff. We learned that `-webkit-mask-image` is still needed for Safari compatibility.

**GitHub Pages deployment with Astro.**  
Deploying an Astro static site to GitHub Pages required a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the project and deploys the `dist/` folder. A critical lesson was that GitHub Pages serves from a subpath (`/case-study-project-grp-4-csarch2/`), not from root. This meant all hardcoded `href="/"` and `href="/timeline"` links had to be replaced with `import.meta.env.BASE_URL` so they resolve correctly under the subpath. The workflow dynamically passes `--site` and `--base` flags to the Astro build command using the `configure-pages` action.

### Challenges

**Performance: the elephant in the room.**  
The most difficult ongoing issue has been performance. The UI is incredibly heavy on graphics — we have floating particles, twinkling stars, 3D perspective grids on the floor and ceiling, background glow blobs with `blur-[100px]`, and CRT scanline overlays all running simultaneously. On lower-end machines, the frame rate drops significantly, especially when multiple era cards are in view. We've tried:
- Adding `will-change: transform` to animated elements
- Reducing blur radius values
- Using `mix-blend-mode: screen` sparingly
- Limiting particle counts (from 30+ to 12 drifting + 30 twinkling)

But the sheer weight of the visual effects makes it difficult to get a consistently smooth 60fps. This is our top priority for the final submission.

**Astro + React hydration gotchas.**  
We were used to building standard React SPAs, so Astro's model — where components are static by default — caught us off guard repeatedly. We'd build a complex interactive era card, test it, and find that none of the buttons or hover effects worked. The fix was always the same: add `client:load` to the component tag in the `.mdx` file. But it took trial and error to internalize this pattern. We also hit edge cases where a child component needed to detect whether it was inside a "preview" (planet node) or "expanded" (modal) view — we solved this by walking up the DOM with `.closest('[data-era-view]')`.

**Cross-browser scrollbar styling.**  
The bibliography modal's scrollbar needed to match the green retro terminal theme. Chrome/Edge support `::-webkit-scrollbar` pseudo-elements for full customization, but Firefox uses the simpler `scrollbar-color` and `scrollbar-width` properties. Getting both to look consistent took longer than expected for something so visually minor. We had to write separate CSS rules for each engine.

**Deployment configuration.**  
Initially we deployed on Render (a free hosting platform), which worked but was slow to cold-start and didn't match the instructor's requirement of GitHub Pages hosting. Migrating to GitHub Pages required:
1. Creating a GitHub Actions workflow for CI/CD
2. Updating all internal links to use `import.meta.env.BASE_URL` (since GitHub Pages serves from a subpath)
3. Setting the Node.js version in the workflow to match our `package.json` engine requirement (`>=22.12.0`)
4. Configuring the repo's GitHub Pages settings to use "GitHub Actions" as the source (not "Deploy from a branch")

**MDX curly brace parsing errors.**  
Early on, some of our era descriptions contained literal `{` and `}` characters (e.g., in code snippets or technical notation). MDX interprets curly braces as JSX expressions, which caused confusing build errors. We had to either escape them or wrap them in template literals. This was a small but frustrating issue that took time to diagnose.

### Creative Development

**Era color palette as emotional progression.**  
We assigned each era its own signature color: green (60s), red (70s), amber (80s), blue (90s), cyan (2000s), emerald (2010s), and purple (2020s). These colors don't just appear on the cards — they also bleed into the background glow blobs and the footer label as you scroll, creating a gradual atmospheric shift as you move through time. The progression from green (terminal/early computing) through warm tones (analog/arcade era) to cool blues and purples (digital/modern era) mirrors the emotional arc of the technology itself. This wasn't planned from the start, but once we saw it in action, it felt right and we committed to it.

**CRT boot-up intro as narrative framing.**  
The CRT boot-up intro screen was added relatively late in development, but it became one of our favorite parts. When you first load the site, there's an old-style TV set with an "Initialize" button. Clicking it triggers a sequence: the power LED turns green, a loading bar fills, a white flash fires, and the TV scales up (using CSS `transform: scale(8)` with a custom `cubic-bezier` easing) while fading out — as if you're being pulled into the monitor. It sets the mood before you even start scrolling through the timeline. The "zoom into the screen" transition creates a narrative frame: you're not just reading about graphics history, you're *entering* a terminal.

**Museum plaque typography.**  
For the typography, we chose Orbitron — a geometric, futuristic display font that gives labels a sci-fi museum plaque look. We deliberately made the labels very small (8-10px) with wide letter-spacing (0.2em+) and all uppercase, mimicking those little engraved description plaques you see next to exhibits in real museums. The contrast between the tiny, precise labels and the large, glowing era nodes creates a sense of scale and formality.

**3D corridor / VR tunnel effect.**  
The perspective grids on the floor and ceiling use CSS `perspective` and `rotateX` transforms to look like you're inside a digital corridor or VR tunnel. Combined with the horizontal scroll, it creates a sense of walking through a virtual space. The ceiling grid is set to 30% opacity to create visual hierarchy (floor = grounding, ceiling = ambient). The radial gradient mask fades both grids toward their edges, preventing a harsh geometric cutoff.

**Planet nodes with 3D tilt interaction.**  
Each era is represented as a floating "planet" node rather than a flat card. On hover, the node responds to mouse position with a 3D tilt effect (using `perspective(1000px)` and dynamically calculated `rotateX`/`rotateY` based on cursor position relative to the center). Orbit rings appear on hover (dashed and dotted borders with `animation: orbit` rotation), and the atmospheric glow intensifies. Clicking opens a full-screen modal with an expanded view. This design choice transforms passive reading into active exploration — each era feels like a distinct world to discover.

---

## Reference Citations

1. **Aleksić, V., & Simeunović, V.** (2024). The pixel art as computer graphics artistic expression in digital games. *10th International Scientific Conference Technics, Informatics and Education - TIE 2024*, 234–238. [https://doi.org/10.46793/TIE24.234A](https://doi.org/10.46793/TIE24.234A)
2. **Baum, D.** (1998). 3D graphics hardware. *ACM SIGGRAPH Computer Graphics*, *32*(1), 65–66. [https://doi.org/10.1145/279389.279478](https://doi.org/10.1145/279389.279478)
3. **Blythe, D.** (2008). Rise of the graphics processor. *Proceedings of the IEEE*, *96*(5), 761–778. [https://doi.org/10.1109/JPROC.2008.917718](https://doi.org/10.1109/JPROC.2008.917718)
4. **Bueno, J. S. de O.** (2023). Pixels beyond colors: Exploring attributes and representations of text-art images. *Anais do XX Congresso Latino-Americano de Software Livre e Tecnologias Abertas (Latinoware 2023)*, 75–82. [https://doi.org/10.5753/latinoware.2023.236505](https://doi.org/10.5753/latinoware.2023.236505)
5. **Computer graphics.** (n.d.). Stony Brook University Course Page. [https://www3.cs.stonybrook.edu/~cse301/hw/ComputerGraphics/](https://www3.cs.stonybrook.edu/~cse301/hw/ComputerGraphics/)
6. **Computer History Museum.** (2024). *Allan Alcorn*. [https://computerhistory.org/profile/allan-alcorn/](https://computerhistory.org/profile/allan-alcorn/)
7. **Dahiwal, P., Khonde, S., Warade, K., Sonawane, V., & Gawande, S. H.** (2026). Deep learning innovations in ray tracing: A survey of transition to neural rendering. *International Journal of Image and Graphics*. [https://doi.org/10.1142/S0219467828500131](https://doi.org/10.1142/S0219467828500131)
8. **El-Din El kheshen, G.** (2021). Pixel art as a visual stimulus in graphic arts. *Journal of Arts & Architecture Research Studies*, *2*(3), 142–156.
9. **Habel, R., & Wimmer, M.** (2010). Efficient irradiance normal mapping. *Proceedings of the 2010 ACM SIGGRAPH Symposium on Interactive 3D Graphics and Games*, 189–195. [https://doi.org/10.1145/1730804.1730835](https://doi.org/10.1145/1730804.1730835)
10. **History of ASCII art.** (n.d.). *ASCII Art Archive*. [https://www.asciiart.eu/history-of-ascii-art](https://www.asciiart.eu/history-of-ascii-art)
11. **History of computer graphics 1960-69.** (n.d.). *Danielsevo.com*. [https://www.danielsevo.com/hocg/hocg_1960.htm](https://www.danielsevo.com/hocg/hocg_1960.htm)
12. **Lindholm, E., Nickolls, J., Oberman, S., & Montrym, J.** (2008). NVIDIA Tesla: A unified graphics and computing architecture. *IEEE Micro*, *28*, 39–55. [https://doi.org/10.1109/mm.2008.31](https://doi.org/10.1109/mm.2008.31)
13. **Liu, L., Chang, W., Demoullin, F., Chou, Y. H., Saed, M., Pankratz, D., Nowicki, T., & Aamodt, T. M.** (2021). Intersection prediction for accelerated GPU ray tracing. *MICRO-54: 54th Annual IEEE/ACM International Symposium on Microarchitecture*, 709–723. [https://doi.org/10.1145/3466752.3480097](https://doi.org/10.1145/3466752.3480097)
14. **Mawhorter, P.** (2021). Fractal coordinates for incremental procedural content generation. *The 16th International Conference on the Foundations of Digital Games (FDG) 2021*, 1–10. [https://doi.org/10.1145/3472538.3472576](https://doi.org/10.1145/3472538.3472576)
15. **Novedge.** (2025). Design software history: Evolution of vector and raster graphics in design software history: A journey through technology and creative process transformation. *NOVEDGE*. [https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation](https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation)
16. **Peercy, M. S., Olano, M., Airey, J., & Ungar, P. J.** (2000). Interactive multi-pass programmable shading. *Proceedings of the 27th Annual Conference on Computer Graphics and Interactive Techniques - SIGGRAPH ’00*, 425–432. [https://doi.org/10.1145/344779.344976](https://doi.org/10.1145/344779.344976)
17. **Rossoni, M., Pozzi, M., Colombo, G., Gribaudo, M., & Piazzolla, P.** (2023). Physically based rendering of animated point clouds for extended reality. *Journal of Computing and Information Science in Engineering*, *24*(5), 1–9. [https://doi.org/10.1115/1.4063559](https://doi.org/10.1115/1.4063559)
18. **Shirley, P.** (1991). Physically based lighting calculations for computer graphics. *ResearchGate*. [https://www.researchgate.net/publication/36291560_physically_based_lighting_calculations_for_computer_graphics](https://www.researchgate.net/publication/36291560_physically_based_lighting_calculations_for_computer_graphics)
19. **The beginner's guide to ASCII: Making sense of digital language.** (n.d.). *ASCII-code*. [https://www.ascii-code.com/articles/Beginners-Guide-to-ASCII](https://www.ascii-code.com/articles/Beginners-Guide-to-ASCII)
20. **The history of computer art: Part one (1950-1969).** (n.d.). *Ragnar Digital*. [https://www.ragnardigital.art/stories/a-history-of-computer-art-part-one](https://www.ragnardigital.art/stories/a-history-of-computer-art-part-one)
21. **Xu, C., Cheng, H., Chen, Z., Wang, J., Chen, Y., & Zhao, L.** (2025). Interactive realistic volume rendering of consistently high quality with dynamic illumination. *IEEE Transactions on Visualization and Computer Graphics*, *31*(9), 5288. [https://doi.org/10.1109/TVCG.2024.3445339](https://doi.org/10.1109/TVCG.2024.3445339)

---

## Disclosure on the Use of AI / LLM

This project utilized AI/LLM tools as development aids. Full transparency is provided below.

### Tools Used

| Tool | Purpose |
|---|---|
| **Gemini (Google AI)** | Visual design mockups for the proposal; generating concept images to align the team on aesthetic direction. |
| **AI-assisted coding tools (Gemini Code Assist / Antigravity IDE)** | Development assistance for interactive components, project structuring, debugging, and deployment configuration. |

### Specific Areas of AI Involvement

| Area | What AI Helped With | What the Team Did |
|---|---|---|
| **Project structure & architecture** | AI suggested the Astro island architecture pattern, the MDX-based content structure, and the component hierarchy (EraCard wrapper → era-specific child). | The team made all final architectural decisions, chose the tech stack, and implemented the integration. |
| **Interactive era components** | AI assisted in developing the interactive React components for each era (ASCII art CRT renderer, pixel grid, 3D polygon viewer, ray tracer visualization, volumetric lighting simulation). | The team specified the visual requirements for each era, iterated on designs, and validated that each component accurately represented its historical period. |
| **CSS visual effects** | AI helped implement the CRT scanline effect, 3D perspective grids, ambient particle systems, and the planet node 3D tilt interaction. | The team designed the overall aesthetic direction (Fallout/retro-futuristic), chose the color palette, and made all creative decisions about visual identity. |
| **Scroll mechanics** | AI provided the `requestAnimationFrame` + lerp scroll implementation and the `IntersectionObserver` integration for background color shifts. | The team identified the UX problem (sluggish native scroll), tested the solution, and tuned the easing values. |
| **Deployment** | AI configured the GitHub Actions workflow for GitHub Pages deployment and fixed `BASE_URL` issues for subpath hosting. | The team managed the Git repository, branches, and deployment settings. |
| **Performance optimization** | AI suggested `will-change`, reduced blur values, and GPU-acceleration strategies. | The team identified the performance problems through testing on multiple devices and continues to iterate on optimizations. |
| **README documentation** | AI helped structure and expand the incremental development log based on the team's notes and experiences. | All experiences, aha moments, challenges, and creative rationale are the team's own — AI helped articulate and organize them. |

### What AI Did NOT Do

- **Historical content:** All era descriptions, technical explanations, and historical context were researched and written by the team.
- **Creative direction:** The Fallout-inspired "Living Terminal" concept, the era color palette, the museum plaque typography, and the planet node design were all team-originated ideas.
- **Design decisions:** All decisions about layout, interaction patterns, visual hierarchy, and user experience were made by the team.
- **Testing & iteration:** All testing, bug identification, and iterative refinement were performed by the team.

> **Summary:** AI tools served as development accelerators — they helped us write code faster and debug more efficiently, but the creative vision, technical content, architectural decisions, and quality standards are entirely the team's own work.

---

## To-Do for Final Submission

- [ ] **Performance optimization** — reduce animation load on lower-end devices; lazy-load heavy components; optimize GPU-heavy CSS (blur, perspective grids); consider `IntersectionObserver` to pause off-screen animations
- [ ] **Polish interactive elements** — refine hover states, transitions, and click feedback across all 7 era components; add loading states for heavier components
- [ ] **Add keyboard navigation** — allow arrow keys (← →) to jump between era nodes; add focus indicators for accessibility
- [ ] **Expand era descriptions** — add more detailed technical content to each era's modal view; include historical images or diagrams where appropriate
- [ ] **Mobile responsiveness** — optimize for touch gestures (swipe to scroll); adjust planet node sizes and spacing for smaller screens
- [ ] **Final content review** — proofread all era descriptions for accuracy and completeness
- [ ] **Cross-browser testing** — verify rendering and interactions on Chrome, Firefox, Safari, and Edge
- [ ] **Accessibility improvements** — add ARIA labels, ensure sufficient color contrast, support screen readers

---
---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- ORIGINAL PROPOSAL DOCUMENT (preserved below)                      -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Case Study Project Proposal
**Course:** CSARCH2 Term 3, AY 2025-2026  
**Group Name:** RetroSpec (Group #4) 
**Members:** 
* Bueno, Jonathan R.
* Dela Cruz, Louiz Alfredo DV. 
* Ibañez, Kane Joshua 
* Ignacio, Miguel Angelo
* Solomon, Adonis Mikel

---

> [!NOTE] 
> 1.) Topic proposed is confusing. Do you want to discuss about evolution of printers? or evolution of monitors and their resolutions? It s a jumbled topic. Please re-focus and rewrite

> [!IMPORTANT]
> ### Revision Log and Highlighted Changes
> * Title Evolution: Changed from How Computers Learned to See: From ASCII Art to Flawless Realism to From ASCII to Real-Time: The Evolution of Computer Graphics for a direct, clear narrative trajectory.
> * Timeline of Computer Graphics Section: Completely removed the 1950s era. 
> * Timeline of Computer Graphics Section: Cut out references to peripheral flatbed, drum, and micro plotters from the 1960s to keep the theme tightly scoped around text-terminal and display resolution constraints.

---

## Title of the Proposed Case Study
### From ASCII to Real-Time: The Evolution of Computer Graphics

### Introduction
Before computers could draw a line, they arranged characters. That constraint, and the ingenuity it demanded, gave birth to one of the most transformative technological journeys in history. What began as crude patterns of text on a screen would eventually grow into the richly detailed, immersive visuals we take for granted today, and the story of how we got there is anything but simple.

From ASCII to Real-Time: The Evolution of Computer Graphics is an interactive virtual exhibit that traces how computer-generated imagery evolved from its earliest, most primitive forms into the sophisticated visual systems powering modern games, films, and simulations. Starting from the 1960s, where developers worked with impact printers to use ASCII characters in order to create an image, since raster graphics did not yet exist. They had to use the pre-defined pixels to create such art. The exhibit walks visitors through each defining era of that transformation. The adoption of raster graphics in the 1970s gave machines the ability to address individual pixels. The 1980s and 90s brought 3D object rendering and the rise of the GPU, fundamentally changing what screens could produce. Then came the 2000s and 2010s, with photorealism, high-resolution displays, and GPU technology becoming widely accessible to everyday users.
But this exhibit is not just a history lesson, it is an invitation to experience that evolution firsthand.

---

## Timeline of Computer Graphics

### 1960s
* Impact Printer, and the first use of ASCII characters as art
* Generative ASCII art using mathematical formulas and algorithms

### 1970s
* Raster Graphics, or Bitmaps that are made up of pixels
* Light Diffusion

### 1980s
* 3D Graphics
* Object Rendering

### 1990s
* Interactive Media
* GPUs
* Video games

### 2000s
* Complex lighting
* Photorealism
* Animated Films

### 2010s
* High quality movie graphics
* Wide adoption of GPUs
* Virtual-Reality

### 2020s
* 4K resolution
* Real-time Rendering
* AI upscaling

---

## Tech Stack Plan
Below highlights the Tech Stack Plan of the group, outlining the project components, core technologies and their corresponding versions, and their applications that we selected for our team's virtual exhibit.

| Project Component | Technology | Version | Application & Justification |
| :--- | :--- | :--- | :--- |
| **Runtime Environment** | Node.js | v22+ | Node.js is the foundation for all the tools used across the entire stack. |
| **Web Framework** | Astro | v4.16 | Astro's fast static pages and MDX/React support makes it ideal for the creation of an interactive virtual exhibit. |
| **Content Format** | MDX | Managed using @astrojs/mdx | MDX allows for embedding of interactive React components within the same content file.|
| **Component Framework** | React | v18.3 | React provides the interactivity of the exhibit and works hand-in-hand with Astro's hydration of the interactive components. |
| **Styling** | Tailwind CSS | v4.3 | Tailwind CSS's utility-first approach allows for the flexibility to create visual aesthetics ranging from retro to modern style. |
| **Version Control** | GitHub | Current | This platform manages the project codebase, which was branched from the official astro.build template.|

---

Based on the Tech Stack Plan, the interactive element of the exhibit will be a slideshow-like experience that allows users to interact with graphical technology ranging from ASCII to photorealistic renderings. The following are the key interactive elements of the UI:

### Interactive Application Architecture
**Component Rendering:** 
Each era's panel is developed as an individual React component and integrated into its specific .mdx file. This modular architecture enables independent styling and structuring, ensuring that every panel accurately represents the unique visual language of its given era.

**Interactivity and State:** 
The gallery utilizes a series of immersive, full-screen panels representing different eras, navigable via keyboard shortcuts or arrow keys. Each panel features interactive, annotated hotspots that, when triggered, open modal windows detailing how specific technological milestones or techniques shaped the progression of computer graphics. React manages the application's state, including active panel navigation, modal toggles, and the execution of era-specific utilities like a pixel-grid editor or an ASCII art creator.

**CSS Style:** 
The virtual exhibit's overall design, including hotspot styles, animated transitions symbolizing technological progress, and period-specific visual themes for each panel, will be realized through Tailwind CSS. 

---

### Sample Layout:

**Concept: Living Terminal**

Interface: The main interactive element will be designed like a slideshow experience that transitions through the history of graphical technology.

Upon entry, the user is greeted by an interactive dashboard that serves as their navigational guide throughout the experience. As they drag or slide through the timeline, the interface dynamically updates, allowing the user to navigate through all these historical stages.

---

## Description of the Web Application
The proposed web application is a virtual art gallery dedicated to the history of computer graphics from ASCII art up until Modern GPUs. The website will show how early computer users created graphics using only standard keyboard characters before modern screens existed. Visitors will interact with the site by exploring different digital exhibit rooms and using interactive tools to understand text-based art and rendered artworks. 

**Era Navigation:**
The exhibit is split into different pages based on the time period. Visitors can click through a menu to explore art from the 1970s, 1980s, and 1990s.

---

## References
* Node.js - Node.js Documentation. https://nodejs.org/
* Astro. @astrojs/mdx Integration Guide. Astro Docs. https://docs.astro.build/en/guides/integrations-guide/mdx/
* Astro. @astrojs/react Integrations Guide. Astro Docs. https://docs.astro.build/en/guides/integrations-guide/react/
* Install Tailwind CSS with Astro. Tailwind CSS. https://tailwindcss.com/docs/installation/framework-guides/astro
* ASCII Art Archive. https://www.asciiart.eu/history-of-ascii-art
