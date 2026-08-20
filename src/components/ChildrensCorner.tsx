import { motion } from 'framer-motion';
import { useState } from 'react';
import Kathputli, { PuppetType } from './Kathputli';
import GlassEmoji from './GlassEmoji';

export default function ChildrensCorner() {
  const [diyaLit, setDiyaLit] = useState(true);
  const [starsSparkle, setStarsSparkle] = useState(false);
  const [activeMessage, setActiveMessage] = useState('Tap any puppet on stage to bring them to life!');

  const puppetTypes: { type: PuppetType; name: string; desc: string }[] = [
    { type: 'storyteller', name: 'Kathputli Sutradhar', desc: 'Bows respectfully to start the story!' },
    { type: 'child', name: 'Chhoti Anandi', desc: 'Waves enthusiastically & jumps for joy!' },
    { type: 'dancer', name: 'Ghoomar Dancer', desc: 'Twirls in a traditional Rajasthani spin!' },
    { type: 'king', name: 'Raja Vikram', desc: 'Nods majestically with royal grace!' },
    { type: 'teacher', name: 'Anvesha Teacher', desc: 'Offers a warm Namaste gesture!' },
  ];

  return (
    <section id="childrens-corner" className="py-24 border-b border-gold/20 relative bg-charcoal">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-4"
        >
          Interactive Puppet Theatre
        </motion.p>
        <h2 className="font-serif text-3xl md:text-5xl text-ivory mb-4">
          The Kathputli Troupe
        </h2>
        <p className="font-sans text-sand/70 text-sm md:text-base max-w-xl mx-auto mb-12">
          Click any handcrafted puppet below to trigger its unique marionette physics, bow, wave, or twirl animation!
        </p>

        {/* Interactive Kathputli Stage Container */}
        <div className="relative w-full border-2 border-gold/40 rounded-xl overflow-hidden bg-gradient-to-b from-[#1c0d12] via-[#2a131b] to-[#170a0f] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Top Valance & Curtain Decor */}
          <div className="absolute top-0 inset-x-0 h-8 bg-maroon border-b border-gold/30 flex justify-around opacity-90 z-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-16 h-6 bg-deep-maroon rounded-b-full border-b border-gold/20" />
            ))}
          </div>

          {/* Sparkly Stars Background */}
          <div 
            className="absolute top-10 inset-x-0 h-24 cursor-pointer flex justify-around px-8 z-10"
            onClick={() => setStarsSparkle(true)}
            onAnimationEnd={() => setStarsSparkle(false)}
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={starsSparkle ? { scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="w-2 h-2 bg-gold rounded-full opacity-60 shadow-[0_0_8px_#C89A4B]"
              />
            ))}
          </div>

          {/* Interactive Puppet Lineup */}
          <div className="relative z-20 flex flex-wrap items-end justify-center gap-6 md:gap-12 pt-8 pb-6">
            {puppetTypes.map((p) => (
              <div 
                key={p.type} 
                onClick={() => setActiveMessage(`${p.name}: "${p.desc}"`)}
                className="transition-transform hover:scale-105"
              >
                <Kathputli type={p.type} name={p.name} scale={0.9} />
              </div>
            ))}
          </div>

          {/* Interactive Stage Elements Footer */}
          <div className="relative z-20 mt-6 pt-6 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 px-4 bg-charcoal/60 rounded-lg backdrop-blur">
            {/* Diya Light */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setDiyaLit(!diyaLit)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-5 bg-terra rounded-b-full relative shadow-md">
                {diyaLit && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-5 bg-gold rounded-full blur-[1px] shadow-[0_0_12px_#C89A4B]"
                  />
                )}
              </div>
              <span className="font-sans text-xs text-sand/80 uppercase tracking-wider flex items-center gap-1.5">
                <span>{diyaLit ? 'Stage Diya Lit' : 'Light Stage Diya'}</span>
                <GlassEmoji emoji={diyaLit ? '🔥' : '✨'} size="xs" variant={diyaLit ? 'maroon' : 'gold'} />
              </span>
            </motion.div>

            {/* Active Puppet Dialogue/Desc Box */}
            <div className="font-serif italic text-gold text-sm md:text-base px-4 py-1.5 bg-maroon/60 rounded border border-gold/30 max-w-md text-center">
              {activeMessage}
            </div>

            {/* Ghungroo Bell Indicator */}
            <div className="font-sans text-xs uppercase tracking-widest text-gold/70 flex items-center gap-2">
              <span>Ghungroo Bells</span>
              <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

