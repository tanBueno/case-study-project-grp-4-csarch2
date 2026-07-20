import React, { useState, useEffect } from 'react';

export default function CuratorBoard({ onExpand }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "SYSTEM INITIALIZED.\\nWELCOME TO THE LIVING TERMINAL.\\n\\nEXPLORE THE EVOLUTION OF\\nCOMPUTATIONAL VISION.\\n\\n> SCROLL TO NAVIGATE_";

  // Typing effect for the small card
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* The Physical Retro Terminal Computer (Unexpanded) */}
      <div 
        className="snap-center relative flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-110 -translate-y-8"
        onClick={onExpand}
      >
        {/* Terminal Case (Dark Cyberpunk/Subtle) */}
        <div className="relative w-48 h-40 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 shadow-[0_0_50px_rgba(57,255,20,0.1)] p-2 flex flex-col items-center z-10 group-hover:border-[#39FF14]/30 transition-colors duration-500">
          
          {/* Power LED */}
          <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_5px_#39FF14] animate-pulse"></div>

          {/* CRT Bezel */}
          <div className="w-full h-full bg-[#0a0c10] rounded-lg border border-white/5 p-1 flex items-center justify-center overflow-hidden">
            
            {/* Actual Screen Area */}
            <div className="relative w-full h-full bg-[#020502] rounded shadow-[inset_0_0_30px_rgba(0,0,0,1)] overflow-hidden p-3 border border-[#39FF14]/10">
              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-40" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.9) 2px)'
              }}></div>
              {/* Glare */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none opacity-50"></div>
              
              {/* Terminal Text */}
              <div className="relative z-0 font-mono text-[#39FF14] text-[7px] leading-[1.4] opacity-80">
                <span className="block text-[#39FF14]/50 mb-1 border-b border-[#39FF14]/20 pb-0.5">INIT_SEQUENCE</span>
                <span>{typedText}</span>
                <span className="animate-pulse bg-[#39FF14] w-1 h-2 inline-block ml-0.5 align-middle"></span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Stand (Cyberpunk Tether) */}
        <div className="relative w-12 h-4 bg-gradient-to-b from-black/60 to-transparent border-l border-r border-white/5 z-0"></div>
        <div className="relative w-24 h-1 bg-[#39FF14]/20 rounded-full blur-[1px] z-0"></div>
        
        {/* Connection to Timeline */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#39FF14]/30 to-transparent mt-1"></div>
        <div className="absolute bottom-[-4rem] w-4 h-1 rounded-full bg-[#39FF14]/50 shadow-[0_0_10px_#39FF14]"></div>
        
        {/* Hover Hint */}
        <div className="absolute -top-10 bg-black/80 text-[#39FF14] font-mono text-[9px] px-3 py-1.5 rounded-full border border-[#39FF14]/20 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest backdrop-blur-md">
          ACCESS_TERMINAL
        </div>
      </div>

    </>
  );
}
