import { useState } from 'react';
import { motion } from 'framer-motion';

interface VelvetCurtainWindowProps {
  children: React.ReactNode;
  className?: string;
  autoOpenOnView?: boolean;
  accentTitle?: string;
  aspectRatio?: string;
}

export default function VelvetCurtainWindow({
  children,
  className = '',
  autoOpenOnView = true,
  accentTitle,
  aspectRatio = 'w-full h-72'
}: VelvetCurtainWindowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // The curtain is open if hovered OR tapped OR if in view (if autoOpenOnView is true)
  const isOpen = isHovered || isTapped || (autoOpenOnView && isInView);

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: '-20px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsTapped(prev => !prev)}
      className={`relative border-2 border-gold/40 rounded-t-full bg-gradient-to-b from-[#1c080e] via-[#2a0e16] to-[#0f0407] shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer group select-none gpu-layer ${aspectRatio} ${className}`}
    >
      {/* Outer Arch Brass Trim Accent */}
      <div className="absolute inset-1 rounded-t-full border border-gold/25 pointer-events-none z-30" />

      {/* Stage Backdrop Illumination */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,154,75,0.25)_0%,rgba(90,23,38,0.15)_50%,transparent_80%)] pointer-events-none z-0"
      />

      {/* Stage Spotlight Beam from Top */}
      <motion.div
        animate={{ opacity: isOpen ? 0.5 : 0.15 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 inset-x-0 h-full bg-[conic-gradient(from_180deg_at_50%_0%,rgba(255,248,220,0.15)_0deg,transparent_35deg,transparent_325deg,rgba(255,248,220,0.15)_360deg)] pointer-events-none z-0"
      />

      {/* INNER STAGE CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-10 md:px-12 py-6 text-center">
        {children}
      </div>

      {/* Top Scalloped Valance */}
      <div className="absolute top-0 inset-x-0 h-7 sm:h-8 z-25 pointer-events-none flex justify-center">
        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#330710_0px,#6e1122_12px,#24040a_24px)] border-b-2 border-gold/60 shadow-md relative">
          <div className="absolute -bottom-2 inset-x-0 flex justify-around">
            <div className="w-1/3 h-2.5 sm:h-3 bg-[#420a15] rounded-b-full border-b border-gold/50 shadow-sm" />
            <div className="w-1/3 h-3 sm:h-4 bg-[#540d1b] rounded-b-full border-b border-gold/60 shadow-sm -mt-0.5" />
            <div className="w-1/3 h-2.5 sm:h-3 bg-[#420a15] rounded-b-full border-b border-gold/50 shadow-sm" />
          </div>
        </div>
      </div>

      {/* LEFT VELVET CURTAIN PANEL */}
      <motion.div
        animate={{
          x: isOpen ? '-92%' : '0%',
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute top-0 left-0 bottom-0 w-[53%] z-20 pointer-events-none shadow-[5px_0_20px_rgba(0,0,0,0.8)] origin-left will-change-transform"
        style={{
          background: 'repeating-linear-gradient(90deg, #1d0308 0px, #5c0f1e 10px, #2d050c 20px, #781527 30px, #1a0207 40px)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-amber-300 to-gold/70 shadow-[0_0_8px_rgba(200,154,75,0.6)]" />
        <div className="absolute top-1/2 right-1 -translate-y-1/2 w-3 sm:w-4 h-6 sm:h-8 bg-gold/30 border border-gold rounded-full flex items-center justify-center shadow-md">
          <div className="w-1 sm:w-1.5 h-2.5 sm:h-3 bg-gold rounded-sm" />
        </div>
      </motion.div>

      {/* RIGHT VELVET CURTAIN PANEL */}
      <motion.div
        animate={{
          x: isOpen ? '92%' : '0%',
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute top-0 right-0 bottom-0 w-[53%] z-20 pointer-events-none shadow-[-5px_0_20px_rgba(0,0,0,0.8)] origin-right will-change-transform"
        style={{
          background: 'repeating-linear-gradient(90deg, #1a0207 0px, #781527 10px, #2d050c 20px, #5c0f1e 30px, #1d0308 40px)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-amber-300 to-gold/70 shadow-[0_0_8px_rgba(200,154,75,0.6)]" />
        <div className="absolute top-1/2 left-1 -translate-y-1/2 w-3 sm:w-4 h-6 sm:h-8 bg-gold/30 border border-gold rounded-full flex items-center justify-center shadow-md">
          <div className="w-1 sm:w-1.5 h-2.5 sm:h-3 bg-gold rounded-sm" />
        </div>
      </motion.div>

      {/* Bottom Stage Footlights */}
      <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-gold/40 via-gold/20 to-transparent z-25 pointer-events-none border-t border-gold/30" />

      {/* Hover/Tap Prompt Tag */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2.5 inset-x-0 z-30 flex justify-center pointer-events-none"
        >
          <span className="font-serif italic text-[10px] sm:text-[11px] text-ivory bg-black/75 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-gold/40 tracking-wider shadow-lg">
            {accentTitle || 'Tap or hover to unveil'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
