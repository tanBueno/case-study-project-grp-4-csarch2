import React, { useState, useEffect } from 'react';

export default function IntroTV() {
  const [stage, setStage] = useState('idle'); // 'idle', 'booting', 'finished'

  if (stage === 'finished') return null;

  const handlePowerOn = () => {
    setStage('booting');
    
    // Sequence the boot animation
    setTimeout(() => {
      setStage('finished');
    }, 2500);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 font-mono text-retro-green transition-opacity duration-1000 ${stage === 'booting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* CRT Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-50"></div>
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>

      <div className="relative z-20 flex flex-col items-center max-w-lg w-full p-8 bg-zinc-900/50 rounded-3xl border-4 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
        
        {/* Screen Bezel */}
        <div className="w-full bg-[#050505] rounded-xl p-8 border border-white/5 relative overflow-hidden aspect-[4/3] flex flex-col justify-center">
          
          {/* TV Screen Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full gap-6">
            <h1 className="text-2xl md:text-3xl text-center text-[#39FF14] drop-shadow-[0_0_10px_#39FF14] tracking-widest uppercase">
              Virtual Exhibit
            </h1>
            
            <div className="h-12 flex items-center justify-center">
              {stage === 'idle' && (
                <button 
                  onClick={handlePowerOn}
                  className="px-6 py-2 border-2 border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(57,255,20,0.5)] hover:shadow-[0_0_25px_rgba(57,255,20,0.8)]"
                >
                  [ Initialize ]
                </button>
              )}
              {stage === 'booting' && (
                <div className="flex flex-col items-center gap-2">
                  <span className="animate-pulse text-sm">Loading Visual Matrix...</span>
                  <div className="w-48 h-1 bg-zinc-800 rounded overflow-hidden">
                    <div className="h-full bg-[#39FF14] w-full origin-left animate-[scale-x_2s_ease-out]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Flash Effect on Boot */}
          {stage === 'booting' && (
            <div className="absolute inset-0 bg-white z-50 animate-[flash_2.5s_ease-in-out_forwards]"></div>
          )}
        </div>

        {/* TV Physical Details */}
        <div className="w-full mt-6 flex justify-between items-center px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600/50"></div>
            <div className={`w-3 h-3 rounded-full ${stage === 'idle' ? 'bg-zinc-700' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}></div>
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-2 bg-zinc-800 rounded-full border-t border-white/10"></div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
