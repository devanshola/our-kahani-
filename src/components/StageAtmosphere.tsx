import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StageAtmosphere() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Interactive Follow Spotlight Overlay */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(200, 154, 75, 0.22) 0%, rgba(200, 154, 75, 0.08) 45%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      />

      {/* Dual Overhead Stage Spotlights */}
      <div className="absolute top-0 left-1/5 w-80 h-[85vh] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-2xl transform -rotate-12 origin-top opacity-80" />
      <div className="absolute top-0 right-1/5 w-80 h-[85vh] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-2xl transform rotate-12 origin-top opacity-80" />

      {/* Flickering Lanterns / Candles (Stage Wings Left & Right) */}
      <div className="absolute top-12 left-6 md:left-12 flex flex-col items-center z-30">
        <div className="w-0.5 h-10 bg-gold/60" />
        <motion.div
          animate={{
            scale: [1, 1.1, 0.94, 1.06, 1],
            opacity: [0.85, 1, 0.7, 0.95, 0.85],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-8 h-12 border-2 border-gold rounded-t-xl rounded-b-md bg-maroon/90 shadow-[0_0_25px_rgba(200,154,75,0.9)] relative flex items-center justify-center"
        >
          <div className="w-3.5 h-6 bg-gold rounded-full blur-[1px] shadow-[0_0_12px_#C89A4B] animate-pulse" />
        </motion.div>
      </div>

      <div className="absolute top-12 right-6 md:right-12 flex flex-col items-center z-30">
        <div className="w-0.5 h-10 bg-gold/60" />
        <motion.div
          animate={{
            scale: [1, 0.93, 1.08, 0.97, 1],
            opacity: [0.9, 0.72, 1, 0.82, 0.9],
          }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="w-8 h-12 border-2 border-gold rounded-t-xl rounded-b-md bg-maroon/90 shadow-[0_0_25px_rgba(200,154,75,0.9)] relative flex items-center justify-center"
        >
          <div className="w-3.5 h-6 bg-gold rounded-full blur-[1px] shadow-[0_0_12px_#C89A4B] animate-pulse" />
        </motion.div>
      </div>

      {/* Floating Gold & Crimson Dust Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.7 + 0.2,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(i) * 25, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 4,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
            className="absolute rounded-full bg-gold shadow-[0_0_8px_rgba(200,154,75,0.9)]"
            style={{
              width: i % 4 === 0 ? '5px' : i % 2 === 0 ? '3px' : '2px',
              height: i % 4 === 0 ? '5px' : i % 2 === 0 ? '3px' : '2px',
            }}
          />
        ))}
      </div>
    </div>
  );
}
