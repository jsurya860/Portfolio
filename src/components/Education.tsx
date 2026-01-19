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
    title: 'Bachelor of Technology',
    subtitle: 'Computer Science Engineering',
    institution: 'Technology University',
    date: '2018 - 2022',
    version: 'v1.0',
    icon_type: 'GraduationCap',
    color: 'blue',
    display_order: 1,
  },
  {
    id: '2',
    type: 'cert',
    title: 'ISTQB Certified Tester',
    subtitle: 'Foundation Level',
    institution: 'International Software Testing Qualifications Board',
    date: '2022',
    version: 'v2.0',
    icon_type: 'Award',
    color: 'green',
    display_order: 2,
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
    <section id="education" ref={containerRef} className="py-24 px-6 relative bg-[#0a0e27]/80">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-block font-mono text-sm text-cyan-400 mb-3 px-4 py-2 border border-cyan-400/30 rounded-full">
            {'>'} system.loadHistory()
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 break-words">
            Educational <span className="text-cyan-400">Timeline</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line (Desktop: 50%, Mobile: Left) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/5 rounded-full" />

          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-green-400 origin-top z-10"
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
                    <div className={`w-3 h-3 ${colors.dot} rounded-full border-2 border-[#0a0e27] shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />
                  </div>

                  {/* Card */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <div className={`group relative p-8 bg-[#151b35]/60 backdrop-blur-xl border ${colors.border} rounded-2xl hover:bg-[#151b35] transition-all duration-500 hover:shadow-2xl hover:shadow-${item.color}-500/5 hover:-translate-y-1`}>
                      <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                        {item.type}
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-xl ${colors.bg} ${colors.text} shadow-inner`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="font-mono text-sm text-gray-500">{item.date}</div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight break-words overflow-wrap-anywhere">
                        {item.title}
                      </h3>
                      <div className={`text-base sm:text-lg ${colors.text} font-semibold mb-4 italic break-words overflow-wrap-anywhere`}>
                        {item.subtitle}
                      </div>
                      <div className="text-gray-400 text-sm font-medium border-l-2 border-white/5 pl-4 py-1 italic whitespace-pre-wrap break-words">
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
