import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Wrench, FlaskConical, Layers, ShieldCheck, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type StageStatus = 'pending' | 'running' | 'fail' | 'pass';

interface StageConfig {
  label: string;
  Icon: LucideIcon;
}

const STAGES: StageConfig[] = [
  { label: 'Code',      Icon: Code2 },
  { label: 'Build',     Icon: Wrench },
  { label: 'Tests',     Icon: FlaskConical },
  { label: 'Integrate', Icon: Layers },
  { label: 'QA Gate',   Icon: ShieldCheck },
  { label: 'Deploy',    Icon: Rocket },
];

const N = STAGES.length;
const INIT: StageStatus[] = Array(N).fill('pending');

// ─── Color helpers ────────────────────────────────────────────────────────────

function borderCol(s: StageStatus, isDark: boolean): string {
  if (s === 'fail')    return '#EF4444';
  if (s === 'running') return isDark ? '#3B82F6' : '#2563EB';
  if (s === 'pass')    return isDark ? '#22C55E' : '#4CAF7A';
  return isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0';
}

function iconCol(s: StageStatus, isDark: boolean): string {
  if (s === 'fail')    return '#EF4444';
  if (s === 'running') return isDark ? '#3B82F6' : '#2563EB';
  if (s === 'pass')    return isDark ? '#22C55E' : '#4CAF7A';
  return isDark ? '#9CA3AF' : '#CBD5E1';
}

function labelCol(s: StageStatus, isDark: boolean): string {
  if (s === 'fail')    return '#EF4444';
  if (s === 'running') return isDark ? '#3B82F6' : '#2563EB';
  if (s === 'pass')    return isDark ? '#22C55E' : '#4CAF7A';
  return isDark ? '#9CA3AF' : '#64748B';
}

function bgCol(s: StageStatus, isDark: boolean): string {
  if (s === 'pass')    return isDark ? 'rgba(34,197,94,0.08)'   : 'rgba(76,175,122,0.07)';
  if (s === 'fail')    return                                     'rgba(239,68,68,0.08)';
  if (s === 'running') return isDark ? 'rgba(59,130,246,0.08)'  : 'rgba(37,99,235,0.06)';
  return 'transparent';
}

// ─── Pipeline node ────────────────────────────────────────────────────────────

