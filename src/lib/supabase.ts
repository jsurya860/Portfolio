import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QAProject {
  id: string;
  ticket_id: string;
  name: string;
  priority: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  status: 'PASSED' | 'FAILED' | 'IN_PROGRESS';
  tools: string[];
  role: string;
  responsibilities: string[];
  outcome: string;
  icon_type: string;
  color: 'green' | 'red' | 'blue' | 'purple';
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  cta_text: string;
  cta_button_text: string;
}

export interface AboutContent {
  id: string;
  summary: string;
  approach: string;
  experience_years: number;
  tests_written: number;
  bugs_found: number;
  success_rate: number;
  test_coverage: number;
  projects_delivered: number;
}

export interface Skill {
  id: string;
  name: string;
  icon_type: string;
  color: string;
  display_order: number;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  description: string;
  icon_type: string;
  color: string;
  status: string;
  display_order: number;
}

export interface Education {
  id: string;
  title: string;
  subtitle: string;
  institution: string;
  date: string;
  type: string;
  version: string;
  icon_type: string;
  color: string;
  display_order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_type: string;
  display_order: number;
}

export interface PortfolioSettings {
  id: string;
  site_title: string;
  site_title_alternate: string;
  site_description: string;
  email: string;
}

export interface TechStack {
  id: string;
  name: string;
}



export async function fetchProjects(): Promise<QAProject[]> {
  const { data, error } = await supabase
    .from('qa_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export async function fetchHeroContent(): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('portfolio_hero')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }

  return data;
}

export async function fetchAboutContent(): Promise<AboutContent | null> {
  const { data, error } = await supabase
    .from('portfolio_about')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }

  return data;
}

export async function fetchSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('portfolio_skills')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data || [];
}

export async function fetchTechStack(): Promise<TechStack[]> {
  const { data, error } = await supabase
    .from('portfolio_tech_stack')
    .select('*');

  if (error) {
    console.error('Error fetching tech stack:', error);
    return [];
  }

  return data || [];
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from('portfolio_achievements')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }

  return data || [];
}

export async function fetchEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('portfolio_education')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }

  return data || [];
}

export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from('portfolio_social_links')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching social links:', error);
    return [];
  }

  return data || [];
}





export async function fetchPortfolioSettings(): Promise<PortfolioSettings | null> {
  const { data, error } = await supabase
    .from('portfolio_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  return data;
}

export async function updateHeroContent(content: Partial<HeroContent>): Promise<HeroContent | null> {
  const { data: existing } = await supabase
    .from('portfolio_hero')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('portfolio_hero')
      .update(content)
      .eq('id', existing.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating hero content:', error);
      return null;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from('portfolio_hero')
      .insert([content])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating hero content:', error);
      return null;
    }

    return data;
  }
}

export async function updateAboutContent(content: Partial<AboutContent>): Promise<AboutContent | null> {
  const { data: existing } = await supabase
    .from('portfolio_about')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('portfolio_about')
      .update(content)
      .eq('id', existing.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating about content:', error);
      return null;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from('portfolio_about')
      .insert([content])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating about content:', error);
      return null;
    }

    return data;
  }
}

// Generative CRUD helpers
async function upsertItem<T>(table: string, content: Partial<T> & { id?: string }): Promise<T | null> {
  if (content.id && !content.id.startsWith('demo-') && !content.id.startsWith('default')) {
    const { data, error } = await supabase
      .from(table)
      .update(content)
      .eq('id', content.id)
      .select()
      .maybeSingle();
    if (error) {
      console.error(`Error updating ${table}:`, error);
      return null;
    }
    return data;
  } else {
    const { id, ...insertData } = content;
    const { data, error } = await supabase
      .from(table)
      .insert([insertData])
      .select()
      .maybeSingle();
    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      return null;
    }
    return data;
  }
}

async function deleteItem(table: string, id: string): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }
  return true;
}

// Project CRUD
export const upsertProject = (project: Partial<QAProject>) => upsertItem<QAProject>('qa_projects', project);
export const deleteProject = (id: string) => deleteItem('qa_projects', id);

// Achievement CRUD
export const upsertAchievement = (achievement: Partial<Achievement>) => upsertItem<Achievement>('portfolio_achievements', achievement);
export const deleteAchievement = (id: string) => deleteItem('portfolio_achievements', id);

// Education CRUD
export const upsertEducation = (education: Partial<Education>) => upsertItem<Education>('portfolio_education', education);
export const deleteEducation = (id: string) => deleteItem('portfolio_education', id);

// Skill CRUD
export const upsertSkill = (skill: Partial<Skill>) => upsertItem<Skill>('portfolio_skills', skill);
export const deleteSkill = (id: string) => deleteItem('portfolio_skills', id);

// Tech Stack CRUD
export const upsertTechStack = (tech: Partial<TechStack>) => upsertItem<TechStack>('portfolio_tech_stack', tech);
export const deleteTechStack = (id: string) => deleteItem('portfolio_tech_stack', id);

// Social Link CRUD
export const upsertSocialLink = (link: Partial<SocialLink>) => upsertItem<SocialLink>('portfolio_social_links', link);
export const deleteSocialLink = (id: string) => deleteItem('portfolio_social_links', id);

// Settings Update
export async function updatePortfolioSettings(settings: Partial<PortfolioSettings>): Promise<PortfolioSettings | null> {
  const { data: existing } = await supabase
    .from('portfolio_settings')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('portfolio_settings')
      .update(settings)
      .eq('id', existing.id)
      .select()
      .maybeSingle();
    if (error) return null;
    return data;
  } else {
    const { data, error } = await supabase
      .from('portfolio_settings')
      .insert([settings])
      .select()
      .maybeSingle();
    if (error) return null;
    return data;
  }
}

// Reset Functionality
async function clearTableRows(table: string): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete everything (hack for Supabase delete all)

  if (error) {
    console.error(`Error clearing table ${table}:`, error);
    return false;
  }
  return true;
}

export const resetHeroData = () => clearTableRows('portfolio_hero');
export const resetAboutData = () => clearTableRows('portfolio_about');
export const resetProjectsData = () => clearTableRows('qa_projects');
export const resetAchievementsData = () => clearTableRows('portfolio_achievements');
export const resetEducationData = () => clearTableRows('portfolio_education');
export const resetSkillsData = () => clearTableRows('portfolio_skills');
export const resetTechStackData = () => clearTableRows('portfolio_tech_stack');
export const resetSocialLinksData = () => clearTableRows('portfolio_social_links');
export const resetSettingsData = () => clearTableRows('portfolio_settings');

