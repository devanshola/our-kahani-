import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassEmoji from './GlassEmoji';

export interface PathCardData {
  id: string;
  pathNum: string;
  badge: string;
  icon: string;
  title: string;
  quote: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  modalDetails: {
    heroTag: string;
    overview: string;
    sampleModules: { title: string; desc: string }[];
    sampleHindiPhrase: { hindi: string; transliteration: string; meaning: string };
  };
}

const PATHS: PathCardData[] = [
  {
    id: 'path-01',
    pathNum: 'PATH 01',
    badge: '1:1 PERSONALISED',
    icon: '🌸',
    title: 'FOR CHILDREN',
    quote: '"Discover India through stories."',
    description:
      'Personalized 1-on-1 online classes where Hindi comes alive through ancient legends, heroes, festivals, and gentle guidance.',
    features: [
      'Devanagari Script & Phonics',
      'Ramayan & Mahabharat Tales',
      'Indian Festivals & Traditions',
      'Confident Everyday Conversation',
    ],
    ctaText: 'EXPLORE CHILD MODE',
    isPopular: true,
    modalDetails: {
      heroTag: 'Child Mode · Ages 4 to 14',
      overview:
        'Guided by expert native storytellers, children learn Hindi naturally through puppet shows, animated storybooks, rhymes, and interactive mythology quests.',
      sampleModules: [
        { title: 'The Adventures of Young Krishna', desc: 'Interactive storytelling with moral lessons and vocabulary' },
        { title: 'Festival Colors & Food', desc: 'Diwali, Holi, and Janmashtami interactive celebrations' },
        { title: 'Alphabet & Devanagari Phonics', desc: 'Playful letter tracing and song-based pronunciation' },
      ],
      sampleHindiPhrase: {
        hindi: 'नमस्ते! आप कैसे हैं?',
        transliteration: 'Namaste! Aap kaise hain?',
        meaning: 'Hello! How are you?',
      },
    },
  },
  {
    id: 'path-02',
    pathNum: 'PATH 02',
    badge: 'PRACTICAL & CONTEXTUAL',
    icon: '📜',
    title: 'FOR ADULT LEARNERS',
    quote: '"Learn Hindi & understand India."',
    description:
      'Practical Hindi language and deep cultural context for adult learners, partners of Indians, and diaspora adults reconnecting with roots.',
    features: [
      'Speaking & Pronunciation',
      'Reading & Script Literacy',
      'Cultural Etiquette & Context',
      'Conversational Practice',
    ],
    ctaText: 'START ADULT JOURNEY',
    modalDetails: {
      heroTag: 'Adult Immersion Program',
      overview:
        'Designed for beginners and heritage speakers seeking real conversational confidence, nuance in family gatherings, and deep literary appreciation.',
      sampleModules: [
        { title: 'Family & Social Conversation', desc: 'Expressing respect, warmth, and nuances in relationships' },
        { title: 'Hindi Cinema & Song Lyrics', desc: 'Understanding poetic metaphors and popular dialogue' },
        { title: 'Script & Speed Reading', desc: 'Mastering Devanagari reading from signboards to literature' },
      ],
      sampleHindiPhrase: {
        hindi: 'मुझे भारत की संस्कृति बहुत पसंद है।',
        transliteration: 'Mujhe Bharat ki sanskriti bahut pasand hai.',
        meaning: 'I really love Indian culture.',
      },
    },
  },
  {
    id: 'path-03',
    pathNum: 'PATH 03',
    badge: 'CULTURAL IMMERSION',
    icon: '🧭',
    title: 'FOR TRAVELLERS',
    quote: '"Understand India before you visit."',
    description:
      'Immerse yourself in India\'s regional customs, social etiquette, essential travel Hindi, history, and culinary traditions.',
    features: [
      'Essential Travel Hindi',
      'Regional Customs & Food',
      'Historical Background',
      'Social Etiquette & Bargaining',
    ],
    ctaText: 'PREPARE YOUR TRIP',
    modalDetails: {
      heroTag: 'Travel & Heritage Prep',
      overview:
        'Equip yourself with practical phrases for markets, heritage monuments, rickshaws, and culinary explorations across North and South India.',
      sampleModules: [
        { title: 'Market Etiquette & Directions', desc: 'Bargaining respectfully and navigating bustling bazaars' },
        { title: 'Culinary Map of India', desc: 'Ordering regional delicacies and understanding spice palettes' },
        { title: 'Palaces, Forts & Architecture', desc: 'Historical contexts of Mughal, Rajput, and Chola heritage' },
      ],
      sampleHindiPhrase: {
        hindi: 'यह किला कितने साल पुराना है?',
        transliteration: 'Yeh kila kitne saal purana hai?',
        meaning: 'How many years old is this fort?',
      },
    },
  },
  {
    id: 'path-04',
    pathNum: 'PATH 04',
    badge: 'OPEN CULTURAL LIBRARY',
    icon: '✨',
    title: 'FOR THE CURIOUS',
    quote: '"Just explore."',
    description:
      'A digital cultural library of stories, folklore, mythology, art, and philosophy for anyone who loves India.',
    features: [
      'Mythology & Epic Lore',
      'Regional Folk Tales',
      'Historical Biographies',
      'Living Traditions & Arts',
    ],
    ctaText: 'DISCOVER A STORY',
    modalDetails: {
      heroTag: 'Open Digital Archive',
      overview:
        'A curated treasure chest of Panchatantra fables, Kathputli folklore, royal histories, and philosophical insights open to all culture enthusiasts.',
      sampleModules: [
        { title: 'The Kathputli Marionette Guild', desc: 'History of Rajasthani puppetry and oral storytelling' },
        { title: 'Epics of Ramayana & Mahabharata', desc: 'Character studies, moral allegories, and artistic depictions' },
        { title: 'Folk Legends of the Desert', desc: 'Tales of brave kings, poets, and desert caravans' },
      ],
      sampleHindiPhrase: {
        hindi: 'एक समय की बात है...',
        transliteration: 'Ek samay ki baat hai...',
        meaning: 'Once upon a time...',
      },
    },
  },
];

