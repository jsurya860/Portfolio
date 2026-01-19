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
  { id: '1', name: 'Manual Testing', icon_type: 'CheckCircle2', color: 'green', display_order: 1 },
  { id: '2', name: 'Test Automation', icon_type: 'Code2', color: 'blue', display_order: 2 },
  { id: '3', name: 'Selenium & Java', icon_type: 'Zap', color: 'yellow', display_order: 3 },
  { id: '4', name: 'API Testing', icon_type: 'BarChart3', color: 'purple', display_order: 4 },
  { id: '5', name: 'Defect Management', icon_type: 'Bug', color: 'red', display_order: 5 },
  { id: '6', name: 'Security Testing', icon_type: 'Shield', color: 'cyan', display_order: 6 },
];

const defaultAboutContent: AboutContent = {
  id: 'default',
  summary: 'Results-driven QA Engineer with a passion for delivering flawless software experiences. I specialize in designing comprehensive test strategies that catch critical bugs before they reach production, ensuring every release meets the highest quality standards.',
  approach: 'My methodology combines meticulous manual testing with powerful automation frameworks to create robust, scalable testing solutions. I believe quality isn\'t just about finding bugs—it\'s about preventing them through strategic planning and continuous improvement.',
  experience_years: 3,
  tests_written: 5000,
  bugs_found: 1200,
  success_rate: 99.7,
  test_coverage: 98,
  projects_delivered: 15,
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
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1f3a]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-sm text-green-400 mb-3 px-4 py-2 border border-green-400/30 rounded-full">
            {'>'} system.about.load()
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 break-words">
            About <span className="text-green-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 hover:border-green-400/40 transition-all duration-300">
              <div className="font-mono text-xs text-gray-500 mb-3">
                [PROFILE_SUMMARY]
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                {aboutContent.summary}
              </p>
            </div>

            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-blue-400/20 rounded-lg p-6 hover:border-blue-400/40 transition-all duration-300">
              <div className="font-mono text-xs text-gray-500 mb-3">
                [APPROACH]
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                {aboutContent.approach}
              </p>
            </div>

            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-purple-400/20 rounded-lg p-6 hover:border-purple-400/40 transition-all duration-300 font-mono text-sm">
              <div className="text-gray-500 mb-2">$ qa --version</div>
              <div className="text-green-400">
                Experience: {aboutContent.experience_years}+ years<br />
                Tests_Written: {aboutContent.tests_written.toLocaleString()}+<br />
                Bugs_Found: {aboutContent.bugs_found.toLocaleString()}+<br />
                Success_Rate: {aboutContent.success_rate}%<br />
                Test_Coverage: {aboutContent.test_coverage}%<br />
                Projects: {aboutContent.projects_delivered}+
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-400 break-words">Core Competencies</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon_type] || CheckCircle2;
                  const colorClass = colorClasses[skill.color as keyof typeof colorClasses] || 'text-green-400';

                  return (
                    <div
                      key={skill.id}
                      className="group flex items-center gap-4 p-4 rounded-lg bg-[#0a0e27]/50 border border-gray-800 hover:border-green-400/30 transition-all duration-300 hover:translate-x-2 overflow-hidden"
                    >
                      <div className={`${colorClass} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-white transition-colors break-words" title={skill.name}>
                        {skill.name}
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="font-mono text-xs text-gray-500 mb-3">
                  [TECH_STACK]
                </div>
                <div className="flex flex-wrap gap-2 pr-2">
                  {displayTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#0a0e27] border border-green-400/30 rounded text-sm text-green-400 hover:bg-green-400/10 transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                      title={tech}
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
