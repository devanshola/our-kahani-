import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Puppet from './Puppet';
import GlassEmoji from './GlassEmoji';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function StorytellerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am the Kahaanii Storyteller. Do you have any questions about our magical classes?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oh my, it seems my strings are tangled! Please try asking again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-maroon/90 border-2 border-gold rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(200,154,75,0.5)] hover:bg-maroon transition-colors backdrop-blur-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <GlassEmoji emoji="🎭" size="lg" variant="gold" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 md:right-12 z-50 w-[90vw] max-w-sm bg-charcoal border-2 border-gold/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-maroon p-4 border-b border-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GlassEmoji emoji="🎭" size="md" variant="gold" />
                <div>
                  <h3 className="font-serif text-ivory text-lg">Ask the Storyteller</h3>
                  <p className="font-sans text-xs text-gold/80 uppercase tracking-widest">Kahaanii Guide</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-ivory/60 hover:text-ivory text-2xl leading-none">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[40vh] min-h-[30vh] space-y-4 bg-gradient-to-b from-charcoal to-[#1a1114]">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 text-sm font-sans font-light rounded-sm border ${
                    msg.role === 'user' 
                      ? 'bg-gold/10 border-gold/30 text-ivory' 
                      : 'bg-maroon/20 border-maroon/50 text-ivory'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="max-w-[85%] p-3 bg-maroon/20 border border-maroon/50 rounded-sm flex items-center gap-2">
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                   </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-[#150a0d] border-t border-gold/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me about our stories..."
                className="flex-1 bg-transparent border border-gold/30 rounded-sm px-3 py-2 text-ivory font-sans text-sm focus:outline-none focus:border-gold placeholder:text-sand/30"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-maroon text-ivory px-4 py-2 rounded-sm border border-gold/30 hover:bg-maroon/80 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
