import { Bug, Download, Mail, Loader } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { fetchHeroContent, HeroContent } from '../lib/supabase';
import { motion } from 'framer-motion';
import GlitchTypewriter from './GlitchTypewriter';

const defaultHeroContent: HeroContent = {
  id: 'default',
  headline: 'Surya Joshi',
  subheadline: 'QA Engineer',
  description: 'Transforming complex systems into reliable software through manual testing, automation frameworks, and strategic quality engineering',
  cta_text: 'Get In Touch',
  cta_button_text: 'Download Resume',
};

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);

  const typewriterTexts = useMemo(() => [heroContent.headline, heroContent.subheadline], [heroContent.headline, heroContent.subheadline]);

  useEffect(() => {
    const loadHeroContent = async () => {
      const data = await fetchHeroContent();
      if (data) {
        setHeroContent(data);
      }
      setLoading(false);
    };

    loadHeroContent();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[#0a0e27]" />
        <div className="relative z-10">
          <Loader className="w-12 h-12 text-green-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-[#0a0e27]">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27] to-[#0a0e27] z-[1]" />

      {/* Hero Diagnostic UI */}
      <div className="absolute inset-0 pointer-events-none p-10 font-mono text-[10px] text-green-500/30 z-20 hidden md:block">
        <div className="absolute top-10 left-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
            <span className="tracking-widest">ENCRYPTION: AES-256</span>
          </div>
          <div className="flex items-center gap-2 text-green-500/30">
            <Bug size={12} />
            <span>LATENCY: 12ms</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-10">
          <div className="flex items-center gap-2 mb-2">

          </div>
          <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['20%', '99%', '20%'] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="h-full bg-green-500/20"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative inline-block mb-12 group"
        >
          <div className="relative w-48 h-48 mx-auto">
            {/* Tech Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-green-500/10 animate-spin-slow animate-glow-pulse" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-green-400/10 to-blue-500/10 backdrop-blur-xl border border-white/5 p-1 group-hover:scale-105 transition-all duration-500 animate-glow-pulse">
              <div className="w-full h-full rounded-full bg-[#0a0e27]/90 flex items-center justify-center shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]">
                <Bug className="w-24 h-24 text-green-500 transition-all duration-500 group-hover:filter group-hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] zoom-animation animate-icon-glow" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full min-h-[1.5em] mb-8 flex justify-center items-center px-4">
          <GlitchTypewriter
            texts={typewriterTexts}
            className="text-3xl sm:text-6xl md:text-8xl font-black bg-gradient-to-b from-white via-gray-300 to-gray-400 bg-clip-text text-transparent tracking-tighter text-center"
            speed={70}
            waitTime={3000}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4 whitespace-pre-wrap break-words overflow-wrap-anywhere"
        >
          {heroContent.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center px-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-green-500 text-black rounded-xl font-black text-base sm:text-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="truncate">{heroContent.cta_text}</span>
            </span>
          </a>

          <a
            href="/Surya_CV.pdf"
            download="Surya_CV.pdf"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-green-500/50 text-green-400 rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 backdrop-blur-md group"
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce flex-shrink-0" />
            <span className="truncate">{heroContent.cta_button_text}</span>
          </a>
        </motion.div>
      </div>

      {/* Decorative Radar Overlay */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-green-500/10 rounded-full hidden lg:flex items-center justify-center opacity-30">
        <Bug size={20} className="text-green-500 animate-spin-slow" />
        <div className="absolute inset-0 border border-t-green-500/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
      </div>
    </section>
  );
}
