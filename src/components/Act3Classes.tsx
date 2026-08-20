import { motion } from 'framer-motion';
import VelvetCurtainWindow from './VelvetCurtainWindow';
import GlassEmoji from './GlassEmoji';

export default function Act3Classes() {
  const scenes = [
    {
      step: "STEP 01",
      title: "Speaking, Reading & Writing First",
      desc: "Firstly, we focus on speaking, reading Devanagari letters, and writing stroke-by-stroke according to the learner's individual goals.",
      icon: "🗣️",
      accent: "Devanagari & Dialogue"
    },
    {
      step: "STEP 02",
      title: "Introducing Stories Next",
      desc: "Once the learner begins understanding and speaking a little, we introduce captivating stories — Panchatantra, mythology, culture, and history.",
      icon: "📖",
      accent: "Stories & Panchatantra"
    },
    {
      step: "STEP 03",
      title: "Conversational & Cultural Flow",
      desc: "Finding their voice through natural dialogue, active listening, and connecting words with emotion and Indian heritage.",
      icon: "💬",
      accent: "Natural Dialogue"
    },
    {
      step: "STEP 04",
      title: "A Syllabus Built for the Learner",
      desc: "No rigid formulas. The syllabus bends to the learner — custom-tailored to their age, starting level, and personal pace.",
      icon: "🪡",
      accent: "Custom Tailored"
    }
  ];

  return (
    <section id="act-3" className="py-24 border-b border-gold/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-3"
          >
            Act III · Our Methodology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-ivory mb-4"
          >
            How a Class <span className="italic text-gold">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-light text-sand/80 text-base md:text-lg max-w-2xl mx-auto"
          >
            A gentle step-by-step approach: building core speaking, reading & writing skills first, then transitioning into stories as understanding grows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {scenes.map((scene, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <VelvetCurtainWindow
                aspectRatio="w-full min-h-[380px] sm:min-h-[360px]"
                accentTitle={`${scene.step} · ${scene.accent}`}
                autoOpenOnView={true}
              >
                <div className="flex flex-col items-center justify-center text-center w-full max-w-[320px] sm:max-w-sm mx-auto">
                  {/* Step Badge */}
                  <div className="mb-2 px-3 py-0.5 rounded-full bg-gold/20 border border-gold/40 text-[10px] font-sans font-bold tracking-widest text-gold uppercase z-20">
                    {scene.step}
                  </div>

                  {/* Puppet Icon Simulation */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: index, ease: "easeInOut" }}
                    className="mb-2.5 shrink-0"
                  >
                    <GlassEmoji emoji={scene.icon} size="2xl" variant="gold" />
                  </motion.div>

                  <h3 className="font-serif text-xl sm:text-2xl text-ivory mb-2 font-normal leading-snug px-1">
                    {scene.title}
                  </h3>
                  <p className="font-sans font-light text-xs sm:text-sm text-sand/90 leading-relaxed max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto px-1">
                    {scene.desc}
                  </p>
                </div>
              </VelvetCurtainWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


