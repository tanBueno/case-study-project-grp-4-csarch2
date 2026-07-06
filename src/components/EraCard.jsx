import React, { useState } from 'react';

export default function EraCard({ 
  stage, 
  era, 
  title, 
  description, 
  renderType, 
  color, 
  children
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stageNum = parseInt(stage, 10);
  const floatDelay = `${stageNum * 0.7}s`;
  const isUp = stageNum % 2 !== 0;
  
  // Increase offset to spread them out vertically more
  const yOffset = isUp ? '-translate-y-40' : 'translate-y-40';

  return (
    <>
      <div 
        className={`snap-center animate-float ${yOffset} relative flex flex-col items-center justify-center`}
        style={{ animationDelay: floatDelay }}
      >
        {/* Exhibit Tether Line */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-[3px] h-40 opacity-60 z-0 bg-gradient-to-b ${isUp ? 'from-transparent to-current top-1/2' : 'from-current to-transparent bottom-1/2'}`}
          style={{ color: color }}
        ></div>
        
        {/* Anchor point on the timeline axis */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-8 h-2 rounded-full z-0 opacity-80 ${isUp ? 'top-[calc(50%+10rem)]' : 'bottom-[calc(50%+10rem)]'}`}
          style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
        ></div>

      {/* The Planet Node - Massively increased size for exploration */}
      <div 
        onClick={() => setIsExpanded(true)}
        className="w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center relative group cursor-pointer hover:scale-110 transition-transform duration-500 z-10"
      >
        {/* Glowing Atmosphere */}
        <div 
          className="absolute inset-0 rounded-full opacity-40 blur-xl group-hover:opacity-80 transition-opacity duration-500 animate-pulse" 
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Core Planet Surface */}
        <div className="relative z-10 w-full h-full rounded-full border-4 border-white/10 bg-[#0A0D14] flex items-center justify-center overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] group-hover:border-white/30 transition-colors duration-500">
          {/* Increased graphic scale inside the planet */}
          <div data-era-view="preview" className="scale-[0.8] md:scale-100 pointer-events-none transition-transform duration-500 group-hover:scale-[1.2]">
            {children}
          </div>
        </div>
      </div>

      {/* Static Label on the opposite end of the planet */}
      <div 
        onClick={() => setIsExpanded(true)}
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-50 cursor-pointer flex flex-col items-center hover:scale-105 transition-transform duration-300
          ${isUp ? 'top-[calc(50%+11.5rem)]' : 'bottom-[calc(50%+11.5rem)]'}`}
      >
        <span 
          className="text-lg font-sans font-bold tracking-widest text-white px-3 py-0.5 rounded-full border transition-all duration-300"
          style={{ 
            backgroundColor: `${color}20`, 
            borderColor: `${color}50`,
            boxShadow: `0 0 15px ${color}30`
          }}
        >
          {era}
        </span>
      </div>
      </div>

      {/* The Expanded Modal (Readable View) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 animate-[fadeIn_0.3s_ease-out]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setIsExpanded(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden animate-[scaleUp_0.3s_ease-out]">
            
            {/* Left Graphic Area */}
            <div className="w-full md:w-1/2 bg-[#05070A] p-12 flex items-center justify-center relative border-r border-white/5">
              <div className="absolute inset-0 opacity-30 blur-3xl" style={{ backgroundColor: color }}></div>
              <div data-era-view="expanded" className="relative z-10 transform scale-150">
                {children}
              </div>
            </div>

            {/* Right Text Area */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>

              <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-widest font-bold uppercase">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
                <span style={{ color: color }}>STAGE {stage} — {era}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl text-white font-sans font-bold mb-6 leading-tight">
                {title}
              </h2>
              
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-8">
                {description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                  RENDER TYPE: <span className="text-white">{renderType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