export default function StorybookPaths() {
  const [selectedPathId, setSelectedPathId] = useState<string>('path-01');
  const [activeModalPath, setActiveModalPath] = useState<PathCardData | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -75, duration: 0.8 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalPath(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="storybook-paths" className="relative w-full py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-8 bg-[#FAF7F0] text-charcoal rounded-2xl sm:rounded-3xl shadow-2xl my-8 sm:my-12 border-2 border-gold/30 overflow-hidden">
      {/* Top Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9px] sm:text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-gold font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/30 inline-block mb-3"
        >
          KAHAANII SIGNATURE INTERACTION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-6xl text-charcoal font-normal tracking-tight mb-3 sm:mb-4"
        >
          India as a <span className="font-serif font-semibold text-charcoal">Storybook</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-sans text-xs sm:text-sm md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light leading-relaxed px-2"
        >
          Flip through the pages below. Each page opens a unique dimension of India — from language and epics to ancient history, living art, and geography.
        </motion.p>
      </div>

      {/* 4 Path Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {PATHS.map((path, idx) => {
          const isSelected = selectedPathId === path.id;

          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => setSelectedPathId(path.id)}
              className={`relative cursor-pointer rounded-2xl bg-white p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 border ${
                isSelected
                  ? 'border-gold shadow-[0_12px_35px_rgba(200,154,75,0.22)] ring-2 ring-gold/40'
                  : 'border-charcoal/10 hover:border-gold/60 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-wider uppercase bg-charcoal/5 text-charcoal/80 px-2.5 py-1 rounded-md border border-charcoal/10">
                    {path.badge}
                  </span>
                  <GlassEmoji emoji={path.icon} size="md" variant="gold" />
                </div>

                {/* Path Number */}
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-charcoal/40 uppercase block mb-1">
                  {path.pathNum}
                </span>

                {/* Title */}
                <h3 className="font-serif font-bold text-lg sm:text-2xl text-charcoal tracking-tight mb-1.5 sm:mb-2">
                  {path.title}
                </h3>

                {/* Quote */}
                <p className="font-serif italic text-gold font-medium text-xs sm:text-sm mb-2.5">
                  {path.quote}
                </p>

                {/* Description */}
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-4 sm:mb-6">
                  {path.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
                  {path.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 text-xs font-sans text-charcoal/85 leading-snug"
                    >
                      <span className="w-4 h-4 rounded-full bg-gold/15 text-gold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-gold/30">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-3.5 border-t border-charcoal/10 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalPath(path);
                  }}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal text-ivory shadow-md hover:bg-maroon'
                      : 'bg-transparent text-charcoal hover:bg-gold/10'
                  }`}
                >
                  <span>{path.ctaText}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal Dialog */}
      <AnimatePresence>
        {activeModalPath && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModalPath(null);
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-charcoal/85 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#FAF7F0] text-charcoal rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-gold shadow-2xl max-h-[88vh] overflow-y-auto my-auto"
            >
              {/* Sticky Top Header Bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between bg-[#FAF7F0] pt-1 pb-3 mb-4 border-b border-charcoal/10 -mt-2 -mx-2 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeModalPath.icon}</span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gold bg-gold/15 px-2.5 sm:px-3 py-1 rounded-full border border-gold/30">
                    {activeModalPath.modalDetails.heroTag}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalPath(null)}
                  className="px-3 py-1.5 rounded-full bg-maroon text-ivory hover:bg-charcoal transition-all font-sans text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer group"
                  title="Close message"
                >
                  <span>Close</span>
                  <span className="w-4 h-4 rounded-full bg-ivory/20 flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">
                    ✕
                  </span>
                </button>
              </div>

              {/* Title & Quote */}
              <h3 className="font-serif font-bold text-xl sm:text-3xl text-charcoal mb-1">
                {activeModalPath.title}
              </h3>
              <p className="font-serif italic text-gold text-sm sm:text-base mb-3 sm:mb-4">
                {activeModalPath.quote}
              </p>

              {/* Overview */}
              <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light mb-5 sm:mb-6 border-b border-charcoal/10 pb-4">
                {activeModalPath.modalDetails.overview}
              </p>

              {/* Sample Modules */}
              <div className="mb-5 sm:mb-6">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-charcoal uppercase tracking-wider mb-2.5">
                  Curriculum & Story Highlights
                </h4>
                <div className="space-y-2.5">
                  {activeModalPath.modalDetails.sampleModules.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 bg-white rounded-xl border border-charcoal/10 shadow-xs"
                    >
                      <h5 className="font-sans font-bold text-xs text-charcoal">
                        {mod.title}
                      </h5>
                      <p className="font-sans text-xs text-charcoal/70 mt-0.5">
                        {mod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Hindi Phrase Card */}
              <div className="bg-gradient-to-r from-maroon to-[#3A0F19] text-ivory p-3.5 sm:p-4 rounded-2xl border border-gold/40 shadow-inner mb-5 sm:mb-6">
                <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-widest text-gold uppercase block mb-1">
                  Sample Phrase You Will Master 🗣️
                </span>
                <div className="font-serif text-lg sm:text-2xl font-bold text-sand mb-0.5">
                  {activeModalPath.modalDetails.sampleHindiPhrase.hindi}
                </div>
                <div className="font-sans text-xs text-sand/80 italic">
                  "{activeModalPath.modalDetails.sampleHindiPhrase.transliteration}"
                </div>
                <div className="font-sans text-[11px] sm:text-xs text-gold font-semibold mt-1">
                  Meaning: {activeModalPath.modalDetails.sampleHindiPhrase.meaning}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setActiveModalPath(null);
                    scrollToSection('act-3');
                  }}
                  className="w-full sm:flex-1 py-3 sm:py-3.5 rounded-xl bg-charcoal text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-maroon transition-all shadow-md text-center cursor-pointer"
                >
                  Book 1-on-1 Trial Lesson
                </button>
                <button
                  onClick={() => setActiveModalPath(null)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-transparent border border-charcoal/20 text-charcoal font-sans text-xs font-bold uppercase hover:bg-charcoal/5 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Close</span>
                  <span>✕</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
