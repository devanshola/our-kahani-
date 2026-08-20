import { motion } from 'framer-motion';
import SocialFollow from './SocialFollow';

export default function FinalAct() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen py-16 sm:py-20 bg-charcoal flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-charcoal pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-sand/80 mb-8 sm:mb-12"
        >
          "Every ending is the beginning of another story."
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl text-gold mb-2 tracking-wide font-normal"
        >
          Kahaanii
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-sans text-xl sm:text-2xl md:text-3xl text-ivory mb-3 sm:mb-4 tracking-widest opacity-90 font-bold"
        >
          घर तक
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="font-serif italic text-base sm:text-lg md:text-xl text-sand mb-6 sm:mb-8"
        >
          One story at a time.
        </motion.p>

        {/* Social Media Follow Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full"
        >
          <SocialFollow />
        </motion.div>

        {/* Final Diya */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="w-8 h-8 relative flex justify-center mt-6"
        >
          <div className="w-4 h-6 bg-gold rounded-full blur-[1px] shadow-[0_0_20px_rgba(200,154,75,0.8)] animate-pulse" />
          <div className="absolute bottom-0 w-8 h-3 bg-terra rounded-b-full rounded-t-sm" />
        </motion.div>
      </div>
    </section>
  );
}
