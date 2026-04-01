import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  LogOut, Save, AlertCircle, X, Settings, Sun, Moon,
  Layout, User, Briefcase, Award, GraduationCap, Bug,
  Share2, Plus, Trash2, ChevronRight, Eye, ChevronLeft, Menu
} from 'lucide-react';
import {
  supabase, HeroContent, AboutContent, QAProject, Achievement, Education, Skill, TechStack, SocialLink, PortfolioSettings,
  fetchHeroContent, fetchAboutContent, fetchProjects, fetchAchievements, fetchEducation, fetchSkills, fetchTechStack, fetchSocialLinks, fetchPortfolioSettings,
  updateHeroContent, updateAboutContent, upsertProject, deleteProject, upsertAchievement, deleteAchievement,
  upsertEducation, deleteEducation, upsertSkill, deleteSkill, upsertTechStack, deleteTechStack,
  upsertSocialLink, deleteSocialLink, updatePortfolioSettings,
  resetHeroData, resetAboutData, resetProjectsData, resetAchievementsData, resetEducationData, resetSkillsData, resetTechStackData, resetSocialLinksData, resetSettingsData
} from '../lib/supabase';

type Tab = 'hero' | 'about' | 'achievements' | 'projects' | 'education' | 'social' | 'settings';

export default function Admin() {
  const { isDark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMob = window.innerWidth <= 1024;
      setIsMobile(isMob);
      if (isMob) setIsSidebarCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Content States
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [projects, setProjects] = useState<QAProject[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    setLoading(true);
    const [h, a, p, ach, edu, s, t, soc, sett] = await Promise.all([
      fetchHeroContent(),
      fetchAboutContent(),
      fetchProjects(),
      fetchAchievements(),
      fetchEducation(),
      fetchSkills(),
      fetchTechStack(),
      fetchSocialLinks(),
      fetchPortfolioSettings()
    ]);
    setHeroContent(h);
    setAboutContent(a);
    setProjects(p);
    setAchievements(ach);
    setEducation(edu);
    setSkills(s);
    setTechStack(t);
    setSocialLinks(soc);
    setSettings(sett);
    setLoading(false);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: Tab, label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (isMobile) setIsSidebarCollapsed(true);
      }}
      className={`w-full flex items-center transition-all ${activeTab === id
        ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_4px_12px_rgba(34,197,94,0.15)]'
        : 'text-secondary hover:bg-emerald-500/[0.05] hover:text-primary'
        } ${isSidebarCollapsed ? 'justify-center py-4 rounded-xl' : 'gap-3 px-4 py-3 rounded-lg'}`}
      title={isSidebarCollapsed ? label : ''}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!isSidebarCollapsed && <span className="font-medium truncate">{label}</span>}
      {!isSidebarCollapsed && activeTab === id && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm animate-pulse">Initializing Admin System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white flex">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-[50]' : 'relative'}
        ${isSidebarCollapsed ? (isMobile ? '-translate-x-full' : 'w-24') : (isMobile ? 'translate-x-0 w-72' : 'w-64')}
        bg-primary border-r border-card 
        ${isSidebarCollapsed ? 'px-3' : 'px-6'} py-6 
        flex flex-col gap-8 transition-all duration-300 flex-shrink-0 shadow-2xl group/sidebar
      `}>
        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : 'px-2 mb-2'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Settings className="w-5 h-5 text-[#0F172A]" />
            </div>
            {!isSidebarCollapsed && <h1 className="text-xl font-bold tracking-tight truncate">Admin Console</h1>}
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="hero" label="Hero Section" icon={Layout} />
          <SidebarItem id="about" label="About Me" icon={User} />
          <SidebarItem id="achievements" label="Achievements" icon={Award} />
          <SidebarItem id="projects" label="Projects" icon={Briefcase} />
          <SidebarItem id="education" label="Education" icon={GraduationCap} />
          <SidebarItem id="social" label="Social Links" icon={Share2} />
          <SidebarItem id="settings" label="Site Settings" icon={Settings} />
        </nav>

        <div className="pt-6 border-t border-card">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center transition-all text-red-400 hover:bg-red-500/10 rounded-xl ${isSidebarCollapsed ? 'justify-center py-4' : 'gap-3 px-4 py-3'}`}
            title={isSidebarCollapsed ? 'Sign Out' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex-shrink-0 h-20 border-b border-card flex items-center justify-between px-6 md:px-8 bg-primary/90 backdrop-blur-xl z-20 min-w-0 shadow-sm sticky top-0">
          <div className="flex items-center gap-4 min-w-0 w-full overflow-hidden">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-emerald-500/[0.05] rounded-lg text-secondary hover:text-primary transition-all flex-shrink-0 group active:scale-95"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ?
                <Menu className="w-5 h-5 group-hover:text-green-400 transition-colors" /> :
                <ChevronLeft className="w-5 h-5 group-hover:text-green-400 transition-colors" />
              }
            </button>

            <div className="flex flex-col justify-center overflow-hidden min-w-0">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider truncate text-primary">
                {activeTab} Management
              </h2>
            </div>

            <div className="ml-auto flex items-center gap-3 flex-shrink-0">
              {saving && (
                <div className="flex items-center gap-3 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-xs font-mono text-green-400 tracking-wider hidden sm:inline">SYNCING_DATA...</span>
                </div>
              )}
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-emerald-500/[0.08] text-secondary hover:text-[#22c55e] dark:hover:text-emerald-400 transition-all"
                title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 lg:p-12 relative bg-gradient-to-br from-[#F8FAFC] dark:from-[#0F172A] to-[#F1F5F9] dark:to-[#111827]">
          {message && (
            <div className={`fixed top-24 right-8 z-50 p-4 rounded-lg flex items-center gap-3 shadow-2xl transition-all ${message.type === 'success' ? 'bg-green-900/90 border border-green-500 text-green-100' : 'bg-red-900/90 border border-red-500 text-red-100'
              }`}>
              <AlertCircle className="w-5 h-5" />
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-[1600px] mx-auto px-2 md:px-4">
            {/* Editor Side */}
            <div className="space-y-6 md:space-y-8">
              <SectionEditor
                activeTab={activeTab}
                data={{ heroContent, aboutContent, projects, achievements, education, skills, techStack, socialLinks, settings }}
                setData={{ setHeroContent, setAboutContent, setProjects, setAchievements, setEducation, setSkills, setTechStack, setSocialLinks, setSettings }}
                showMessage={showMessage}
                setSaving={setSaving}
                refresh={loadAllContent}
              />
            </div>

            {/* Preview Side */}
            <div className="space-y-6 md:space-y-8">
              <div className="sticky top-0">
                <div className="flex items-center gap-2 mb-4 text-secondary font-mono text-xs uppercase tracking-widest">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </div>
                <div className="bg-primary rounded-xl border border-card p-6 md:p-8 max-h-[calc(100vh-200px)] h-auto overflow-y-auto shadow-inner custom-scrollbar sticky top-4 mb-8">
                  <SectionPreview activeTab={activeTab} data={{ heroContent, aboutContent, projects, achievements, education, skills, techStack, socialLinks, settings }} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Sub-components ---

function SectionEditor({ activeTab, data, setData, showMessage, setSaving, refresh }: any) {
  const handleSave = async (fn: any, payload: any, stateSetter?: any) => {
    setSaving(true);
    const result = await fn(payload);
    setSaving(false);
    if (result) {
      if (stateSetter) stateSetter(result);
      showMessage('success', 'Changes saved and deployed successfully!');
    } else {
      showMessage('error', 'Critical failure: Synchronization error.');
    }
  };

  const handleReset = async (fn: any, label: string) => {
    if (confirm(`Are you sure you want to reset all ${label} data to defaults? This will permanently delete your custom entries.`)) {
      setSaving(true);
      const success = await fn();
      setSaving(false);
      if (success) {
        showMessage('success', `${label} reset to defaults.`);
        refresh();
      } else {
        showMessage('error', `Failed to reset ${label}.`);
      }
    }
  };

  switch (activeTab) {
    case 'hero':
      return (
        <div className="bg-secondary rounded-xl p-6 md:p-8 border border-card space-y-6 shadow-xl hover:border-gray-600/50 transition-all duration-300">
          <div className="space-y-3">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Headline</label>
            <input
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.heroContent?.headline || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, headline: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Subheadline</label>
            <input
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.heroContent?.subheadline || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, subheadline: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Main Description</label>
            <textarea
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none min-h-[120px]"
              value={data.heroContent?.description || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">CTA Text</label>
              <input
                className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.heroContent?.cta_text || ''}
                onChange={e => setData.setHeroContent({ ...data.heroContent, cta_text: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Button Text</label>
              <input
                className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.heroContent?.cta_button_text || ''}
                onChange={e => setData.setHeroContent({ ...data.heroContent, cta_button_text: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => handleSave(updateHeroContent, data.heroContent)}
              className="flex-grow py-4 bg-green-500 text-[#0F172A] font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Deploy Hero Changes
            </button>
            <button
              onClick={() => handleReset(resetHeroData, 'Hero')}
              className="p-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
              title="Reset to Defaults"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    case 'about':
      return (
        <div className="bg-secondary rounded-xl p-6 md:p-8 border border-card space-y-6 shadow-xl hover:border-gray-600/50 transition-all duration-300">
          <div className="space-y-3">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Profile Summary</label>
            <textarea
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none min-h-[100px]"
              value={data.aboutContent?.summary || ''}
              onChange={e => setData.setAboutContent({ ...data.aboutContent, summary: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Testing Approach</label>
            <textarea
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none min-h-[100px]"
              value={data.aboutContent?.approach || ''}
              onChange={e => setData.setAboutContent({ ...data.aboutContent, approach: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Exp Years</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.experience_years || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, experience_years: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Success Rate (%)</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.success_rate || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, success_rate: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Tests Written</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.tests_written || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, tests_written: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Bugs Found</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.bugs_found || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, bugs_found: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Test Coverage (%)</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.test_coverage || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, test_coverage: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Projects Delivered</label>
              <input type="number" className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.projects_delivered || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, projects_delivered: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="pt-8 border-t border-card space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-secondary uppercase font-mono tracking-widest">Core Competencies</h4>
                <button
                  onClick={() => handleReset(resetSkillsData, 'Skills')}
                  className="px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-mono transition-all"
                >
                  RESET SKILLS
                </button>
              </div>
              <CRUDList
                items={data.skills}
                onUpsert={upsertSkill}
                onDelete={deleteSkill}
                refresh={() => fetchSkills().then(setData.setSkills)}
                fields={['name', 'icon_type', 'color', 'display_order']}
                label="Core Skill"
                showMessage={showMessage}
                setSaving={setSaving}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-secondary uppercase font-mono tracking-widest">Technology Stack</h4>
                <button
                  onClick={() => handleReset(resetTechStackData, 'Tech Stack')}
                  className="px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-mono transition-all"
                >
                  RESET TECH
                </button>
              </div>
              <CRUDList
                items={data.techStack}
                onUpsert={upsertTechStack}
                onDelete={deleteTechStack}
                refresh={() => fetchTechStack().then(setData.setTechStack)}
                fields={['name', 'icon_type', 'display_order']}
                defaults={{ icon_type: 'Code2', display_order: 1 }}
                label="Tech Stack Item"
                showMessage={showMessage}
                setSaving={setSaving}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-card">
            <button
              onClick={() => handleSave(updateAboutContent, data.aboutContent)}
              className="flex-grow py-4 bg-[#22C55E] text-[#0F172A] font-bold rounded-lg hover:bg-[#16A34A] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Sync About Section
            </button>
            <button
              onClick={() => handleReset(resetAboutData, 'About')}
              className="p-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
              title="Reset to Defaults"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    case 'projects':
      return (
        <div className="space-y-4">
          <CRUDList
            items={data.projects}
            onUpsert={upsertProject}
            onDelete={deleteProject}
            refresh={() => fetchProjects().then(setData.setProjects)}
            fields={['ticket_id', 'name', 'role', 'status', 'outcome', 'icon_type', 'color']}
            label="Project"
            showMessage={showMessage}
            setSaving={setSaving}
          />
          <button
            onClick={() => handleReset(resetProjectsData, 'Projects')}
            className="w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs font-mono uppercase tracking-widest border border-red-500/20"
          >
            Reset All Projects to Demo
          </button>
        </div>
      );
    case 'achievements':
      return (
        <div className="space-y-4">
          <CRUDList
            items={data.achievements}
            onUpsert={upsertAchievement}
            onDelete={deleteAchievement}
            refresh={() => fetchAchievements().then(setData.setAchievements)}
            fields={['title', 'metric', 'description', 'status', 'icon_type', 'color', 'display_order']}
            defaults={{ status: 'COMPLETED', icon_type: 'Award', color: 'blue', display_order: 1 }}
            label="Achievement"
            showMessage={showMessage}
            setSaving={setSaving}
          />
          <button
            onClick={() => handleReset(resetAchievementsData, 'Achievements')}
            className="w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs font-mono uppercase tracking-widest border border-red-500/20"
          >
            Reset All Achievements to Demo
          </button>
        </div>
      );
    case 'education':
      return (
        <div className="space-y-4">
          <CRUDList
            items={data.education}
            onUpsert={upsertEducation}
            onDelete={deleteEducation}
            refresh={() => fetchEducation().then(setData.setEducation)}
            fields={['title', 'subtitle', 'institution', 'date', 'type', 'icon_type', 'color', 'display_order']}
            defaults={{ type: 'course', icon_type: 'GraduationCap', color: 'cyan', display_order: 1 }}
            label="Timeline Item"
            showMessage={showMessage}
            setSaving={setSaving}
          />
          <button
            onClick={() => handleReset(resetEducationData, 'Education')}
            className="w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs font-mono uppercase tracking-widest border border-red-500/20"
          >
            Reset Education Timeline
          </button>
        </div>
      );
    case 'social':
      return (
        <div className="space-y-4">
          <CRUDList
            items={data.socialLinks}
            onUpsert={upsertSocialLink}
            onDelete={deleteSocialLink}
            refresh={() => fetchSocialLinks().then(setData.setSocialLinks)}
            fields={['platform', 'url', 'icon_type', 'display_order']}
            defaults={{ platform: 'Twitter', icon_type: 'Twitter', display_order: 1 }}
            label="Social Link"
            showMessage={showMessage}
            setSaving={setSaving}
          />
          <button
            onClick={() => handleReset(resetSocialLinksData, 'Social Links')}
            className="w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs font-mono uppercase tracking-widest border border-red-500/20"
          >
            Reset Social Links
          </button>
        </div>
      );
    case 'settings':
      return (
        <div className="bg-secondary rounded-xl p-8 border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Site Title (Primary)</label>
              <input
                className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.settings?.site_title || ''}
                onChange={e => setData.setSettings({ ...data.settings, site_title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Site Title (Alternate)</label>
              <input
                className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.settings?.site_title_alternate || ''}
                onChange={e => setData.setSettings({ ...data.settings, site_title_alternate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Site Description</label>
            <input
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.settings?.site_description || ''}
              onChange={e => setData.setSettings({ ...data.settings, site_description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-[#374151] dark:text-[#6B7280] uppercase font-mono">Public Email</label>
            <input
              className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.settings?.email || ''}
              onChange={e => setData.setSettings({ ...data.settings, email: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleSave(updatePortfolioSettings, data.settings)}
              className="flex-grow py-4 bg-[#22C55E] text-[#0F172A] font-bold rounded-lg hover:bg-[#16A34A] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Update Global Settings
            </button>
            <button
              onClick={() => handleReset(resetSettingsData, 'Settings')}
              className="p-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
              title="Reset Settings"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function CRUDList({ items, onUpsert, onDelete, refresh, fields, label, showMessage, setSaving, defaults = {} }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({ ...defaults });
  };

  const handleSubmit = async () => {
    if (setSaving) setSaving(true);
    try {
      const res = await onUpsert(formData);
      if (res) {
        setEditingId(null);
        refresh();
        if (showMessage) showMessage('success', `${label} synchronization successful.`);
      } else {
        if (showMessage) showMessage('error', `Critical failure: Could not save ${label.toLowerCase()}.`);
      }
    } catch (error) {
      if (showMessage) showMessage('error', `Network error while saving ${label.toLowerCase()}.`);
    } finally {
      if (setSaving) setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Permanently delete this ${label.toLowerCase()}?`)) {
      if (setSaving) setSaving(true);
      try {
        const res = await onDelete(id);
        if (res) {
          refresh();
          if (showMessage) showMessage('success', `${label} deleted successfully.`);
        } else {
          if (showMessage) showMessage('error', `Failed to delete ${label.toLowerCase()}.`);
        }
      } catch (error) {
        if (showMessage) showMessage('error', `Network error while deleting ${label.toLowerCase()}.`);
      } finally {
        if (setSaving) setSaving(false);
      }
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-8 border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#E5E7EB]">{label}s Management</h3>
        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-[#0F172A] rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-400 transition-all">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id} className="bg-primary border border-card p-4 rounded-xl flex items-center justify-between group hover:border-green-500/30 transition-all overflow-hidden">
            <div className="flex-grow min-w-0">
              <div className="font-bold text-primary truncate pr-4" title={item[fields[1]] || item[fields[0]]}>
                {item[fields[1]] || item[fields[0]]}
              </div>
              <div className="text-xs text-[#374151] dark:text-[#6B7280] font-mono mt-1 opacity-60 truncate">
                {item[fields[0]] !== (item[fields[1]] || item[fields[0]]) ? item[fields[0]] : item.id.slice(0, 8)}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 text-secondary hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-[#374151] dark:text-[#6B7280] italic text-sm border-2 border-dashed border-card rounded-xl">
            No {label.toLowerCase()}s found.
          </div>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-secondary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-2xl font-bold">{editingId === 'new' ? `Create ${label}` : `Edit ${label}`}</h4>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-emerald-500/[0.05] rounded-full"><X /></button>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {fields.map((f: string) => (
                <div key={f} className="space-y-1.5">
                  <label className="text-xs text-[#374151] dark:text-[#6B7280] font-mono uppercase tracking-wider">{f.replace('_', ' ')}</label>
                  {f === 'icon_type' ? (
                    <select
                      className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-xl text-sm focus:border-green-500 outline-none transition-all appearance-none"
                      value={formData[f] || ''}
                      onChange={e => setFormData({ ...formData, [f]: e.target.value })}
                    >
                      <option value="" disabled>Select Icon</option>
                      {['CheckCircle2', 'Code2', 'Shield', 'Zap', 'Bug', 'BarChart3', 'Award', 'GraduationCap', 'Share2', 'Twitter', 'Linkedin', 'Github', 'Mail', 'Facebook', 'Instagram', 'Youtube', 'Globe', 'Database', 'Server', 'Terminal', 'Cpu', 'Cloud', 'Smartphone', 'Layers', 'Box', 'Monitor', 'GitBranch'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : f === 'color' ? (
                    <select
                      className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-xl text-sm focus:border-green-500 outline-none transition-all appearance-none"
                      value={formData[f] || ''}
                      onChange={e => setFormData({ ...formData, [f]: e.target.value })}
                    >
                      <option value="" disabled>Select Color</option>
                      {['green', 'blue', 'yellow', 'purple', 'red', 'cyan'].map(opt => (
                        <option key={opt} value={opt} style={{ color: opt === 'yellow' ? '#EAB308' : opt }}>{opt.toUpperCase()}</option>
                      ))}
                    </select>
                  ) : f === 'status' ? (
                    <select
                      className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-xl text-sm focus:border-green-500 outline-none transition-all appearance-none"
                      value={formData[f] || ''}
                      onChange={e => setFormData({ ...formData, [f]: e.target.value })}
                    >
                      <option value="" disabled>Select Status</option>
                      {['PASSED', 'FAILED', 'IN_PROGRESS', 'COMPLETED', 'PENDING', 'STABLE'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.includes('order') || f.includes('rate') || f.includes('written') || f.includes('found') || f.includes('coverage') ? 'number' : 'text'}
                      className="w-full bg-primary border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-4 rounded-xl text-sm focus:border-green-500 outline-none transition-all"
                      value={formData[f] || ''}
                      onChange={e => setFormData({
                        ...formData,
                        [f]: (f.includes('order') || f.includes('rate') || f.includes('written') || f.includes('found') || f.includes('coverage'))
                          ? (parseFloat(e.target.value) || 0)
                          : e.target.value
                      })}
                      placeholder={`Enter ${f.replace('_', ' ')}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <button onClick={() => setEditingId(null)} className="flex-grow py-4 bg-secondary text-[#475569] dark:text-[#D1D5DB] font-bold rounded-xl hover:bg-secondary transition-all">Cancel</button>
              <button onClick={handleSubmit} className="flex-grow py-4 bg-green-500 text-[#0F172A] font-bold rounded-xl hover:bg-green-400 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const previewColorMap: Record<string, { bg: string; border: string; text: string }> = {
  green:  { bg: 'bg-emerald-500/10',  border: 'border-emerald-500/25', text: 'text-emerald-400' },
  red:    { bg: 'bg-red-500/10',      border: 'border-red-500/25',     text: 'text-red-400' },
  blue:   { bg: 'bg-blue-500/10',     border: 'border-blue-500/25',    text: 'text-blue-400' },
  purple: { bg: 'bg-purple-500/10',   border: 'border-purple-500/25',  text: 'text-purple-400' },
  cyan:   { bg: 'bg-cyan-500/10',     border: 'border-cyan-500/25',    text: 'text-cyan-400' },
  yellow: { bg: 'bg-yellow-500/10',   border: 'border-yellow-500/25',  text: 'text-yellow-400' },
};

const previewStatusColors: Record<string, string> = {
  PASSED:      'text-green-400 border-green-400/30 bg-green-500/10',
  FAILED:      'text-red-400 border-red-400/30 bg-red-500/10',
  IN_PROGRESS: 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10',
  CRITICAL:    'text-red-400 border-red-400/30 bg-red-500/10',
  HIGH:        'text-yellow-400 border-yellow-400/30 bg-yellow-500/10',
  MEDIUM:      'text-blue-400 border-blue-400/30 bg-blue-500/10',
};

function SectionPreview({ activeTab, data }: any) {
  switch (activeTab) {
    case 'hero':
      return (
        <div className="bg-primary rounded-xl overflow-hidden p-6 space-y-4">
          {/* Online badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] dark:border-[rgba(34,197,94,0.25)] bg-card w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] font-mono font-semibold text-[#475569] dark:text-[#22C55E] tracking-widest uppercase">QA System · Online</span>
          </div>
          {/* Name */}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-primary leading-none">
              {data.heroContent?.headline || 'Surya Joshi'}
              <span className="inline-block w-[3px] h-[0.85em] bg-accent-primary ml-1 align-middle" />
            </h1>
            <div className="mt-1 text-sm font-mono font-semibold text-accent-primary tracking-wide">
              {data.heroContent?.subheadline || 'QA Engineer'}
            </div>
          </div>
          {/* Status ticker */}
          <div className="flex items-center gap-2 font-mono text-xs border border-card bg-card rounded-xl px-4 py-2 w-fit">
            <span className="text-[10px] text-accent-primary">▶</span>
            <span className="text-[#22c55e] font-medium">Running test suite...</span>
          </div>
          {/* Description */}
          <p className="text-sm text-secondary leading-relaxed">
            {data.heroContent?.description}
          </p>
          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-white rounded-xl font-bold text-sm shadow-[0_0_16px_rgba(34,197,94,0.3)]">
              <Bug className="w-4 h-4" />{data.heroContent?.cta_text || 'Raise a Ticket'}
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.15)] text-[#0F172A] dark:text-[#D1D5DB] rounded-xl font-bold text-sm">
              {data.heroContent?.cta_button_text || 'View Test Report'}
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { label: 'Test Coverage', value: '92%', hex: '#22c55e' },
              { label: 'Bugs Resolved', value: '150+', hex: '#f59e0b' },
              { label: 'Automation', value: '40%↑', hex: '#38bdf8' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-card bg-card p-3 text-center">
                <div className="text-lg font-black font-mono" style={{ color: s.hex }}>{s.value}</div>
                <div className="text-[10px] font-mono text-[#16A34A] dark:text-[#9CA3AF] mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="bg-primary rounded-xl p-6 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Heading */}
          <h2 className="text-2xl font-black tracking-tight text-primary">
            About <span className="text-accent-primary">Me</span>
          </h2>
          {/* Summary */}
          <div className="bg-card border border-card rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-2">Summary</h4>
            <p className="text-sm text-[#475569] dark:text-[#D1D5DB] leading-relaxed">{data.aboutContent?.summary}</p>
          </div>
          {/* Approach */}
          <div className="bg-card border border-card rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-2">Approach</h4>
            <p className="text-sm text-[#475569] dark:text-[#D1D5DB] leading-relaxed">{data.aboutContent?.approach}</p>
          </div>
          {/* Core Competencies */}
          <div className="bg-card border border-card rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-4 text-primary">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill: any) => (
                <div key={skill.id} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] dark:bg-[rgba(255,255,255,0.03)] border border-card">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${previewColorMap[skill.color]?.text || 'text-emerald-400'}`} style={{ backgroundColor: 'currentColor' }} />
                  <span className="text-xs font-medium text-[#0F172A] dark:text-[#D1D5DB] truncate">{skill.name}</span>
                </div>
              ))}
            </div>
            {/* Tech Stack */}
            <div className="mt-5 pt-4 border-t border-card">
              <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {data.techStack.map((tech: any) => (
                  <span key={tech.id} className="px-2.5 py-1 bg-[#F8FAFC] dark:bg-[rgba(255,255,255,0.05)] border border-card rounded-lg text-xs text-[#0F172A] dark:text-[#D1D5DB]">{tech.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'achievements':
      return (
        <div className="bg-secondary rounded-xl p-6 overflow-y-auto custom-scrollbar space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-primary">
            Key <span className="text-accent-primary">Achievements</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.achievements.map((a: any) => {
              const c = previewColorMap[a.color] || previewColorMap.blue;
              return (
                <div key={a.id} className={`group bg-card border border-card rounded-2xl p-5 hover:border-[#CBD5E1] dark:hover:border-[rgba(255,255,255,0.12)] transition-all`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${c.text} p-2 rounded-xl ${c.bg}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${c.bg} border ${c.border} ${c.text}`}>{a.status}</div>
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-primary">{a.title}</h3>
                  <div className={`text-lg font-black mb-2 ${c.text}`}>{a.metric}</div>
                  <p className="text-xs text-secondary leading-relaxed">{a.description}</p>
                </div>
              );
            })}
          </div>
          {/* Impact summary bar */}
          <div className="bg-card border border-card rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-widest mb-4">Impact Summary</h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div><div className="text-xl font-black text-accent-primary">{data.aboutContent?.tests_written?.toLocaleString()}+</div><div className="text-[10px] text-[#6B7280]">Test Cases</div></div>
              <div><div className="text-xl font-black text-primary">{data.aboutContent?.test_coverage}%</div><div className="text-[10px] text-[#6B7280]">Coverage</div></div>
              <div><div className="text-xl font-black text-primary">{data.aboutContent?.projects_delivered}+</div><div className="text-[10px] text-[#6B7280]">Projects</div></div>
              <div><div className="text-xl font-black text-primary">{data.aboutContent?.success_rate}%</div><div className="text-[10px] text-[#6B7280]">Defect Detection</div></div>
            </div>
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="bg-secondary rounded-xl p-6 overflow-y-auto custom-scrollbar space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-primary">
            Project <span className="text-accent-primary">Portfolio</span>
          </h2>
          <div className="space-y-4">
            {data.projects.map((p: any) => {
              const c = previewColorMap[p.color] || previewColorMap.blue;
              const priorityStyle = previewStatusColors[p.priority] || previewStatusColors.MEDIUM;
              const statusStyle = previewStatusColors[p.status] || previewStatusColors.PASSED;
              return (
                <div key={p.id} className="group bg-card border border-card rounded-2xl p-5 hover:border-[#CBD5E1] dark:hover:border-[rgba(255,255,255,0.12)] transition-all">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-10 h-10 ${c.bg} border ${c.border} ${c.text} rounded-xl flex items-center justify-center shrink-0`}>
                      <Layout className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[#22c55e] font-mono text-[10px] px-1.5 py-0.5 bg-green-500/10 rounded border border-green-500/20">{p.ticket_id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityStyle}`}>{p.priority}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle}`}>{p.status}</span>
                      </div>
                      <h3 className="text-sm font-bold text-primary">{p.name}</h3>
                      <div className="text-xs text-[#6B7280] font-mono mt-0.5">{p.role}</div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400 mb-3">
                    {p.outcome}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(p.tools || []).slice(0, 4).map((tool: string) => (
                      <span key={tool} className="px-2 py-0.5 bg-card border border-card rounded-lg text-[10px] text-secondary">{tool}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'education':
      return (
        <div className="bg-primary rounded-xl p-6 overflow-y-auto custom-scrollbar space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-primary">
            Education & <span className="text-accent-primary">Timeline</span>
          </h2>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.06)]" />
            <div className="space-y-6">
              {data.education.map((edu: any) => {
                const c = previewColorMap[edu.color] || previewColorMap.blue;
                return (
                  <div key={edu.id} className="relative flex items-start gap-5 pl-8">
                    <div className={`absolute left-1.5 top-3 w-3 h-3 ${c.text} rounded-full border-2 border-[#F8FAFC] dark:border-[#0F172A] shadow-[0_0_8px_currentColor]`} style={{ backgroundColor: 'currentColor' }} />
                    <div className={`group p-5 bg-card border border-card rounded-2xl hover:bg-[#F1F5F9] dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-[#CBD5E1] dark:hover:border-[rgba(255,255,255,0.12)] transition-all w-full`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-xl ${c.bg} ${c.text}`}>
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-[#6B7280] font-mono">{edu.date}</span>
                        <span className="text-[10px] text-[#9CA3AF] dark:text-[#4B5563] font-mono uppercase ml-auto">{edu.type}</span>
                      </div>
                      <h3 className="text-sm font-bold text-primary mb-1">{edu.title}</h3>
                      <div className={`text-xs ${c.text} font-semibold mb-2`}>{edu.subtitle}</div>
                      <div className="text-xs text-[#475569] dark:text-[#6B7280] border-l border-card pl-3">{edu.institution}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 'social':
      return (
        <div className="bg-primary rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-primary">
            Social <span className="text-accent-primary">Links</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.socialLinks.map((link: any) => (
              <div key={link.id} className="flex items-center gap-4 p-4 bg-card border border-card rounded-2xl hover:border-[#CBD5E1] dark:hover:border-[rgba(255,255,255,0.12)] hover:bg-[#F1F5F9] dark:hover:bg-[rgba(255,255,255,0.05)] transition-all group">
                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center border border-card group-hover:border-[#CBD5E1] dark:group-hover:border-emerald-500/30 text-secondary group-hover:text-[#22c55e] dark:group-hover:text-emerald-400 transition-all">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-primary">{link.platform}</div>
                  <div className="text-xs text-[#374151] dark:text-[#6B7280] truncate">{link.url}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'settings':
      return (
        <div className="bg-primary rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-primary">
            Site <span className="text-accent-primary">Settings</span>
          </h2>
          <div className="border border-card rounded-2xl overflow-hidden shadow-lg">
            {/* Mock browser chrome */}
            <div className="bg-secondary border-b border-card p-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/40 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/40 border border-green-500/50" />
              </div>
              <div className="flex-grow bg-primary rounded-md py-1 px-3 text-[10px] text-[#374151] dark:text-[#6B7280] font-mono text-center truncate border border-card">
                https://surya-portfolio.dev
              </div>
            </div>
            {/* Mock page content */}
            <div className="bg-primary p-8 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[10px] font-mono text-green-400">QA System · Online</span>
              </div>
              <h1 className="text-2xl font-black text-primary">{data.settings?.site_title}</h1>
              <p className="text-secondary text-sm max-w-sm mx-auto">{data.settings?.site_description}</p>
              <div className="pt-6 border-t border-card">
                <p className="text-xs text-[#374151] dark:text-[#6B7280] font-mono">Contact: {data.settings?.email}</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
