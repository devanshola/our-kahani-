import { motion } from 'framer-motion';
import Kathputli from './Kathputli';

export default function HeroStage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -75, duration: 0.8 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero-stage" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-2 sm:px-4 md:px-8 overflow-hidden border-b border-gold/20">
      {/* Interactive Kathputli Puppets flanking the Hero stage */}
      <div className="absolute left-2 md:left-6 top-1/3 z-20 hidden 2xl:block pointer-events-auto">
        <Kathputli type="storyteller" name="Kathputli Storyteller" scale={0.85} />
      </div>

      <div className="absolute right-2 md:right-6 top-1/3 z-20 hidden 2xl:block pointer-events-auto">
        <Kathputli type="child" name="Child Puppet" scale={0.85} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-12 bg-[#FAF7F0] text-charcoal rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] my-2 sm:my-4 overflow-hidden border-2 border-gold/30">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(90,23,38,0.8)_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-4 sm:mb-6"
          >
            <h2 className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-charcoal uppercase">
              KAHAANII
            </h2>
            <span className="font-serif text-gold text-base sm:text-lg md:text-xl font-bold mt-0.5 tracking-wider">
              घर तक
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-maroon/80 font-bold mt-1 sm:mt-2">
              Language · Culture · History · Stories
            </span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.08] text-charcoal tracking-tight">
              Discover India
              <br />
              <span className="font-serif italic text-gold font-normal block mt-1">
                through stories.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm sm:text-base md:text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed font-light mb-8 sm:mb-10 px-2"
          >
            Learn Hindi. Explore Indian culture. Understand its history. Find the stories that bring India closer, wherever you are.
          </motion.p>

          {/* Dual CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md"
          >
            <button
              onClick={() => scrollToSection('act-3')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-charcoal text-ivory font-sans text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-maroon transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>For Learners: Learn Hindi</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection('storybook-paths')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-transparent border-2 border-charcoal/80 text-charcoal font-sans text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all flex items-center justify-center cursor-pointer"
            >
              For Explorers: Explore India
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
