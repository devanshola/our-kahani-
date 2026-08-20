import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { triggerGhungroo } from './AmbientAudio';

interface PuppetProps {
  children?: ReactNode;
  className?: string;
  name?: string;
  stringLength?: number;
}

export default function Puppet({
  children,
  className = '',
  name,
  stringLength = 120,
}: PuppetProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Bind Framer Motion scroll velocity for realistic inertia swinging
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });
  
  // Transform scroll velocity into rotation sway angles (-15 deg to +15 deg)
  const scrollRotate = useTransform(smoothVelocity, [-1200, 1200], [-16, 16]);
  const scrollSwayX = useTransform(smoothVelocity, [-1200, 1200], [-10, 10]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerGhungroo();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Marionette Strings with Scroll & Hover Physics */}
      <div
        className="relative flex justify-between pointer-events-none"
        style={{ width: '80px', height: `${stringLength}px` }}
      >
        <motion.div
          style={{ rotate: scrollRotate, x: scrollSwayX }}
          animate={{
            rotate: isHovered ? [-8, 8, -4, 4, 0] : [-2, 2, -2],
          }}
          transition={{
            duration: isHovered ? 1.2 : 3,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="w-[1px] h-full bg-gradient-to-b from-gold/70 via-ivory/40 to-gold/50 origin-top shadow-[0_0_6px_rgba(200,154,75,0.6)]"
        />
        <motion.div
          style={{ rotate: scrollRotate, x: scrollSwayX }}
          animate={{
            rotate: isHovered ? [8, -8, 4, -4, 0] : [2, -2, 2],
          }}
          transition={{
            duration: isHovered ? 1.2 : 3.5,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="w-[1px] h-full bg-gradient-to-b from-gold/70 via-ivory/40 to-gold/50 origin-top shadow-[0_0_6px_rgba(200,154,75,0.6)]"
        />
      </div>

      {/* Physics Swinging Puppet Body */}
      <motion.div
        style={{ rotate: scrollRotate, x: scrollSwayX }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={triggerGhungroo}
        initial={{ rotate: -3 }}
        animate={
          isHovered
            ? {
                rotate: [0, -18, 14, -8, 4, 0],
                y: [0, -12, 4, -2, 0],
                scale: 1.08,
              }
            : {
                rotate: [-4, 4, -4],
                y: [0, -6, 0],
                scale: 1,
              }
        }
        transition={{
          rotate: isHovered
            ? { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }
            : { repeat: Infinity, duration: 4, ease: 'easeInOut' },
          y: isHovered
            ? { duration: 1.2, ease: 'easeOut' }
            : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        className="relative flex flex-col items-center cursor-pointer origin-top group"
      >
        {/* Render children or default marionette figure */}
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center">
            {/* Turban / Pagri */}
            <div className="w-10 h-6 bg-maroon border border-gold rounded-t-full shadow-md relative flex items-center justify-center">
              <div className="w-2 h-2 bg-gold rounded-full -mt-3 border border-maroon" />
            </div>
            {/* Wooden Head */}
            <div className="w-8 h-9 bg-[#DCA876] rounded-b-lg border border-charcoal relative flex flex-col items-center justify-center shadow-inner">
              <div className="flex gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-charcoal rounded-full" />
                <div className="w-1.5 h-1.5 bg-charcoal rounded-full" />
              </div>
              <div className="w-4 h-1 bg-maroon rounded-full" />
            </div>
            {/* Body Kurta */}
            <div className="w-12 h-14 bg-terra border-2 border-gold rounded-t-md shadow-lg my-0.5" />
            {/* Flared Ghagra */}
            <div className="w-20 h-20 bg-gradient-to-b from-raj-pink to-maroon border-2 border-gold rounded-b-full shadow-2xl" />
          </div>
        )}

        {/* Name Tag */}
        {name && (
          <span className="font-serif italic text-xs text-sand/90 mt-2 bg-charcoal/90 px-2 py-0.5 rounded border border-gold/40 shadow">
            {name}
          </span>
        )}
      </motion.div>
    </div>
  );
}
