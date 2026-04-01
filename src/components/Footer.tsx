import { Linkedin, Github, Mail, Terminal, Loader, Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchSocialLinks, fetchPortfolioSettings, SocialLink, PortfolioSettings } from '../lib/supabase';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Github,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
};

const defaultSocialLinks: SocialLink[] = [
  {
    id: '1',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/jsurya860',
    icon_type: 'Linkedin',
    display_order: 1,
  },
  {
    id: '2',
    platform: 'GitHub',
    url: 'https://github.com/jsurya860',
    icon_type: 'Github',
    display_order: 2,
  },
  {
    id: '3',
    platform: 'Email',
    url: 'mailto:jsurya860@gmail.com',
    icon_type: 'Mail',
    display_order: 3,
  },
];

const defaultSettings: PortfolioSettings = {
  id: 'default',
  site_title: 'Surya - QA Engineer',
  site_title_alternate: 'QA Engineer',
  site_description: 'Quality Assurance Engineer',
  email: 'jsurya860@gmail.com',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [settings, setSettings] = useState<PortfolioSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [links, sett] = await Promise.all([fetchSocialLinks(), fetchPortfolioSettings()]);

      if (links && links.length > 0) setSocialLinks(links);
      if (sett) setSettings(sett);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <footer className="relative py-12 px-6 border-t border-[#E2E8F0]">
        <div className="absolute inset-0 bg-primary" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative py-16 px-6 border-t border-card bg-primary overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 pointer-events-none opacity-40 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(76,175,122,0.14), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-y-1/2 pointer-events-none opacity-30 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Main three-column row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start">

          {/* Brand col */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(76,175,122,0.12)', border: '1px solid rgba(76,175,122,0.25)' }}>
                <Terminal className="w-4 h-4 text-[#4CAF7A] dark:text-[#22C55E]" />
              </div>
              <span className="text-base font-bold text-primary tracking-tight">
                {settings.site_title.split(' - ')[0]}
              </span>
            </div>
            <p className="text-sm font-medium text-[#4B5563] dark:text-[#9CA3AF]">
              {settings.site_description}
            </p>
            <p className="text-xs text-[#9CA3AF] dark:text-[#6B7280] mt-1.5 italic leading-relaxed">
              Building reliable software,<br className="hidden md:block" /> one test at a time.
            </p>
          </div>

          {/* Quick links col */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF] dark:text-[#4B5563]">
              Quick Links
            </p>
            <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {['About', 'Projects', 'Experience', 'Education', 'Contact'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-sm text-[#6B7280] dark:text-[#6B7280] hover:text-[#4CAF7A] dark:hover:text-[#22C55E] transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect col */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF] dark:text-[#4B5563]">
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const IconComponent = socialIconMap[link.icon_type] || Mail;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 glass-card rounded-xl hover:border-[var(--accent-primary)] hover:shadow-[0_0_14px_var(--glow-green)] hover:text-[#4CAF7A] dark:hover:text-[#22C55E] transition-all duration-200 group"
                    aria-label={link.platform}
                  >
                    <IconComponent className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4CAF7A] dark:group-hover:text-[#22C55E] transition-colors" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-[#C4C4C4] dark:text-[#4B5563]">
              {settings.email}
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0] dark:border-[rgba(91,130,186,0.08)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#9CA3AF] dark:text-[#4B5563]">
              © {currentYear} {settings.site_title.split(' - ')[0]}. All rights reserved.
            </span>
            <div className="flex items-center gap-4 text-xs text-[#9CA3AF] dark:text-[#4B5563]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF7A] dark:bg-[#22C55E] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4CAF7A] dark:bg-[#22C55E]" />
                </span>
                <span>All systems operational</span>
              </div>
              <span className="hidden sm:inline text-[#D1D5DB] dark:text-[#374151]">·</span>
              <span className="hidden sm:inline">Crafted with precision &amp; care</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
