import { useState, useEffect } from 'react';
import {
  LogOut, Save, AlertCircle, X, Settings,
  Layout, User, Briefcase, Award, GraduationCap, Bug,
  Share2, Plus, Trash2, ChevronRight, Eye, ChevronLeft, Menu
} from 'lucide-react';
import {
  supabase, HeroContent, AboutContent, QAProject, Achievement, Education, Skill, TechStack, SocialLink, PortfolioSettings,
  fetchHeroContent, fetchAboutContent, fetchProjects, fetchAchievements, fetchEducation, fetchSkills, fetchTechStack, fetchSocialLinks, fetchPortfolioSettings,
  updateHeroContent, updateAboutContent, upsertProject, deleteProject, upsertAchievement, deleteAchievement,
  upsertEducation, deleteEducation,
  upsertSocialLink, deleteSocialLink, updatePortfolioSettings,
  resetHeroData, resetAboutData, resetProjectsData, resetAchievementsData, resetEducationData, resetSkillsData, resetTechStackData, resetSocialLinksData, resetSettingsData,
  replaceSkills, replaceTechStack
} from '../lib/supabase';

type Tab = 'hero' | 'about' | 'achievements' | 'projects' | 'education' | 'social' | 'settings';

export default function Admin() {
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
        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
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
      <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm animate-pulse">Initializing Admin System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex">
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
        bg-[#10162a] border-r border-gray-800/50 
        ${isSidebarCollapsed ? 'px-3' : 'px-6'} py-6 
        flex flex-col gap-8 transition-all duration-300 flex-shrink-0 shadow-2xl group/sidebar
      `}>
        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : 'px-2 mb-2'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Settings className="w-5 h-5 text-[#0a0e27]" />
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

        <div className="pt-6 border-t border-gray-800">
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
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-4 md:px-8 bg-[#0a0e27]/80 backdrop-blur-md z-10 min-w-0">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 w-full overflow-hidden">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-green-400 transition-all -ml-2 flex-shrink-0"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
            <h2 className="text-base md:text-2xl font-bold capitalize truncate flex-grow">{activeTab} Management</h2>
            {saving && (
              <span className="flex items-center gap-2 text-sm text-yellow-400 font-mono flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Synchronizing...
              </span>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 lg:p-12 relative bg-gradient-to-br from-[#0a0e27] to-[#0f1629]">
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
                <div className="flex items-center gap-2 mb-4 text-gray-400 font-mono text-xs uppercase tracking-widest">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </div>
                <div className="bg-[#0f1629] rounded-xl border border-gray-800 p-6 md:p-8 max-h-[calc(100vh-200px)] h-auto overflow-y-auto shadow-inner custom-scrollbar sticky top-4 mb-8">
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

  const handleLocalUpsert = async (item: any, list: any[], setList: any) => {
    // Upsert into local state only
    if (item.id && !item.id.toString().startsWith('temp-')) {
      // Existing item being edited
      setList(list.map(i => i.id === item.id ? item : i));
    } else {
      // New item (or temp item ref)
      const newItem = { ...item, id: item.id || `temp-${Date.now()}` };
      setList([...list, newItem]);
    }
    return true; // Simulate success
  };

  const handleLocalDelete = async (id: string, list: any[], setList: any) => {
    // Delete from local state only
    setList(list.filter(i => i.id !== id));
    return true; // Simulate success
  };

  const handleBatchSync = async () => {
    setSaving(true);
    try {
      // 1. Save About Content
      await updateAboutContent({
        summary: '',
        approach: '',
        experience_years: 0,
        tests_written: 0,
        bugs_found: 0,
        success_rate: 0,
        test_coverage: 0,
        projects_delivered: 0,
        ...(data.aboutContent || {})
      });

      // 2. Batch Save Skills (Replace All)
      await replaceSkills(data.skills);

      // 3. Batch Save Tech Stack (Replace All)
      await replaceTechStack(data.techStack);

      showMessage('success', 'About section, Skills, and Tech Stack synced successfully!');
      refresh(); // Reload from DB to get canonical IDs
    } catch (e) {
      console.error(e);
      showMessage('error', 'Batch sync failed.');
    } finally {
      setSaving(false);
    }
  };

  switch (activeTab) {
    case 'hero':
      return (
        <div className="bg-[#1a1f3a] rounded-xl p-6 md:p-8 border border-gray-700/50 space-y-6 shadow-xl hover:border-gray-600/50 transition-all duration-300">
          <div className="space-y-3">
            <label className="text-xs text-gray-500 uppercase font-mono">Headline</label>
            <input
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.heroContent?.headline || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, headline: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs text-gray-500 uppercase font-mono">Subheadline</label>
            <input
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.heroContent?.subheadline || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, subheadline: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs text-gray-500 uppercase font-mono">Main Description</label>
            <textarea
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none min-h-[120px]"
              value={data.heroContent?.description || ''}
              onChange={e => setData.setHeroContent({ ...data.heroContent, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">CTA Text</label>
              <input
                className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.heroContent?.cta_text || ''}
                onChange={e => setData.setHeroContent({ ...data.heroContent, cta_text: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Button Text</label>
              <input
                className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.heroContent?.cta_button_text || ''}
                onChange={e => setData.setHeroContent({ ...data.heroContent, cta_button_text: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => handleSave(updateHeroContent, {
                headline: '',
                subheadline: '',
                description: '',
                cta_text: '',
                cta_button_text: '',
                ...(data.heroContent || {})
              })}
              className="flex-grow py-4 bg-green-500 text-[#0a0e27] font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
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
        <div className="bg-[#1a1f3a] rounded-xl p-6 md:p-8 border border-gray-700/50 space-y-6 shadow-xl hover:border-gray-600/50 transition-all duration-300">
          <div className="space-y-3">
            <label className="text-xs text-gray-500 uppercase font-mono">Profile Summary</label>
            <textarea
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none min-h-[100px]"
              value={data.aboutContent?.summary || ''}
              onChange={e => setData.setAboutContent({ ...data.aboutContent, summary: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase font-mono">Testing Approach</label>
            <textarea
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none min-h-[100px]"
              value={data.aboutContent?.approach || ''}
              onChange={e => setData.setAboutContent({ ...data.aboutContent, approach: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Exp Years</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.experience_years || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, experience_years: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Success Rate (%)</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.success_rate || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, success_rate: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Tests Written</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.tests_written || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, tests_written: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Bugs Found</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.bugs_found || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, bugs_found: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Test Coverage (%)</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.test_coverage || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, test_coverage: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Projects Delivered</label>
              <input type="number" className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.aboutContent?.projects_delivered || 0}
                onChange={e => setData.setAboutContent({ ...data.aboutContent, projects_delivered: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-400 uppercase font-mono tracking-widest">Core Competencies</h4>
                <button
                  onClick={() => handleReset(resetSkillsData, 'Skills')}
                  className="px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-mono transition-all"
                >
                  RESET SKILLS
                </button>
              </div>
              <CRUDList
                items={data.skills}
                onUpsert={(item: any) => handleLocalUpsert(item, data.skills, setData.setSkills)}
                onDelete={(id: string) => handleLocalDelete(id, data.skills, setData.setSkills)}
                refresh={() => { }}
                fields={['name', 'icon_type', 'color', 'display_order']}
                label="Core Skill"
                showMessage={null} // Suppress individual success messages
                setSaving={null} // Suppress saving spinner
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-400 uppercase font-mono tracking-widest">Technology Stack</h4>
                <button
                  onClick={() => handleReset(resetTechStackData, 'Tech Stack')}
                  className="px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-mono transition-all"
                >
                  RESET TECH
                </button>
              </div>
              <CRUDList
                items={data.techStack}
                onUpsert={(item: any) => handleLocalUpsert(item, data.techStack, setData.setTechStack)}
                onDelete={(id: string) => handleLocalDelete(id, data.techStack, setData.setTechStack)}
                refresh={() => { }}
                fields={['name']} // REMOVED display_order to fix bug
                label="Tech Stack Item"
                showMessage={null}
                setSaving={null}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-800">
            <button
              onClick={handleBatchSync}
              className="flex-grow py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Sync About Section (Batch)
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
            fields={['title', 'metric', 'description', 'status', 'icon_type', 'color']}
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
        <div className="bg-[#1a1f3a] rounded-xl p-8 border border-gray-700 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Site Title (Primary)</label>
              <input
                className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.settings?.site_title || ''}
                onChange={e => setData.setSettings({ ...data.settings, site_title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase font-mono">Site Title (Alternate)</label>
              <input
                className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
                value={data.settings?.site_title_alternate || ''}
                onChange={e => setData.setSettings({ ...data.settings, site_title_alternate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase font-mono">Site Description</label>
            <input
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.settings?.site_description || ''}
              onChange={e => setData.setSettings({ ...data.settings, site_description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase font-mono">Public Email</label>
            <input
              className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-lg focus:border-green-500 outline-none"
              value={data.settings?.email || ''}
              onChange={e => setData.setSettings({ ...data.settings, email: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleSave(updatePortfolioSettings, {
                site_title: '',
                site_title_alternate: '',
                site_description: '',
                email: '',
                ...(data.settings || {})
              })}
              className="flex-grow py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors flex items-center justify-center gap-2"
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

function CRUDList({ items, onUpsert, onDelete, refresh, fields, label, showMessage, setSaving }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({});
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
    <div className="bg-[#1a1f3a] rounded-xl p-8 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-200">{label}s Management</h3>
        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-[#0a0e27] rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-400 transition-all">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id} className="bg-[#0f1629] border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-green-500/30 transition-all overflow-hidden">
            <div className="flex-grow min-w-0">
              <div className="font-bold text-gray-100 truncate pr-4" title={item[fields[1]] || item[fields[0]]}>
                {item[fields[1]] || item[fields[0]]}
              </div>
              <div className="text-xs text-gray-500 font-mono mt-1 opacity-60 truncate">
                {item[fields[0]] !== (item[fields[1]] || item[fields[0]]) ? item[fields[0]] : item.id.slice(0, 8)}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500 italic text-sm border-2 border-dashed border-gray-800 rounded-xl">
            No {label.toLowerCase()}s found.
          </div>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-[#1a1f3a] border border-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-2xl font-bold">{editingId === 'new' ? `Create ${label}` : `Edit ${label}`}</h4>
              <button onClick={() => setEditingId(null)} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {fields.map((f: string) => (
                <div key={f} className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-mono uppercase tracking-wider">{f.replace('_', ' ')}</label>
                  <input
                    type={f.includes('order') || f.includes('rate') || f.includes('written') || f.includes('found') || f.includes('coverage') ? 'number' : 'text'}
                    className="w-full bg-[#0a0e27] border border-gray-700 p-4 rounded-xl text-sm focus:border-green-500 outline-none transition-all"
                    value={formData[f] || ''}
                    onChange={e => setFormData({ ...formData, [f]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value })}
                    placeholder={`Enter ${f.replace('_', ' ')}`}
                  />
                  {f === 'icon_type' && (
                    <div className="text-[10px] text-gray-500 mt-1 font-mono">
                      Available: CheckCircle2, Code2, Shield, Zap, Bug, BarChart3
                    </div>
                  )}
                  {f === 'color' && (
                    <div className="text-[10px] text-gray-500 mt-1 font-mono">
                      Available: green, blue, yellow, purple, red, cyan
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <button onClick={() => setEditingId(null)} className="flex-grow py-4 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all">Cancel</button>
              <button onClick={handleSubmit} className="flex-grow py-4 bg-green-500 text-[#0a0e27] font-bold rounded-xl hover:bg-green-400 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionPreview({ activeTab, data }: any) {
  // Common background wrapper for "Real Live" feel
  const PreviewWrapper = ({ children, headerMono, title, subtitle, color = 'green' }: any) => {
    const accentColor = color === 'green' ? 'text-green-400' : color === 'blue' ? 'text-blue-400' : color === 'purple' ? 'text-purple-400' : 'text-cyan-400';
    const borderColor = color === 'green' ? 'border-green-400/30' : color === 'blue' ? 'border-blue-400/30' : color === 'purple' ? 'border-purple-400/30' : 'border-cyan-400/30';
    const gradientTop = color === 'green' ? 'from-green-400/10' : color === 'blue' ? 'from-blue-400/10' : color === 'purple' ? 'from-purple-400/10' : 'from-cyan-400/10';

    return (
      <div className="relative bg-[#0a0e27] min-h-[500px] w-full overflow-visible rounded-xl border border-gray-800 flex flex-col">
        {/* Digital Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/80 to-[#0a0e27] z-[1]" />

        <div className="relative z-10 p-8 flex flex-col flex-grow">
          {/* Header Diagnostic */}
          <div className="text-center mb-10">
            <div className={`inline-block font-mono text-[10px] ${accentColor} mb-2 px-3 py-1 border ${borderColor} rounded-full bg-[#0a0e27]/80`}>
              {headerMono}
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">
              {title} <span className={accentColor}>{subtitle}</span>
            </h3>
            <div className={`w-12 h-0.5 bg-gradient-to-r ${gradientTop} to-transparent mx-auto mt-2`} />
          </div>

          <div className={`flex-grow flex flex-col ${activeTab === 'hero' ? 'justify-center' : ''}`}>
            {children}
          </div>
        </div>
      </div >
    );
  };

  switch (activeTab) {
    case 'hero':
      return (
        <PreviewWrapper headerMono="> system.hero.init()" title="Hero" subtitle="Preview" color="green">
          <div className="text-center space-y-6 max-w-sm mx-auto py-10">
            {/* Tech Ring (Mini Version) */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-dashed border-green-500/20 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full bg-green-500/5 backdrop-blur-sm border border-white/5 flex items-center justify-center">
                <Bug className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <h1 className="text-2xl font-black text-white leading-tight break-words">{data.heroContent?.headline || 'Surya Joshi'}</h1>
            <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest break-words">{data.heroContent?.subheadline || 'Quality Assurance Engineer'}</h2>
            <p className="text-gray-400 text-[11px] leading-relaxed italic whitespace-pre-wrap break-words">
              {data.heroContent?.description || '"Mission-driven QA Engineer specializing in automated testing, bug hunting, and ensuring high-performance digital experiences with a focus on precision and reliability."'}
            </p>

            <div className="flex flex-col gap-2 pt-4">
              <div className="w-full py-2 bg-green-500 text-black rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-green-500/20">
                {data.heroContent?.cta_text || 'Get In Touch'}
              </div>
              <div className="w-full py-2 border border-green-500/50 text-green-400 rounded-lg font-bold text-[10px] uppercase tracking-wider bg-[#0a0e27]">
                {data.heroContent?.cta_button_text || 'Download Resume'}
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'about':
      return (
        <PreviewWrapper headerMono="> system.about.load()" title="About" subtitle="Me" color="green">
          <div className="space-y-4">
            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
              <div className="font-mono text-[8px] text-gray-500 mb-1">[PROFILE_SUMMARY]</div>
              <p className="text-gray-300 text-[10px] leading-relaxed whitespace-pre-wrap break-words">
                {data.aboutContent?.summary || "Highly skilled QA Professional with a passion for software quality and efficiency. Experienced in manual and automated testing across multiple platforms."}
              </p>
            </div>
            <div className="bg-[#151b35]/50 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4">
              <div className="font-mono text-[8px] text-gray-500 mb-1">[APPROACH]</div>
              <p className="text-gray-300 text-[10px] leading-relaxed whitespace-pre-wrap break-words">
                {data.aboutContent?.approach || "My testing methodology focuses on early bug detection through rigorous regression suites and thorough integration analysis."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-3 text-center">
                <div className="text-lg font-black text-green-400">{data.aboutContent?.experience_years}+</div>
                <div className="text-[8px] text-gray-500 uppercase font-mono">Years Exp</div>
              </div>
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-3 text-center">
                <div className="text-lg font-black text-blue-400">{data.aboutContent?.success_rate}%</div>
                <div className="text-[8px] text-gray-500 uppercase font-mono">Success Rate</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-2 text-center">
                <div className="text-sm font-black text-green-400">{(data.aboutContent?.test_coverage || 0).toLocaleString()}%</div>
                <div className="text-[7px] text-gray-500 uppercase font-mono">Test Coverage</div>
              </div>
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-2 text-center">
                <div className="text-sm font-black text-purple-400">{(data.aboutContent?.projects_delivered || 0).toLocaleString()}+</div>
                <div className="text-[7px] text-gray-500 uppercase font-mono">Projects Delivered</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-2 text-center">
                <div className="text-sm font-black text-green-400">{(data.aboutContent?.tests_written || 0).toLocaleString()}+</div>
                <div className="text-[7px] text-gray-500 uppercase font-mono">Tests Written</div>
              </div>
              <div className="bg-[#151b35]/50 border border-purple-400/20 rounded-lg p-2 text-center">
                <div className="text-sm font-black text-red-400">{(data.aboutContent?.bugs_found || 0).toLocaleString()}+</div>
                <div className="text-[7px] text-gray-500 uppercase font-mono">Bugs Found</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
              <div>
                <div className="text-[7px] text-gray-500 font-mono mb-2 uppercase tracking-widest">[CORE_COMPETENCIES]</div>
                <div className="grid grid-cols-2 gap-1 overflow-hidden">
                  {data.skills.map((s: any) => (
                    <div key={s.id} className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[7px] font-bold text-green-400">
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[7px] text-gray-500 font-mono mb-2 uppercase tracking-widest">[TECH_STACK]</div>
                <div className="flex flex-wrap gap-1">
                  {data.techStack.length > 0 ? data.techStack.slice(0, 8).map((t: any) => (
                    <div key={t.id} className="px-1 py-0.5 bg-[#0a0e27] border border-gray-800 rounded text-[7px] text-gray-500 font-mono">
                      {t.name}
                    </div>
                  )) : ['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((t, i) => (
                    <div key={i} className="px-1 py-0.5 bg-[#0a0e27] border border-gray-800 rounded text-[7px] text-gray-500 font-mono">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      );
    case 'projects':
      const displayProjects = data.projects.length > 0 ? data.projects.slice(0, 2) : [
        { id: '1', ticket_id: 'PR-101', name: 'Automation Engine Pro', role: 'Lead QA Engineer', outcome: 'Implemented comprehensive E2E suite reducing regression time by 60%.', status: 'STABLE' },
        { id: '2', ticket_id: 'PR-102', name: 'Cloud Infrastructure Audit', role: 'Senior SDET', outcome: 'Architected security-first testing pipeline for multi-region deployments.', status: 'PASSED' }
      ];

      return (
        <PreviewWrapper headerMono="> testSuite.execute()" title="Project" subtitle="Portfolio" color="purple">
          <div className="space-y-3">
            {displayProjects.map((p: any) => (
              <div key={p.id} className="bg-[#151b35]/80 border border-gray-700 rounded-lg p-4 relative overflow-hidden">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 border border-purple-400/30 rounded flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="font-mono text-[8px] text-gray-500 mb-0.5">[{p.ticket_id || 'TC-000'}]</div>
                    <div className="font-bold text-white text-xs break-words">{p.name || 'Project Name'}</div>
                    <div className="text-[9px] text-purple-400 font-bold mb-2 break-words">{p.role || 'QA Engineer'}</div>
                    <div className="text-[9px] text-gray-400 mb-2 italic whitespace-pre-wrap break-words">"{p.outcome}"</div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[8px] px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 break-words">✓ {p.status || 'PASSED'}</span>
                      <span className="text-[8px] px-2 py-0.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 break-words">HIGH</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {data.projects.length > 2 && <div className="text-center text-[10px] text-gray-600 font-mono tracking-tighter">-- MORE PROJECTS DETECTED ({data.projects.length - 2}) --</div>}
          </div>
        </PreviewWrapper>
      );
    case 'achievements':
      return (
        <PreviewWrapper headerMono="> metrics.achievements.display()" title="Key" subtitle="Achievements" color="blue">
          <div className="grid grid-cols-1 gap-3">
            {data.achievements.slice(0, 3).map((a: any) => (
              <div key={a.id} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0a0e27] border border-blue-500/30 rounded flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-blue-400 leading-none mb-1 break-words">{a.metric}</div>
                  <div className="text-[10px] text-white font-bold break-words">{a.title}</div>
                  <div className="text-[8px] text-gray-500 mt-1 whitespace-pre-wrap break-words italic">{a.description}</div>
                </div>
              </div>
            ))}
          </div>
        </PreviewWrapper>
      );
    case 'education':
      return (
        <PreviewWrapper headerMono="> timeline.education.list()" title="Learning" subtitle="History" color="cyan">
          <div className="space-y-4 relative pl-4 border-l border-gray-800">
            {data.education.map((e: any) => (
              <div key={e.id} className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[#0a0e27] shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                <div className="text-[8px] text-gray-500 font-mono mb-0.5 break-words">{e.date}</div>
                <div className="text-xs font-bold text-white mb-0.5 break-words">{e.title}</div>
                <div className="text-[10px] text-cyan-400 break-words">{e.subtitle}</div>
                <div className="text-[8px] text-gray-500 italic mt-0.5 whitespace-pre-wrap break-words">{e.institution}</div>
              </div>
            ))}
          </div>
        </PreviewWrapper>
      );
    case 'social':
      return (
        <PreviewWrapper headerMono="> network.social.connect()" title="Connect" subtitle="Links" color="blue">
          <div className="grid grid-cols-2 gap-3 py-4">
            {data.socialLinks.map((s: any) => (
              <div key={s.id} className="p-4 bg-[#0a0e27] border border-gray-800 rounded-lg text-center group">
                <Share2 className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{s.platform}</div>
              </div>
            ))}
          </div>
        </PreviewWrapper>
      );
    case 'settings':
      return (
        <PreviewWrapper headerMono="> kernel.config.global()" title="Site" subtitle="Settings" color="purple">
          <div className="space-y-3">
            <div className="bg-[#0a0e27] p-4 rounded-lg border border-gray-800">
              <div className="text-[8px] text-gray-600 font-mono uppercase mb-1">tab_title_loop:</div>
              <div className="text-xs font-bold text-white">{data.settings?.site_title}</div>
              <div className="text-[10px] text-gray-500 mt-1">{data.settings?.site_title_alternate}</div>
            </div>
            <div className="bg-[#0a0e27] p-4 rounded-lg border border-gray-800">
              <div className="text-[8px] text-gray-600 font-mono uppercase mb-1">site_description:</div>
              <div className="text-[10px] text-gray-400 italic whitespace-pre-wrap break-words">"{data.settings?.site_description}"</div>
            </div>
            <div className="bg-[#0a0e27] p-4 rounded-lg border border-gray-800">
              <div className="text-[8px] text-gray-600 font-mono uppercase mb-1">contact_email:</div>
              <div className="text-[10px] text-blue-400 font-mono">{data.settings?.email}</div>
            </div>
          </div>
        </PreviewWrapper>
      );
    default:
      return null;
  }
}
