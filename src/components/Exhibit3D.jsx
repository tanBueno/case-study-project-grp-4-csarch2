import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Html, Stars, Sparkles, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

// Import existing content components
import CuratorBoard from './CuratorBoard.jsx';
import Ascii1960s from './eras/Ascii1960s.jsx';
import Rasterizer1970s from './eras/Rasterizer1970s.jsx';
import Sprite1980s from './eras/Sprite1980s.jsx';
import Renderer1990s from './eras/Renderer1990s.jsx';
import Vision2000s from './eras/Vision2000s.jsx';
import Volumetric2010s from './eras/Volumetric2010s.jsx';
import Raytracer2020s from './eras/Raytracer2020s.jsx';

const eras = [
  { 
    era: '1960s', title: 'Keyboard ASCII Art', color: '#22c55e', Component: Ascii1960s, type: 'SYMBOLIC',
    details: `Graphics in Computers came from the idea of having the ability to draw something using a computer. The earlier years was the age where printing was a common occurrence. People tend to have some creative ideas using printers to create art. The work “Peace through Understanding” by Fujitsu Limited was a depiction of a man’s face with a text above him saying the work’s title. It was made by using a line printer that printed ASCII characters to form a resemblance of the man. The artwork was presented in the New York’s Fair to demo the company's new computer, FACOM 231. But what was ASCII? The American Standard Code for Information Interchange (ASCII) was established in 1963 by The American National Standard Institute. This became a standard for all text based characters in computers. It used specific binary values in the computer to be mapped to a font file in the computer that tells it to draw that character. The problem back then was there were too many computers using different codes for characters, and by providing a universal standard made it so that it can be compatible across other computers.\n\nThe drive to draw something went further, when Ivan Sutherland created Sketchpad in 1961. A light pen with a photoelectric cell at the tip was used to tap points on the screen and create lines. The tip emitted a pulse and the machine had an electric gun to time the location where the point was emitted. This allowed the machine to know where the pen is whenever it is close to the screen. This device had also a save and load feature, storing the shapes that were drawn in the machine. This technology was Vector graphics, where graphics are lines on the screen. The problem with this was it was limited to a number of color palettes, and wasn't able to create a continuous tone of color, unlike raster graphics.`,
    citations: [
      `(n.d.). The History of Computer Art: Part One (1950-1969). Ragnar Digital. https://www.ragnardigital.art/stories/a-history-of-computer-art-part-one`,
      `(n.d.). history-of-ascii-art. ASCII Art Archive. https://www.asciiart.eu/history-of-ascii-art`,
      `(n.d.). The Beginner's Guide to ASCII Making Sense of Digital Language. ASCII-code. https://www.ascii-code.com/articles/Beginners-Guide-to-ASCII`,
      `(n.d.). HISTORY OF COMPUTER GRAPHICS 1960-69. Danielsevo.com. https://www.danielsevo.com/hocg/hocg_1960.htm`
    ]
  },
  { 
    era: '1970s', title: 'The Raster Era', color: '#ef4444', Component: Rasterizer1970s, type: 'PIXELS',
    details: `The 1970s showed advancements in computer graphics. Raster graphics was one of the big innovations at that time. Raster is essentially a grid of pixels that represents a screen. A pixel contains information that allows it to display color. A column and rows of pixels form the grid and the number of columns by rows is called a resolution. The classic Pong made by Alan Alcorn, an employee in Atari. It utilized a raster display to simulate a table tennis game, with only simple movable rectangles as the paddles and a pixel ball that moves around and bounces when hit by the paddle. This was a revolutionary idea at the time and will start a new wave of arcade games in the later decades to come.`,
    citations: [
      `(n.d.). Computer Graphics. https://www3.cs.stonybrook.edu/~cse301/hw/ComputerGraphics/`,
      `(2024). Allan Acorn. CHM. Computer History Museum. https://computerhistory.org/profile/allan-alcorn/`
    ]
  },
  { 
    era: '1980s', title: 'Arcade Pixel Art', color: '#f59e0b', Component: Sprite1980s, type: 'SPRITES',
    details: `Driven by the low resolutions and restricted color palettes of early hardware, 1980s developers were forced to build chunky graphics by placing individual pixels on an orthogonal grid, much like traditional mosaics. The very first pixel artists were the designers of classic arcade games like Space Invaders (1978) and Pac-Man (1980), as well as early 8-bit consoles, who used this strict method out of technical necessity rather than artistic intent. Although initially born from these hardware constraints, this style eventually evolved into a celebrated aesthetic, laying the visual foundation for later iconic games ranging from Doom and Super Mario Bros. to modern titles like Minecraft.`,
    citations: [
      `Aleksić, V., & Simeunović, V. (2024). The pixel art as computer graphics artistic expression in digital games. 10th International Scientific Conference Technics, Informatics and Education - TIE 2024, 234–238. https://doi.org/10.46793/TIE24.234A`,
      `El-Din El kheshen, G. (2021). Pixel art as a visual stimulus in graphic arts. Journal of Arts & Architecture Research Studies, 2(3), 142–156.`
    ]
  },
  { 
    era: '1990s', title: '3D Polygons', color: '#3b82f6', Component: Renderer1990s, type: 'POLYGONS',
    details: `While polygons serve as the foundational shapes for 3D models, Graphics Processing Units (GPUs) first introduced by NVIDIA's GeForce 256 in 1999 provide the computing power to actually render them on your screen. Fun Fact, Minecraft and its supposedly infinite 3D world was famous among players. Because the game relied on 32-bit floating-point, the computer's memory sacrificed precision to handle larger numbers as players traveled further from the map's center. This severe loss of precision eventually caused the terrain generation to break down and distort, creating the glitchy boundary players called the "Farlands."`,
    citations: [
      `Lindholm, E., Nickolls, J., Oberman, S., & Montrym, J. (2008). NVIDIA Tesla: A Unified Graphics and Computing Architecture. IEEE Micro, 28, 39–55. https://doi.org/10.1109/mm.2008.31`,
      `Mawhorter, P. (2021). Fractal Coordinates for Incremental Procedural Content Generation. The 16th International Conference on the Foundations of Digital Games (FDG) 2021, 1–10. https://doi.org/10.1145/3472538.3472576`
    ]
  },
  { 
    era: '2000s', title: 'Programmable Shaders', color: '#06b6d4', Component: Vision2000s, type: 'SHADERS',
    details: `Programmable shaders were the massive breakthrough of the 2000s because developers figured out how to treat standard graphics software like a regular computer to break down complicated 3D lighting into much smaller steps. By passing the graphics through the system multiple times, custom programs could control exactly how light and shadows worked on different materials without needing a supercomputer. For a fun piece of gaming lore, the classic shooter game Quake 3 was an early pioneer of these multi-pass tricks. The game heavily used custom scripts to render detailed textures and dynamic environments that standard hardware could not pull off natively.`,
    citations: [
      `Peercy, M. S., Olano, M., Airey, J., & Ungar, P. J. (2000). Interactive multi-pass programmable shading. Proceedings of the 27Th Annual Conference on Computer Graphics and Interactive Techniques - SIGGRAPH ’00, 425–432. https://doi.org/10.1145/344779.344976`
    ]
  },
  { 
    era: '2010s', title: 'Physically Based Rendering', color: '#10b981', Component: Volumetric2010s, type: 'PBR',
    details: `Digital graphics got incredibly realistic in the 2010s with the wide adoption of Physically Based Rendering or PBR. Instead of painting fake highlights onto 3D objects, PBR calculates how real light interacts with different materials, making virtual metal look genuinely shiny and rough wood scatter light perfectly. As a fun fact, tracking every single light bounce requires a crazy amount of calculations that could easily crash a system. To keep computers from getting stuck on infinite equations, developers use a random probability trick literally called "Russian roulette" to figure out exactly when a virtual light ray should stop bouncing.`,
    citations: [
      `Rossoni, M., Pozzi, M., Colombo, G., Gribaudo, M., & Pietro Piazzolla. (2023). Physically Based Rendering of Animated Point Clouds for Extended Reality. Journal of Computing and Information Science in Engineering, 24(5), 1–9. https://doi.org/10.1115/1.4063559`,
      `Shirley, & Shirley, P. (1991, January 1). Physically based lighting calculations for computer graphics.https://www.researchgate.net/publication/36291560_physically_based_lighting_calculations_for_computer_graphics`
    ]
  },
  { 
    era: '2020s', title: 'Ray Tracing & AI', color: '#a855f7', Component: Raytracer2020s, type: 'NEURAL',
    details: `The biggest breakthrough of the 2020s is combining real-time ray tracing with artificial intelligence. Ray tracing simulates exact light paths for super realistic lighting, but it demands way too much computing power and creates visual noise. Neural networks now act as a smart filter, using intelligent denoising and adaptive sampling to clean up the image and boost performance. For a fun tech fact, simulating those complex light interactions used to cause major lag in real-time rendering. Now, neural networks basically step in to guess and fill in the missing pixels, which upgrades both the speed and the visual quality of the graphics without melting the computer.`,
    citations: [
      `Pranali Dahiwal, Shraddha Khonde, Kaustubh Warade, Vaishali Sonawane, & Gawande, S. H. (2026). Deep Learning Innovations in Ray Tracing: A Survey of Transition to Neural Rendering. International Journal of Image and Graphics. https://doi.org/10.1142/S0219467828500131`
    ]
  },
];

