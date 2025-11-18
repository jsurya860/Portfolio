import { CheckSquare, Code2, Database, Globe, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProjects, QAProject } from '../lib/supabase';

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
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1f3a]/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block font-mono text-sm text-purple-400 mb-3 px-4 py-2 border border-purple-400/30 rounded-full">
            {'>'} testSuite.execute()
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Project <span className="text-purple-400">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon_type] || Code2;
              const colors = colorMap[project.color as keyof typeof colorMap] || colorMap.blue;

              return (
                <div
                  key={project.id}
                  className="group bg-[#151b35]/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-16 flex-shrink-0">
                      <div className={`w-16 h-16 ${colors} border rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="font-mono text-xs text-gray-500 mb-1">
                            [{project.ticket_id}]
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {project.name}
                          </h3>
                          <div className="text-sm text-gray-400">
                            Role: <span className="text-purple-400 font-semibold">{project.role}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className={`font-mono text-xs px-3 py-1 rounded-full border ${statusColors[project.priority]}`}>
                            {project.priority}
                          </span>
                          <span className={`font-mono text-xs px-3 py-1 rounded-full border ${statusColors[project.status]}`}>
                            ✓ {project.status}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="font-mono text-xs text-gray-500 mb-2">
                          [TEST_CASES]
                        </div>
                        <ul className="space-y-2">
                          {project.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-300">
                              <CheckSquare className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <div className="font-mono text-xs text-gray-500 mb-2">
                          [OUTCOME]
                        </div>
                        <div className="bg-green-500/5 border border-green-400/20 rounded-lg p-3 text-green-400">
                          {project.outcome}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-xs text-gray-500 mb-2">
                          [TECH_STACK]
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-3 py-1 bg-[#0a0e27] border border-gray-700 rounded text-sm text-gray-300 hover:border-purple-400/30 hover:text-purple-400 transition-colors"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
