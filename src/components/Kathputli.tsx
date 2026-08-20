import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import GlassEmoji from './GlassEmoji';

export type PuppetType = 'storyteller' | 'child' | 'dancer' | 'king' | 'teacher';

interface KathputliProps {
  type?: PuppetType;
  name?: string;
  className?: string;
  scale?: number;
  interactive?: boolean;
}

export default function Kathputli({
  type = 'storyteller',
  name,
  className = '',
  scale = 1,
  interactive = true,
}: KathputliProps) {
  const [isAnimating, setIsAnimation] = useState(false);
  const controls = useAnimation();
  const leftArmControls = useAnimation();
  const rightArmControls = useAnimation();

  const handlePuppetClick = async () => {
    if (!interactive || isAnimating) return;
    setIsAnimation(true);

    if (type === 'storyteller') {
      // Bow gesture + string physics
      await Promise.all([
        controls.start({
          rotateX: [0, 25, 0],
          y: [0, 15, 0],
          transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
        }),
        leftArmControls.start({
          rotate: [0, -40, 0],
          transition: { duration: 1.2 },
        }),
        rightArmControls.start({
          rotate: [0, 40, 0],
          transition: { duration: 1.2 },
        }),
      ]);
    } else if (type === 'child') {
      // Excited wave and jump
      await Promise.all([
        controls.start({
          y: [0, -25, 5, -10, 0],
          rotate: [0, -10, 10, -5, 0],
          transition: { duration: 1.4, ease: 'easeOut' },
        }),
        rightArmControls.start({
          rotate: [0, -120, -70, -120, 0],
          transition: { duration: 1.4 },
        }),
      ]);
    } else if (type === 'dancer') {
      // Spin and twirl
      await Promise.all([
        controls.start({
          rotateY: [0, 180, 360],
          y: [0, -15, 0],
          transition: { duration: 1.5, ease: 'easeInOut' },
        }),
        leftArmControls.start({
          rotate: [0, -90, 0],
          transition: { duration: 1.5 },
        }),
        rightArmControls.start({
          rotate: [0, 90, 0],
          transition: { duration: 1.5 },
        }),
      ]);
    } else if (type === 'teacher') {
      // Namaste gesture
      await Promise.all([
        controls.start({
          y: [0, 5, 0],
          transition: { duration: 1.2 },
        }),
        leftArmControls.start({
          rotate: [0, -45, 0],
          x: [0, 10, 0],
          transition: { duration: 1.2 },
        }),
        rightArmControls.start({
          rotate: [0, 45, 0],
          x: [0, -10, 0],
          transition: { duration: 1.2 },
        }),
      ]);
    } else if (type === 'king') {
      // Dignified royal nod and scepter raise
      await Promise.all([
        controls.start({
          rotateX: [0, 15, 0],
          transition: { duration: 1 },
        }),
        leftArmControls.start({
          rotate: [0, -60, 0],
          transition: { duration: 1 },
        }),
      ]);
    }

    setIsAnimation(false);
  };

  // Color mappings for traditional fabrics
  const colors = {
    storyteller: { hat: '#C89A4B', dress: '#5A1726', accent: '#C96F7B' },
    child: { hat: '#C96F7B', dress: '#1A237E', accent: '#E8D5B5' },
    dancer: { hat: '#E8D5B5', dress: '#C96F7B', accent: '#C89A4B' },
    teacher: { hat: '#1A237E', dress: '#B85C38', accent: '#C89A4B' },
    king: { hat: '#C89A4B', dress: '#1A237E', accent: '#5A1726' },
  }[type];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Marionette Hanging Strings */}
      <div className="relative w-32 h-24 flex justify-between pointer-events-none">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-[1px] h-full bg-gradient-to-b from-gold/50 via-white/30 to-gold/40 origin-top shadow-[0_0_5px_rgba(200,154,75,0.5)]"
        />
        <motion.div
          animate={{ rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="w-[1px] h-full bg-gradient-to-b from-gold/50 via-white/30 to-gold/40 origin-top shadow-[0_0_5px_rgba(200,154,75,0.5)]"
        />
        <motion.div
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="w-[1px] h-full bg-gradient-to-b from-gold/50 via-white/30 to-gold/40 origin-top shadow-[0_0_5px_rgba(200,154,75,0.5)] absolute left-1/2 -translate-x-1/2"
        />
      </div>

      {/* Main Marionette Body Container */}
      <motion.div
        animate={controls}
        onClick={handlePuppetClick}
        style={{ scale }}
        className={`relative flex flex-col items-center origin-top cursor-pointer group ${
          interactive ? 'hover:brightness-110' : ''
        }`}
      >
        {/* Click hint badge */}
        {interactive && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            whileHover={{ opacity: 1, y: -12 }}
            className="absolute -top-6 bg-gold text-charcoal text-[10px] font-sans uppercase font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-30 flex items-center gap-1"
          >
            <span>Click Puppet</span>
            <GlassEmoji emoji="✨" size="xs" variant="gold" glow={false} />
          </motion.div>
        )}

        {/* Head & Pagri (Turban) */}
        <div className="relative z-20 flex flex-col items-center">
          {/* Turban (Pagri) */}
          <div
            className="w-12 h-7 rounded-t-full relative flex items-center justify-center border border-gold/60 shadow-md"
            style={{ backgroundColor: colors.hat }}
          >
            {/* Turban Fan / Feather ornament */}
            <div className="absolute -top-2 w-3 h-4 bg-gold rounded-t-full border border-maroon" />
            <div className="w-10 h-1 bg-gold/50 rounded-full my-auto" />
          </div>

          {/* Wooden Face */}
          <div className="w-10 h-11 bg-[#E0B084] rounded-b-xl border border-charcoal/60 relative flex flex-col items-center justify-center shadow-inner">
            {/* Painted Eyes */}
            <div className="flex gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-charcoal relative">
                <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 left-0.5" />
              </div>
              <div className="w-2 h-2 rounded-full bg-charcoal relative">
                <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 left-0.5" />
              </div>
            </div>

            {/* Bindi / Tilak */}
            <div className="w-1.5 h-2 bg-maroon rounded-full absolute top-1.5" />

            {/* Mustache or Smile */}
            {type === 'king' || type === 'storyteller' ? (
              <div className="w-6 h-1.5 bg-charcoal rounded-full mt-1 border-b border-gold" />
            ) : (
              <div className="w-3 h-1 border-b-2 border-maroon rounded-full mt-1" />
            )}

            {/* Wooden Grain Details */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:4px_4px]" />
          </div>
        </div>

        {/* Neck joint */}
        <div className="w-2 h-2 bg-charcoal/80 z-10 -my-0.5" />

        {/* Torso & Arms */}
        <div className="relative z-10 flex justify-center items-start">
          {/* Left Arm */}
          <motion.div
            animate={leftArmControls}
            className="w-2 h-12 bg-gold/80 origin-top-right rounded-full border border-charcoal/40 -mr-1 shadow-md"
          >
            <div className="w-3 h-3 bg-[#E0B084] rounded-full mt-10 -ml-0.5 border border-charcoal/40" />
          </motion.div>

          {/* Torso / Kurta */}
          <div
            className="w-14 h-16 rounded-t-lg border-2 border-gold/60 relative overflow-hidden flex flex-col items-center justify-between p-1 shadow-lg"
            style={{ backgroundColor: colors.dress }}
          >
            {/* Gold Gota-Patti Trim */}
            <div className="w-full h-1 bg-gold/80" />
            <div className="w-1 h-full bg-gold/80 absolute top-0" />
            <div className="w-full h-1 bg-gold/80" />
          </div>

          {/* Right Arm */}
          <motion.div
            animate={rightArmControls}
            className="w-2 h-12 bg-gold/80 origin-top-left rounded-full border border-charcoal/40 -ml-1 shadow-md"
          >
            <div className="w-3 h-3 bg-[#E0B084] rounded-full mt-10 -ml-0.5 border border-charcoal/40" />
          </motion.div>
        </div>

        {/* Flared Lehenga / Ghagra / Lower Costume */}
        <div
          className="w-24 h-24 -mt-2 rounded-b-full border-2 border-gold/70 shadow-2xl relative overflow-hidden origin-top"
          style={{
            background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.dress} 100%)`,
          }}
        >
          {/* Mirror work / Zari details */}
          <div className="absolute inset-x-0 bottom-3 flex justify-around px-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-ivory rounded-full border border-gold shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              />
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 h-2 bg-gold" />
        </div>

        {/* Ghungroo / Little Bells at Feet */}
        <div className="flex gap-4 -mt-1">
          <div className="w-2 h-2 bg-gold rounded-full border border-charcoal shadow-sm animate-bounce" />
          <div className="w-2 h-2 bg-gold rounded-full border border-charcoal shadow-sm animate-bounce delay-100" />
        </div>

        {/* Puppet Label */}
        {name && (
          <span className="font-serif italic text-xs text-sand/80 mt-2 bg-charcoal/80 px-2 py-0.5 rounded border border-gold/30">
            {name}
          </span>
        )}
      </motion.div>
    </div>
  );
}
