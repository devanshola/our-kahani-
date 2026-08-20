import { motion } from 'framer-motion';
import IndiaMap from './IndiaMap';

export default function Act4Map() {
  return (
    <section id="act-4" className="py-24 border-b border-gold/20 relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-4"
        >
          Act IV — Interactive Cultural Map
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl mb-6 text-ivory"
        >
          India Comes <span className="italic text-raj-pink">Alive</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-sand/80 text-sm md:text-base max-w-2xl mx-auto mb-12"
        >
          Explore Rajasthan's iconic forts, lakes, desert trails, and puppet centers. Hover over landmarks to meet their Kathputli guardians!
        </motion.p>

        {/* Interactive SVG India & Rajasthan Cultural Map */}
        <IndiaMap />
      </div>
    </section>
  );
}

