import React from 'react';

export default function CuratorBoard() {
  return (
    <div className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-[#ff6b35] to-[#ff3500] text-white shadow-[0_10px_30px_rgba(255,107,53,0.3)] shrink-0 ml-12 snap-center">
      {/* Abstract geometric shapes in background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-90">Curator Board</span>
      </div>
      
      <h2 className="text-3xl font-sans font-bold mb-6 leading-tight">
        Welcome to our interactive timeline of computational vision.
      </h2>
      
      <p className="text-sm opacity-90 mb-8 font-light leading-relaxed">
        Scroll or drag horizontally through this digital map to track the structural evolution from basic characters to flawless realism. Click any card to expand its full controls.
      </p>
      
      <div className="flex items-center gap-2 mt-auto text-xs font-mono opacity-80">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        <span>Drag or slide below</span>
      </div>
    </div>
  );
}
