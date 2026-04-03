import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TimelineLine from './TimelineLine';

interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string[];
    isCurrent?: boolean;
}

const defaultExperience: Experience[] = [
    {
        id: '1',
        company: 'CloudTech',
        role: 'Associate QA Engineer',
        duration: 'June 2025 - Present',
        isCurrent: true,
        description: [
            'Ensuring every part of the software—from what users see to the underlying systems—is reliable and secure.',
            'Guarding the core business systems to ensure invoices and customer accounts are handled without errors.',
            'Collaborating with developers and business analysts to turn complex requirements into high-quality software.',
            'Teaching the team how to build security into our software from day one.',
        ],
    },
    {
        id: '2',
        company: 'CloudTech',
        role: 'Quality Assurance Intern',
        duration: 'Feb 2025 - June 2025',
        description: [
            'Proactively finding and fixing software flaws to provide a seamless experience for the end user.',
            'Verifying that large-scale business applications handle data correctly and securely.',
            'Mastered the art of tracking issues and managing how we safely release new features to production.',
        ],
    },
    {
        id: '3',
        company: 'Microsoft Learn Student Ambassadors',
        role: 'Student Ambassador',
        duration: 'Oct 2022 - Jun 2025',
        description: [
            'Helping fellow students learn about modern technology and how it can help their careers.',
            'Organizing community events and workshops to foster collaboration and shared learning.',
        ],
    },
    {
        id: '4',
        company: 'Leapfrog Technology, Inc.',
        role: 'Leapfrog Student Partner',
        duration: 'Apr 2023 - Dec 2023',
        description: [
            'Building bridges between the tech industry and the next generation of engineers.',
            'Sharing professional resources and helping peers find their path in the technology world.',
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6 relative bg-[var(--bg-primary)] overflow-hidden overflow-x-hidden transition-colors duration-500">
            {/* System Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)] opacity-[0.03] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-secondary)] opacity-[0.03] blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-[var(--text-primary)]">
                        Career <span className="text-[var(--accent-primary)] group-hover:animate-pulse transition-all">Timeline</span>
                    </h2>
                    <div className="w-12 h-1 bg-[var(--accent-primary)] mx-auto rounded-full shadow-[0_0_10px_var(--glow-green)]" />
                </motion.div>

                <div className="relative">
                    {/* The System Line - Sync with QA Dashboard aesthetics */}
                    <TimelineLine translateClass="md:-translate-x-[42%]" />

                    <div className="space-y-10 md:space-y-16">
                        {defaultExperience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 ${
                                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* The Milestone Node - Ring + inner dot (line sits behind) */}
                                <div className="absolute left-4 sm:left-6 md:left-1/2 md:-translate-x-[42%] pointer-events-none z-40 flex items-center justify-center">
                                    <div className={`${exp.isCurrent ? 'w-3 h-3 rounded-full bg-[var(--accent-primary)] glow-pulse-green' : 'w-3 h-3 rounded-full bg-[var(--text-tertiary)]'}`} />
                                </div>

                                {/* Content Card - System Glass Implementation */}
                                <div className={`w-full md:w-1/2 group min-w-0 max-w-full box-border pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative p-5 sm:p-7 rounded-2xl glass-card hover:border-[var(--accent-primary)] transition-all duration-300 group-hover:shadow-[0_8px_32px_var(--glow-green)] max-w-full box-border overflow-hidden"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                                <div className="px-3 py-1 bg-[var(--glow-green)] text-[var(--accent-primary)] text-[9px] sm:text-[10px] uppercase tracking-widest font-bold rounded-full border border-[var(--accent-primary)]/20">
                                                    {exp.duration}
                                                </div>
                                                <Building2 className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight break-words">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-sm font-medium text-[var(--accent-primary)] mb-6 break-words">
                                                    {exp.company}
                                                </p>
                                            </div>

                                            <ul className="mt-6 space-y-4">
                                                {exp.description.map((point, i) => (
                                                    <motion.li 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -5 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                                        className="flex gap-4 group/item"
                                                    >
                                                        <div className="mt-2 w-1 h-1 rounded-full bg-[var(--border-color)] group-hover/item:bg-[var(--accent-primary)] transition-colors" />
                                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal break-words">
                                                            {point}
                                                        </p>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Year Backdrop Display */}
                                <div className={`hidden md:flex w-[45%] flex-col ${index % 2 === 0 ? 'items-start pl-8' : 'items-end pr-8'}`}>
                                    <span className="text-5xl font-black text-[var(--border-subtle)] opacity-40 select-none">
                                        {exp.duration.split(' ')[0]}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
