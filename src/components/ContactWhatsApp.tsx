import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassEmoji from './GlassEmoji';
import SocialFollow from './SocialFollow';

export default function ContactWhatsApp() {
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [selectedTopic, setSelectedTopic] = useState<string>('trial');
  const [parentName, setParentName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [childAge, setChildAge] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  
  // Email Submission states
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailMessageStatus, setEmailMessageStatus] = useState<string>('');

  const rawPhone = '918840725262';
  const displayPhone = '+91 88407 25262';
  const primaryEmail = 'thekahaaniii@gmail.com';
  const ccEmail = 'devanshhola@gmail.com';

  const topics = [
    {
      id: 'trial',
      title: 'Free 1-on-1 Trial Class',
      icon: '🎭',
      desc: 'Book a free live trial session for your child or yourself',
      defaultMsg: (name: string, age: string) =>
        `Hi Anvesha! Namaste 🙏 My name is ${name || 'a parent'}.${
          age ? ` I am looking for a class for my ${age}-year-old child.` : ''
        } I would love to book a free 1-on-1 trial class with Kahaanii.`,
    },
    {
      id: 'adults',
      title: 'Adult Learners & Heritage Hindi',
      icon: '🪔',
      desc: 'Conversational Hindi, family connections & literary appreciation',
      defaultMsg: (name: string) =>
        `Namaste Anvesha! My name is ${name || 'a learner'}. I am interested in the Adult & Heritage Hindi course to improve my conversational confidence.`,
    },
    {
      id: 'travel',
      title: 'Travellers & Cultural Immersion',
      icon: '🧭',
      desc: 'Essential travel Hindi, regional etiquette & heritage guidance',
      defaultMsg: (name: string) =>
        `Hello Anvesha! I am planning a trip to India and would like to prepare with practical travel Hindi and cultural guidance.`,
    },
    {
      id: 'custom',
      title: 'General Enquiry / Other Questions',
      icon: '💌',
      desc: 'Ask about schedule flexibilities, custom syllabus or group classes',
      defaultMsg: (name: string) =>
        `Hi Anvesha! ${name ? `I'm ${name}. ` : ''}I have a quick question regarding Kahaanii Ghar Tak: `,
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const buildWhatsAppLink = () => {
    let baseMsg = currentTopic.defaultMsg(parentName, childAge);
    if (customQuery.trim()) {
      baseMsg += `\n\nAdditional Details: ${customQuery.trim()}`;
    }
    const encoded = encodeURIComponent(baseMsg);
    return `https://wa.me/${rawPhone}?text=${encoded}`;
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(`[Kahaanii Enquiry] ${currentTopic.title} from ${parentName || 'Website Visitor'}`);
    let bodyText = `Namaste Anvesha,\n\n`;
    bodyText += `${currentTopic.defaultMsg(parentName, childAge)}\n\n`;
    if (customQuery.trim()) {
      bodyText += `Additional Notes:\n${customQuery.trim()}\n\n`;
    }
    bodyText += `Sender Contact Info:\n`;
    bodyText += `- Name: ${parentName || 'Not provided'}\n`;
    bodyText += `- Email: ${userEmail || 'Not provided'}\n`;
    bodyText += `- Phone/WhatsApp: ${userPhone || 'Not provided'}\n\n`;
    bodyText += `Sent via Kahaanii Ghar Tak Website`;

    const encodedBody = encodeURIComponent(bodyText);
    return `mailto:${primaryEmail}?cc=${ccEmail}&subject=${subject}&body=${encodedBody}`;
  };

  const handleSendEmailForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);
    setEmailMessageStatus('');

    const fullMessage = `${currentTopic.defaultMsg(parentName, childAge)}${
      customQuery.trim() ? `\n\nAdditional Details:\n${customQuery.trim()}` : ''
    }`;

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parentName,
          email: userEmail,
          phone: userPhone,
          topic: currentTopic.title,
          message: fullMessage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEmailSubmitted(true);
        setEmailMessageStatus(`Query successfully logged! A copy is routed to ${data.recipient || primaryEmail}.`);
      } else {
        setEmailMessageStatus('Notice: Server logged query. You can also send directly via your mail client.');
        setEmailSubmitted(true);
      }
    } catch {
      setEmailSubmitted(true);
      setEmailMessageStatus('Notice: Message prepared! Click "Send via Email App" below to complete sending.');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(displayPhone);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <section
      id="contact-whatsapp"
      className="py-20 md:py-28 bg-[#2A121A] text-ivory relative border-t-2 border-gold/40 overflow-hidden"
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-terra/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.3em] text-gold text-xs font-sans font-bold mb-3"
          >
            Direct Connect & Enquiries
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-ivory mb-4"
          >
            Connect with <span className="italic text-gold">Anvesha</span> via WhatsApp or Email
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-light text-sand/80 text-base md:text-lg"
          >
            Book a free trial class or ask a question. Choose your preferred channel below to reach us directly in Jaipur!
          </motion.p>

          {/* Toggle Switch: WhatsApp vs Email */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setChannel('whatsapp')}
              className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                channel === 'whatsapp'
                  ? 'bg-[#25D366] text-charcoal shadow-[0_0_20px_rgba(37,211,102,0.4)] scale-105'
                  : 'bg-charcoal/80 text-sand border border-gold/30 hover:border-gold'
              }`}
            >
              <GlassEmoji emoji="💬" size="xs" variant="emerald" glow={false} />
              <span>WhatsApp Direct</span>
            </button>

            <button
              onClick={() => setChannel('email')}
              className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                channel === 'email'
                  ? 'bg-gold text-charcoal shadow-[0_0_20px_rgba(200,154,75,0.4)] scale-105'
                  : 'bg-charcoal/80 text-sand border border-gold/30 hover:border-gold'
              }`}
            >
              <GlassEmoji emoji="✉️" size="xs" variant="gold" glow={false} />
              <span>Send via Email</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form Builder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-charcoal/90 border-2 border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
          >
            {channel === 'whatsapp' ? (
              <>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
                  <GlassEmoji emoji="💬" size="md" variant="emerald" />
                  <div>
                    <h3 className="font-serif text-xl text-ivory">Quick WhatsApp Message Builder</h3>
                    <p className="text-xs font-sans text-sand/70">Instant response from founder Anvesha Yadav</p>
                  </div>
                </div>

                {/* Step 1: Topic Selector */}
                <label className="block text-xs font-sans font-bold uppercase tracking-widest text-gold mb-3">
                  1. What would you like to connect about?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {topics.map((t) => {
                    const isActive = selectedTopic === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTopic(t.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                          isActive
                            ? 'bg-gold/15 border-gold text-ivory shadow-[0_0_15px_rgba(200,154,75,0.25)]'
                            : 'bg-maroon/20 border-gold/20 text-sand/80 hover:border-gold/50 hover:bg-maroon/40'
                        }`}
                      >
                        <GlassEmoji emoji={t.icon} size="sm" variant={isActive ? 'gold' : 'maroon'} className="shrink-0 mt-0.5" />
                        <div>
                          <div className="font-sans text-xs font-bold text-ivory">{t.title}</div>
                          <div className="text-[11px] font-sans text-sand/60 mt-0.5 leading-snug">{t.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step 2: Details Inputs */}
                <div className="space-y-4 mb-6">
                  <label className="block text-xs font-sans font-bold uppercase tracking-widest text-gold">
                    2. Customize your details (Optional)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-sand/80 mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {selectedTopic === 'trial' && (
                      <div>
                        <label className="block text-xs font-sans text-sand/80 mb-1">Child's Age (if applicable)</label>
                        <input
                          type="text"
                          placeholder="e.g. 8 years old"
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-sand/80 mb-1">Specific Question or Note</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for weekend sessions in US Eastern time..."
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>

                {/* Message Preview Box */}
                <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-gold/20 text-xs font-mono text-sand/90">
                  <span className="text-gold uppercase tracking-wider font-sans font-bold flex items-center gap-1.5 mb-1 text-[10px]">
                    <GlassEmoji emoji="📱" size="xs" variant="gold" glow={false} />
                    <span>WhatsApp Message Preview:</span>
                  </span>
                  <p className="whitespace-pre-line italic">
                    "{currentTopic.defaultMsg(parentName, childAge)}
                    {customQuery.trim() ? `\n\nAdditional Details: ${customQuery.trim()}` : ''}"
                  </p>
                </div>

                {/* Send WhatsApp CTA Button */}
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-charcoal font-sans font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] shadow-[0_0_25px_rgba(37,211,102,0.4)]"
                >
                  <GlassEmoji emoji="💬" size="sm" variant="emerald" glow={false} />
                  <span>Open WhatsApp & Send Message</span>
                </a>
              </>
            ) : (
              /* EMAIL ENQUIRY FORM */
              <form onSubmit={handleSendEmailForm}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
                  <GlassEmoji emoji="✉️" size="md" variant="gold" />
                  <div>
                    <h3 className="font-serif text-xl text-ivory">Direct Email Enquiry Form</h3>
                    <p className="text-xs font-sans text-sand/70">Sends directly to {primaryEmail}</p>
                  </div>
                </div>

                {emailSubmitted ? (
                  <div className="p-6 bg-maroon/40 border-2 border-gold rounded-2xl text-center space-y-4 my-4">
                    <GlassEmoji emoji="✨" size="xl" variant="gold" className="mx-auto" />
                    <h4 className="font-serif text-2xl text-gold">Query Received!</h4>
                    <p className="font-sans text-sm text-sand/90 leading-relaxed">
                      {emailMessageStatus || `Thank you! Your query has been logged and routed to ${primaryEmail} & ${ccEmail}.`}
                    </p>
                    <p className="text-xs font-sans text-sand/70">
                      You can also trigger your email app directly below with one click to ensure a instant delivery copy.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center">
                      <a
                        href={buildMailtoLink()}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>Send via Email App</span>
                        <GlassEmoji emoji="📩" size="xs" variant="gold" glow={false} />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailSubmitted(false);
                          setCustomQuery('');
                        }}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gold/30 text-sand text-xs font-sans uppercase hover:bg-gold/10"
                      >
                        Submit Another Query
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Topic Selection */}
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-gold mb-3">
                      1. Select Query Topic
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {topics.map((t) => {
                        const isActive = selectedTopic === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTopic(t.id)}
                            className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                              isActive
                                ? 'bg-gold/20 border-gold text-ivory font-bold'
                                : 'bg-maroon/20 border-gold/20 text-sand/80 hover:border-gold/40'
                            }`}
                          >
                            <span className="text-lg">{t.icon}</span>
                            <span className="text-xs font-sans">{t.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 mb-6">
                      <label className="block text-xs font-sans font-bold uppercase tracking-widest text-gold">
                        2. Your Contact Information
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans text-sand/80 mb-1">
                            Your Name <span className="text-gold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priya Sharma"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans text-sand/80 mb-1">
                            Your Email Address <span className="text-gold">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. priya@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans text-sand/80 mb-1">Phone / WhatsApp Number</label>
                          <input
                            type="tel"
                            placeholder="e.g. +1 (555) 019-2834"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                          />
                        </div>

                        {selectedTopic === 'trial' && (
                          <div>
                            <label className="block text-xs font-sans text-sand/80 mb-1">Child's Age (if applicable)</label>
                            <input
                              type="text"
                              placeholder="e.g. 7 years old"
                              value={childAge}
                              onChange={(e) => setChildAge(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-sans text-sand/80 mb-1">Your Message or Preferred Days/Time</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Write your question, preferred class times, or goals..."
                          value={customQuery}
                          onChange={(e) => setCustomQuery(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-maroon/30 border border-gold/30 text-ivory text-sm placeholder-sand/40 focus:outline-none focus:border-gold resize-none"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={sendingEmail}
                        className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gold hover:bg-gold/90 text-charcoal font-sans font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-[0_0_20px_rgba(200,154,75,0.4)] disabled:opacity-50 cursor-pointer"
                      >
                        {sendingEmail ? (
                          <span>Sending Email...</span>
                        ) : (
                          <>
                            <span>Send Query via Email</span>
                            <span>📩</span>
                          </>
                        )}
                      </button>

                      <a
                        href={buildMailtoLink()}
                        className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-gold/40 text-gold hover:bg-gold/10 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        title="Open default email client"
                      >
                        <span>Open Mail App</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </>
                )}
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Details & Email Notification Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Contact Box */}
            <div className="bg-charcoal/80 border border-gold/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <GlassEmoji emoji="✉️" size="lg" variant="gold" />
                <div>
                  <h4 className="font-serif text-lg text-ivory">Email Addresses</h4>
                  <p className="text-xs font-sans text-sand/60">Monitored daily by Anvesha & Devansh</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-maroon/30 border border-gold/20 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-sand/60 font-sans block uppercase tracking-wider">Primary Studio Email</span>
                    <a href={`mailto:${primaryEmail}`} className="font-mono text-xs sm:text-sm font-bold text-gold hover:underline break-all block mt-0.5">
                      {primaryEmail}
                    </a>
                  </div>
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gold/20 hover:bg-gold/30 border border-gold/40 text-xs font-sans text-ivory transition-colors flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
                  >
                    <span>Compose</span>
                    <GlassEmoji emoji="✉️" size="xs" variant="gold" glow={false} />
                  </a>
                </div>

                <div className="bg-maroon/30 border border-gold/20 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-sand/60 font-sans block uppercase tracking-wider">Secondary / Admin Inbox</span>
                    <a href={`mailto:${ccEmail}`} className="font-mono text-xs sm:text-sm font-bold text-sand/90 hover:underline break-all block mt-0.5">
                      {ccEmail}
                    </a>
                  </div>
                  <a
                    href={`mailto:${ccEmail}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gold/20 hover:bg-gold/30 border border-gold/40 text-xs font-sans text-ivory transition-colors flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
                  >
                    <span>Email</span>
                    <GlassEmoji emoji="✉️" size="xs" variant="gold" glow={false} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card 3: Phone & Location */}
            <div className="bg-charcoal/80 border border-gold/30 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-gold/15 pb-3 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <GlassEmoji emoji="📞" size="sm" variant="gold" />
                  <span className="font-mono text-xs sm:text-sm text-gold font-bold break-all">{displayPhone}</span>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1 rounded-lg bg-gold/15 text-xs text-sand hover:text-ivory border border-gold/30 shrink-0 cursor-pointer"
                >
                  {copySuccess ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>

              <div className="flex items-start gap-3">
                <GlassEmoji emoji="🏰" size="sm" variant="gold" className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-serif text-sm text-ivory">Studio Headquarters</h5>
                  <p className="text-xs font-sans text-sand/70 flex items-center gap-1.5 flex-wrap">
                    <span>Jaipur, Rajasthan, India</span>
                    <GlassEmoji emoji="🇮🇳" size="xs" variant="gold" glow={false} />
                    <span>(Online Global Classes)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-charcoal/80 border border-gold/30 rounded-3xl p-4 shadow-xl">
              <SocialFollow />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

