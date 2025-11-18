import { Bug, Download, Mail, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchHeroContent, HeroContent } from '../lib/supabase';

const defaultHeroContent: HeroContent = {
  id: 'default',
  headline: 'Surya',
  subheadline: 'Quality Assurance Engineer',
  description: 'Transforming complex systems into reliable software through manual testing, automation frameworks, and strategic quality engineering',
  cta_text: 'Get In Touch',
  cta_button_text: 'Download Resume',
};

export default function Hero() {
  const [scanLine, setScanLine] = useState(0);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]" />
        <div className="relative z-10">
          <Loader className="w-12 h-12 text-green-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)`,
          transform: `translateY(${scanLine}vh)`,
          height: '2px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-green-500 font-mono text-xs">
          [✓] Test Suite: PASSED
        </div>
        <div className="absolute top-40 right-20 text-red-500 font-mono text-xs">
          [✗] Bug ID: #2847
        </div>
        <div className="absolute bottom-32 left-1/4 text-blue-500 font-mono text-xs">
          [i] Coverage: 98.3%
        </div>
        <div className="absolute bottom-48 right-1/3 text-yellow-500 font-mono text-xs">
          [⚠] Security Scan: IN PROGRESS
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="relative inline-block mb-8 group">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#0a0e27] flex items-center justify-center text-6xl">
              <Bug className="w-20 h-20 text-green-400" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-100" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-clip-text text-transparent animate-gradient">
          {heroContent.headline}
        </h1>

        <div className="font-mono text-green-400 text-sm mb-6 tracking-wider">
          &lt;QA_Engineer status="active" /&gt;
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
          {heroContent.subheadline}
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {heroContent.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {heroContent.cta_text}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <button className="px-8 py-4 border-2 border-green-500 rounded-lg font-semibold text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center gap-2 group">
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            {heroContent.cta_button_text}
          </button>
        </div>

        <div className="mt-16 font-mono text-xs text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>System Status: All Tests Passing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
