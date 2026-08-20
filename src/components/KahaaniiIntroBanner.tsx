import { motion } from 'framer-motion';

interface KahaaniiIntroBannerProps {
  onLearnHindiClick?: () => void;
  onExploreIndiaClick?: () => void;
}

export default function KahaaniiIntroBanner({
  onLearnHindiClick,
  onExploreIndiaClick,
}: KahaaniiIntroBannerProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-12 bg-[#FAF7F0] text-charcoal rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] my-12 overflow-hidden border-2 border-gold/30">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(90,23,38,0.8)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-6"
        >
          <h2 className="font-serif font-black text-2xl md:text-3xl tracking-[0.25em] text-charcoal uppercase">
            KAHAANII
          </h2>
          <span className="font-serif text-gold text-lg md:text-xl font-bold mt-1 tracking-wider">
            घर तक
          </span>
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-maroon/80 font-bold mt-2">
            Language · Culture · History · Stories
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-charcoal tracking-tight">
            Discover India
            <br />
            <span className="font-serif italic text-gold font-normal block mt-1">
              through stories.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans text-base sm:text-lg md:text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          Learn Hindi. Explore Indian culture. Understand its history. Find the stories that bring India closer, wherever you are.
        </motion.p>

        {/* Dual CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button
            onClick={() => {
              if (onLearnHindiClick) onLearnHindiClick();
              else scrollToSection('act-3');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal text-ivory font-sans text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-maroon transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>For Learners: Learn Hindi</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={() => {
              if (onExploreIndiaClick) onExploreIndiaClick();
              else scrollToSection('storybook-paths');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-charcoal/80 text-charcoal font-sans text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all flex items-center justify-center"
          >
            For Explorers: Explore India
          </button>
        </motion.div>
      </div>
    </section>
  );
}
