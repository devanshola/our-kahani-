import { ReactNode } from 'react';
import StageLighting from './StageLighting';
import CurtainNavigation from './CurtainNavigation';
import AmbientAudio from './AmbientAudio';

export default function TheatreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full min-h-screen bg-charcoal overflow-x-clip">
      {/* Stage Lighting & Environmental Atmosphere */}
      <StageLighting />

      {/* Act Navigation & Grand Theatre Curtains Overlay */}
      <CurtainNavigation />

      {/* Ambient Sound System */}
      <AmbientAudio />

      {/* Fixed Decorative Theatre Borders (Hardware Accelerated) */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Top Valance Curtain */}
        <div className="absolute top-0 w-full h-14 sm:h-16 md:h-20 bg-maroon shadow-2xl border-b-2 border-gold/60 z-20 flex">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
          <div className="absolute -bottom-6 sm:-bottom-8 w-full flex justify-around overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-24 sm:w-32 h-12 sm:h-16 bg-gradient-to-b from-maroon to-[#4a121e] rounded-b-full shadow-[0_10px_20px_rgba(0,0,0,0.6)] border-b border-gold/40 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Left Side Curtain (Slim on mobile for full content readability) */}
        <div className="absolute top-0 bottom-0 left-0 w-2 sm:w-6 md:w-10 bg-gradient-to-r from-maroon to-[#4a121e] border-r border-gold/40 shadow-[5px_0_15px_rgba(0,0,0,0.6)] z-10 flex flex-col">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 w-full border-b border-black/30 rounded-r-[50%] bg-gradient-to-r from-transparent to-black/20"
            />
          ))}
        </div>

        {/* Right Side Curtain */}
        <div className="absolute top-0 bottom-0 right-0 w-2 sm:w-6 md:w-10 bg-gradient-to-l from-maroon to-[#4a121e] border-l border-gold/40 shadow-[-5px_0_15px_rgba(0,0,0,0.6)] z-10 flex flex-col">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 w-full border-b border-black/30 rounded-l-[50%] bg-gradient-to-l from-transparent to-black/20"
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-0 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-24 min-h-screen">
        {children}
      </main>
    </div>
  );
}
