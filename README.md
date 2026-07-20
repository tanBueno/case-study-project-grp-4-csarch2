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

This section covers our project's development journey, documenting what worked, what broke, and what we learned along the way. It sits on top of the original proposal to show our progress.

## Development Summary

We built an interactive virtual museum tracing the evolution of computer graphics. Instead of a standard vertical page, users scroll horizontally through a "Living Terminal" timeline. Each era is an interactive "planet" node with period-specific visuals and components.

The app features a CRT boot-up sequence, floating CSS particles, 3D CSS perspective grids, and scroll-driven color changes. We implemented 7 distinct React components representing different graphical eras.

### Current Status: Core Experience Functional

| Feature | Status | Notes |
|---|---|---|
| Horizontal scrolling | ✅ Complete | Custom requestAnimationFrame lerp |
| CRT boot-up intro | ✅ Complete | Animated TV with scale zoom |
| Curator terminal | ✅ Complete | Terminal-style help overlay |
| 1960s: ASCII Art | ✅ Complete | CRT TV with switchable ASCII faces |
| 1970s: Rasterization | ✅ Complete | Pixel grid visualizer |
| 1980s: 8-Bit Pixels | ✅ Complete | Retro sprite renderer |
| 1990s: 3D Polygons | ✅ Complete | Wireframe viewer |
| 2000s: Vector Maps | ✅ Complete | Edge detection visualizer |
| 2010s: Volumetric Light | ✅ Complete | Light ray simulation |
| 2020s: Photorealism | ✅ Complete | Ray tracing visualizer |
| Sources modal | ✅ Complete | Scrollable reference list |
| Scroll indicator | ✅ Complete | Gradient progress bar |
| Ambient particles | ✅ Complete | CSS-only floating particles |
| Scroll-driven colors | ✅ Complete | IntersectionObserver background shifts |
| Museum footer | ✅ Complete | Dynamic era labels |
| 3D perspective grids | ✅ Complete | CSS perspective and rotateX |
| Welcome homepage | ✅ Complete | Landing page |
| GitHub Pages deploy | ✅ Complete | GitHub Actions workflow |
| Performance optimization | 🔄 In Progress | GPU-heavy effects cause lag on older devices |
| Keyboard navigation | 📋 Planned | Jump between nodes with arrow keys |
| Mobile responsiveness | 📋 Planned | Touch gestures and layout tweaks |

## Development Process

### Aha Moments

1. **The horizontal scroll breakthrough.**
We originally couldn't decide between a standard vertical scrolling page or something like a slideshow presentation. To be honest, both felt a bit boring for a "museum" concept. Then someone suggested a horizontal scroll, basically so it feels like you are actually walking through a physical exhibit hall. We based the "Living Terminal" aesthetic loosely on the Fallout Pip-Boy interface, and once we tested that horizontal movement, the whole concept just clicked together naturally. 

2. **IntersectionObserver for the background.**
When we first planned the background color shifts, we thought we'd have to manually calculate scroll positions to figure out when to change the background glow and update the footer label. That approach would have been pretty messy and likely caused performance issues. Instead, we discovered the IntersectionObserver API. By configuring the rootMargin to specifically focus on the center of the screen, the browser natively detects which era card is active and triggers the visual updates for us automatically. It honestly saved us from writing a lot of complicated code.

3. **CRT scanlines with pure CSS.**
We initially assumed we would need a canvas element or a transparent image overlay to create the retro CRT scanline effect on the screens. However, we realized we could achieve the exact same look using just pure CSS gradients with repeating-linear-gradient. It looks surprisingly authentic and performs much better than loading an external image file.

4. **The transition to computer nodes.**
The era cards were originally designed to be flat, rectangular information panels. We quickly realized this didn't fit our "Living Terminal" theme, so we redesigned them to look like retro computer monitors. From there, we expanded on the idea by adding a 3D tilt effect on hover, utilizing CSS perspective and mouse-driven rotateX/Y transforms to make the screens feel heavy, interactive, and tangible. 

5. **Custom scroll physics.**
Relying on the native scroll-behavior: smooth property felt terrible for horizontal scrolling. It was either too sudden or somewhat sluggish. To fix this, we wrote a custom scroll function using requestAnimationFrame alongside linear interpolation (lerp). This gave us complete control over the easing, making the scrolling feel much smoother and more responsive to the user's mouse wheel.

