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
    era: '1960s', title: 'Keyboard ASCII and Character Art', color: '#22c55e', Component: Ascii1960s, type: 'SYMBOLIC',
    details: `Before computers could draw a single line, they arranged characters. In the 1960’s, raster graphics did not exist yet, meaning developers rely on impact printers to create an image. The earliest interactions with digital computers did not involve graphical screens. The first human readable output was printed via line printers. This constraint is the reason that ASCII art exists, where patterns of standard keyboard characters were arranged to form recognizable images.`,
    citations: []
  },
  { 
    era: '1970s', title: 'Early Bitmap and Rasterization', color: '#ef4444', Component: Rasterizer1970s, type: 'PIXELS',
    details: `The 1970s marketed a fundamental shift in how computers learned to see with the adoption of raster graphics. With the introduction of semiconductor memory, vector display techniques gave way to raster techniques using a discretely sampled pixel representation. This transition transformed graphics, it simplified the leap from outlines to solid images. Pixels evolved from a simple set or not set bitmap state to carrying independent color information. With the discrete value in each pixel, it captures color gradients and shading. Raster graphics faced an issue with pixelization when scaling the image, this means that the graphics at that time were affected by the size of the resolution.`,
    citations: [
      `https://novedge.com/blogs/design-news/design-software-history-evolution-of-vector-and-raster-graphics-in-design-software-history-a-journey-through-technology-and-creative-process-transformation?srsltid=AfmBOor0RO_s04KxZ935A_DcVtkdg35zYT4HZIutmDl1v9LVI6RU9xuH`
    ]
  },
  { 
    era: '1980s', title: 'Chunky 8 Bit pixel blocks', color: '#f59e0b', Component: Sprite1980s, type: 'SPRITES',
    details: `In the 1980s, computer graphics exploded into a 3 dimensional interactive environment. A major catalyst for this era was the introduction of a special processing hardware. As rendering complex geometric calculations became too taxing for standard CPU’s, dedicated processors were developed to handle 3D operations.`,
    citations: [
      `https://dl.acm.org/doi/10.1145/279389.279478`
    ]
  },
  { 
    era: '1990s', title: 'GPU', color: '#3b82f6', Component: Renderer1990s, type: 'POLYGONS',
    details: `The Graphics Processing Unit (GPU) was born, featuring a large number of processors working in parallel with dedicated memory to vastly accelerate the conversion of 3D triangles into 2D pixel fragments. This hardware evolution directly enabled the explosive growth of interactive media, pushing 3D graphics into entertainment through immersive video games.`,
    citations: [
      `https://www.researchgate.net/publication/2998523_Rise_of_the_Graphics_Processor`
    ]
  },
  { 
    era: '2000s', title: 'Vector Maps & Edge Detection', color: '#06b6d4', Component: Vision2000s, type: 'SHADERS',
    details: `In the 2000s, rendering shifted from simply brute forcing high polygon models to optimizing how surfaces interacted with light. The widespread adoption of vector maps allowed developers to simulate high resolution geometric details, such as bumps and creases, on low polygon models without sacrificing performance. Also, edge detection algorithms became essential in post processing pipelines. These mathematical filters analyzed depth and color differences to identify boundaries within a scene, paving the way for advanced anti-aliasing techniques and other visual effects.`,
    citations: []
  },
  { 
    era: '2010s', title: 'Volumetric Lighting & VR', color: '#10b981', Component: Volumetric2010s, type: 'PBR',
    details: `As GPU architecture matured in the 2010s, developers were able to move beyond surface level textures to simulate the physical properties of the atmosphere itself. Volumetric lighting transformed flat digital scenes into highly immersive environments by calculating how light scatters through particulate matter like dust, fog, and smoke. This massive leap in processing power simultaneously fueled the rise of consumer Virtual Reality (VR) and made video game graphics more realistic.`,
    citations: []
  },
  { 
    era: '2020s', title: 'Flawless Photorealism', color: '#a855f7', Component: Raytracer2020s, type: 'NEURAL',
    details: `The 2020s have ushered in the era of flawless photorealism, driven by the mainstream integration of hardware accelerated real time ray tracing. Instead of approximating light interactions through traditional rasterization tricks, modern rendering engines physically simulate the path of light, enabling mathematically accurate reflections, refractions, and global illumination.`,
    citations: []
  },
];

const NODE_DISTANCE = 40;

