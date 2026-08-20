import React from 'react';

interface GlassEmojiProps {
  emoji: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'inline';
  variant?: 'gold' | 'maroon' | 'royal' | 'subtle' | 'emerald';
  className?: string;
  glow?: boolean;
}

export const GlassEmoji: React.FC<GlassEmojiProps> = ({
  emoji,
  size = 'md',
  variant = 'gold',
  className = '',
  glow = true,
}) => {
  if (size === 'inline') {
    return (
      <span
        className={`inline-flex items-center justify-center px-2 py-0.5 mx-1 rounded-lg bg-gradient-to-b from-white/20 to-charcoal/80 border border-gold/30 shadow-sm hover:border-gold/60 transition-colors ${className}`}
      >
        <span className="select-none pointer-events-none transform hover:scale-105 transition-transform">
          {emoji}
        </span>
      </span>
    );
  }

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs rounded-md',
    sm: 'w-8 h-8 text-sm rounded-xl',
    md: 'w-10 h-10 text-base rounded-2xl',
    lg: 'w-12 h-12 text-xl rounded-2xl',
    xl: 'w-16 h-16 text-2xl rounded-3xl',
    '2xl': 'w-20 h-20 text-3xl rounded-3xl',
    '3xl': 'w-24 h-24 text-4xl rounded-[2rem]',
  };

  const variantClasses = {
    gold: 'bg-gradient-to-br from-gold/30 via-charcoal/80 to-maroon/40 border-gold/40 text-sand',
    maroon: 'bg-gradient-to-br from-maroon/50 via-charcoal/80 to-charcoal border-gold/30 text-sand',
    royal: 'bg-gradient-to-br from-royal/50 via-charcoal/80 to-charcoal border-gold/30 text-sand',
    subtle: 'bg-white/10 via-charcoal/60 to-charcoal/80 border-white/20 text-ivory',
    emerald: 'bg-gradient-to-br from-emerald-900/50 via-charcoal/80 to-charcoal border-emerald-400/40 text-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center justify-center border shadow-md transition-transform duration-200 backdrop-blur-xs ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${
        glow ? 'hover:border-gold/80 hover:scale-105' : ''
      } ${className}`}
    >
      <span className="select-none pointer-events-none">
        {emoji}
      </span>
    </span>
  );
};

export default GlassEmoji;

