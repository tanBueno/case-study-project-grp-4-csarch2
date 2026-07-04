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
  const yOffset = stageNum % 2 === 0 ? 'translate-y-12' : '-translate-y-12';

  return (
    <>
      {/* Floating Wrapper */}
      <div 
        className={`snap-center animate-float ${yOffset}`} 
        style={{ animationDelay: floatDelay }}
      >
        {/* The Timeline Card */}
        <div 
          onClick={() => setIsExpanded(true)}
          className="flex-shrink-0 w-[320px] h-[480px] bg-[#111520] border border-white/5 rounded-2xl flex flex-col p-6 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer hover:border-white/20"
        >
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 font-mono text-[10px] tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
            <span style={{ color: color }}>STAGE {stage}</span>
          </div>
          <span className="text-zinc-500">{era}</span>
        </div>

        {/* Central Graphic Area */}
        <div className="w-full h-[180px] bg-[#0A0D14] rounded-xl mb-6 flex items-center justify-center relative border border-white/5 shadow-inner overflow-hidden transition-transform duration-500 group-hover:scale-105">
          <div className="absolute inset-0 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundColor: color }}></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-white font-sans font-bold text-lg mb-2 leading-tight">{title}</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-light line-clamp-3">{description}</p>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
          <span>RENDER TYPE : {renderType}</span>
          <button className="flex items-center gap-1 group-hover:text-white transition-colors duration-300" style={{ color: color }}>
            Interact <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
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
              <div className="relative z-10 transform scale-150">
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
