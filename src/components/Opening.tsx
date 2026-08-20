import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Opening() {
  const [stage, setStage] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Crisp sequence timing for high engagement without sluggish wait
    const t1 = setTimeout(() => setStage(1), 600);  // Diya appears
    const t2 = setTimeout(() => setStage(2), 1600); // Kahaanii text
    const t3 = setTimeout(() => setStage(3), 2800); // Tonight's story
    const t4 = setTimeout(() => setStage(4), 4200); // Curtains open (fade out)
    const t5 = setTimeout(() => setDismissed(true), 5000); // Complete unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSkip = () => {
    setStage(4);
    setTimeout(() => setDismissed(true), 400);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="opening"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage >= 4 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onClick={handleSkip}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal text-ivory cursor-pointer select-none"
      >
        {/* Curtains background */}
        <div className="absolute inset-0 bg-maroon opacity-85 mix-blend-multiply pointer-events-none" />

        {/* Diya */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.8 }}
          transition={{ duration: 0.8 }}
          className="absolute flex flex-col items-center justify-center top-1/4 pointer-events-none"
        >
          <div className="w-8 h-8 relative flex justify-center">
            {/* Flame */}
            <div className="w-4 h-6 bg-gold rounded-full blur-[1px] shadow-[0_0_20px_rgba(200,154,75,0.9)] animate-pulse" />
            {/* Base */}
            <div className="absolute bottom-0 w-8 h-3 bg-terra rounded-b-full rounded-t-sm" />
          </div>
        </motion.div>

        {/* Text Sequence */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 15 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl text-gold mb-2 tracking-wide font-normal"
          >
            Kahaanii
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 15 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-2xl md:text-3xl text-ivory mb-4 tracking-widest opacity-90 font-bold"
          >
            घर तक
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif italic text-base md:text-xl text-sand mb-8"
          >
            One story at a time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans uppercase tracking-[0.3em] text-xs sm:text-sm text-gold font-semibold"
          >
            Tonight's story begins...
          </motion.p>
        </div>

        {/* Subtle Skip CTA button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute bottom-8 text-[11px] font-sans uppercase tracking-widest text-sand/60 hover:text-gold px-4 py-2 rounded-full border border-gold/20 hover:border-gold/60 transition-colors z-20"
        >
          Enter Theatre →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
