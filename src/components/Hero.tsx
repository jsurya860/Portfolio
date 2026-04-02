import React, { useEffect, useState } from 'react';
import { Loader, Terminal, Download, ArrowRight } from 'lucide-react';
import HeroPipeline from './HeroPipeline';
import { fetchHeroContent, HeroContent } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const defaultHeroContent: HeroContent = {
  id: 'default',
  headline: 'Surya Joshi',
  subheadline: 'QA Engineer',
  description: 'Transforming complex systems into reliable software through manual testing, automation frameworks, and strategic quality engineering',
  cta_text: 'Get in Touch',
  cta_button_text: 'Download CV',
};

// ─── Magnetic Effect Component ───────────────────────────────────────────────
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

const STATUS_LINES = [
  { sym: '▶', text: 'Running test suite...', hex: '#22c55e' },
  { sym: '⚠', text: 'Detecting defects...', hex: '#f59e0b' },
  { sym: '⚡', text: 'Executing automation...', hex: '#38bdf8' },
  { sym: '✓', text: 'Delivering quality...', hex: '#22c55e' },
  { sym: '◉', text: 'QA Gate: Approved', hex: '#22c55e' },
];

const LOG_LINES = [
  { sym: '$', text: 'qa run --suite all --env prod', hex: '#9CA3AF' },
  { sym: '✓', text: 'Unit tests: 127 passed', hex: '#22c55e' },
  { sym: '✓', text: 'Integration: 43 passed', hex: '#22c55e' },
  { sym: '✗', text: 'Bug #247: null ref in payment', hex: '#ef4444' },
  { sym: '⚙', text: 'Hotfix applied, retrying...', hex: '#f59e0b' },
  { sym: '✓', text: 'Bug #247 resolved', hex: '#22c55e' },
  { sym: '✓', text: 'QA Gate: APPROVED', hex: '#22c55e' },
  { sym: '→', text: 'Deploying to production...', hex: '#38bdf8' },
  { sym: '✓', text: 'v2.4.1 LIVE', hex: '#22c55e' },
];

const STATS = [
  { label: 'Test Coverage', value: 92, suffix: '%', hex: '#4CAF7A' },
  { label: 'Bugs Resolved', value: 150, suffix: '+', hex: '#3B82F6' },
  { label: 'Automation', value: 40, suffix: '%↑', hex: '#6366F1' },
];

// ─── Scrolling terminal log ────────────────────────────────────────────────────
const VISIBLE_LOG = 5;

