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
  tests_written: 5000,
  bugs_found: 1200,
  success_rate: 99.9,
  test_coverage: 98,
  projects_delivered: 15,
};

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Test Coverage Improvement',
    metric: '45% Increase',
    description: 'Elevated automated test coverage from 53% to 98% across critical user flows',
    icon_type: 'TrendingUp',
    color: 'green',
    status: 'VERIFIED',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Bug Detection Rate',
    metric: '1200+ Critical Bugs',
    description: 'Identified and documented pre-production defects, preventing costly production incidents',
    icon_type: 'AlertCircle',
    color: 'red',
    status: 'RESOLVED',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Release Cycle Time',
    metric: '30% Reduction',
    description: 'Streamlined testing process through automation, accelerating time-to-market',
    icon_type: 'Clock',
    color: 'blue',
    status: 'OPTIMIZED',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Zero Production Failures',
    metric: '18 Consecutive Releases',
    description: 'Maintained perfect production stability through comprehensive regression testing',
    icon_type: 'CheckCircle',
    color: 'purple',
    status: 'ACHIEVED',
    display_order: 4,
  },
];

const colorMap = {
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20',
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
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[#0f1629]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-sm text-blue-400 mb-3 px-4 py-2 border border-blue-400/30 rounded-full">
            {'>'} metrics.achievements.display()
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 break-words">
            Key <span className="text-blue-400">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement) => {
            const colors = colorMap[achievement.color as keyof typeof colorMap] || colorMap.blue;
            const IconComponent = iconMap[achievement.icon_type] || TrendingUp;

            return (
              <motion.div
                key={achievement.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } }
                }}
                className={`group relative ${colors.bg} ${colors.border} border-2 rounded-lg p-6 hover:${colors.glow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.text} p-3 rounded-lg bg-[#0a0e27]/50 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className={`font-mono text-xs px-3 py-1 rounded-full ${colors.bg} ${colors.border} border ${colors.text}`}>
                    [{achievement.status}]
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white break-words overflow-wrap-anywhere">
                  {achievement.title}
                </h3>

                <div className={`text-xl sm:text-2xl font-bold mb-3 ${colors.text} break-words overflow-wrap-anywhere`}>
                  {achievement.metric}
                </div>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                  {achievement.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-[#151b35]/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
        >
          <div className="font-mono text-xs text-gray-500 mb-4">
            [IMPACT_SUMMARY]
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{about.tests_written.toLocaleString()}+</div>
              <div className="text-sm text-gray-400">Test Cases Written</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">{about.test_coverage}%</div>
              <div className="text-sm text-gray-400">Test Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">{about.projects_delivered}+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{about.success_rate}%</div>
              <div className="text-sm text-gray-400">Defect Detection</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