function ComputerNode({ data, index, onOpen, isModalOpen }) {
  const [hovered, setHovered] = useState(false);
  
  const zPosition = -(index + 1) * NODE_DISTANCE;
  // Alternate sides of the aisle
  const xPosition = index % 2 === 0 ? 4 : -4; 
  // Slight Y variation
  const yPosition = Math.sin(index) * 0.5;

  const { color, era, title } = data;

  return (
    <group position={[xPosition, yPosition, zPosition]}>
      {/* Floating retro computer model using HTML/CSS for premium visuals */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <Html center transform sprite zIndexRange={[100, 0]}>
          <div 
            className={`flex flex-col items-center justify-center pointer-events-auto cursor-pointer select-none transition-all duration-500 group ${isModalOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={(e) => { e.stopPropagation(); setHovered(false); onOpen(data, index); }}
            style={{ 
              transform: hovered ? 'scale(1.15)' : 'scale(1)',
              filter: hovered ? `drop-shadow(0 0 30px ${color}80)` : `drop-shadow(0 0 10px ${color}40)`
            }}
          >
            {/* The Glassmorphism Terminal Card */}
            <div 
              className="relative w-64 h-40 bg-black/60 backdrop-blur-xl rounded-lg border border-white/10 flex flex-col overflow-hidden transition-colors duration-500"
              style={{ borderColor: hovered ? color : 'rgba(255,255,255,0.1)' }}
            >
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-40 z-10" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.9) 2px)'
              }}></div>
              
              {/* Header Bar */}
              <div className="w-full h-7 border-b flex items-center px-3 z-20" style={{ borderColor: `${color}40`, backgroundColor: `${color}15` }}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                  <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: color }}></div>
                  <div className="w-2 h-2 rounded-full opacity-20" style={{ backgroundColor: color }}></div>
                </div>
                <span className="ml-3 font-mono text-[9px] uppercase tracking-widest text-white/80">{era} // ARCHIVE</span>
              </div>
              
              {/* Body Content */}
              <div className="flex-1 p-5 flex flex-col items-center justify-center text-center z-20 relative">
                {/* Background Glow */}
                <div className="absolute inset-0 opacity-20 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color, opacity: hovered ? 0.4 : 0.1 }}></div>
                
                <h3 className="text-xl font-display font-bold text-white drop-shadow-md mb-3 leading-tight relative z-30">
                  {title}
                </h3>
                
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] bg-black/50 px-3 py-1 rounded-full border relative z-30 transition-colors duration-300" style={{ color: color, borderColor: hovered ? color : 'transparent' }}>
                  {hovered ? '> ACCESS LOG_' : 'STANDBY'}
                </span>
              </div>
              
              {/* Bottom Decoration */}
              <div className="w-full h-1 transition-all duration-500" style={{ backgroundColor: color, opacity: hovered ? 1 : 0.5 }}></div>
            </div>
            
            {/* Tether line to timeline */}
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-2"></div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Scene({ onOpenModal, isModalOpen }) {
  const scroll = useScroll();
  const cameraRef = useRef();
  
  // Create an infinite timeline grid
  const gridRef = useRef();
  // Reference for atmospheric effects to move with camera
  const effectsRef = useRef();

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
    
    // Move the atmospheric effects with the camera so they don't get left behind
    if (effectsRef.current) {
      effectsRef.current.position.z = currentZ;
    }
  });

  return (
    <>
      <color attach="background" args={['#0b0410']} />
      {/* Fog ensures distant objects fade smoothly into the void. Match background color exactly. */}
      <fog attach="fog" args={['#0b0410', 10, 100]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ff007f" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />

      {/* Atmospheric Particles - Grouped to follow the camera */}
      <group ref={effectsRef}>
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        <Sparkles count={200} scale={30} size={6} speed={0.4} opacity={0.3} color="#ff007f" />
      </group>

      {/* Retrowave Floor Grid (removed incorrect rotation so it lies flat) */}
      <gridHelper 
        ref={gridRef}
        args={[200, 100, '#ff007f', '#4a0a77']} 
        position={[0, -6, 0]} 
      />

      {/* Introduction Board (Monitor) - Anchored at start, standard 2D scaling to prevent blowing up */}
      <group position={[0, 0, -4]}>
        <Html center position={[0, 0, 0]} zIndexRange={[100, 0]}>
          <div className={`w-[600px] pointer-events-auto flex flex-col items-center drop-shadow-[0_0_30px_rgba(255,0,127,0.3)] transition-opacity duration-300 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <CuratorBoard onExpand={() => onOpenModal('intro')} />
            <p className="text-center mt-12 text-[#ff007f] font-mono text-sm tracking-[0.4em] animate-pulse drop-shadow-[0_0_10px_#ff007f]">
              SCROLL DOWN TO TRAVEL THROUGH TIME ↓
            </p>
          </div>
        </Html>
      </group>

      {/* The 3D Era Nodes - Now Retro Computers */}
      {eras.map((data, index) => (
        <ComputerNode key={data.era} data={data} index={index} onOpen={onOpenModal} isModalOpen={isModalOpen} />
      ))}
    </>
  );
}

export default function Exhibit3D() {
  const [activeEra, setActiveEra] = useState(null);
  const [showIntroModal, setShowIntroModal] = useState(false);

  const handleOpenModal = (data, index) => {
    if (data === 'intro') {
      setShowIntroModal(true);
    } else {
      setActiveEra({ data, index });
    }
  };

  const handleCloseModal = () => {
    setActiveEra(null);
  };

  const isModalOpen = showIntroModal || !!activeEra;

  return (
    <div className="w-screen h-screen bg-[#0b0410] relative">
      <style>{`
        @keyframes rwFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes rwSlideUp {
          from { opacity: 0; transform: scale(0.95) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop-anim {
          animation: rwFadeIn 0.3s ease-out forwards;
        }
        .modal-content-anim {
          animation: rwSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0">
        {/* ScrollControls sets up the scrolling mechanism. Pages determines scroll length */}
        <ScrollControls pages={8} damping={0.2}>
          <Scene onOpenModal={handleOpenModal} isModalOpen={isModalOpen} />
        </ScrollControls>
      </Canvas>

      {/* 2D Overlay for the Modal - Completely separated from 3D space for perfect UX */}
      {activeEra && (
        <div 
          className="absolute inset-0 z-[1000] flex items-center justify-center p-4 bg-[#0a0210]/90 backdrop-blur-md modal-backdrop-anim"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          
          {/* Backdrop Click */}
          <div className="absolute inset-0 cursor-pointer" onClick={handleCloseModal}>
            {/* Overlay scanlines for retro feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,127,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
          </div>
          
          <div className="relative w-full max-w-5xl bg-[#090412] border border-[#ff007f]/30 rounded-xl shadow-[0_0_50px_rgba(255,0,127,0.2)] overflow-hidden flex flex-col md:flex-row modal-content-anim">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-50 p-2 text-[#00f0ff] hover:text-white bg-black/40 hover:bg-[#ff007f]/20 rounded-full transition-colors border border-transparent hover:border-[#ff007f]/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Left Graphic Area (Uses existing Era Components) */}
            <div className="w-full md:w-1/2 p-12 bg-black flex items-center justify-center relative min-h-[40vh] border-r border-[#ff007f]/20">
              <div className="absolute inset-0 opacity-30 blur-2xl" style={{ backgroundColor: activeEra.data.color }}></div>
              <div data-era-view="expanded" className="relative z-10 transform scale-125">
                 <activeEra.data.Component />
              </div>
            </div>

            {/* Right Text Area */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-[#090412] to-[#120520]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full animate-breathe" style={{ backgroundColor: activeEra.data.color, boxShadow: `0 0 10px ${activeEra.data.color}` }}></div>
                <span className="font-mono text-xs tracking-widest text-[#00f0ff] uppercase">Exhibit 0{activeEra.index + 1} — {activeEra.data.type}</span>
              </div>
              <h2 className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-6 leading-tight drop-shadow-md">
                {activeEra.data.title}
              </h2>
              <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar text-zinc-300 leading-relaxed space-y-4 font-sans">
                {activeEra.data.details.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Intro Modal (CuratorBoard Modal) - Rendered at root level so it's not affected by 3D transform */}
      {showIntroModal && (
        <div 
          className="absolute inset-0 z-[1000] flex items-center justify-center p-8 modal-backdrop-anim"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowIntroModal(false)}
          ></div>
          
          {/* CRT Modal Window */}
          <div className="relative z-10 w-full max-w-5xl h-[80vh] bg-[#020a02] border border-[#39FF14]/30 rounded-lg shadow-[0_0_100px_rgba(57,255,20,0.15)] flex flex-col overflow-hidden modal-content-anim">
            
            {/* Modal Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.4) 3px)'
            }}></div>
            
            {/* Modal Glare */}
            <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_150px_rgba(0,0,0,1)]"></div>

            {/* Terminal Header Bar */}
            <div className="w-full bg-[#39FF14]/10 border-b border-[#39FF14]/20 p-3 flex justify-between items-center z-30 font-mono text-[#39FF14] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#39FF14] rounded-sm animate-pulse shadow-[0_0_10px_#39FF14]"></span>
                MAIN_TERMINAL.EXE
              </div>
              <button 
                onClick={() => setShowIntroModal(false)}
                className="hover:bg-[#39FF14] hover:text-black px-2 py-1 transition-colors border border-transparent hover:border-[#39FF14]/50 rounded cursor-pointer"
              >
                [X] CLOSE
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-12 z-30 overflow-y-auto font-mono text-[#39FF14] drop-shadow-[0_0_5px_#39FF14]">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">
                &gt; The Living Terminal_
              </h2>
              
              <div className="text-lg md:text-xl leading-relaxed space-y-6 max-w-3xl">
                <p>
                  &gt; Welcome, user. You have accessed the historical archives of computational vision.
                </p>
                <p>
                  &gt; This digital space tracks the structural evolution from symbolic character rendering to flawless synthetic photorealism.
                </p>
                <div className="border border-[#39FF14]/30 p-6 bg-[#39FF14]/5 rounded my-8">
                  <p className="text-sm uppercase tracking-widest text-[#39FF14]/70 mb-2">Instructions:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Scroll horizontally to navigate the physical timeline.</li>
                    <li>Observe the tethered nodes representing key eras.</li>
                    <li>Click any floating node to expand its visual matrix and access detailed logs.</li>
                  </ul>
                </div>
                <p className="animate-pulse text-sm">
                  &gt; AWAITING USER INPUT...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
