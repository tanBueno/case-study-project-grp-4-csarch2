# case-study-project-grp-4-csarch2

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

<mark>[!NOTE] 1.) Topic proposed is confusing. Do you want to discuss about evolution of printers? or evolution of monitors and their resolutions? It s a jumbled topic. Please re-focus and rewrite <mark>

[!IMPORTANT]
### Revision Log and Highlighted Changes
* Title Evolution: Changed from How Computers Learned to See: From ASCII Art to Flawless Realism to From ASCII to Real-Time: The Evolution of Computer Graphics for a direct, clear narrative trajectory.
* Timeline of Computer Graphics Section: Completely removed the 1950s era. 
* Timeline of Computer Graphics Section: Cut out references to peripheral flatbed, drum, and micro plotters from the 1960s to keep the theme tightly scoped around text-terminal and display resolution constraints.

---

## Title of the Proposed Case Study
<mark>### From ASCII to Real-Time: The Evolution of Computer Graphics<mark>

<mark>[!NOTE] 1.) Topic proposed is confusing. Do you want to discuss about evolution of printers? or evolution of monitors and their resolutions? It s a jumbled topic. Please re-focus and rewrite <mark>

### Introduction
Before computers could draw a line, they arranged characters. That constraint, and the ingenuity it demanded, gave birth to one of the most transformative technological journeys in history. What began as crude patterns of text on a screen would eventually grow into the richly detailed, immersive visuals we take for granted today, and the story of how we got there is anything but simple.
<mark>From ASCII to Real-Time: The Evolution of Computer Graphics is an interactive virtual exhibit that traces how computer-generated imagery evolved from its earliest, most primitive forms into the sophisticated visual systems powering modern games, films, and simulations. Starting from the 1960s, where developers worked with impact printers to use ASCII characters in order to create an image, since raster graphics did not yet exist. They had to use the pre-defined pixels to create such art. The exhibit walks visitors through each defining era of that transformation. The adoption of raster graphics in the 1970s gave machines the ability to address individual pixels. The 1980s and 90s brought 3D object rendering and the rise of the GPU, fundamentally changing what screens could produce. Then came the 2000s and 2010s, with photorealism, high-resolution displays, and GPU technology becoming widely accessible to everyday users.
But this exhibit is not just a history lesson, it is an invitation to experience that evolution firsthand. (REVISED)<mark>


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
Below highlights the Tech Stack Plan of the group, outlining the project components, core technologies and their corresponding versions, and their applications that we selected for our team’s virtual exhibit.

| Project Component | Technology | Version | Application & Justification |
| :--- | :--- | :--- | :--- |
| **Runtime Environment** | Node.js | v26.0.0 (Required) | Specified by project specs. Node.js is the foundation for all the tools used across the entire stack. |
| **Web Framework** | Astro | v6.0 (Required) | Specified by project specs. Astro’s fast static pages and MDX/React support makes it ideal for the creation of an interactive virtual exhibit. |
| **Content Format** | MDX | Managed using @astrojs/mdx (Required) | Specified by project specs. MDX allows for embedding of interactive React components within the same content file.|
| **Component Framework** | React | v19.2 | React provides the interactivity of the exhibit and works hand-in-hand with Astro’s hydration of the interactive components. |
| **Styling** | Tailwind CSS | v4.3 | Tailwind CSS’s utility-first approach allows for the flexibility to create visual aesthetics ranging from retro to modern style. |
| **Version Control** | GitHub | Current | This platform manages the project codebase, which was branched from the official astro.build template.|

---

Based on the Tech Stack Plan, the interactive element of the exhibit will be a slideshow-like experience that allows users to interact with graphical technology ranging from ASCII to photorealistic renderings. The following are the key interactive elements of the UI:

### Interactive Application Architecture
# Component Rendering: 
Each era's panel is developed as an individual React component and integrated into its specific .mdx file. This modular architecture enables independent styling and structuring, ensuring that every panel accurately represents the unique visual language of its given era.

# Interactivity and State: 
The gallery utilizes a series of immersive, full-screen panels representing different eras, navigable via keyboard shortcuts or arrow keys. Each panel features interactive, annotated hotspots that, when triggered, open modal windows detailing how specific technological milestones or techniques shaped the progression of computer graphics. React manages the application's state, including active panel navigation, modal toggles, and the execution of era-specific utilities like a pixel-grid editor or an ASCII art creator.

# CSS Style: 
The virtual exhibit's overall design, including hotspot styles, animated transitions symbolizing technological progress, and period-specific visual themes for each panel, will be realized through Tailwind CSS. 

---

### Sample Layout:

# Concept : Living Terminal 

<img width="836" height="420" alt="image" src="https://github.com/user-attachments/assets/5538e751-a90b-4251-a3c1-27a25afc659e" />

Interface: The main interactive element will be designed like a slideshow experience that transitions through the history of graphical technology.

<img width="1067" height="420" alt="image" src="https://github.com/user-attachments/assets/b590bea6-577c-4164-9e9a-ca7488b04cfb" />

Upon entry, the user is greeted by an interactive dashboard that serves as their navigational guide throughout the experience. As they drag or slide through the timeline, the interface dynamically updates, allowing the user to navigate through all these historical stages.


---

## Description of the Web Application
The proposed web application is a virtual art gallery dedicated to the history of computer graphics from ASCII art up until Modern GPUs. The website will show how early computer users created graphics using only standard keyboard characters before modern screens existed. Visitors will interact with the site by exploring different digital exhibit rooms and using interactive tools to understand text-based art and rendered artworks. 
# Era Navigation: 
The exhibit is split into different pages based on the time period. Visitors can click through a menu to explore art from the 1970s, 1980s, and 1990s.

Declaration of AI usage: Visual assets shown above, were synthesized using generative AI – Gemini-  to align our idea with an intended design language.

---

## References
* Node.js - Node.js 26.0.0. https://nodejs.org/en/blog/release/v26.0.0
* Astro. @astrojs/mdx Integration Guide. Astro Docs. https://docs.astro.build/en/guides/integrations-guide/mdx/
* Astro. @astrojs/react Integrations Guide. Astro Docs. https://docs.astro.build/en/guides/integrations-guide/react/
* Install Tailwind CSS with Astro. Tailwind CSS. https://tailwindcss.com/docs/installation/framework-guides/astro
* ASCII Art Archive. https://www.asciiart.eu/history-of-ascii-art
