import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string[];
}

const defaultExperience: Experience[] = [
    {
        id: '1',
        company: 'Microsoft Learn Student Ambassadors',
        role: 'Student Ambassador',
        duration: 'Oct 2022 – Jun 2025',
        description: [
            'Built and led technical communities on campus, organizing workshops and knowledge-sharing sessions',
            'Mentored fellow students in technology and career development, fostering collaborative learning environment',
            'Earned "Being a Good Mentor" certification, demonstrating commitment to knowledge transfer and student empowerment',
        ],
    },
    {
        id: '2',
        company: 'Leapfrog Technology, Inc.',
        role: 'Leapfrog Student Partner',
        duration: 'Apr 2023 – Dec 2023',
        description: [
            'Served as campus technology influencer, connecting students with industry opportunities and career resources',
            'Engaged tech community through events and initiatives, bridging gap between academic learning and industry practice',
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6 relative bg-[#F4F7F5] dark:bg-[#111827]">
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-[#0F172A] dark:text-[#E5E7EB]">
                        Work <span className="text-[#4CAF7A] dark:text-[#22C55E]">Experience</span>
                    </h2>
                    <div className="w-12 h-0.5 bg-[#4CAF7A] dark:bg-[#22C55E] mx-auto" />
                </motion.div>

                <div className="space-y-6">
                    {defaultExperience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-2xl
                              border border-[#E5E7EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                              dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)] dark:shadow-none
                              hover:border-[#4CAF7A] dark:hover:border-[rgba(34,197,94,0.35)]
                              hover:shadow-[0_8px_24px_rgba(22,163,74,0.15)] dark:hover:shadow-[0_8px_24px_rgba(34,197,94,0.12)]
                              backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">{exp.role}</h3>
                                        <div className="text-sm font-mono text-[#4CAF7A] dark:text-[#22C55E] mt-0.5">{exp.company}</div>
                                    </div>
                                    <span className="text-xs font-mono text-[#6B7280] dark:text-[#6B7280] whitespace-nowrap mt-0.5">{exp.duration}</span>
                                </div>
                                <ul className="space-y-2">
                                    {exp.description.map((point, i) => (
                                        <li key={i} className="flex gap-3 text-[#475569] dark:text-[#9CA3AF] text-sm leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-[#4CAF7A] dark:text-[#22C55E] shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
