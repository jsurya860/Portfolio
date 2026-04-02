import { GraduationCap, Award, Loader } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { fetchEducation, type Education } from '../lib/supabase';
import { motion, useScroll, useTransform } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Award,
};

const defaultTimeline: Education[] = [
  {
    id: '1',
    type: 'degree',
    title: 'Bachelor of Information Technology',
    subtitle: 'Computer Science',
    institution: 'Siddhanath Science Campus',
    date: '2021 - June 2025',
    version: 'v1.0',
    icon_type: 'GraduationCap',
    color: 'blue',
    display_order: 1,
  },
];

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    dot: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    dot: 'bg-purple-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    dot: 'bg-cyan-500',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    dot: 'bg-yellow-500',
  },
};

export default function Education() {
  const [timeline, setTimeline] = useState<Education[]>(defaultTimeline);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const loadEducation = async () => {
      const data = await fetchEducation();
      if (data && data.length > 0) {
        setTimeline(data);
      }
      setLoading(false);
    };

    loadEducation();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="education" ref={containerRef} className="py-24 px-6 relative bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 break-words text-[#0F172A] dark:text-[#E5E7EB]">
            Educational <span className="text-[#2563EB] dark:text-[#3B82F6]">Timeline</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-[#6366F1] dark:from-[#3B82F6] dark:to-[#6366F1] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line (Desktop: 50%, Mobile: Left) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 rounded-full bg-[#E2E8F0] dark:bg-[rgba(255,255,255,0.05)]" />

          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#22C55E] via-[#3B82F6] to-[#6366F1] dark:from-[#22C55E] dark:via-[#3B82F6] dark:to-[#6366F1] origin-top z-10"
          />

          <div className="space-y-16">
            {timeline.map((item, index) => {
              const colors = colorMap[item.color as keyof typeof colorMap] || colorMap.blue;
              const IconComponent = iconMap[item.icon_type] || Award;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Item Content Wrapper */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 md:top-8 w-8 h-8 flex items-center justify-center z-20">
                      <div className={`w-3 h-3 ${colors.dot} rounded-full border-2 border-[#F8FAFC] dark:border-[#0F172A] shadow-[0_0_10px_rgba(34,197,94,0.4)]`} />
                  </div>

                  {/* Card */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                      <div className={`group relative p-8 glass-card rounded-2xl hover:border-[var(--accent-secondary)] transition-all duration-400 hover:shadow-[0_8px_32px_var(--glow-blue)] hover:-translate-y-1.5`}>
                      <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#9CA3AF] dark:text-[#6B7280] tracking-widest uppercase">
                        {item.type}
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-xl ${colors.bg} ${colors.text} shadow-inner`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="font-mono text-sm text-gray-500">{item.date}</div>
                      </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-2 leading-tight break-words overflow-wrap-anywhere">
                        {item.title}
                      </h3>
                      <div className={`text-base sm:text-lg ${colors.text} font-semibold mb-4 italic break-words overflow-wrap-anywhere`}>
                        {item.subtitle}
                      </div>
                      <div className="text-[#475569] dark:text-[#9CA3AF] text-sm font-medium border-l-2 border-[#E2E8F0] dark:border-[rgba(255,255,255,0.08)] pl-4 py-1 italic whitespace-pre-wrap break-words">
                        {item.institution}
                      </div>

                      {/* Decorative corner tag */}
                      <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-tl-full ${colors.bg} opacity-20`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
