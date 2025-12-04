import { useState, useEffect } from 'react';
import { LogOut, Save, AlertCircle } from 'lucide-react';
import { supabase, HeroContent, AboutContent, fetchHeroContent, fetchAboutContent, updateHeroContent, updateAboutContent } from '../lib/supabase';

export default function Admin() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const [hero, about] = await Promise.all([
      fetchHeroContent(),
      fetchAboutContent()
    ]);
    setHeroContent(hero);
    setAboutContent(about);
    setLoading(false);
  };

  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    setHeroContent(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAboutChange = (field: keyof AboutContent, value: string | number) => {
    setAboutContent(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveHero = async () => {
    if (!heroContent) return;
    setSaving(true);
    const result = await updateHeroContent(heroContent);
    setSaving(false);
    if (result) {
      setMessage({ type: 'success', text: 'Hero content saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to save hero content' });
    }
  };

  const handleSaveAbout = async () => {
    if (!aboutContent) return;
    setSaving(true);
    const result = await updateAboutContent(aboutContent);
    setSaving(false);
    if (result) {
      setMessage({ type: 'success', text: 'About content saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to save about content' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-900/30 border border-green-500 text-green-200' : 'bg-red-900/30 border border-red-500 text-red-200'}`}>
            <AlertCircle className="w-5 h-5" />
            {message.text}
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'hero' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'about' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-300'}`}
          >
            About Section
          </button>
        </div>

        {activeTab === 'hero' && heroContent && (
          <div className="bg-[#1a1f3a] rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Edit Hero Section</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Headline</label>
                <input
                  type="text"
                  value={heroContent.headline}
                  onChange={(e) => handleHeroChange('headline', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subheadline</label>
                <input
                  type="text"
                  value={heroContent.subheadline}
                  onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={heroContent.description}
                  onChange={(e) => handleHeroChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CTA Text</label>
                  <input
                    type="text"
                    value={heroContent.cta_text}
                    onChange={(e) => handleHeroChange('cta_text', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={heroContent.cta_button_text}
                    onChange={(e) => handleHeroChange('cta_button_text', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveHero}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'about' && aboutContent && (
          <div className="bg-[#1a1f3a] rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Edit About Section</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Summary</label>
                <textarea
                  value={aboutContent.summary}
                  onChange={(e) => handleAboutChange('summary', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Approach</label>
                <textarea
                  value={aboutContent.approach}
                  onChange={(e) => handleAboutChange('approach', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={aboutContent.experience_years}
                    onChange={(e) => handleAboutChange('experience_years', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tests Written</label>
                  <input
                    type="number"
                    value={aboutContent.tests_written}
                    onChange={(e) => handleAboutChange('tests_written', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bugs Found</label>
                  <input
                    type="number"
                    value={aboutContent.bugs_found}
                    onChange={(e) => handleAboutChange('bugs_found', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Success Rate (%)</label>
                  <input
                    type="number"
                    value={aboutContent.success_rate}
                    onChange={(e) => handleAboutChange('success_rate', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveAbout}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