6. **GitHub crash course paid off.**
Taking a proper crash course on GitHub along the way was a massive help for the team. Before that, managing branches and trying to merge our work sometimes felt like a guessing game where we hoped nothing would break. But actually taking the time to understand how to properly use version control and resolve conflicts saved us when things got complicated, especially right before our deployment deadline.

### Things We Learned

**Astro's Island Architecture.**
Astro components are static by default, which is great for loading speed. However, we got stuck for a while wondering why our React buttons wouldn't work or respond to clicks. We eventually learned that we had to explicitly add the client:load directive to tell Astro to hydrate those specific interactive components. It makes total sense now, since each component loads and hydrates independently without slowing down the rest of the page.

**MDX separation.**
Using .mdx files allowed us to clearly separate our written historical content from the interactive React code. We built an EraCard wrapper component that handles the layout and 3D hover effects, and then the era-specific React component just gets plugged inside of it. This separation of concerns prevented a lot of merge conflicts, since different team members could work on different eras in parallel without stepping on each other's toes.

**Scroll event handling.**
We found out that browsers do not natively translate vertical mouse wheel scrolling into horizontal scrolling smoothly. To get the behavior we wanted, we had to intercept the standard wheel event, prevent its default vertical behavior, and manually update our target scroll position inside our custom lerp animation loop. 

**Tailwind v4 changes.**
Upgrading to Tailwind v4 changed how some configuration works compared to the older v3 documentation we were used to reading. We had to spend some time figuring out the new @tailwindcss/vite plugin and exactly how to apply certain utility classes correctly under the new system. 

**3D CSS depth.**
To create the digital corridor effect you see in the background, we applied perspective(800px) and rotateX(75deg) to a grid background. We also utilized the mask-image: radial-gradient property to slowly fade the edges of the grid so it blends smoothly into the dark background instead of having a harsh, sudden cutoff.

**Astro on GitHub Pages.**
Deploying an Astro site to GitHub Pages requires handling subpaths properly. Because our site is hosted at a repository subpath rather than a root domain, we had to make sure we wrapped all our internal links with import.meta.env.BASE_URL. If we hadn't done this, all our links would have broken in the production environment.

### Challenges

**Performance issues.**
Our user interface is heavily graphic-dependent. We have CSS particle systems, 3D perspective grids, and large background blur effects running constantly in the background. As a result, this causes noticeable frame drops on lower-end devices. We have tried fixing it by adding will-change: transform to hint the browser, lowering the CSS blur values, using mix-blend-mode: screen sparingly, and reducing the total number of floating particles on screen. We are still actively working on optimizations to try and get a consistent 60fps across all devices.

**Astro hydration bugs.**
Because the Astro framework is static-first, we kept forgetting to add the client:load directive whenever we built new interactive components. We also struggled a bit with child components needing to know whether they were currently displaying in the small "planet" view or the expanded, full-screen modal view. We eventually fixed this issue by having the components check the DOM using .closest('[data-era-view]') to determine their current context.

**Scrollbar styling.**
Making the bibliography modal's scrollbar match our green retro terminal theme was surprisingly annoying. Google Chrome uses the ::-webkit-scrollbar pseudo-element, while Firefox uses standard scrollbar-color properties. We had to write two entirely separate sets of CSS rules just to make a simple scrollbar look consistent everywhere.

**Deployment setup.**
We originally hosted the project on Render, but we had to switch over to GitHub Pages to strictly meet the project requirements. This migration meant writing a GitHub Actions workflow from scratch, fixing all our internal links to account for the subpath, and making absolutely sure the GitHub build environment matched the local Node.js version we were testing with.

**MDX parsing errors.**
MDX treats curly braces as JSX expressions by default. When we tried to write normal code snippets in our era descriptions, the build would unexpectedly fail because it tried to evaluate them. We had to go through and escape the brackets or use template literals, which took some time to track down and fix.

### Creative Development

**Era color palettes.**
We decided to give each era a specific signature color: green for the 60s, red for the 70s, amber for the 80s, and then moving into cooler blues and purples for the more modern eras. As you scroll horizontally, the IntersectionObserver updates the background ambient glow to match whichever era is currently on screen. It creates a really nice visual progression, starting from the monochromatic colors of old terminals and shifting into modern digital aesthetics.

**CRT boot-up.**
We added a brief boot-up sequence at the beginning where clicking "Initialize" plays a CSS animation. It scales up the screen and fades it out, almost like you're physically diving into the monitor. It is a relatively small detail, but we feel it sets the right mood and context before you even start scrolling.

