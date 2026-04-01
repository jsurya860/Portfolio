import { CheckCircle2, Code2, Shield, Zap, Bug, BarChart3, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchAboutContent, fetchSkills, fetchTechStack, AboutContent, Skill, TechStack } from '../lib/supabase';
import { motion } from 'framer-motion';

// ... (keep maps and defaults)

// ... (keep maps and defaults)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle2,
  Code2,
  Shield,
  Zap,
  Bug,
  BarChart3,
};

const defaultSkills: Skill[] = [
  { id: '1', name: 'Community Leadership', icon_type: 'CheckCircle2', color: 'green', display_order: 1 },
  { id: '2', name: 'Technical Mentorship', icon_type: 'Zap', color: 'blue', display_order: 2 },
  { id: '3', name: 'Test Automation', icon_type: 'Code2', color: 'yellow', display_order: 3 },
  { id: '4', name: 'Manual Testing', icon_type: 'Bug', color: 'purple', display_order: 4 },
  { id: '5', name: 'SQL & DB Testing', icon_type: 'BarChart3', color: 'red', display_order: 5 },
  { id: '6', name: 'Performance Testing', icon_type: 'Shield', color: 'cyan', display_order: 6 },
];

const defaultAboutContent: AboutContent = {
  id: 'default',
  summary: 'Results-driven IT student and aspiring QA Engineer with a strong background in community leadership and technical mentorship. Currently pursuing a Bachelor of Information Technology at Tribhuvan University. As a Microsoft Learn Student Ambassador and Leapfrog Student Partner, I have a proven track record of building technical communities and organizing workshops.',
  approach: 'My methodology focuses on community-driven learning and meticulous quality assurance. I believe in bridging the gap between academic learning and industry practice through hands-on experience and knowledge sharing. I am passionate about delivering reliable software experiences and fostering collaborative learning environments.',
  experience_years: 3,
  tests_written: 1000,
  bugs_found: 150,
  success_rate: 99.9,
  test_coverage: 92,
  projects_delivered: 20,
};

const colorClasses: Record<string, string> = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  yellow: 'text-yellow-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  cyan: 'text-cyan-400',
};

export default function About() {
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const [about, skillsData, techData] = await Promise.all([
        fetchAboutContent(),
        fetchSkills(),
        fetchTechStack(),
      ]);

      if (about) setAboutContent(about);
      if (skillsData && skillsData.length > 0) setSkills(skillsData);
      if (techData && techData.length > 0) setTechStack(techData);

      setLoading(false);
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-8 h-8 text-green-400 animate-spin" />
        </div>
      </section>
    );
  }

  const defaultTechStack = ['Selenium', 'Java', 'TestNG', 'JUnit', 'REST Assured', 'Postman', 'JIRA', 'Jenkins', 'Git'];
  const displayTechStack = techStack.length > 0 ? techStack.map((t) => t.name) : defaultTechStack;

  return (
    <section id="about" className="py-24 px-6 relative bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1F5F9]/30 to-transparent dark:via-[#111827]/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-primary">
            About <span className="text-accent-primary">Me</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="glass-card rounded-2xl p-6 hover:border-[var(--accent-primary)] transition-all duration-300 group">
              <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-3">Summary</h4>
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#D1D5DB] leading-relaxed break-words">
                {aboutContent.summary}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:border-[var(--accent-primary)] transition-all duration-300 group">
              <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-3">Approach</h4>
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#D1D5DB] leading-relaxed break-words">
                {aboutContent.approach}
              </p>
            </div>

          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-6 text-primary">Core Competencies</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon_type] || CheckCircle2;
                  const colorClass = colorClasses[skill.color as keyof typeof colorClasses] || 'text-[#22C55E]';

                  return (
                    <div
                      key={skill.id}
                      className="group flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] hover:bg-[#F1F5F9] dark:hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--accent-primary)] dark:hover:shadow-[0_0_12px_var(--glow-green)] transition-all duration-250"
                    >
                      <div className={`${colorClass} shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-[#0F172A] dark:text-[#D1D5DB] group-hover:text-[#0F172A] dark:group-hover:text-[#E5E7EB] transition-colors break-words">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-card">
                <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#F8FAFC] dark:bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] rounded-lg text-sm text-[#0F172A] dark:text-[#D1D5DB] hover:bg-[#EFF6FF] dark:hover:bg-[rgba(59,130,246,0.08)] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
