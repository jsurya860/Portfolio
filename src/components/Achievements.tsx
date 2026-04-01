import { TrendingUp, AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchAchievements, fetchAboutContent, Achievement, AboutContent } from '../lib/supabase';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
};

const defaultAbout: AboutContent = {
  id: 'default',
  summary: '',
  approach: '',
  experience_years: 3,
  tests_written: 1000,
  bugs_found: 150,
  success_rate: 99.9,
  test_coverage: 92,
  projects_delivered: 20,
};

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Microsoft Learn Student Ambassador',
    metric: 'Beta Level',
    description: 'Recognized for building technical communities, leading workshops, and mentoring peers in technology.',
    icon_type: 'CheckCircle',
    color: 'green',
    status: 'ACTIVE',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Leapfrog Student Partner',
    metric: 'Partner',
    description: 'Served as campus technology influencer, connecting students with industry resources and opportunities.',
    icon_type: 'TrendingUp',
    color: 'blue',
    status: 'VERIFIED',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Workshop Leadership',
    metric: '15+ Sessions',
    description: 'Organized and led technical workshops and knowledge-sharing sessions on campus.',
    icon_type: 'Clock',
    color: 'purple',
    status: 'COMPLETED',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Good Mentor Certification',
    metric: 'Certified',
    description: 'Earned "Being a Good Mentor" certification for excellence in knowledge transfer and student empowerment.',
    icon_type: 'AlertCircle',
    color: 'red',
    status: 'EARNED',
    display_order: 4,
  },
];

const colorMap = {
  green: {
    bg: 'bg-[rgba(22,163,74,0.08)] dark:bg-[rgba(34,197,94,0.08)]',
    border: 'border-[rgba(76,175,122,0.25)] dark:border-[rgba(34,197,94,0.25)]',
    text: 'text-[#4CAF7A] dark:text-[#22C55E]',
    hoverShadow: 'hover:shadow-[rgba(76,175,122,0.12)]',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    text: 'text-red-400',
    hoverShadow: 'hover:shadow-red-500/10',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    text: 'text-blue-400',
    hoverShadow: 'hover:shadow-blue-500/10',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/25',
    text: 'text-purple-400',
    hoverShadow: 'hover:shadow-purple-500/10',
  },
};

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [achData, aboutData] = await Promise.all([
        fetchAchievements(),
        fetchAboutContent(),
      ]);

      if (achData && achData.length > 0) {
        setAchievements(achData);
      }
      if (aboutData) {
        setAbout(aboutData);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-24 px-6 relative bg-[#F4F7F5] dark:bg-[#111827]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-primary">
            Key <span className="text-accent-primary">Achievements</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-primary mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid md:grid-cols-2 gap-5"
        >
          {achievements.map((achievement) => {
            const colors = colorMap[achievement.color as keyof typeof colorMap] || colorMap.blue;
            const IconComponent = iconMap[achievement.icon_type] || TrendingUp;

            return (
              <motion.div
                key={achievement.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className={`group relative glass-card rounded-2xl p-6 hover:border-[var(--accent-primary)] hover:shadow-[0_8px_32px_var(--glow-green)] transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.text} p-2.5 rounded-xl ${colors.bg} shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className={`font-mono text-xs px-3 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text}`}>
                    {achievement.status}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-2 text-primary break-words">
                  {achievement.title}
                </h3>

                <div className={`text-xl sm:text-2xl font-black mb-3 ${colors.text}`}>
                  {achievement.metric}
                </div>

                <p className="text-sm text-secondary leading-relaxed break-words">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 glass-card rounded-2xl p-6"
        >
          <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-6">Impact Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black mb-1" style={{ color: '#4CAF7A' }}>{about.test_coverage}%</div>
              <div className="text-sm text-[#6B7280] dark:text-[#6B7280]">Test Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1" style={{ color: '#4CAF7A' }}>{about.bugs_found}+</div>
              <div className="text-sm text-[#6B7280] dark:text-[#6B7280]">Bugs Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1" style={{ color: '#6366F1' }}>40%↑</div>
              <div className="text-sm text-[#6B7280] dark:text-[#6B7280]">Automation Gain</div>
            </div>
            <div>
              <div className="text-3xl font-black text-primary mb-1">{about.projects_delivered}+</div>
              <div className="text-sm text-[#6B7280] dark:text-[#6B7280]">Projects Delivered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
