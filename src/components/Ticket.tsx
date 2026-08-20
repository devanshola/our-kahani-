import { motion } from 'framer-motion';

interface TicketProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onClick?: () => void;
}

export default function Ticket({ title, subtitle, buttonText, onClick }: TicketProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href="https://wa.me/918840725262?text=Hi%20Anvesha!%20I%20saw%20your%20website%20and%20I%27d%20love%20to%20book%20a%20free%20class%20for%20my%20child"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center justify-center p-8 border-2 border-gold/50 bg-charcoal/80 overflow-hidden cursor-pointer shadow-2xl max-w-md w-full mx-auto"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-r-2 border-b-2 border-gold/50 rounded-br-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-gold/50 rounded-bl-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-gold/50 rounded-tr-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-t-2 border-gold/50 rounded-tl-lg" />

      {/* Ticket pattern */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(200,154,75,0.3)_4px,rgba(200,154,75,0.3)_8px)]" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(200,154,75,0.3)_4px,rgba(200,154,75,0.3)_8px)]" />

      <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-2 text-center">{title}</h3>
      <p className="font-sans text-sm md:text-base text-gold/80 mb-6 text-center">{subtitle}</p>

      <div className="px-6 py-2 border border-maroon bg-maroon/20 text-ivory uppercase tracking-widest text-sm font-sans transition-colors hover:bg-maroon/40">
        {buttonText}
      </div>

      <div className="mt-6 flex gap-4 text-xs font-serif italic text-sand/60">
        <span>Kahaanii</span>
        <span>·</span>
        <span>Ghar Tak</span>
      </div>
    </motion.a>
  );
}
