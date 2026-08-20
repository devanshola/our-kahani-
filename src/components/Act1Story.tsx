import { motion } from 'framer-motion';
import GlassEmoji from './GlassEmoji';

interface JourneyStep {
  label: string;
  hindiLabel?: string;
  icon: string;
  tagline: string;
}

export default function Act1Story() {
  const journey: JourneyStep[] = [
    { label: "Learner Abroad", hindiLabel: "प्रवासी", icon: "🌍", tagline: "Far from roots" },
    { label: "Hindi", hindiLabel: "हिंदी", icon: "अ", tagline: "Sounds & language" },
    { label: "Stories", hindiLabel: "कहानियाँ", icon: "📖", tagline: "Epics & folklore" },
    { label: "Culture", hindiLabel: "संस्कृति", icon: "🪔", tagline: "Traditions & festivals" },
    { label: "History", hindiLabel: "इतिहास", icon: "🏛️", tagline: "5000-year heritage" },
    { label: "Identity", hindiLabel: "पहचान", icon: "✨", tagline: "Belonging & pride" },
    { label: "Home", hindiLabel: "घर तक", icon: "🏡", tagline: "Heart connected" },
  ];

  return (
    <section id="act-1" className="py-16 sm:py-24 border-b border-gold/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-gold/5 via-raj-pink/5 to-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-gold/80 text-xs mb-3 font-semibold"
        >
          Act I
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-ivory tracking-tight"
        >
          The Story <span className="italic text-raj-pink">Begins</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-sand/80 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-14"
        >
          The journey of reconnection — step by step from anywhere in the world to your roots.
        </motion.p>

        {/* ========================================================================= */}
        {/* DESKTOP / LAPTOP PREVIEW: STRICT SINGLE HORIZONTAL LINE (NO WRAPPING)     */}
        {/* ========================================================================= */}
        <div className="hidden md:block w-full">
          <div className="w-full bg-gradient-to-r from-charcoal/90 via-maroon/20 to-charcoal/90 border border-gold/30 rounded-3xl p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="flex flex-row items-center justify-between w-full flex-nowrap gap-1 lg:gap-2">
              {journey.map((step, index) => {
                const isLast = index === journey.length - 1;

                return (
                  <div key={index} className="flex items-center flex-1 min-w-0">
                    {/* Node */}
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className="flex flex-col items-center text-center flex-1 min-w-0 group cursor-default"
                    >
                      {/* Step Number Tag */}
                      <span className="text-[9px] lg:text-[10px] font-sans uppercase tracking-widest text-gold/70 font-semibold mb-1.5 opacity-80 group-hover:opacity-100 group-hover:text-gold transition-colors">
                        0{index + 1}
                      </span>

                      {/* Icon */}
                      <div className="mb-2 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(200,154,75,0.25)]">
                        <GlassEmoji
                          emoji={step.icon}
                          size="lg"
                          variant={isLast ? 'maroon' : 'gold'}
                        />
                      </div>

                      {/* Title */}
                      <span className="font-serif italic text-sand text-xs lg:text-sm xl:text-base font-medium whitespace-nowrap group-hover:text-ivory transition-colors">
                        {step.label}
                      </span>

                      {/* Subtle Hindi script */}
                      {step.hindiLabel && (
                        <span className="text-[10px] lg:text-[11px] font-sans text-gold/60 mt-0.5 whitespace-nowrap">
                          {step.hindiLabel}
                        </span>
                      )}
                    </motion.div>

                    {/* Connecting Arrow (Between items only) */}
                    {!isLast && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + 0.1, duration: 0.3 }}
                        className="flex items-center justify-center px-1 text-gold/60 shrink-0 select-none"
                      >
                        <span className="text-base lg:text-lg animate-pulse">→</span>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE PREVIEW: HIGH-CRAFT CONNECTED VERTICAL TIMELINE ROAD               */}
        {/* ========================================================================= */}
        <div className="block md:hidden w-full max-w-md mx-auto">
          <div className="relative bg-gradient-to-b from-charcoal/95 via-maroon/20 to-charcoal/95 border border-gold/30 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
            {/* Connected Vertical Golden Thread Line */}
            <div className="absolute left-[39px] sm:left-[43px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-gold/30 via-gold/70 to-raj-pink/60 rounded-full" />

            <div className="flex flex-col gap-4 relative z-10">
              {journey.map((step, index) => {
                const isLast = index === journey.length - 1;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: index * 0.07, duration: 0.35 }}
                    className={`flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl border transition-all ${
                      isLast
                        ? 'bg-gradient-to-r from-maroon/50 to-charcoal/80 border-gold/60 shadow-[0_0_15px_rgba(200,154,75,0.25)]'
                        : 'bg-charcoal/60 border-gold/20 hover:border-gold/40'
                    }`}
                  >
                    {/* Node Glass Emoji with step badge */}
                    <div className="relative shrink-0">
                      <GlassEmoji
                        emoji={step.icon}
                        size="md"
                        variant={isLast ? 'maroon' : 'gold'}
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-charcoal font-sans font-bold text-[9px] flex items-center justify-center shadow-md">
                        {index + 1}
                      </span>
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-serif italic text-sand text-sm sm:text-base font-bold truncate">
                          {step.label}
                        </span>
                        {step.hindiLabel && (
                          <span className="text-[11px] font-sans text-gold/80 bg-gold/10 px-1.5 py-0.5 rounded border border-gold/20 shrink-0">
                            {step.hindiLabel}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs font-sans text-sand/60 font-light mt-0.5">
                        {step.tagline}
                      </p>
                    </div>

                    {/* End arrow or home crown icon */}
                    <div className="text-gold/40 text-xs shrink-0 pr-1">
                      {isLast ? '✨' : '↓'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 font-sans font-light text-sm sm:text-base md:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Kahaanii began as a bridge for Indian children and families growing up far from home. We believe that with every story heard, a learner finds a missing piece of themselves.
        </motion.p>
      </div>
    </section>
  );
}
