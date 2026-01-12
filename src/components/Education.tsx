import { GraduationCap, Award, Calendar, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchEducation, type Education } from '../lib/supabase';

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
  {
    id: '3',
    type: 'cert',
    title: 'Selenium WebDriver with Java',
    subtitle: 'Test Automation',
    institution: 'Professional Development Course',
    date: '2023',
    version: 'v3.0',
    icon_type: 'Award',
    color: 'purple',
    display_order: 3,
  },
  {
    id: '4',
    type: 'cert',
    title: 'API Testing & Postman Certification',
    subtitle: 'REST API Testing',
    institution: 'Online Learning Platform',
    date: '2023',
    version: 'v3.1',
    icon_type: 'Award',
    color: 'cyan',
    display_order: 4,
  },
  {
    id: '5',
    type: 'cert',
    title: 'Agile Testing Certification',
    subtitle: 'Scrum & Agile Methodologies',
    institution: 'Agile Alliance',
    date: '2024',
    version: 'v4.0',
    icon_type: 'Award',
    color: 'yellow',
    display_order: 5,
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
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[#0f1629]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block font-mono text-sm text-cyan-400 mb-3 px-4 py-2 border border-cyan-400/30 rounded-full animate-fade-in">
            {'>'} history.releaseNotes.show()
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Education & <span className="text-cyan-400">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto animate-expand" style={{ animationDelay: '200ms' }} />
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-green-400 animate-expand-y" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const colors = colorMap[item.color as keyof typeof colorMap] || colorMap.blue;
              const IconComponent = iconMap[item.icon_type] || Award;

              return (
                <div key={item.id} className="relative pl-20 animate-slide-in-left" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className={`absolute left-5 top-6 w-6 h-6 ${colors.dot} rounded-full border-4 border-[#0f1629] animate-pulse group-hover:scale-125 transition-transform`} style={{ animationDelay: `${index * 150 + 100}ms` }} />

                  <div
                    className={`group ${colors.bg} ${colors.border} border-2 rounded-lg p-6 hover:shadow-lg hover:shadow-current/10 transition-all duration-300 hover:translate-x-2 hover-lift`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${colors.text} p-3 rounded-lg bg-[#0a0e27]/50 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 animate-fade-in" style={{ animationDelay: `${index * 150 + 50}ms` }} />
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className={`font-mono text-xs ${colors.text} mb-1 animate-slide-up`} style={{ animationDelay: `${index * 150 + 75}ms` }}>
                              [{item.version}]
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1 animate-slide-up" style={{ animationDelay: `${index * 150 + 100}ms` }}>
                              {item.title}
                            </h3>
                            <div className="text-gray-400 mb-2 animate-slide-up" style={{ animationDelay: `${index * 150 + 125}ms` }}>
                              {item.subtitle}
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 ${colors.text} text-sm animate-fade-in group-hover:scale-110 transition-transform`} style={{ animationDelay: `${index * 150 + 100}ms` }}>
                            <Calendar className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                            {item.date}
                          </div>
                        </div>

                        <div className="text-gray-500 text-sm animate-slide-up" style={{ animationDelay: `${index * 150 + 150}ms` }}>
                          {item.institution}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 bg-[#151b35]/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover-lift glow-on-hover animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="font-mono text-xs text-gray-500 mb-4">
            [CONTINUOUS_LEARNING]
          </div>
          <p className="text-gray-300 leading-relaxed animate-slide-up" style={{ animationDelay: '1.1s' }}>
            Committed to staying current with industry best practices and emerging testing technologies.
            Actively pursuing advanced certifications in performance testing, security testing, and
            cloud-based test automation to deliver cutting-edge quality assurance solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
