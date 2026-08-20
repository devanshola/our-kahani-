import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassEmoji from './GlassEmoji';

export interface JharokhaWindow {
  id: number;
  row: number; // 1 (top) to 4 (bottom)
  col: number;
  title: string;
  silhouetteType: 'puppet' | 'dancer' | 'musician' | 'rani' | 'peacock' | 'diya' | 'maharaja' | 'camel';
  silhouetteName: string;
  description: string;
  emoji: string;
}

const WINDOWS: JharokhaWindow[] = [
  // Top Tier (Crown Domes)
  { id: 1, row: 1, col: 1, title: "Crown Jharokha 1", silhouetteType: 'diya', silhouetteName: 'Royal Diya Lamp', description: 'Everburning golden flame lit for royal guests', emoji: '🪔' },
  { id: 2, row: 1, col: 2, title: "Apex Crown Dome", silhouetteType: 'peacock', silhouetteName: 'Royal Peacock', description: 'Golden peacock greeting the morning sun over Jaipur', emoji: '🦚' },
  { id: 3, row: 1, col: 3, title: "Crown Jharokha 2", silhouetteType: 'diya', silhouetteName: 'Lantern of Winds', description: 'Brass lantern swaying in the desert breeze', emoji: '🏮' },

  // Upper Middle Tier
  { id: 4, row: 2, col: 1, title: "Jharokha of Music", silhouetteType: 'musician', silhouetteName: 'Sarangi Master', description: 'Playing soulful Rajasthani raga notes', emoji: '🪕' },
  { id: 5, row: 2, col: 2, title: "Royal Court Balcony", silhouetteType: 'maharaja', silhouetteName: 'Maharaja Jai Singh', description: 'Architect and founder of the Pink City', emoji: '👑' },
  { id: 6, row: 2, col: 3, title: "Jharokha of Queens", silhouetteType: 'rani', silhouetteName: 'Maharani Padmini', description: 'Observing festival processions unseen through lattices', emoji: '👸' },
  { id: 7, row: 2, col: 4, title: "Jharokha of Dance", silhouetteType: 'dancer', silhouetteName: 'Ghoomar Dancer', description: 'Graceful swirl of crimson ghagra skirts', emoji: '💃' },

  // Lower Middle Tier
  { id: 8, row: 3, col: 1, title: "Puppet Guild Window", silhouetteType: 'puppet', silhouetteName: 'Kathputli Marionette', description: 'String puppet performing a traditional royal bow', emoji: '🎪' },
  { id: 9, row: 3, col: 2, title: "Caravan Jharokha", silhouetteType: 'camel', silhouetteName: 'Desert Caravan', description: 'Golden sands under starry desert night skies', emoji: '🐪' },
  { id: 10, row: 3, col: 3, title: "Storyteller Nook", silhouetteType: 'puppet', silhouetteName: 'Sutradhar Scholar', description: 'Reciting ancient Panchatantra folklore tales', emoji: '📜' },
  { id: 11, row: 3, col: 4, title: "Jharokha of Light", silhouetteType: 'diya', silhouetteName: 'Festival Flame', description: 'Warm flickering light filling the palace arches', emoji: '✨' },

  // Ground Tier Arches
  { id: 12, row: 4, col: 1, title: "Gateway Arch East", silhouetteType: 'peacock', silhouetteName: 'Courtyard Peacock', description: 'Resting on white marble courtyard railings', emoji: '🦚' },
  { id: 13, row: 4, col: 2, title: "Grand Royal Entrance", silhouetteType: 'maharaja', silhouetteName: 'Court Herald', description: 'Welcoming guests with Khamma Ghani greetings', emoji: '🎺' },
  { id: 14, row: 4, col: 3, title: "Gateway Arch West", silhouetteType: 'dancer', silhouetteName: 'Folk Musician', description: 'Beating rhythmic Dholak drums', emoji: '🥁' },
];