const NODE_DISTANCE = 40;

function PlanetNode({ data, index }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const zPosition = -(index + 1) * NODE_DISTANCE;
  // Center the planets completely
  const xPosition = 0; 
  const yPosition = 0;

  const { Component, color, era, title, type, details, citations } = data;

  return (
    <group position={[xPosition, yPosition, zPosition]}>
      {/* 3D Planet */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          onClick={() => setExpanded(true)}
          className="cursor-pointer"
        >
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial  
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 0.8 : 0.4} 
            wireframe={true}
          />
        </mesh>

        {/* Orbit Rings */}
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[4, 4.1, 32]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* HTML Plaque (always visible) */}
      <Html position={[0, -4.5, 0]} center transform sprite zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
          <span className="museum-label text-[10px] uppercase tracking-[0.3em]" style={{ color }}>{era}</span>
          <h3 className="text-xl font-display font-bold text-white whitespace-nowrap drop-shadow-lg">{title}</h3>
          <div className="w-12 h-[2px]" style={{ backgroundColor: color }}></div>
          <span className={`text-xs font-mono px-3 py-1 mt-2 rounded-full border bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} style={{ color, borderColor: color }}>
            CLICK TO EXPLORE
          </span>
        </div>
      </Html>

      {/* Expanded UI (The React Component inside the HTML Overlay) */}
      {expanded && (
        <Html position={[0, 0, 1]} center zIndexRange={[200, 0]}>
          <div className="fixed inset-0 w-screen h-screen -ml-[50vw] -mt-[50vh] flex items-center justify-center bg-black/90 backdrop-blur-md z-[1000] p-4 pointer-events-auto">
            <div className="relative w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row">
              
              {/* Close Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                className="absolute top-4 right-4 z-50 p-2 text-zinc-400 hover:text-white bg-black/40 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {/* Left Graphic Area (Uses existing Era Components) */}
              <div className="w-full md:w-1/2 p-12 bg-black flex items-center justify-center relative min-h-[40vh]">
                <div className="absolute inset-0 opacity-20 blur-3xl" style={{ backgroundColor: color }}></div>
                <div data-era-view="expanded" className="relative z-10 transform scale-125">
                   <Component />
                </div>
              </div>

              {/* Right Text Area */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full animate-breathe" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
                  <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">Exhibit 0{index + 1} — {type}</span>
                </div>
                <h2 className="text-4xl font-display font-black text-white mb-6 leading-tight">{title}</h2>
                <div className="max-h-[300px] overflow-y-auto pr-4 custom-scrollbar text-zinc-300 leading-relaxed space-y-4">
                  {details.split('\\n\\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3">Sources</h4>
                  <ul className="space-y-2">
                    {citations.map((cite, i) => (
                      <li key={i} className="text-xs text-zinc-500 font-mono leading-tight break-words">
                        {cite}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene() {
  const scroll = useScroll();
  const cameraRef = useRef();
  
  // Create an infinite timeline grid
  const gridRef = useRef();

  useFrame((state, delta) => {
    // The scroll offset is between 0 and 1
    const offset = scroll.offset;
    
    // Move the camera forward along the Z axis
    // Total distance is number of eras * NODE_DISTANCE + some padding
    const maxZ = -(eras.length + 1) * NODE_DISTANCE;
    const currentZ = offset * maxZ;
    
    state.camera.position.z = currentZ;
    state.camera.position.y = Math.sin(offset * Math.PI * 8) * 0.2; // Very slight bobbing
    state.camera.position.x = 0;
    
    // Move the grid with the camera to make it infinite
    if (gridRef.current) {
      gridRef.current.position.z = currentZ - (currentZ % 10);
    }
  });

  return (
    <>
      <color attach="background" args={['#020305']} />
      <fog attach="fog" args={['#020305', 10, 50]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Atmospheric Particles */}
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={20} size={5} speed={0.4} opacity={0.2} color="#39FF14" />

      {/* The Infinite 3D Floor Grid */}
      <gridHelper 
        ref={gridRef}
        args={[100, 100, '#39FF14', '#113311']} 
        position={[0, -10, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Introduction Board */}
      <group position={[0, 0, -10]}>
        <Html transform center position={[0, 2, 0]}>
          <div className="w-[800px] pointer-events-auto">
            <CuratorBoard />
            <p className="text-center mt-12 text-[#39FF14] font-mono text-sm tracking-[0.3em] animate-pulse">SCROLL TO TRAVEL THROUGH TIME ↓</p>
          </div>
        </Html>
      </group>

      {/* The 3D Era Nodes */}
      {eras.map((data, index) => (
        <PlanetNode key={data.era} data={data} index={index} />
      ))}
    </>
  );
}

export default function Exhibit3D() {
  return (
    <div className="w-screen h-screen bg-[#020305]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* ScrollControls sets up the scrolling mechanism. Pages determines scroll length */}
        <ScrollControls pages={8} damping={0.2}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
