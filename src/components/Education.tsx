import { GraduationCap, Award, Loader, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchEducation, type Education } from '../lib/supabase';
import { motion } from 'framer-motion';
import TimelineLine from './TimelineLine';

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

export default function Education() {
  const [timeline, setTimeline] = useState<Education[]>(defaultTimeline);
  const [loading, setLoading] = useState(true);

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
      <section className="py-24 px-6 relative bg-white dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-24 px-6 relative bg-[var(--bg-primary)] overflow-hidden overflow-x-hidden border-t border-[var(--border-subtle)] transition-colors duration-500">
      {/* System Background Decorations - Blue/Indigo focus */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--accent-secondary)] opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent-indigo)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-[var(--text-primary)]">
            Learning <span className="text-[var(--accent-primary)] group-hover:animate-pulse transition-all">Journey</span>
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mx-auto rounded-full shadow-[0_0_10px_var(--glow-green)]" />
        </motion.div>

        <div className="relative">
          {/* The System Line - Green tint (responsive: left on mobile, centered on md+) */}
          <TimelineLine translateClass="md:-translate-x-[42%]" />

          <div className="space-y-10 md:space-y-16">
            {timeline.sort((a, b) => a.display_order - b.display_order).map((item, index) => {
              const IconComponent = iconMap[item.icon_type] || Award;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                
                  <div className="absolute left-4 sm:left-6 md:left-1/2 md:-translate-x-[42%] pointer-events-none z-40 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full bg-[var(--accent-primary)] glow-pulse-green`} />
                  </div>

                  {/* Content Card - System Glass Implementation */}
                    <div className={`w-full md:w-1/2 group min-w-0 max-w-full box-border pl-12 md:pl-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative p-5 sm:p-7 rounded-2xl glass-card hover:border-[var(--accent-primary)] transition-all duration-300 group-hover:shadow-[0_8px_32px_var(--glow-green)] max-w-full box-border overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                          <div className="px-3 py-1 bg-[var(--glow-green)] text-[var(--accent-primary)] text-[9px] sm:text-[10px] uppercase tracking-widest font-bold rounded-full border border-[var(--accent-primary)]/20">
                            {item.date}
                          </div>
                          <IconComponent className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight break-words">
                            {item.title}
                          </h3>
                          <p className="text-sm font-medium text-[var(--accent-primary)] mb-4 break-words">
                            {item.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] border-t border-[var(--border-subtle)] pt-4 mt-4 italic">
                          <Building2 className="w-3.5 h-3.5" />
                          {item.institution}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Year Backdrop Display */}
                  <div className={`hidden md:flex w-[45%] flex-col ${isEven ? 'items-start pl-8' : 'items-end pr-8'}`}>
                    <span className="text-5xl font-black text-[var(--border-subtle)] opacity-40 select-none">
                      {item.date.split(' ')[0]}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-bold ml-1">
                      {item.type}
                    </span>
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
