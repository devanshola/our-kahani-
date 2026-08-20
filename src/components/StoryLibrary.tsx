import { motion } from 'framer-motion';

export default function StoryLibrary() {
  const books = [
    { title: "Ramayan", color: "bg-terra/80" },
    { title: "Mahabharat", color: "bg-maroon/80" },
    { title: "Panchatantra", color: "bg-royal/80" },
    { title: "Freedom Fighters", color: "bg-gold/80" },
    { title: "Festivals", color: "bg-raj-pink/80" },
    { title: "Ancient India", color: "bg-sand/80 text-charcoal" },
  ];

  return (
    <section id="story-library" className="py-24 border-b border-gold/20 relative">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-ivory">
          The <span className="italic text-gold">Story Stage</span>
        </h2>
        <p className="font-sans font-light text-lg text-sand/80 mb-24">Every story brings them closer to home.</p>

        {/* Wooden Shelf */}
        <div className="relative border-b-8 border-terra/40 pt-16 flex flex-wrap justify-center gap-4 md:gap-8 items-end px-8">
          {books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              {/* Puppet string */}
              <div className="absolute -top-16 left-1/2 w-px h-16 bg-white/20 origin-top transform -translate-x-1/2 group-hover:scale-y-110 transition-transform" />
              
              {/* Book spine */}
              <div className={`w-12 md:w-16 h-40 md:h-48 ${book.color} rounded-sm border border-black/20 shadow-lg flex items-center justify-center p-2`}>
                <span className="writing-vertical font-serif tracking-widest text-sm md:text-base rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  {book.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
