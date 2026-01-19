import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Check if configuration exists
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing. Please check your .env file.');
      setStatus('error');
      alert('Email service configuration is missing. Please check the console.');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Surya', // Default to portfolio owner
        },
        publicKey
      );

      console.log('Email sent successfully');
      setStatus('success');

      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1f3a]/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-sm text-green-400 mb-3 px-4 py-2 border border-green-400/30 rounded-full">
            {'>'} contact.submit()
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 break-words">
            Get In <span className="text-green-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-4 break-words">
            Have a project that needs quality assurance expertise? Let's discuss how I can help
            ensure your software meets the highest standards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#151b35]/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover-lift glow-on-hover"
        >
          <div className="font-mono text-xs text-gray-500 mb-6">
            [TICKET_SUBMISSION_FORM]
          </div>

          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-2 break-words">Message Sent Successfully!</h3>
              <p className="text-sm sm:text-base text-gray-300 break-words">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>
              <div className="font-mono text-xs text-gray-500 mt-4 animate-pulse">
                [STATUS: DELIVERED]
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  <span className="text-green-400">$</span> Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-gray-700 rounded-lg focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 text-white transition-all duration-300 hover:border-gray-600"
                  placeholder="Enter your name"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  <span className="text-blue-400">$</span> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 text-white transition-all duration-300 hover:border-gray-600"
                  placeholder="your.email@example.com"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  <span className="text-purple-400">$</span> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-gray-700 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 text-white transition-all duration-300 resize-none hover:border-gray-600"
                  placeholder="Describe your project or inquiry..."
                  disabled={status === 'submitting'}
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400">
                    Failed to send message. Please try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Ticket...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    Submit Message
                  </>
                )}
              </button>

              <div className="font-mono text-xs text-gray-500 text-center animate-pulse">
                [PRIORITY: NORMAL] [SLA: 24h response time]
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