export default function HawaMahalBackground() {
  const [litWindows, setLitWindows] = useState<Record<number, boolean>>({
    2: true, // Default central apex lit
    5: true,
  });
  const [activeWindow, setActiveWindow] = useState<JharokhaWindow | null>(WINDOWS[1]);

  const toggleWindowLight = (w: JharokhaWindow) => {
    setLitWindows((prev) => ({
      ...prev,
      [w.id]: !prev[w.id],
    }));
    setActiveWindow(w);
  };

  const lightAllWindows = () => {
    const allLit: Record<number, boolean> = {};
    WINDOWS.forEach((w) => {
      allLit[w.id] = true;
    });
    setLitWindows(allLit);
  };

  const resetWindows = () => {
    setLitWindows({});
    setActiveWindow(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center py-6">
      {/* Interactive Controls Overlay */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 z-20">
        <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold flex items-center gap-2">
          <GlassEmoji emoji="🏛️" size="xs" variant="gold" />
          <span>Interactive Hawa Mahal Palace</span>
        </span>
        <button
          onClick={lightAllWindows}
          className="px-3 py-1.5 text-xs font-sans rounded-full bg-gold/20 text-gold border border-gold/40 hover:bg-gold hover:text-charcoal transition-all font-semibold flex items-center gap-1.5"
        >
          <span>Light All Jharokhas</span>
          <GlassEmoji emoji="🪔" size="xs" variant="gold" />
        </button>
        <button
          onClick={resetWindows}
          className="px-3 py-1.5 text-xs font-sans rounded-full bg-maroon/40 text-sand/80 border border-gold/20 hover:border-gold hover:text-ivory transition-all flex items-center gap-1.5"
        >
          <span>Extinguish Lights</span>
          <GlassEmoji emoji="🌙" size="xs" variant="maroon" />
        </button>
      </div>

      {/* Main Hawa Mahal Palace SVG & Grid Canvas */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-b from-[#1a0c10] via-charcoal to-deep-maroon/40 rounded-2xl border-2 border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex items-end justify-center p-4 md:p-8">
        {/* Palace Honeycomb Honey-Pink Facade Texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(217,119,136,0.3)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

        {/* Palace Structure Grid Layout */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-2 md:gap-4">
          
          {/* Tier 1: Apex Domes */}
          <div className="flex items-end justify-center gap-2 md:gap-4 w-full">
            {WINDOWS.filter((w) => w.row === 1).map((w) => (
              <JharokhaItem
                key={w.id}
                window={w}
                isLit={!!litWindows[w.id]}
                isSelected={activeWindow?.id === w.id}
                onToggle={() => toggleWindowLight(w)}
                size="sm"
              />
            ))}
          </div>

          {/* Tier 2: Upper Middle */}
          <div className="flex items-end justify-center gap-2 md:gap-4 w-full">
            {WINDOWS.filter((w) => w.row === 2).map((w) => (
              <JharokhaItem
                key={w.id}
                window={w}
                isLit={!!litWindows[w.id]}
                isSelected={activeWindow?.id === w.id}
                onToggle={() => toggleWindowLight(w)}
                size="md"
              />
            ))}
          </div>

          {/* Tier 3: Lower Middle */}
          <div className="flex items-end justify-center gap-2 md:gap-4 w-full">
            {WINDOWS.filter((w) => w.row === 3).map((w) => (
              <JharokhaItem
                key={w.id}
                window={w}
                isLit={!!litWindows[w.id]}
                isSelected={activeWindow?.id === w.id}
                onToggle={() => toggleWindowLight(w)}
                size="md"
              />
            ))}
          </div>

          {/* Tier 4: Ground Arches */}
          <div className="flex items-end justify-center gap-3 md:gap-6 w-full">
            {WINDOWS.filter((w) => w.row === 4).map((w) => (
              <JharokhaItem
                key={w.id}
                window={w}
                isLit={!!litWindows[w.id]}
                isSelected={activeWindow?.id === w.id}
                onToggle={() => toggleWindowLight(w)}
                size="lg"
              />
            ))}
          </div>
        </div>

        {/* Revealed Silhouette Info Card */}
        <AnimatePresence>
          {activeWindow && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-3 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-30 bg-charcoal/95 border-2 border-gold p-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur flex items-center gap-3.5"
            >
              <GlassEmoji emoji={activeWindow.emoji} size="lg" variant="gold" className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif text-gold font-bold text-sm truncate">
                    {activeWindow.silhouetteName}
                  </h4>
                  <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30 font-mono">
                    {litWindows[activeWindow.id] ? 'LIT 🪔' : 'CLICK TO LIGHT'}
                  </span>
                </div>
                <p className="font-sans text-xs text-sand/90 mt-0.5 leading-tight line-clamp-2">
                  {activeWindow.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Individual Jharokha Window Component
function JharokhaItem({
  window,
  isLit,
  isSelected,
  onToggle,
  size,
}: {
  window: JharokhaWindow;
  isLit: boolean;
  isSelected: boolean;
  onToggle: () => void;
  size: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-14 h-16 md:w-20 md:h-22',
    md: 'w-16 h-20 md:w-24 md:h-28',
    lg: 'w-20 h-24 md:w-28 md:h-32',
  }[size];

  return (
    <motion.div
      onClick={onToggle}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
      className={`relative cursor-pointer flex flex-col items-center justify-end rounded-t-full border-2 transition-all duration-300 ${sizeClasses} ${
        isLit
          ? 'bg-gradient-to-b from-[#6e2230] via-maroon to-[#a33246] border-gold shadow-[0_0_20px_rgba(200,154,75,0.7)]'
          : 'bg-[#210e14] border-gold/30 hover:border-gold/80 hover:bg-[#38151f]'
      } ${isSelected ? 'ring-2 ring-gold ring-offset-2 ring-offset-charcoal' : ''}`}
    >
      {/* Jharokha Arch Roof Peak */}
      <div className="absolute -top-3 w-3/4 h-3 border-t-2 border-x-2 border-gold/60 rounded-t-full bg-maroon/90" />

      {/* Flickering Light Effect when Lit */}
      {isLit && (
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.8, 0.95, 0.75],
            scale: [0.98, 1.02, 0.99, 1.03, 0.98],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8 + Math.random(),
            ease: 'easeInOut',
          }}
          className="absolute inset-1 rounded-t-full bg-gradient-to-b from-gold/40 via-amber-500/20 to-transparent blur-xs pointer-events-none"
        />
      )}

      {/* Latticed Window Grill Lines */}
      <div className="absolute inset-2 rounded-t-full opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,#000_3px,#000_4px)] pointer-events-none" />

      {/* Revealed Silhouette Icon / Emoji */}
      <div className="relative z-10 mb-2 flex flex-col items-center justify-center">
        <motion.span
          animate={
            isLit
              ? {
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }
              : { scale: 0.9, opacity: 0.6 }
          }
          transition={{ repeat: isLit ? Infinity : 0, duration: 3 }}
          className={`text-lg md:text-2xl transition-all ${
            isLit ? 'drop-shadow-[0_0_8px_rgba(200,154,75,0.9)]' : 'grayscale opacity-50'
          }`}
        >
          {window.emoji}
        </motion.span>
      </div>

      {/* Tiny Lamp Base Light Dot */}
      <div
        className={`w-2 h-2 rounded-full mb-1 border transition-colors ${
          isLit
            ? 'bg-gold border-ivory shadow-[0_0_10px_#C89A4B] animate-pulse'
            : 'bg-charcoal border-gold/30'
        }`}
      />
    </motion.div>
  );
}
