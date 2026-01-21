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
      <footer className="relative py-12 px-6 border-t border-gray-800">
        <div className="absolute inset-0 bg-[#0a0e27]" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative py-12 px-6 border-t border-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0f1629] to-transparent" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 animate-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '250ms' }}>
              <Terminal className="w-5 h-5 text-green-400 zoom-animation" />
              <span className="text-lg sm:text-xl font-bold text-white break-words">{settings.site_title.split(' - ')[0]}</span>
            </div>
            <p className="text-sm text-gray-400 font-mono animate-slide-up break-words" style={{ animationDelay: '300ms' }}>
              {settings.site_description}
            </p>
            <p className="text-gray-500 text-xs mt-2 animate-slide-up" style={{ animationDelay: '350ms' }}>
              Building reliable software, one test at a time
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => {
              const IconComponent = socialIconMap[link.icon_type] || Mail;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-[#151b35] border border-gray-700 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 animate-bounce-in hover-lift"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                  aria-label={link.platform}
                >
                  <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left animate-fade-in hover:text-gray-300 transition-colors duration-300" style={{ animationDelay: '550ms' }}>
              <span className="font-mono text-xs break-words">
                © {currentYear} {settings.site_title.split(' - ')[0]}. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-gray-600 animate-pulse" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-glow-pulse" />
                <span>Status: All Systems Operational</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '650ms' }}>
            <p className="font-mono text-xs text-gray-600">
              [BUILD: v1.0.0] [LAST_DEPLOY: {new Date().toISOString().split('T')[0]}] [TEST_STATUS: PASSED]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
