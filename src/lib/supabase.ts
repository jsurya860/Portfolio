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
