import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const STARTUP_LOGS = [
    'INITIALIZING_CORE_SYSTEMS...',
    'SCANNING_UI_COMPONENTS...',
    'CONNECTING_DATABASE_PORTALS...',
    'OPTIMIZING_LAYOUT_MATRICES...',
    'USER_IDENTITY_VERIFIED: SURYA',
    'SYSTEM_STATUS: READY'
];

export default function SystemIntro() {
    const [isActive, setIsActive] = useState(true);
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        // Progress through logs
        const logInterval = setInterval(() => {
            setLogIndex(prev => (prev < STARTUP_LOGS.length - 1 ? prev + 1 : prev));
        }, 300);

        // End sequence after fixed time
        const timer = setTimeout(() => setIsActive(false), 2500);

        return () => {
            clearInterval(logInterval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] bg-[#0a0e27] flex items-center justify-center overflow-hidden"
                >
                    {/* Scanning Beam */}
                    <motion.div
                        initial={{ left: '-10%', opacity: 0 }}
                        animate={{ left: '110%', opacity: [0, 1, 1, 0.5] }}
                        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], repeat: 0 }}
                        className="absolute top-0 w-2 h-full bg-green-400/20 blur-xl z-20"
                    />
                    <motion.div
                        initial={{ left: '-10%', opacity: 0 }}
                        animate={{ left: '110%', opacity: [0, 1, 1, 0.8] }}
                        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], repeat: 0 }}
                        className="absolute top-0 w-px h-full bg-green-400 z-30 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    />

                    {/* Technical Info Center */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-8"
                        >
                            <div className="text-green-500 font-mono text-sm tracking-[0.3em] uppercase mb-2">
                                Diagnostic_Sequence_01
                            </div>
                            <div className="h-1 w-64 bg-green-500/10 mx-auto rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-full bg-green-500 shadow-[0_0_10px_#10b981]"
                                />
                            </div>
                        </motion.div>

                        {/* Dynamic Logs */}
                        <div className="font-mono text-[10px] text-green-500/60 text-left h-24 overflow-hidden max-w-xs mx-auto">
                            {STARTUP_LOGS.slice(0, logIndex + 1).map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-1"
                                >
                                    {`> ${log}`}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
