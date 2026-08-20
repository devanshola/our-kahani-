import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Kathputli, { PuppetType } from './Kathputli';
import { triggerGhungroo } from './AmbientAudio';
import GlassEmoji from './GlassEmoji';

export interface Landmark {
  id: string;
  name: string;
  hindiName: string;
  type: 'fort' | 'lake' | 'desert' | 'craft' | 'culture';
  category: 'Palaces & Forts' | 'Story Trails' | 'Kathputli Guilds';
  x: number; // percentage coordinates on map SVG
  y: number;
  puppetType: PuppetType;
  puppetName: string;
  greeting: string;
  lore: string;
  vocab: { hindi: string; english: string; pronunciation: string };
  imageSymbol: string;
}

const LANDMARKS: Landmark[] = [
  {
    id: 'jaipur',
    name: 'Jaipur — The Pink City',
    hindiName: 'जयपुर (गुलाबी नगर)',
    type: 'fort',
    category: 'Palaces & Forts',
    x: 35,
    y: 38,
    puppetType: 'storyteller',
    puppetName: 'Kathputli Sutradhar',
    greeting: 'खम्मा घणी! (Khamma Ghani!) Welcome to Hawa Mahal!',
    lore: 'Known for its honeycombed 953 Jharokha windows, Jaipur is the birthplace of royal Kathputli string puppet storytelling traditions.',
    vocab: { hindi: 'झरोखा', pronunciation: 'Jharokha', english: 'Overhanging Balcony' },
    imageSymbol: '🕌',
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur — The Sun City',
    hindiName: 'जोधपुर (सूर्यनगरी)',
    type: 'fort',
    category: 'Palaces & Forts',
    x: 22,
    y: 42,
    puppetType: 'king',
    puppetName: 'Raja Vikram Singh',
    greeting: 'Padharo Mhare Des! High atop Mehrangarh Fort!',
    lore: 'Imposing blue houses wrap around the 400-foot Mehrangarh Fort where court musicians sang balladic folk sagas to royal audiences.',
    vocab: { hindi: 'दुर्ग', pronunciation: 'Durg', english: 'Fortress / Citadel' },
    imageSymbol: '🏰',
  },
  {
    id: 'udaipur',
    name: 'Udaipur — City of Lakes',
    hindiName: 'उदयपुर (झीलों की नगरी)',
    type: 'lake',
    category: 'Story Trails',
    x: 26,
    y: 58,
    puppetType: 'dancer',
    puppetName: 'Ghoomar Kalakar',
    greeting: 'Dance along Lake Pichola’s glittering waters!',
    lore: 'Home to Bagore Ki Haveli, hosting world-famous evening Kathputli puppet theatre performances right by the water edge.',
    vocab: { hindi: 'झील', pronunciation: 'Jheel', english: 'Lake' },
    imageSymbol: '🌊',
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer — Golden Desert',
    hindiName: 'जैसलमेर (स्वर्ण नगरी)',
    type: 'desert',
    category: 'Story Trails',
    x: 12,
    y: 40,
    puppetType: 'child',
    puppetName: 'Chhoti Anandi',
    greeting: 'Sunsets over Thar Sand Dunes & Sonar Quila!',
    lore: 'Golden sandstone architecture glows like pure gold under desert sunsets where folk poets string puppet sagas of desert caravans.',
    vocab: { hindi: 'मरुस्थल', pronunciation: 'Marusthal', english: 'Desert' },
    imageSymbol: '🐪',
  },
  {
    id: 'pushkar',
    name: 'Pushkar — Sacred Lake & Fair',
    hindiName: 'पुष्कर (पवित्र सरोवर)',
    type: 'culture',
    category: 'Kathputli Guilds',
    x: 30,
    y: 48,
    puppetType: 'teacher',
    puppetName: 'Anvesha Teacher',
    greeting: 'Namaste from the ancient sacred lake of 52 Ghats!',
    lore: 'The legendary annual Pushkar Camel Fair brings together puppet artists, folk musicians, and storytellers from all across India.',
    vocab: { hindi: 'मेला', pronunciation: 'Mela', english: 'Festival Fair' },
    imageSymbol: '🛕',
  },
  {
    id: 'bikaner',
    name: 'Bikaner — Puppet Art Guild',
    hindiName: 'बीकानेर (कठपुतली कला)',
    type: 'craft',
    category: 'Kathputli Guilds',
    x: 22,
    y: 30,
    puppetType: 'storyteller',
    puppetName: 'Master Usta Artisan',
    greeting: 'Discover woodcarving & vibrant hand-stitched fabrics!',
    lore: 'Famous for Junagarh Fort and master craftsmen who carve light mango wood heads and stitch hand-dyed bandhani ghagras for puppets.',
    vocab: { hindi: 'कठपुतली', pronunciation: 'Kathputli', english: 'Wooden Puppet' },
    imageSymbol: '🎨',
  },
];

