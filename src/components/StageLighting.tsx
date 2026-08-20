import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function StageLighting() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scroll driven subtle light movement - smooth and hardware accelerated
  const cloudX1 = useTransform(scrollY, [0, 3000], [0, 150]);
  const cloudX2 = useTransform(scrollY, [0, 3000], [0, -120]);

  useEffect(() => {
    // Only bind mouse follower if device actually has a fine precision pointer (desktop mouse)
    const hasMouse = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    let animationFrameId = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;
    let isRunning = false;

    const updatePosition = () => {
      // Smooth linear interpolation for buttery 60/120fps motion without CSS transition jank
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        animationFrameId = requestAnimationFrame(updatePosition);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden contain-strict">
      {/* Interactive Ambient Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(200, 154, 75, 0.12) 0%, rgba(200, 154, 75, 0.03) 45%, transparent 70%)',
          transform: 'translate3d(calc(50vw - 300px), calc(30vh - 300px), 0)',
        }}
      />

      {/* Stage Overhead Spotlight Beams */}
      <div className="absolute top-0 left-1/4 w-72 md:w-96 h-[75vh] bg-gradient-to-b from-gold/15 via-gold/5 to-transparent blur-2xl transform -rotate-12 origin-top opacity-60 pointer-events-none will-change-transform" />
      <div className="absolute top-0 right-1/4 w-72 md:w-96 h-[75vh] bg-gradient-to-b from-gold/15 via-gold/5 to-transparent blur-2xl transform rotate-12 origin-top opacity-60 pointer-events-none will-change-transform" />

      {/* Hanging Flickering Stage Lanterns (Left & Right) */}
      <div className="absolute top-16 left-4 md:left-16 flex flex-col items-center z-40">
        <div className="w-0.5 h-10 md:h-12 bg-gold/50" />
        <div className="w-6 md:w-8 h-10 md:h-12 border border-gold rounded-t-lg rounded-b-md bg-maroon/80 shadow-[0_0_15px_rgba(200,154,75,0.5)] relative flex items-center justify-center overflow-hidden">
          <div className="w-2.5 h-4 bg-gold rounded-full blur-[1px] shadow-[0_0_10px_#C89A4B] animate-pulse" />
        </div>
      </div>

      <div className="absolute top-16 right-4 md:right-16 flex flex-col items-center z-40">
        <div className="w-0.5 h-10 md:h-12 bg-gold/50" />
        <div className="w-6 md:w-8 h-10 md:h-12 border border-gold rounded-t-lg rounded-b-md bg-maroon/80 shadow-[0_0_15px_rgba(200,154,75,0.5)] relative flex items-center justify-center overflow-hidden">
          <div className="w-2.5 h-4 bg-gold rounded-full blur-[1px] shadow-[0_0_10px_#C89A4B] animate-pulse" />
        </div>
      </div>

      {/* Moving Background Atmosphere Clouds */}
      <motion.div
        style={{ x: cloudX1 }}
        className="absolute top-20 left-10 w-72 md:w-96 h-20 md:h-24 bg-gold/5 blur-3xl rounded-full pointer-events-none"
      />
      <motion.div
        style={{ x: cloudX2 }}
        className="absolute top-40 right-10 md:right-20 w-64 md:w-80 h-24 md:h-28 bg-raj-pink/5 blur-3xl rounded-full pointer-events-none"
      />

      {/* Lightweight Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/70"
            style={{
              left: `${(i * 29 + 11) % 100}%`,
              top: `${(i * 41 + 17) % 100}%`,
              width: i % 2 === 0 ? '3px' : '2px',
              height: i % 2 === 0 ? '3px' : '2px',
              boxShadow: '0 0 6px rgba(200,154,75,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
