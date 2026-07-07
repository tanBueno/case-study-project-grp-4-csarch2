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

> **GitHub:** [github.com/tanBueno/case-study-project-grp-4-csarch2](https://github.com/tanBueno/case-study-project-grp-4-csarch2)  
> **Live Site:** https://case-study-project-grp-4-csarch2-e39f.onrender.com

---

# Incremental Development Log - Mid-Milestone

## Development Summary

The project is an **interactive virtual museum exhibit** that traces the evolution of computer graphics from the 1960s to the 2020s. Users scroll horizontally through a "Living Terminal" - a cyberpunk-themed timeline where each era is represented by an interactive exhibit node with era-specific visuals and technical explanations.

### Current Status: Core Experience Functional

| Feature | Status |
|---|---|
| Horizontal scrolling timeline | Complete |
| CRT boot-up intro screen | Complete |
| Curator terminal (instructions modal) | Complete |
| 1960s — ASCII Character Art exhibit | Complete |
| 1970s — Early Bitmaps & Rasterization exhibit | Complete |
| 1980s — 8-Bit Pixel Blocks exhibit | Complete |
| 1990s — 3D Polygons & Hardware GPUs exhibit | Complete |
| 2000s — Vector Maps & Edge Detection exhibit | Complete |
| 2010s — Volumetric Lighting & VR exhibit | Complete |
| 2020s+ — Flawless Photorealism exhibit | Complete |
| Bibliography / Sources modal | Complete |
| Scroll progress indicator | Complete |
| Ambient particles & star field | Complete |
| Scroll-driven background color shifts | Complete |
| Museum footer with era label | Complete |
| Performance optimization | In Progress |
| Additional Information on each Era | In Progress |
| Deployment | Complete |

---

## Development Process

### Aha Moments

So honestly at the start we didn't really know what direction to go with. We were going back and forth between doing a normal vertical scrolling page or like a slideshow type thing, and nothing really felt right for a "museum" vibe. Then someone suggested what if we make it scroll horizontally instead, like your actually walking through an exhibit hall And that was kind of the moment everything clicked. We started calling it the "Living Terminal" because we were inspired by the Pip boy from the game fallout which has a similar vibe to our project and from there the whole concept just came together naturally.

Another thing that surprised us was the `IntersectionObserver` API. We were originally planning to manually calculate scroll positions to figure out which era the user was looking at so we could change the background color. But then we found out IntersectionObserver can basically do that for us it detects which era card is in the center of the viewport, and then the background glow, the footer label, everything just updates on its own. Saved us a ton of headache.

Also the CRT scanline effect  we thought we'd need canvas or some kind of image overlay for that. Turns out you can do it entirely with CSS gradients and box-shadow. No javascript needed at all. That was a big aha moment because it meant we got the retro aesthetic basically for free performance-wise.

### Things We Learned

Working with Astro was new for most of us and it took some getting used to. But one thing we really appreciated was the island architecture basically each React component hydrates on its own with `client:load`, so the 1960s ASCII component loading doesnt block the 2020s one from rendering. It makes the whole thing feel snappier even though theres a lot going on.

We also learned alot about MDX. Using .mdx files for each era let us keep the written content separate from the interactive React components, which made it way easier to work on stuff in parallel without stepping on each others toes. The EraCard component acts like a wrapper that standardizes the layout, and then each era just plugs in its own unique interactive child component.

One thing we didnt expect was how bad the default `scroll-behavior: smooth` felt for horizontal scrolling. It was super sluggish and you couldn't really control it. So we ended up writing our own scroll animation using `requestAnimationFrame` with a lerp (linear interpolation) basically a smoothing loop that eases toward the target position. It sounds complicated but its only like 20 lines of code and the difference in feel was night and day.

Tailwind v4 also threw us off a bit. The config file structure changed from what we were used to and some utility classes work differently now. We had to read through the docs a few times to figure things out but once we got it working it was fine.

### Challenges

One of our early challenges was wrapping our heads around how Astro and React work together. We were used to building standard React apps, so Astro's island architecture, where components are static by default and you have to explicitly tell it when to make them interactive caught us off guard a few times. We'd build a complex interactive era card and wonder why the buttons weren't working, only to realize we forgot the `client:load` directive. It took some trial and error, but once we understood the pattern, it actually made a lot of sense.

But the most difficult ongoing issue has been performance. The UI is incredibly heavy on graphics, we have floating particles, twinkling stars, 3D perspective grids on the floor and ceiling, background glow blobs, and full-screen CRT scanline overlays all running at the same time. Because of how graphics-intensive this is, it tends to lag significantly, especially on lower-end machines. No matter how much we try to optimize it by reducing blur values or using `will-change` in CSS, the sheer weight of the visual effects makes it really difficult to get a consistently smooth frame rate. It's been a frustrating challenge and we definitely have to work on this more for the final submission.

The bibliography modal scrollbar was also weirdly difficult. We wanted the scrollbar inside the modal to match the green retro terminal theme, and getting that to work consistently across browsers was a pain. Chrome uses `-webkit-scrollbar` pseudo-elements but Firefox handles it differently. We got it working eventually but it took longer than expected for something so small.

### Creative Decisions

We gave each era its own color, green for the 60s, red for 70s, amber for 80s, blue for 90s, cyan for 2000s, emerald for 2010s, and purple for 2020s. These colors dont just show up on the cards, they also bleed into the background glow and the footer label as you scroll, so theres this gradual shift in atmosphere as you move through time. It wasn't planned from the start but once we saw it in action it just felt right.

The CRT boot-up intro screen was something we added kind of late but it ended up being one of our favorite parts. When you first load the site theres this old TV with an "Initialize" button, and when you click it the screen scales up and fades out like your zooming into the monitor. It sets the mood before you even start scrolling through the timeline.

For the typography we went with Orbitron which gives it this sci-fi museum plaque kind of look. We made the labels really small with wide letter-spacing and all uppercase trying to mimic those little engraved description plaques you see next to exhibits in real museums.

The 3D grids on the floor and ceiling were a fun experiment. They use CSS `perspective` and `rotateX` transforms to look like your inside a digital corridor or VR tunnel. Its a subtle effect but it adds alot of depth to what would otherwise just be a flat dark background.

---

## Reference Citations

1. Bueno, J. S. de O. (2023). Pixels beyond colors: Exploring attributes and representations of text-art images. *Anais do XX Congresso Latino-Americano de Software Livre e Tecnologias Abertas (Latinoware 2023)*, 75–82. https://doi.org/10.5753/latinoware.2023.236505

2. Novedge. (2025). Design software history: Evolution of vector and raster graphics in design software history: A journey through technology and creative process transformation. *NOVEDGE*. https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation

3. Baum, D. (1998). 3D graphics hardware. *ACM SIGGRAPH Computer Graphics*, *32*(1), 65–66. https://doi.org/10.1145/279389.279478

4. Blythe, D. (2008). Rise of the graphics processor. *Proceedings of the IEEE*, *96*(5), 761–778. https://doi.org/10.1109/JPROC.2008.917718

5. Habel, R., & Wimmer, M. (2010). Efficient irradiance normal mapping. *Proceedings of the 2010 ACM SIGGRAPH Symposium on Interactive 3D Graphics and Games*, 189–195. https://doi.org/10.1145/1730804.1730835

6. Xu, C., Cheng, H., Chen, Z., Wang, J., Chen, Y., & Zhao, L. (2025). Interactive realistic volume rendering of consistently high quality with dynamic illumination. *IEEE Transactions on Visualization and Computer Graphics*, *31*(9), 5288. https://doi.org/10.1109/TVCG.2024.3445339

7. Liu, L., Chang, W., Demoullin, F., Chou, Y. H., Saed, M., Pankratz, D., Nowicki, T., & Aamodt, T. M. (2021). Intersection prediction for accelerated GPU ray tracing. *MICRO-54: 54th Annual IEEE/ACM International Symposium on Microarchitecture*, 709–723. https://doi.org/10.1145/3466752.3480097


---

## Disclosure on the Use of AI / LLM

This project utilized AI/LLM tools in the following capacities:

| Use Case | Tool(s) Used | Details |
|---|---|---|
| **Visual design mockups** | Gemini (Google AI) | Visual assets shown in the proposal were synthesized using generative AI to align ideas with the intended design language. |
| **Interactive element development** | AI-assisted coding tools | AI was used to assist in developing the interactive components for each era exhibit (e.g., ASCII art renderer, pixel grid, 3D polygon viewer). |
| **Development guidance & navigation** | AI-assisted coding tools | AI provided guidance in project structuring, component architecture decisions, and navigating Astro/React integration patterns. |
| **Performance optimization** | AI-assisted coding tools | AI assisted in identifying optimization strategies (e.g., `will-change`, GPU-accelerated animations, `IntersectionObserver`), though optimization work is still ongoing. |

> **Note:** All technical content (historical descriptions, era explanations, and architectural decisions) was researched and written by the group. AI tools served as development aids, not as primary content authors. The final code, design choices, and creative direction are the team's own work.

---

## To-Do for Final Submission

- [ ] **Performance optimization** — reduce animation load on lower-end devices; lazy-load particles; optimize GPU-heavy CSS (blur, perspective grids)
- [ ] **Polish interactive elements** — refine hover states, transitions, and click feedback across all 7 era components
- [ ] **Add keyboard navigation** — allow arrow keys to jump between era nodes
- [ ] **Final content review** — proofread all era descriptions for accuracy and completeness
- [ ] **Cross-browser testing** — verify on Chrome, Firefox, Safari, and Edge

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
