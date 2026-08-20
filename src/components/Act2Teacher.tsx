import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Kathputli from './Kathputli';
import VelvetCurtainWindow from './VelvetCurtainWindow';
import GlassEmoji from './GlassEmoji';
import anveshaImg from '../assets/anvesha.jpg';

export default function Act2Teacher() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="act-2" className="py-16 sm:py-24 border-b border-gold/20 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-3"
        >
          Act II
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-ivory"
        >
          Meet Your <span className="italic text-royal bg-ivory px-2 rounded-sm ml-2">Teacher</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-sans font-light text-base sm:text-lg text-sand/80 mb-12 sm:mb-16"
        >
          Not just a teacher. A friend.
        </motion.p>

        {/* The Puppet / Portrait Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {/* Interactive Teacher Puppet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Kathputli type="teacher" name="Anvesha Puppet (Namaste)" scale={1.05} />
          </motion.div>

          {/* Portrait Trigger Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center cursor-pointer group"
            onClick={() => setModalOpen(true)}
          >
            <VelvetCurtainWindow
              aspectRatio="w-52 sm:w-56 h-68 sm:h-72"
              accentTitle="Read Her Story"
              autoOpenOnView={true}
            >
              <div className="flex flex-col items-center justify-center text-center w-full h-full pt-1">
                <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-t-full mb-2 border-2 border-gold overflow-hidden shadow-2xl relative bg-maroon/50 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={anveshaImg || '/anvesha.jpg'} 
                    alt="Anvesha Yadav" 
                    width="112"
                    height="144"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/anvesha.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <span className="font-serif text-ivory text-base sm:text-lg font-bold tracking-wide drop-shadow-md">Anvesha Yadav</span>
                <span className="font-serif italic text-gold text-xs mt-0.5">Founder & Educator</span>
              </div>
            </VelvetCurtainWindow>
          </motion.div>
        </div>
      </div>

      {/* Teacher Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false);
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-3 sm:p-6 md:p-12 overflow-y-auto"
          >
            {/* Modal Curtains Effect with Realistic Velvet Texture */}
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-0 shadow-2xl pointer-events-none border-r-2 sm:border-r-4 border-gold" 
              style={{
                background: 'repeating-linear-gradient(90deg, #1d0308 0px, #5c0f1e 10px, #2d050c 20px, #781527 30px, #1a0207 40px)',
              }}
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-0 shadow-2xl pointer-events-none border-l-2 sm:border-l-4 border-gold" 
              style={{
                background: 'repeating-linear-gradient(90deg, #1a0207 0px, #781527 10px, #2d050c 20px, #5c0f1e 30px, #1d0308 40px)',
              }}
            />

            {/* Spotlight */}
            <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-ivory/15 to-transparent pointer-events-none z-10" />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="relative z-20 bg-ivory text-charcoal max-w-3xl w-full p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-gold max-h-[88vh] overflow-y-auto my-auto"
            >
              {/* Sticky Top Header Bar with Close Button */}
              <div className="sticky top-0 z-30 flex items-center justify-between bg-ivory pt-1 pb-3 mb-4 border-b border-gold/30 -mt-2 -mx-2 px-2">
                <span className="font-serif italic text-maroon text-xs sm:text-sm font-semibold">
                  Founder & Lead Educator
                </span>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-full bg-maroon text-ivory hover:bg-charcoal transition-all font-sans text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer group"
                  title="Close story & exit"
                >
                  <span>Close</span>
                  <span className="w-4 h-4 rounded-full bg-ivory/20 flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">
                    ✕
                  </span>
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                <div className="w-32 sm:w-36 h-44 sm:h-48 shrink-0 rounded-t-full border-2 border-gold overflow-hidden shadow-xl relative bg-maroon/50 group">
                  <img 
                    src={anveshaImg || '/anvesha.jpg'} 
                    alt="Anvesha Yadav" 
                    width="144"
                    height="192"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/anvesha.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-charcoal/85 text-center border-t border-gold/40">
                    <span className="font-serif text-ivory text-[10px] sm:text-[11px] italic font-medium">Jaipur, Rajasthan</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-1 text-maroon">Anvesha Yadav</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-terra mb-4 sm:mb-6 font-semibold">Founder & Lead Educator · Kahaanii Ghar Tak</p>
                  
                  <div className="space-y-3 sm:space-y-4 font-sans font-light text-charcoal/90 text-sm sm:text-base leading-relaxed">
                    <p>
                      "I am Anvesha — from the pink streets of Jaipur, Rajasthan, currently pursuing law, and endlessly in love with India's stories, its history, and the magic of teaching."
                    </p>
                    <p>
                      "Growing up in a deeply patriotic household, surrounded by books on Indian history and culture, I came to understand something early — that India is not just a country. It is a civilisation. And its stories deserve to be told with the reverence they carry."
                    </p>
                    <p>
                      "At Kahaanii, I bring everything I know — the Ramayan, the Mahabharat, India's freedom struggle, its ancient civilisations, its living culture — into every class. Not as facts to be memorised. As stories to be felt."
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gold/30 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
                    <a 
                      href="https://wa.me/918840725262?text=Hi%20Anvesha!%20I%20read%20your%20story%20and%20would%20love%20to%20book%20a%20free%20class" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto bg-maroon text-ivory px-5 sm:px-6 py-3 uppercase tracking-widest text-xs hover:bg-royal transition-colors rounded-xl shadow-md font-bold text-center flex items-center justify-center gap-2"
                    >
                      <span>Book a Free Class on WhatsApp</span>
                      <GlassEmoji emoji="💬" size="xs" variant="gold" />
                    </a>

                    <button
                      onClick={() => setModalOpen(false)}
                      className="text-xs font-sans text-charcoal/70 hover:text-charcoal underline"
                    >
                      Close Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}