export default function IndiaMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(LANDMARKS[0]);
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Palaces & Forts', 'Story Trails', 'Kathputli Guilds'];

  const filteredLandmarks = LANDMARKS.filter(
    (l) => activeCategory === 'All' || l.category === activeCategory
  );

  const handleLandmarkHover = (landmark: Landmark) => {
    setHoveredLandmark(landmark);
    triggerGhungroo();
  };

  const handleLandmarkClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    triggerGhungroo();
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              triggerGhungroo();
            }}
            className={`px-4 py-2 text-xs font-sans uppercase tracking-widest rounded-full transition-all border ${
              activeCategory === cat
                ? 'bg-gold text-charcoal border-gold font-bold shadow-[0_0_15px_rgba(200,154,75,0.4)]'
                : 'bg-maroon/30 text-sand/80 border-gold/30 hover:border-gold hover:text-ivory'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Map Stage Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-maroon/20 via-charcoal to-deep-maroon/30 border-2 border-gold/40 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(200,154,75,0.8)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Left Column: Interactive Map Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative w-full aspect-[4/3] flex items-center justify-center bg-charcoal/60 rounded-xl border border-gold/20 p-4 shadow-inner overflow-hidden">
          {/* Custom Stylized India & Rajasthan SVG Vector Map */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(200,154,75,0.2)]"
          >
            {/* India Country Outer Outline Stylized Path */}
            <path
              d="M 30,12 Q 38,5 48,10 Q 55,15 65,12 Q 78,10 82,22 Q 88,35 80,48 Q 85,58 75,68 Q 65,80 50,92 Q 38,85 30,72 Q 22,60 25,48 Q 12,42 10,28 Q 18,22 30,12 Z"
              fill="#261218"
              stroke="#C89A4B"
              strokeWidth="0.8"
              strokeDasharray="2 1"
              className="opacity-60"
            />

            {/* Rajasthan State Highlighted Region */}
            <path
              d="M 12,28 Q 22,25 38,28 Q 42,38 36,55 Q 24,62 16,50 Q 10,40 12,28 Z"
              fill="#5A1726"
              stroke="#C89A4B"
              strokeWidth="1.2"
              className="transition-colors hover:fill-[#721c30] cursor-pointer"
            />
            <text
              x="25"
              y="26"
              fontSize="3.2"
              fill="#E8D5B5"
              fontFamily="serif"
              fontStyle="italic"
              letterSpacing="0.2"
              className="pointer-events-none opacity-80"
            >
              RAJASTHAN
            </text>

            {/* Other India Regions labels */}
            <text x="50" y="32" fontSize="2.8" fill="#C89A4B" opacity="0.4" fontFamily="sans-serif">
              NORTH INDIA
            </text>
            <text x="45" y="65" fontSize="3" fill="#C89A4B" opacity="0.3" fontFamily="sans-serif">
              DECCAN
            </text>

            {/* Landmark Connecting Lines */}
            {filteredLandmarks.map((lm) => (
              <line
                key={`line-${lm.id}`}
                x1={lm.x}
                y1={lm.y}
                x2={selectedLandmark?.id === lm.id ? 80 : lm.x}
                y2={selectedLandmark?.id === lm.id ? 80 : lm.y}
                stroke="#C89A4B"
                strokeWidth="0.3"
                strokeDasharray="1 1"
                className="opacity-40"
              />
            ))}

            {/* Landmark Interactive Pins */}
            {filteredLandmarks.map((lm) => {
              const isSelected = selectedLandmark?.id === lm.id;
              const isHovered = hoveredLandmark?.id === lm.id;

              return (
                <g
                  key={lm.id}
                  transform={`translate(${lm.x}, ${lm.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => handleLandmarkHover(lm)}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  onClick={() => handleLandmarkClick(lm)}
                >
                  {/* Glowing Pulse Ring */}
                  <circle
                    r={isSelected || isHovered ? '4.5' : '2.5'}
                    fill="none"
                    stroke={isSelected ? '#C96F7B' : '#C89A4B'}
                    strokeWidth="0.6"
                    className="animate-ping origin-center opacity-70"
                  />

                  {/* Pin Base Circle */}
                  <circle
                    r={isSelected ? '3.5' : '2.5'}
                    fill={isSelected ? '#C96F7B' : '#C89A4B'}
                    stroke="#1B1714"
                    strokeWidth="0.5"
                    className="transition-all"
                  />

                  {/* Pin Symbol Icon */}
                  <text
                    x="0"
                    y="1"
                    fontSize="2.5"
                    textAnchor="middle"
                    className="select-none pointer-events-none"
                  >
                    {lm.imageSymbol}
                  </text>

                  {/* Hover Speech Pin Label */}
                  <text
                    x="0"
                    y="-4"
                    fontSize="2.2"
                    fill="#F7EFE2"
                    fontFamily="serif"
                    textAnchor="middle"
                    className="pointer-events-none font-semibold shadow-sm"
                  >
                    {lm.name.split(' — ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Emerging Hover Kathputli Character Floating Card */}
          <AnimatePresence>
            {hoveredLandmark && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="absolute z-30 bottom-4 left-4 right-4 bg-charcoal/95 border-2 border-gold p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex items-center gap-4 backdrop-blur pointer-events-none"
              >
                <div className="shrink-0 -mt-8">
                  <Kathputli type={hoveredLandmark.puppetType} scale={0.65} interactive={false} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-gold text-lg font-bold">
                      {hoveredLandmark.name}
                    </span>
                    <span className="text-xs bg-maroon text-ivory px-2 py-0.5 rounded border border-gold/40">
                      {hoveredLandmark.hindiName}
                    </span>
                  </div>
                  <p className="font-serif italic text-sand text-xs mt-1">
                    "{hoveredLandmark.greeting}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Selected Landmark Details & Marionette Greeting (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-charcoal/80 border border-gold/30 rounded-xl p-6 relative">
          {selectedLandmark ? (
            <motion.div
              key={selectedLandmark.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-gold/20 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-gold font-semibold">
                    {selectedLandmark.category}
                  </span>
                  <h3 className="font-serif text-2xl text-ivory font-bold mt-1">
                    {selectedLandmark.name}
                  </h3>
                  <p className="font-serif italic text-sand/80 text-sm">{selectedLandmark.hindiName}</p>
                </div>
                <div className="text-3xl bg-maroon/40 p-2 rounded-lg border border-gold/30">
                  {selectedLandmark.imageSymbol}
                </div>
              </div>

              {/* Emerging Kathputli Puppet Showcase */}
              <div className="my-2 p-4 bg-gradient-to-r from-maroon/30 to-deep-maroon/50 rounded-lg border border-gold/30 flex items-center justify-between shadow-inner">
                <div className="flex-1 pr-2">
                  <span className="text-[10px] uppercase tracking-widest text-raj-pink font-semibold">
                    {selectedLandmark.puppetName} Says:
                  </span>
                  <p className="font-serif italic text-ivory text-sm mt-1 leading-snug">
                    "{selectedLandmark.greeting}"
                  </p>
                  <p className="text-[11px] text-gold/80 mt-2 font-sans">
                    ✨ Click puppet for marionette bow!
                  </p>
                </div>
                <div className="shrink-0">
                  <Kathputli type={selectedLandmark.puppetType} scale={0.8} />
                </div>
              </div>

              {/* Story Lore */}
              <div className="mt-3 text-xs md:text-sm font-sans font-light text-sand/80 leading-relaxed">
                {selectedLandmark.lore}
              </div>

              {/* Cultural Vocabulary Card */}
              <div className="mt-auto pt-4 border-t border-gold/20">
                <span className="text-[10px] uppercase tracking-widest text-sand/60">
                  Cultural Word of the Region
                </span>
                <div className="flex items-center justify-between mt-1 bg-black/40 px-3 py-2 rounded border border-gold/30">
                  <div>
                    <span className="font-serif text-gold font-bold text-base mr-2">
                      {selectedLandmark.vocab.hindi}
                    </span>
                    <span className="text-xs text-sand/70 italic">
                      ({selectedLandmark.vocab.pronunciation})
                    </span>
                  </div>
                  <span className="text-xs font-sans text-ivory font-semibold bg-maroon/60 px-2 py-0.5 rounded">
                    {selectedLandmark.vocab.english}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-sand/60 py-12">
              <GlassEmoji emoji="📍" size="2xl" variant="gold" className="mb-3" />
              <p className="font-serif text-lg">Select any landmark on the map to begin!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