**Typography.**
For the museum plaques, we chose a font called Orbitron. We deliberately made the text small with very wide letter-spacing to mimic the look of real, engraved museum labels. We found that the contrast between the tiny, precise text and the large glowing monitors looks visually striking.

**Interactive screens.**
Instead of just using flat cards to represent time periods, the eras are floating nodes that physically tilt toward your mouse cursor when you hover over them. The screen glows intensify on hover, and clicking on them opens the full detailed view. It makes the entire timeline feel much more interactive and alive compared to a static web page.

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
12. **Karis, B.** (2013). Real shading in Unreal Engine 4. *SIGGRAPH 2013 Physically Based Shading Course*. [https://blog.selfshadow.com/publications/s2013-shading-course/](https://blog.selfshadow.com/publications/s2013-shading-course/)
13. **Lindholm, E., Nickolls, J., Oberman, S., & Montrym, J.** (2008). NVIDIA Tesla: A unified graphics and computing architecture. *IEEE Micro*, *28*, 39–55. [https://doi.org/10.1109/mm.2008.31](https://doi.org/10.1109/mm.2008.31)
14. **Liu, L., Chang, W., Demoullin, F., Chou, Y. H., Saed, M., Pankratz, D., Nowicki, T., & Aamodt, T. M.** (2021). Intersection prediction for accelerated GPU ray tracing. *MICRO-54: 54th Annual IEEE/ACM International Symposium on Microarchitecture*, 709–723. [https://doi.org/10.1145/3466752.3480097](https://doi.org/10.1145/3466752.3480097)
15. **Mawhorter, P.** (2021). Fractal coordinates for incremental procedural content generation. *The 16th International Conference on the Foundations of Digital Games (FDG) 2021*, 1–10. [https://doi.org/10.1145/3472538.3472576](https://doi.org/10.1145/3472538.3472576)
16. **Mildenhall, B., Srinivasan, P. P., Tancik, M., Barron, J. T., Ramamoorthi, R., & Ng, R.** (2020). NeRF: Representing scenes as neural radiance fields for view synthesis. *Computer Vision – ECCV 2020*, 405–421. [https://doi.org/10.1007/978-3-030-58452-8_24](https://doi.org/10.1007/978-3-030-58452-8_24)
17. **Novedge.** (2025). Design software history: Evolution of vector and raster graphics in design software history: A journey through technology and creative process transformation. *NOVEDGE*. [https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation](https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation)
18. **Peercy, M. S., Olano, M., Airey, J., & Ungar, P. J.** (2000). Interactive multi-pass programmable shading. *Proceedings of the 27th Annual Conference on Computer Graphics and Interactive Techniques - SIGGRAPH ’00*, 425–432. [https://doi.org/10.1145/344779.344976](https://doi.org/10.1145/344779.344976)
19. **Phong, B. T.** (1975). Illumination for computer generated pictures. *Communications of the ACM*, *18*(6), 311–317. [https://doi.org/10.1145/360825.360839](https://doi.org/10.1145/360825.360839)
20. **Rossoni, M., Pozzi, M., Colombo, G., Gribaudo, M., & Piazzolla, P.** (2023). Physically based rendering of animated point clouds for extended reality. *Journal of Computing and Information Science in Engineering*, *24*(5), 1–9. [https://doi.org/10.1115/1.4063559](https://doi.org/10.1115/1.4063559)
21. **Sanglard, F.** (2012). Quake source code review. *Fabien Sanglard's Website*. [https://fabiensanglard.net/quakeSource/](https://fabiensanglard.net/quakeSource/)
22. **Shirley, P.** (1991). Physically based lighting calculations for computer graphics. *ResearchGate*. [https://www.researchgate.net/publication/36291560_physically_based_lighting_calculations_for_computer_graphics](https://www.researchgate.net/publication/36291560_physically_based_lighting_calculations_for_computer_graphics)
23. **Sutherland, I. E.** (1963). Sketchpad: A man-machine graphical communication system. *Proceedings of the AFIPS Spring Joint Computer Conference*, *23*, 329–346. [https://dl.acm.org/doi/10.1145/1461551.1461591](https://dl.acm.org/doi/10.1145/1461551.1461591)
24. **The beginner's guide to ASCII: Making sense of digital language.** (n.d.). *ASCII-code*. [https://www.ascii-code.com/articles/Beginners-Guide-to-ASCII](https://www.ascii-code.com/articles/Beginners-Guide-to-ASCII)
25. **The history of computer art: Part one (1950-1969).** (n.d.). *Ragnar Digital*. [https://www.ragnardigital.art/stories/a-history-of-computer-art-part-one](https://www.ragnardigital.art/stories/a-history-of-computer-art-part-one)
26. **Xu, C., Cheng, H., Chen, Z., Wang, J., Chen, Y., & Zhao, L.** (2025). Interactive realistic volume rendering of consistently high quality with dynamic illumination. *IEEE Transactions on Visualization and Computer Graphics*, *31*(9), 5288. [https://doi.org/10.1109/TVCG.2024.3445339](https://doi.org/10.1109/TVCG.2024.3445339)
---

## AI Usage Disclosure

Throughout this project, we actively used AI assistants, specifically Gemini and VSCode Copilot, to speed up our development and help us get past tricky bugs. We wanted to be completely transparent about how these tools were used versus what the team built by hand. Here is a realistic breakdown of how we utilized them in our workflow:

### Tools Used

**Gemini (Google AI):**
We primarily used Gemini during the early stages for generating initial visual mockups and brainstorming our concept. It was also incredibly helpful for explaining complex Astro configuration issues when we got stuck, such as figuring out how the island architecture actually worked. When we had higher-level architectural questions, bouncing ideas off Gemini gave us a clearer direction to move forward.

**VSCode Copilot:**
Copilot was our go-to tool for inline code suggestions and debugging weird syntax errors while we were actually writing the code. It was especially useful when we couldn't figure out why certain React state changes weren't triggering, helping us pinpoint missing dependencies in our hooks. It essentially acted like a pair-programmer that caught our typos and suggested boilerplate code, saving us a lot of manual typing.

### Where AI Actually Helped (Specific Examples)

**Debugging the Custom Scroll Function:**
When we first tried to build our custom horizontal scroll using requestAnimationFrame, the math for the linear interpolation (lerp) just wasn't working correctly and the scroll kept jittering. We fed the broken function into Gemini, and it helped us realize we were calculating the target scroll position incorrectly based on the wheel delta. After the AI pointed out the exact line where the math was failing, we were able to rewrite the logic to finally get that smooth, buttery scroll we wanted.

**Fixing IntersectionObserver Glitches:**
We also used Copilot to help debug some incredibly annoying issues we were having with our IntersectionObserver setup. Initially, the background colors were triggering way too early before the era cards were actually in the center of the screen, which ruined the visual pacing. Copilot suggested tweaking the rootMargin values to effectively constrain the trigger area, which perfectly fixed the timing of the color shifts.

**CSS 3D Perspective Calculations:**
Trying to figure out the exact CSS math for the 3D perspective grids on the floor and ceiling was causing a lot of frustrating trial and error. We asked Gemini for a basic example of how to combine perspective and rotateX to create an infinite digital corridor effect. It gave us a solid starting snippet that we then heavily tweaked and stylized to match our specific retro-futuristic aesthetic.

### What We Did Ourselves

Even though AI was a huge help for debugging and boilerplate, all the actual substance and creative direction came directly from our team. We did all the historical research, wrote the technical explanations, and designed the overall Fallout-inspired aesthetic, including the retro computer nodes and color palettes. Finally, we manually tested, heavily tweaked, and optimized every piece of generated code to ensure the final experience was cohesive and ran smoothly.
---

## Remaining Work for Final Submission

1. **Fix performance lag:** We still need to reduce the animation load on older devices. We plan to lazy-load some of the heavier components, optimize our CSS blurs and perspective grids, and potentially use IntersectionObserver to pause animations entirely when they aren't on screen.
2. **Polish interactions:** We are going to refine the hover states and click feedback across all 7 of our era components, and add proper loading states where things feel a bit slow.
3. **Keyboard navigation:** We are adding arrow key support so users can quickly jump between era nodes without needing to rely on a mouse.
4. **Expand era descriptions:** We need to flesh out the technical content a bit more and add some historical images to each era's expanded modal window.
5. **Mobile layout:** We still need to optimize the touch scrolling behavior and manually adjust the computer node sizes so they don't break the layout on smaller smartphone screens.
6. **Final review and testing:** We will proofread all the text, thoroughly verify that everything works consistently across Chrome, Firefox, Safari, and Edge, and improve our accessibility score by adding ARIA labels and checking color contrast.


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
