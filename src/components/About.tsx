import { CheckCircle2, Code2, Shield, Zap, Bug, BarChart3, Loader, FlaskConical } from 'lucide-react';
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

const TECH_DOCS: Record<string, string> = {
  'Selenium': 'https://www.selenium.dev/',
  'Java': 'https://www.oracle.com/java/',
  'TestNG': 'https://testng.org/',
  'JUnit': 'https://junit.org/',
  'REST Assured': 'https://rest-assured.io/',
  'Postman': 'https://www.postman.com/',
  'JIRA': 'https://www.atlassian.com/software/jira',
  'Jenkins': 'https://www.jenkins.io/',
  'Git': 'https://git-scm.com/',
  'React': 'https://react.dev/',
  'TypeScript': 'https://www.typescriptlang.org/',
  'Node.js': 'https://nodejs.org/',
  'Tailwind CSS': 'https://tailwindcss.com/',
  'Supabase': 'https://supabase.com/',
  'Framer Motion': 'https://www.framer.com/motion/',
  'Vite': 'https://vitejs.dev/',
  'Playwright': 'https://playwright.dev/',
  'Cypress': 'https://www.cypress.io/',
  'Appium': 'https://appium.io/',
  'Python': 'https://www.python.org/',
  'Cucumber': 'https://cucumber.io/',
  'Maven': 'https://maven.apache.org/',
  'Docker': 'https://www.docker.com/',
  'AWS': 'https://aws.amazon.com/',
  'Zoho Sprints': 'https://www.zoho.com/sprints/help/',
};

const TECH_SLUGS: Record<string, string> = {
  'Selenium': 'selenium',
  'Java': 'java',
  'TestNG': 'testng',
  'REST Assured': 'rest-assured',
  'Postman': 'postman',
  'JIRA': 'jira',
  'Jenkins': 'jenkins',
  'Git': 'git',
  'React': 'react',
  'TypeScript': 'typescript',
  'Node.js': 'nodejs',
  'Tailwind CSS': 'tailwindcss',
  'Supabase': 'supabase',
  'Vite': 'vite',
  'Playwright': 'playwright',
  'Cypress': 'cypress',
  'Python': 'python',
  'Docker': 'docker',
  'AWS': 'amazonaws',
  'SQL': 'mysql',
  'JUnit': 'junit5',
  'Zoho Sprints': 'zoho',
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

  const defaultTechStack = ['Selenium', 'Java', 'TestNG', 'JUnit', 'REST Assured', 'Postman', 'JIRA', 'Zoho Sprints', 'Jenkins', 'Git'];
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
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] hover:border-accent-primary/50 dark:hover:border-accent-primary/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className={`${colorClass} shrink-0 p-1.5 rounded-lg bg-white dark:bg-white/[0.05] shadow-sm group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors break-words">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-card">
                <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {displayTechStack.map((tech, index) => {
                    const docUrl = TECH_DOCS[tech] || `https://www.google.com/search?q=${encodeURIComponent(tech + " official documentation")}`;
                    const slug = TECH_SLUGS[tech];
                    
                    // Priority 1: SimpleIcons (Great for official colorful brand logos)
                    const simpleIconUrl = slug 
                      ? `https://cdn.simpleicons.org/${slug}` 
                      : null;
                    
                    // Priority 2: DevIcon (Fallback for more classic developer icons, especially Jenkins Butler)
                    const devIconUrl = slug 
                      ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug === 'junit5' ? 'junit' : slug === 'vite' ? 'vitejs' : slug}/${slug === 'junit5' ? 'junit' : slug === 'vite' ? 'vitejs' : slug}-original.svg`
                      : null;

                    return (
                      <motion.a
                        key={tech}
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
                        whileHover={{ 
                          y: -3, 
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.15), 0 4px 6px -2px rgba(59, 130, 246, 0.05)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold
                          bg-white/90 dark:bg-white/[0.03] 
                          border border-slate-200/80 dark:border-white/[0.08]
                          backdrop-blur-sm shadow-sm
                          text-slate-600 dark:text-slate-300
                          hover:text-blue-600 dark:hover:text-blue-400
                          hover:border-blue-500/50 dark:hover:border-blue-400/30
                          transition-all duration-300 cursor-pointer overflow-hidden pl-2"
                        title={`View ${tech} Documentation`}
                      >
                        {/* Status Brand Icon / Fallback */}
                        <div className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
                          {slug ? (
                            <>
                              {/* For Jenkins, we prioritize the official Butler logo from DevIcons */}
                              <img 
                                src={tech === 'Jenkins' || tech === 'Selenium' ? (devIconUrl || "") : (simpleIconUrl || "")} 
                                alt={tech} 
                                className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const nextImg = (e.target as HTMLImageElement).nextElementSibling as HTMLImageElement;
                                    if (nextImg) nextImg.style.opacity = '1';
                                }}
                              />
                              <img 
                                src={tech === 'Jenkins' || tech === 'Selenium' ? (simpleIconUrl || "") : (devIconUrl || "")} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:scale-110 transition-transform duration-300"
                                style={{ opacity: 0 }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                                    if (nextElement) nextElement.style.display = 'flex';
                                }}
                              />
                            </>
                          ) : null}

                          {/* High-Quality Brand-Accurate Fallbacks for Specialized QA Tools */}
                          <div className={`hidden items-center justify-center w-full h-full ${!slug ? '!flex' : ''}`}>
                            {tech === 'TestNG' ? (
                                <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/10" />
                            ) : tech === 'REST Assured' ? (
                                <FlaskConical className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                            ) : tech === 'JUnit' ? (
                                <Shield className="w-3.5 h-3.5 text-green-500 fill-green-500/10" />
                            ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors duration-300" />
                            )}
                          </div>
                        </div>
                        
                        <span className="relative z-10">{tech}</span>
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 bg-gradient-to-r from-blue-400 to-indigo-500 transition-opacity duration-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
