import { CheckSquare, Code2, Database, Globe, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProjects, QAProject } from '../lib/supabase';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Database,
  CheckSquare,
  Code2,
};

const demoProjects: QAProject[] = [
  {
    id: 'demo-1',
    ticket_id: 'TC-001',
    name: 'E-Commerce Platform Testing',
    priority: 'HIGH',
    status: 'PASSED',
    tools: ['Selenium', 'Java', 'TestNG', 'Jenkins'],
    role: 'Lead QA Engineer',
    responsibilities: [
      'Designed and implemented end-to-end automation framework',
      'Created 500+ automated test scripts for checkout flows',
      'Reduced regression testing time by 60%',
      'Integrated tests with CI/CD pipeline',
    ],
    outcome: 'Zero payment-related bugs in production for 12 months',
    icon_type: 'Globe',
    color: 'blue',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    ticket_id: 'TC-002',
    name: 'Banking API Test Suite',
    priority: 'CRITICAL',
    status: 'PASSED',
    tools: ['REST Assured', 'Postman', 'Java', 'Maven'],
    role: 'API Test Engineer',
    responsibilities: [
      'Developed comprehensive API testing framework',
      'Performed security and performance testing',
      'Validated 200+ API endpoints across microservices',
      'Documented API test coverage and scenarios',
    ],
    outcome: 'Achieved 99.8% API reliability score',
    icon_type: 'Database',
    color: 'red',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    ticket_id: 'TC-003',
    name: 'Healthcare Portal QA',
    priority: 'CRITICAL',
    status: 'PASSED',
    tools: ['Selenium', 'JUnit', 'JIRA', 'SQL'],
    role: 'Senior QA Analyst',
    responsibilities: [
      'Executed HIPAA compliance testing',
      'Performed data integrity and security validation',
      'Led UAT coordination with stakeholders',
      'Maintained defect tracking and reporting',
    ],
    outcome: 'Successful certification audit with zero compliance issues',
    icon_type: 'CheckSquare',
    color: 'purple',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    ticket_id: 'TC-004',
    name: 'Mobile App Automation',
    priority: 'HIGH',
    status: 'PASSED',
    tools: ['Appium', 'Java', 'TestNG', 'BrowserStack'],
    role: 'Mobile QA Engineer',
    responsibilities: [
      'Built cross-platform mobile test automation',
      'Tested on 20+ device configurations',
      'Implemented parallel test execution',
      'Improved test execution speed by 70%',
    ],
    outcome: '4.8-star app rating maintained across platforms',
    icon_type: 'Code2',
    color: 'green',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const colorMap: Record<string, string> = {
  green: 'bg-green-500/10 border-green-400/30 text-green-400',
  red: 'bg-red-500/10 border-red-400/30 text-red-400',
  blue: 'bg-blue-500/10 border-blue-400/30 text-blue-400',
  purple: 'bg-purple-500/10 border-purple-400/30 text-purple-400',
};

const statusColors: Record<string, string> = {
  PASSED: 'text-green-400 border-green-400/30 bg-green-500/10',
  FAILED: 'text-red-400 border-red-400/30 bg-red-500/10',
  IN_PROGRESS: 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10',
  CRITICAL: 'text-red-400 border-red-400/30 bg-red-500/10',
  HIGH: 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10',
  MEDIUM: 'text-blue-400 border-blue-400/30 bg-blue-500/10',
};

export default function Projects() {
  const [projects, setProjects] = useState<QAProject[]>(demoProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      if (data && data.length > 0) {
        setProjects(data);
      }
      setLoading(false);
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative bg-[#F4F7F5] dark:bg-[#111827]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-primary">
            Project <span className="text-accent-primary">Portfolio</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-primary mx-auto" />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-zinc-400 animate-spin" />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="space-y-5"
          >
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon_type] || Code2;
              const colors = colorMap[project.color as keyof typeof colorMap] || colorMap.blue;

              return (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  className="group glass-card rounded-2xl p-6 hover:border-[var(--accent-secondary)] hover:shadow-[0_8px_32px_var(--glow-blue)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    <div className="md:w-14 shrink-0">
                      <div className={`w-12 h-12 ${colors} border rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-primary break-words">
                            {project.name}
                          </h3>
                          <div className="text-sm text-[#6B7280] dark:text-[#6B7280] mt-0.5">
                            {project.role}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[project.priority]}`}>
                            {project.priority}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[project.status]}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-4">
                        {project.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="flex items-start gap-2.5 text-secondary text-sm">
                            <CheckSquare className="w-3.5 h-3.5 text-[#4CAF7A] dark:text-[#22C55E] shrink-0 mt-1" />
                            <span className="break-words">{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-[#EEFAF3] dark:bg-[rgba(34,197,94,0.06)] border border-[#CFE5D8] dark:border-[rgba(34,197,94,0.2)] rounded-xl p-3 text-sm text-[#4CAF7A] dark:text-[#4ADE80] mb-4 break-words">
                        {project.outcome}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 bg-[#F8FAFC] dark:bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] rounded-lg text-xs text-secondary hover:bg-[#EFF6FF] dark:hover:bg-[rgba(59,130,246,0.08)] hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-all duration-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
