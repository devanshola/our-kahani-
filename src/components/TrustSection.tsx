import { motion } from 'framer-motion';

export default function TrustSection() {
  const points = [
    "One-on-One Classes",
    "Online via Zoom",
    "1-Hour Sessions",
    "Flexible Scheduling",
    "Personalised Syllabus",
    "Safe & Loving Environment",
    "Learning Through Stories"
  ];

  return (
    <section className="py-32 relative bg-ivory text-charcoal overflow-hidden border-b-8 border-gold">
      {/* Haveli architectural background subtle pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(27,23,20,0.1)_20px,rgba(27,23,20,0.1)_21px)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Decorative Jharokha framing the title */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-sm border border-charcoal/20 p-3 sm:p-4 rounded-t-full bg-sand/10 shadow-2xl"
          >
            <div className="border border-maroon/20 rounded-t-full p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[260px] sm:min-h-[300px]">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-maroon mb-4">
                Premium Learning
              </h2>
              <p className="font-sans font-light text-sm sm:text-base text-charcoal/80 leading-relaxed">
                A seamless, high-quality educational experience designed for modern parents and curious children.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/2">
          <ul className="space-y-6">
            {points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 font-serif text-xl md:text-2xl text-charcoal/90 border-b border-charcoal/10 pb-4"
              >
                <span className="text-gold text-lg">◈</span>
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
