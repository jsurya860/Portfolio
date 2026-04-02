import { Star, GitFork, ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchGithubRepos, type GithubRepo, GITHUB_LANG_COLORS } from '../lib/github';
import { motion } from 'framer-motion';

const ProjectSkeleton = () => (
  <div className="group glass-card rounded-2xl p-7 animate-pulse border-[var(--border-subtle)]">
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--glow-green)] rounded-xl opacity-20" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-[var(--text-tertiary)] opacity-20 rounded" />
            <div className="h-3 w-16 bg-[var(--text-tertiary)] opacity-10 rounded" />
          </div>
        </div>
        <div className="w-8 h-8 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg opacity-20" />
      </div>
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-4 w-full bg-[var(--text-tertiary)] opacity-10 rounded" />
        <div className="h-4 w-5/6 bg-[var(--text-tertiary)] opacity-10 rounded" />
      </div>
      <div className="flex items-center gap-6 pt-4 border-t border-[var(--border-subtle)]">
        <div className="h-3 w-12 bg-[var(--text-tertiary)] opacity-20 rounded" />
        <div className="h-3 w-12 bg-[var(--text-tertiary)] opacity-20 rounded" />
      </div>
    </div>
  </div>
);

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const githubData = await fetchGithubRepos('jsurya860');
      if (githubData && githubData.length > 0) setRepos(githubData);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative bg-[var(--bg-primary)] overflow-hidden transition-colors duration-500">
      {/* System Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[var(--accent-primary)] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-[var(--accent-secondary)] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-[var(--text-primary)]">
            Project <span className="text-[var(--accent-primary)]">Exhibits</span>
          </h2>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mx-auto rounded-full shadow-[0_0_10px_var(--glow-green)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
          ) : (
            repos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group glass-card rounded-2xl p-7 hover:border-[var(--accent-primary)] transition-all duration-500 hover:shadow-[0_12px_40px_var(--glow-green)]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--glow-green)] border border-[var(--accent-primary)]/20 rounded-xl flex items-center justify-center text-[var(--accent-primary)]">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] truncate max-w-[200px]">
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: GITHUB_LANG_COLORS[repo.language] || 'var(--text-tertiary)' }}
                          />
                          <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">{repo.language}</span>
                        </div>
                      </div>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all font-bold text-xs flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Code
                    </a>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {repo.description || "Building reliable software tools that help ensure applications are fast, secure, and work perfectly for every user."}
                  </p>

                  <div className="flex items-center gap-6 pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="font-mono">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                      <GitFork className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span className="font-mono">{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
