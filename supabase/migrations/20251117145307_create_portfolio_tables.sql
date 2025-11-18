/*
  # Create Portfolio Content Tables

  1. New Tables
    - `portfolio_hero`: Hero section content
    - `portfolio_about`: About section and bio
    - `portfolio_skills`: Skills list with icons and colors
    - `portfolio_achievements`: Achievements/metrics
    - `portfolio_education`: Education timeline
    - `portfolio_social_links`: Social media links
    - `portfolio_settings`: General settings

  2. Security
    - All tables have RLS enabled with public read access
    - Only authenticated users can insert/update/delete
*/

CREATE TABLE IF NOT EXISTS portfolio_hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  subheadline text NOT NULL,
  description text NOT NULL,
  cta_text text NOT NULL DEFAULT 'Get In Touch',
  cta_button_text text NOT NULL DEFAULT 'Download Resume',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  summary text NOT NULL,
  approach text NOT NULL,
  experience_years integer DEFAULT 3,
  tests_written integer DEFAULT 5000,
  bugs_found integer DEFAULT 1200,
  success_rate decimal(5, 2) DEFAULT 99.7,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon_type text NOT NULL,
  color text NOT NULL DEFAULT 'green',
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_tech_stack (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  metric text NOT NULL,
  description text NOT NULL,
  icon_type text NOT NULL,
  color text NOT NULL DEFAULT 'green',
  status text NOT NULL DEFAULT 'VERIFIED',
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  institution text NOT NULL,
  date text NOT NULL,
  type text NOT NULL,
  version text NOT NULL,
  icon_type text NOT NULL,
  color text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text UNIQUE NOT NULL,
  url text NOT NULL,
  icon_type text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title text NOT NULL DEFAULT 'Surya - QA Engineer',
  site_description text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON portfolio_hero FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_about FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_skills FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_tech_stack FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_achievements FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_education FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_social_links FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON portfolio_settings FOR SELECT TO public USING (true);

CREATE POLICY "Auth write access" ON portfolio_hero FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_about FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_tech_stack FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_achievements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth write access" ON portfolio_settings FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth update access" ON portfolio_hero FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_about FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_skills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_tech_stack FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_achievements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_education FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_social_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth update access" ON portfolio_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth delete access" ON portfolio_hero FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_about FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_skills FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_tech_stack FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_achievements FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_education FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_social_links FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth delete access" ON portfolio_settings FOR DELETE TO authenticated USING (true);

CREATE INDEX idx_portfolio_skills_order ON portfolio_skills(display_order);
CREATE INDEX idx_portfolio_achievements_order ON portfolio_achievements(display_order);
CREATE INDEX idx_portfolio_education_order ON portfolio_education(display_order);
CREATE INDEX idx_portfolio_social_order ON portfolio_social_links(display_order);
