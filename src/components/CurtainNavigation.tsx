import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerGhungroo } from './AmbientAudio';
import GlassEmoji from './GlassEmoji';

interface ActItem {
  id: string;
  label: string;
  actNum: string;
  icon: string;
}

const ACTS: ActItem[] = [
  { id: 'hero-stage', label: 'Main Stage', actNum: 'Prologue', icon: '🎭' },
  { id: 'storybook-paths', label: 'Story Paths', actNum: 'Paths', icon: '📖' },
  { id: 'act-1', label: 'The Bridge', actNum: 'Act I', icon: '🌉' },
  { id: 'act-2', label: 'Meet Anvesha', actNum: 'Act II', icon: '👩‍🏫' },
  { id: 'act-3', label: 'Live Classes', actNum: 'Act III', icon: '✨' },
  { id: 'story-library', label: 'Story Stage', actNum: 'Library', icon: '📚' },
  { id: 'contact-whatsapp', label: 'WhatsApp', actNum: 'Direct', icon: '💬' },
];

export default function CurtainNavigation() {
  const [curtainsClosed, setCurtainsClosed] = useState(false);
  const [activeAct, setActiveAct] = useState('hero-stage');

  const scrollToAct = useCallback((actId: string) => {
    const el = document.getElementById(actId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -75, duration: 0.8 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, []);

  const handleActClick = useCallback(
    (actId: string) => {
      if (curtainsClosed) return;
      setActiveAct(actId);
      triggerGhungroo();

      // Quick smooth curtain sweep
      setCurtainsClosed(true);

      // Smooth scroll target while curtains sweep in
      setTimeout(() => {
        scrollToAct(actId);
      }, 350);

      // Open Curtains
      setTimeout(() => {
        setCurtainsClosed(false);
      }, 850);
    },
    [curtainsClosed, scrollToAct]
  );

  const toggleCurtainsManual = useCallback(() => {
    triggerGhungroo();
    setCurtainsClosed(true);
    setTimeout(() => {
      setCurtainsClosed(false);
    }, 1100);
  }, []);

  return (
    <>
      {/* Top Floating Theatre Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 md:px-12 py-2.5 sm:py-3 bg-charcoal/90 backdrop-blur-md border-b border-gold/30 flex items-center justify-between shadow-[0_5px_25px_rgba(0,0,0,0.8)]">
        {/* Brand / Logo */}
        <div
          onClick={() => handleActClick('hero-stage')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <GlassEmoji emoji="🪔" size="xs" variant="gold" />
          <div>
            <div className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-wider text-ivory gold-glow leading-tight">
              KAHAANII
            </div>
            <div className="text-[8px] sm:text-[9px] font-sans tracking-[0.3em] uppercase text-gold/80 -mt-0.5">
              ghar tak
            </div>
          </div>
        </div>

        {/* Act Quick Nav Items (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5">
          {ACTS.map((act) => (
            <button
              key={act.id}
              onClick={() => handleActClick(act.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                activeAct === act.id
                  ? 'bg-gold text-charcoal font-bold border-gold shadow-[0_0_12px_rgba(200,154,75,0.5)] scale-105'
                  : 'bg-maroon/20 text-sand/80 border-gold/20 hover:border-gold/60 hover:text-ivory'
              }`}
            >
              <GlassEmoji
                emoji={act.icon}
                size="xs"
                variant={activeAct === act.id ? 'gold' : 'subtle'}
                glow={false}
              />
              <span className="uppercase tracking-wider text-[11px] font-medium">{act.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls & Free Class CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleCurtainsManual}
            className="hidden sm:flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-gold border border-gold/40 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors cursor-pointer"
            title="Trigger Grand Theatre Curtain Transition"
          >
            <span>🎭</span>
            <span>Draw Curtains</span>
          </button>

          <a
            href="https://wa.me/918840725262?text=Hi%20Anvesha!%20I%20saw%20your%20website%20and%20I%27d%20love%20to%20book%20a%20free%20class%20for%20my%20child"
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-shape px-3 sm:px-4 py-1.5 sm:py-2 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-maroon hover:scale-105 transition-transform shadow-lg shrink-0 flex items-center gap-1"
          >
            <span>Free Class</span>
            <span>🎟️</span>
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar - Optimized for iOS Safe Area & Fast Tap */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-40 bg-charcoal/95 border border-gold/40 backdrop-blur-md rounded-full px-2 py-1.5 flex items-center justify-around shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-[max(0.4rem,env(safe-area-inset-bottom))]">
        {ACTS.map((act) => (
          <button
            key={act.id}
            onClick={() => handleActClick(act.id)}
            className={`p-2 rounded-full text-xs transition-all shrink-0 ${
              activeAct === act.id
                ? 'bg-gold text-charcoal shadow-lg scale-110'
                : 'text-sand/70 hover:text-ivory'
            }`}
            title={act.label}
          >
            <span className="text-sm">{act.icon}</span>
          </button>
        ))}
      </div>

      {/* FULL SCREEN GRAND THEATRE CURTAINS ANIMATION OVERLAY */}
      <AnimatePresence>
        {curtainsClosed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 pointer-events-none flex overflow-hidden contain-strict"
          >
            {/* Left Velvet Curtain Half */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="w-1/2 h-full curtain-left border-r-4 border-gold shadow-[20px_0_50px_rgba(0,0,0,0.9)] relative flex items-center justify-end pr-4 sm:pr-8"
            >
              <div className="w-1.5 h-full bg-gradient-to-b from-gold via-ivory to-gold shadow-lg" />
              <div className="absolute right-4 w-8 sm:w-12 h-24 sm:h-32 bg-gold/80 rounded-b-full border-2 border-maroon shadow-2xl flex items-end justify-center pb-2">
                <div className="w-3 sm:w-4 h-8 sm:h-12 bg-ivory rounded-b-full" />
              </div>
            </motion.div>

            {/* Right Velvet Curtain Half */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="w-1/2 h-full curtain-right border-l-4 border-gold shadow-[-20px_0_50px_rgba(0,0,0,0.9)] relative flex items-center justify-start pl-4 sm:pl-8"
            >
              <div className="w-1.5 h-full bg-gradient-to-b from-gold via-ivory to-gold shadow-lg" />
              <div className="absolute left-4 w-8 sm:w-12 h-24 sm:h-32 bg-gold/80 rounded-b-full border-2 border-maroon shadow-2xl flex items-end justify-center pb-2">
                <div className="w-3 sm:w-4 h-8 sm:h-12 bg-ivory rounded-b-full" />
              </div>
            </motion.div>

            {/* Center Royal Seal Emblem */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 border-gold bg-maroon/95 shadow-[0_0_50px_rgba(200,154,75,0.9)] flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl sm:text-3xl animate-pulse">🪔</span>
                <span className="font-serif text-gold text-[10px] sm:text-xs font-bold tracking-widest mt-1">
                  KAHAANII
                </span>
                <span className="text-[7px] sm:text-[8px] font-sans text-ivory/80 uppercase tracking-tighter">
                  Ghar Tak
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
