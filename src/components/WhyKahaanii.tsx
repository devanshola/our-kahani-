import { motion } from 'framer-motion';
import VelvetCurtainWindow from './VelvetCurtainWindow';
import Kathputli from './Kathputli';
import GlassEmoji from './GlassEmoji';

export default function WhyKahaanii() {
  const acts = [
    {
      num: "01",
      title: "Stories, not textbooks",
      desc: "Most Hindi classes teach pure grammar. We teach wonder. Learners meet Ram, Arjun, Birbal and Tenali Rama — and fall in love with the language through them.",
      tag: "Unveil Act 01 Stage",
      renderStage: () => (
        <div className="flex flex-col items-center justify-center space-y-3 relative">
          {/* Suspended Puppet strings */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-12 pointer-events-none opacity-40">
            <div className="w-[1px] h-20 bg-gold/80" />
            <div className="w-[1px] h-20 bg-gold/80" />
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="flex items-center gap-4"
          >
            <Kathputli type="king" name="King Puppet" scale={0.7} />
            <div className="w-20 h-24 rounded-2xl bg-gradient-to-br from-gold/30 to-maroon/60 border border-gold p-2 shadow-[0_0_20px_rgba(200,154,75,0.4)] flex flex-col items-center justify-center text-center">
              <GlassEmoji emoji="📖" size="sm" variant="gold" />
              <span className="font-serif text-ivory text-xs font-bold mt-1">Kahaanii</span>
              <span className="font-serif text-gold text-[10px] font-bold">अ आ इ ई</span>
            </div>
            <Kathputli type="storyteller" name="Storyteller Puppet" scale={0.7} />
          </motion.div>
          <span className="font-serif italic text-gold text-xs tracking-wider">
            "Wonder before grammar"
          </span>
        </div>
      )
    },
    {
      num: "02",
      title: "Culture lives in every class",
      desc: "Language is inseparable from culture. We don't just teach words — we teach Diwali, Holi, ancient India, its music, its food, and its timeless soul.",
      tag: "Unveil Act 02 Stage",
      renderStage: () => (
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Floating Festival Elements */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="flex items-center gap-3"
          >
            <GlassEmoji emoji="🪔" size="lg" variant="maroon" />
            <GlassEmoji emoji="🪘" size="xl" variant="gold" />
            <GlassEmoji emoji="🌺" size="lg" variant="royal" />
          </motion.div>

          <div className="bg-black/50 border border-gold/30 px-4 py-1.5 rounded-full text-[11px] font-serif italic text-ivory">
            Diwali · Holi · Sangeet · Heritage
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Completely personalised",
      desc: "No rigid syllabus. Every lesson plan is built around who the learner is — their current level, interests, and goals. Unique to them. Always.",
      tag: "Unveil Act 03 Stage",
      renderStage: () => (
        <div className="flex flex-col items-center justify-center space-y-2">
          {/* Custom Tailored Stage Orbit */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-gold/40"
            />
            <Kathputli type="teacher" name="Personalized Educator" scale={0.8} />
            <span className="absolute -top-1 bg-gold text-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
              Bespoke
            </span>
            <span className="absolute -bottom-1 bg-maroon text-ivory text-[9px] font-bold px-2 py-0.5 rounded-full border border-gold/40">
              1-on-1 Pace
            </span>
          </div>
        </div>
      )
    },
    {
      num: "04",
      title: "Open to everyone",
      desc: "Kahaanii is rooted in the Indian diaspora — but it is open to anyone in the world who wants to learn Hindi and discover India. You don't need to be Indian to fall in love with its stories.",
      tag: "Unveil Act 04 Stage",
      renderStage: () => (
        <div className="flex flex-col items-center justify-center space-y-3">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <Kathputli type="child" name="Global Learner 1" scale={0.75} />
            <GlassEmoji emoji="🌍" size="xl" variant="royal" />
            <Kathputli type="dancer" name="Global Learner 2" scale={0.75} />
          </motion.div>

          <span className="font-serif italic text-ivory text-xs bg-maroon/60 px-3 py-1 rounded-full border border-gold/30">
            A doorway open to all nations 🇮🇳
          </span>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 border-b border-gold/20 relative bg-gradient-to-b from-transparent to-charcoal/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-4"
          >
            Why Kahaanii
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-ivory"
          >
            Why we are <span className="italic text-royal bg-ivory px-2 rounded-sm ml-2">different</span>
          </motion.h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {acts.map((act, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
            >
              <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''} text-center md:text-left`}>
                <span className="font-serif text-5xl text-gold/30 block mb-4">{act.num}</span>
                <h3 className="font-serif text-3xl text-ivory mb-4">{act.title}</h3>
                <p className="font-sans font-light text-sand/80 leading-relaxed">{act.desc}</p>
              </div>
              
              <div className={`md:w-1/2 flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <VelvetCurtainWindow
                  aspectRatio="w-72 h-80"
                  accentTitle={act.tag}
                  autoOpenOnView={true}
                >
                  {act.renderStage()}
                </VelvetCurtainWindow>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

