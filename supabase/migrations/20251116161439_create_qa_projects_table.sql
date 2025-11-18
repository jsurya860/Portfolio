/*
  # Create QA Projects Table

  1. New Tables
    - `qa_projects`
      - `id` (uuid, primary key)
      - `ticket_id` (text, unique - for Jira-like reference)
      - `name` (text, project name)
      - `priority` (text - HIGH, CRITICAL, MEDIUM)
      - `status` (text - PASSED, FAILED, IN_PROGRESS)
      - `tools` (text array - tech stack)
      - `role` (text - job role)
      - `responsibilities` (text array - detailed tasks)
      - `outcome` (text - project result)
      - `icon_type` (text - icon identifier)
      - `color` (text - accent color: green, red, blue, purple)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `qa_projects` table
    - Add policy for public read access (unauthenticated users can view)
    - Add policy for authenticated users to create/update/delete their projects

  3. Features
    - Projects are publicly readable for portfolio display
    - Admin/owner can manage project data
*/

CREATE TABLE IF NOT EXISTS qa_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE NOT NULL,
  name text NOT NULL,
  priority text NOT NULL DEFAULT 'HIGH',
  status text NOT NULL DEFAULT 'PASSED',
  tools text[] NOT NULL DEFAULT '{}',
  role text NOT NULL,
  responsibilities text[] NOT NULL DEFAULT '{}',
  outcome text NOT NULL,
  icon_type text NOT NULL DEFAULT 'Code2',
  color text NOT NULL DEFAULT 'blue',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE qa_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for projects"
  ON qa_projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON qa_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON qa_projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON qa_projects
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX idx_qa_projects_created_at ON qa_projects(created_at DESC);
CREATE INDEX idx_qa_projects_ticket_id ON qa_projects(ticket_id);
