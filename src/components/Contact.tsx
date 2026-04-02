import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const SUBJECTS = [
  { value: 'collaboration', label: 'Project Collaboration' },
  { value: 'opportunity',   label: 'Job Opportunity' },
  { value: 'consulting',    label: 'Consulting / Freelance' },
  { value: 'general',       label: 'General Inquiry' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'collaboration',
    message: '',
    website: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🛡️ HONEYPOT CHECK: If the 'website' field is filled, it's a bot.
    if (formData.website) {
      console.warn('Bot detected via honeypot.');
      setStatus('submitting');
      // Simulate a success to trick the bot into thinking it succeeded
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'collaboration', message: '', website: '' });
      }, 1000);
      return;
    }

    setStatus('submitting');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name:  formData.name,
        from_email: formData.email,
        message:    `[${SUBJECTS.find(s => s.value === formData.subject)?.label}]\n\n${formData.message}`,
        to_name:    'Surya',
      }, publicKey);

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: 'collaboration', message: '', website: '' });
      }, 5000);
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-sm ' +
    'bg-[#FFFFFF] border border-[#E5E7EB] text-[#0F172A] placeholder-[#94A3B8] ' +
    'focus:border-[#4CAF7A] focus:ring-[rgba(76,175,122,0.12)] ' +
    'dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-[#E5E7EB] dark:placeholder-[#4B5563] ' +
    'dark:focus:border-[#22C55E] dark:focus:ring-[rgba(34,197,94,0.12)]';

  const labelClass = 'block text-xs font-semibold text-[#0F172A] dark:text-[#9CA3AF] uppercase tracking-widest mb-2';

  return (
    <section id="contact" className="py-24 px-6 relative bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-primary">
            Get in <span className="text-accent-primary">Touch</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-primary mx-auto mb-5" />
          <p className="text-sm sm:text-base text-secondary max-w-md mx-auto">
            Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          {status === 'success' ? (
            <div className="bg-[#EEFAF3] dark:bg-[rgba(34,197,94,0.08)] border border-[#CFE5D8] dark:border-[rgba(34,197,94,0.25)] rounded-2xl p-10 text-center">
              <CheckCircle className="w-12 h-12 text-[#4CAF7A] dark:text-[#22C55E] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-sm text-secondary">Thanks for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 🛡️ HONEYPOT FIELD (Hidden) */}
              <div className="hidden">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Name <span className="text-[#EF4444]">*</span>
                    </span>
                  </label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                    className={inputClass}
                    placeholder="Your name"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email <span className="text-[#EF4444]">*</span>
                    </span>
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className={labelClass}>Subject</label>
                <div className="relative">
                  <select
                    id="subject" name="subject"
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                    disabled={status === 'submitting'}
                    style={{ colorScheme: 'light dark' }}
                  >
                    {SUBJECTS.map(s => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-[#FFFFFF] dark:bg-[#111827] text-[#0F172A] dark:text-[#E5E7EB] py-2"
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4CAF7A] dark:text-[#22C55E]" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> Message <span className="text-[#EF4444]">*</span>
                  </span>
                </label>
                <textarea
                  id="message" name="message"
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  required rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project or how I can help..."
                  disabled={status === 'submitting'}
                />
              </div>

              {status === 'error' && (
                <div className="bg-[#FEF2F2] dark:bg-[rgba(239,68,68,0.08)] border border-[#FCA5A5] dark:border-[rgba(239,68,68,0.25)] rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#DC2626] dark:text-[#EF4444] shrink-0" />
                  <p className="text-sm text-[#DC2626] dark:text-[#EF4444]">Something went wrong. Please try again or email me directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]
                  bg-[#4CAF7A] hover:bg-[#22C55E] text-white shadow-[0_4px_14px_rgba(76,175,122,0.28)] hover:shadow-[0_6px_20px_rgba(76,175,122,0.44)]
                  dark:bg-[#22C55E] dark:hover:bg-[#16A34A] dark:text-[#0F172A] dark:shadow-[0_4px_14px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_8px_24px_rgba(34,197,94,0.5)]"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white dark:border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

