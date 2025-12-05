import { Bug, Download, Mail, Loader, Zap, Code2 } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)`,
          transform: `translateY(${scanLine}vh)`,
          height: '2px',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-green-500/20 to-transparent rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl opacity-30" />

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
        <div className="flex justify-center items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-green-400" />
          <span className="font-mono text-sm text-green-400 tracking-widest uppercase">Quality Engineer</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-green-400" />
        </div>

        <div className="relative inline-block mb-12 group animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />
          <div className="w-56 h-56 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1 group-hover:scale-110 transition-transform duration-300 relative">
            <div className="w-full h-full rounded-full bg-[#0a0e27] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full" />
              <Bug className="w-24 h-24 text-green-400 animate-float relative z-10" />
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-green-300 via-blue-400 to-green-300 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '200ms' }}>
          {heroContent.headline}
        </h1>

        <div className="h-1 w-24 mx-auto mb-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />

        <div className="font-mono text-green-400 text-xs mb-8 tracking-widest uppercase animate-fade-in" style={{ animationDelay: '300ms' }}>
          &lt;qa_engineer status="<span className="text-blue-400 animate-pulse">active</span>" /&gt;
        </div>

        <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-gray-200 leading-tight animate-fade-in" style={{ animationDelay: '400ms' }}>
          {heroContent.subheadline}
        </h2>

        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '500ms' }}>
          {heroContent.description}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center animate-fade-in mb-16" style={{ animationDelay: '600ms' }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              {heroContent.cta_text}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <button className="group px-8 py-4 border-2 border-green-500 rounded-lg font-semibold text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            {heroContent.cta_button_text}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors">
            <Code2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="font-mono text-xs text-gray-400">Automation</div>
          </div>
          <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-mono text-xs text-gray-400">Performance</div>
          </div>
          <div className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
            <Bug className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="font-mono text-xs text-gray-400">Quality</div>
          </div>
        </div>

        <div className="font-mono text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>System Status: All Tests Passing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
