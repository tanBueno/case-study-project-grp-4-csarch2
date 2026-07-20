import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Html, Stars, Sparkles, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

// Import existing content components
import CuratorBoard from './CuratorBoard.jsx';
import Ascii1960s from './eras/Ascii1960s.jsx';
import Raster1970s from './eras/Raster1970s.jsx';
import Pixel1980s from './eras/Pixel1980s.jsx';
import Polygons1990s from './eras/Polygons1990s.jsx';
import Shaders2000s from './eras/Shaders2000s.jsx';
import Pbr2010s from './eras/Pbr2010s.jsx';
import Raytracing2020s from './eras/Raytracing2020s.jsx';

const eras = [
  { era: '1960s', title: 'Keyboard ASCII Art', color: '#22c55e', Component: Ascii1960s, type: 'SYMBOLIC' },
  { era: '1970s', title: 'The Raster Era', color: '#ef4444', Component: Raster1970s, type: 'PIXELS' },
  { era: '1980s', title: 'Arcade Pixel Art', color: '#f59e0b', Component: Pixel1980s, type: 'SPRITES' },
  { era: '1990s', title: '3D Polygons', color: '#3b82f6', Component: Polygons1990s, type: 'POLYGONS' },
  { era: '2000s', title: 'Programmable Shaders', color: '#06b6d4', Component: Shaders2000s, type: 'SHADERS' },
  { era: '2010s', title: 'Physically Based Rendering', color: '#10b981', Component: Pbr2010s, type: 'PBR' },
  { era: '2020s', title: 'Ray Tracing & AI', color: '#a855f7', Component: Raytracing2020s, type: 'NEURAL' },
];

const NODE_DISTANCE = 30;

function PlanetNode({ data, index }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const zPosition = -(index + 1) * NODE_DISTANCE;
  const xPosition = index % 2 === 0 ? 5 : -5;
  const yPosition = Math.sin(index) * 2;

  const { Component, color, era, title, type } = data;

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
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 0.8 : 0.4} 
            wireframe={true}
          />
        </mesh>

        {/* Orbit Rings */}
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[3, 3.1, 32]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* HTML Plaque (always visible) */}
      <Html position={[0, -3.5, 0]} center transform sprite zIndexRange={[100, 0]}>
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
                <p className="text-zinc-300 leading-relaxed">
                  (Detailed historical information for the {era} goes here. You can connect this to your MDX files or Astro data structures later, just as we did for the main page!)
                </p>
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
    state.camera.position.y = 2 + Math.sin(offset * Math.PI * 4) * 0.5; // Slight bobbing
    
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
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        {/* ScrollControls sets up the scrolling mechanism. Pages determines scroll length */}
        <ScrollControls pages={6} damping={0.2}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