function PipelineNode({
  label,
  Icon,
  status,
  reduced,
  isDark,
}: {
  label: string;
  Icon: LucideIcon;
  status: StageStatus;
  reduced: boolean;
  isDark: boolean;
}) {
  const isRun = status === 'running';
  const isFail = status === 'fail';
  const runColor = isDark ? '59,130,246' : '37,99,235';   // blue for running
  const failColor = '239,68,68';

  const pulseAnim = isRun
    ? {
        boxShadow: [
          `0 0 0 0px rgba(${runColor},0.45)`,
          `0 0 0 7px rgba(${runColor},0)`,
          `0 0 0 0px rgba(${runColor},0.45)`,
        ],
      }
    : isFail
    ? {
        boxShadow: [
          `0 0 0 0px rgba(${failColor},0.55)`,
          `0 0 0 9px rgba(${failColor},0)`,
          `0 0 0 0px rgba(${failColor},0.55)`,
        ],
      }
    : { boxShadow: '0 0 0 0px rgba(0,0,0,0)' };

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ minWidth: 44 }}>
      <motion.div
        animate={reduced ? undefined : pulseAnim}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
        style={{
          border: `1.5px solid ${borderCol(status, isDark)}`,
          background: bgCol(status, isDark),
          transition: 'border-color 0.35s ease, background 0.35s ease',
        }}
      >
        <Icon
          className="w-4 h-4 sm:w-5 sm:h-5"
          style={{ color: iconCol(status, isDark), transition: 'color 0.35s ease' }}
        />
      </motion.div>
      <span
        className="text-[9px] sm:text-[10px] font-mono font-medium text-center leading-tight whitespace-nowrap"
        style={{ color: labelCol(status, isDark), transition: 'color 0.35s ease' }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Connector line ───────────────────────────────────────────────────────────

function PipelineConnector({ active, reduced, isDark }: { active: boolean; reduced: boolean; isDark: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex-shrink-0 mt-[19px] sm:mt-[23px] mx-1 sm:mx-1.5 w-5 sm:w-7"
    >
      <div
        className="w-full h-px relative overflow-hidden"
        style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: isDark ? '#3B82F6' : '#2563EB', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active || reduced ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroPipeline() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReduced = useReducedMotion() ?? false;
  const [statuses, setStatuses] = useState<StageStatus[]>(
    prefersReduced ? (Array(N).fill('pass') as StageStatus[]) : INIT,
  );
  const [statusText, setStatusText] = useState(
    prefersReduced ? '✓ Deployed — v2.4.1' : 'Pipeline ready',
  );

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startRef = useRef<(delay?: number) => void>(() => {});

  const setOne = (idx: number, s: StageStatus) =>
    setStatuses(prev => prev.map((v, i) => (i === idx ? s : v)));

  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  // Re-assign on every render so closures always see fresh state setters
  startRef.current = (delay = 1000) => {
    clearAll();
    setStatuses([...INIT]);
    setStatusText('Pipeline ready');

    const a = (ms: number, fn: () => void) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    a(delay,         () => { setOne(0, 'running'); setStatusText('Checking out source code...'); });
    a(delay + 500,   () => setOne(0, 'pass'));
    a(delay + 600,   () => { setOne(1, 'running'); setStatusText('Compiling and building artifacts...'); });
    a(delay + 1100,  () => setOne(1, 'pass'));
    a(delay + 1200,  () => { setOne(2, 'running'); setStatusText('Running 127 unit tests...'); });
    a(delay + 1700,  () => setOne(2, 'pass'));
    a(delay + 1800,  () => { setOne(3, 'running'); setStatusText('Integration checks...'); });
    a(delay + 2300,  () => setOne(3, 'pass'));
    a(delay + 2400,  () => { setOne(4, 'running'); setStatusText('QA gate evaluation...'); });
    a(delay + 3000,  () => { setOne(4, 'fail'); setStatusText('✗ Bug detected: null ref in payment module'); });
    a(delay + 3800,  () => { setOne(4, 'running'); setStatusText('Applying fix, retrying QA gate...'); });
    a(delay + 4600,  () => { setOne(4, 'pass'); setStatusText('✓ All quality checks passed'); });
    a(delay + 4700,  () => { setOne(5, 'running'); setStatusText('Deploying to production...'); });
    a(delay + 5400,  () => { setOne(5, 'pass'); setStatusText('✓ Deployed — v2.4.1'); });
    // Loop: reset after a 2.5s pause, restart with short delay
    a(delay + 7900,  () => startRef.current(300));
  };

  useEffect(() => {
    if (prefersReduced) return;
    startRef.current(1000);
    return clearAll;
  }, [prefersReduced]);

  const statusColor = statusText.startsWith('✗')
    ? '#EF4444'
    : statusText.startsWith('✓')
    ? (isDark ? '#22C55E' : '#4CAF7A')
    : (isDark ? '#9CA3AF' : '#64748B');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="w-full px-0 mb-0"
      role="img"
      aria-label="Animated CI/CD pipeline showing code, build, tests, integration, QA gate, and deployment stages"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-3" aria-hidden="true">
        <div className="flex gap-1.5 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50 border border-green-500/40" />
        </div>
        <span className="text-[10px] font-mono text-[#4CAF7A] dark:text-[#9CA3AF] tracking-widest uppercase select-none">
          ci / cd · pipeline
        </span>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.07)] bg-[#F8FAFC]/80 dark:bg-[rgba(255,255,255,0.03)] overflow-x-auto">
        <div className="p-5 sm:p-6">
          {/* Stage row */}
          <div className="flex items-start justify-center min-w-[320px]">
            {STAGES.map((stage, i) => (
              <div key={stage.label} className="flex items-start">
                <PipelineNode
                  label={stage.label}
                  Icon={stage.Icon}
                  status={statuses[i]}
                  reduced={prefersReduced}
                  isDark={isDark}
                />
                {i < N - 1 && (
                  <PipelineConnector
                    active={statuses[i] === 'pass'}
                    reduced={prefersReduced}
                    isDark={isDark}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div
            className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[rgba(255,255,255,0.07)]"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.p
              key={statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] sm:text-xs font-mono"
              style={{ color: statusColor }}
            >
              {'$ '}{statusText}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
