import { motion } from 'framer-motion';
import GlassEmoji from './GlassEmoji';

export default function OurPromise() {
  const values = [
    { title: "With love, not pressure", icon: "🤍" },
    { title: "As an individual", icon: "🌱" },
    { title: "With encouragement", icon: "✨" },
    { title: "Like family", icon: "🧡" }
  ];

  return (
    <section className="py-24 border-b border-gold/20 relative bg-[#2a1b1e]">
      {/* Textile pattern overlay (subtle) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-4"
        >
          Our Promise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-ivory mb-20"
        >
          How your child <span className="italic text-raj-pink">will always</span> be treated
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="mb-6 flex flex-col items-center relative">
                <div className="w-[1px] h-4 bg-gold/40 mb-1" />
                <GlassEmoji emoji={val.icon} size="xl" variant="gold" />
              </div>
              <h3 className="font-serif text-xl text-ivory/90">{val.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