function TerminalLog() {
  const [count, setCount] = useState(0);
  const timersRef = { current: [] as ReturnType<typeof setTimeout>[] };

  const clear = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const startSeq = (delay = 0) => {
    clear();
    setCount(0);
    LOG_LINES.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setCount(i + 1), delay + i * 700));
    });
    timersRef.current.push(setTimeout(() => startSeq(500), delay + LOG_LINES.length * 700 + 2500));
  };

  useEffect(() => { startSeq(1200); return clear; }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const start = Math.max(0, count - VISIBLE_LOG);
  const shownIndices = Array.from({ length: count - start }, (_, i) => start + i);

  return (
    <div className="min-h-[7rem] space-y-1.5">
      <AnimatePresence initial={false}>
        {shownIndices.map((absIdx) => (
          <motion.div
            key={absIdx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-2"
          >
            <span className="w-3 shrink-0 text-center text-xs" style={{ color: LOG_LINES[absIdx].hex }}>
              {LOG_LINES[absIdx].sym}
            </span>
            <span className="font-mono text-xs text-[#475569] dark:text-[#9CA3AF]">
              {LOG_LINES[absIdx].text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Animated count-up ─────────────────────────────────────────────────────────
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 600);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to]);
  return <>{val}{suffix}</>;
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);
  const [statusIdx, setStatusIdx] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    fetchHeroContent().then(data => { if (data) setHeroContent(data); setLoading(false); });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStatusIdx(i => (i + 1) % STATUS_LINES.length), 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursor(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  const status = STATUS_LINES[statusIdx];

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
        <Loader className="w-10 h-10 text-[#22c55e] animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] px-4 sm:px-6">

      {/* ── Background: dot grid + directional gradient overlay ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--grid-dot-color) 1.2px, transparent 1.2px), ' +
            'linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), ' +
            'linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 32px 32px, 32px 32px',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, var(--bg-overlay-start) 0%, var(--bg-overlay-end) 100%)',
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none z-[1] opacity-20 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none z-[1] opacity-15 dark:opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full items-center">

          {/* ── LEFT: Identity ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit
              border border-[#CFE5D8] bg-[#DCEFE4] text-[#4CAF7A]
              dark:border-[rgba(34,197,94,0.25)] dark:bg-[rgba(34,197,94,0.10)] dark:text-[#22C55E]
              transition-colors duration-350"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF7A] dark:bg-[#22C55E] animate-pulse" />
              <span className="text-[10px] font-mono font-semibold tracking-widest uppercase">
                QA System · Online
              </span>
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span
                  className="bg-gradient-to-r from-[#4CAF7A] via-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {heroContent.headline}
                </span>
                <span
                  className="inline-block w-[3px] h-[0.85em] bg-[#4CAF7A] dark:bg-[#22C55E] ml-1 align-middle"
                  style={{ opacity: cursor ? 1 : 0, transition: 'opacity 0.08s' }}
                  aria-hidden="true"
                />
              </h1>
              <div className="mt-2 text-base sm:text-lg font-mono font-semibold text-[#2563EB] dark:text-[#3B82F6] tracking-wide">
                {heroContent.subheadline}
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono text-sm rounded-xl px-4 py-2.5 w-fit max-w-xs overflow-hidden
              border border-[#E5E7EB] bg-[#F1F5F9]
              dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]
              glass-card backdrop-blur-sm transition-colors duration-350"
            >
              <Terminal className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap"
                  style={{ color: status.hex }}
                >
                  {status.sym} {status.text}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-sm sm:text-base text-[#475569] dark:text-[#9CA3AF] leading-relaxed max-w-md">
              {heroContent.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm active:scale-95
                    bg-[#4CAF7A] hover:bg-[#22C55E] text-white
                    dark:bg-[#22C55E] dark:hover:bg-[#16A34A] dark:text-[#0F172A]
                    shadow-[0_4px_14px_rgba(76,175,122,0.28)] hover:shadow-[0_6px_20px_rgba(76,175,122,0.44)]
                    dark:shadow-[0_4px_14px_rgba(34,197,94,0.30)] dark:hover:shadow-[0_6px_20px_rgba(34,197,94,0.50)]
                    transition-all duration-300 w-full sm:w-auto"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/assets/docs/surya-cv.pdf"
                  download="surya-cv.pdf"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm
                    border border-[#2563EB]/50 text-[#2563EB] hover:bg-[#EFF6FF] hover:border-[#2563EB] hover:shadow-[0_4px_14px_rgba(37,99,235,0.18)]
                    dark:border-[#3B82F6]/40 dark:text-[#3B82F6] dark:hover:bg-[rgba(59,130,246,0.08)] dark:hover:border-[#3B82F6] dark:hover:shadow-[0_4px_14px_rgba(59,130,246,0.22)]
                    transition-all duration-300 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* ── RIGHT: Pipeline + Terminal + Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <HeroPipeline />

            <div className="rounded-2xl overflow-hidden
              border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)]
              dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
              backdrop-blur-sm transition-colors duration-350"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b
                border-[#E5E7EB] bg-[#F8FAFC]
                dark:border-[rgba(255,255,255,0.06)] dark:bg-[rgba(255,255,255,0.03)]
                transition-colors duration-350"
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                </div>
                <span className="text-[10px] font-mono text-[#64748B] dark:text-[#9CA3AF] tracking-widest uppercase ml-2">
                  qa_terminal · live
                </span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              </div>
              <div className="p-4 bg-[#FFFFFF] dark:bg-[rgba(255,255,255,0.02)]">
                <TerminalLog />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.1 }}
                  className="rounded-xl p-3 text-center
                    border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                    dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.03)] dark:shadow-none
                    transition-colors duration-350"
                >
                  <div className="text-lg sm:text-xl font-black font-mono" style={{ color: stat.hex }}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-mono text-[#64748B] dark:text-[#6B7280] mt-0.5 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
