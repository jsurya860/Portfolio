/*
  # Restrict portfolio write access to a single admin account

  1. Problem
    - Previous policies granted INSERT/UPDATE/DELETE to the `authenticated`
      role with `USING (true)` / `WITH CHECK (true)`. Combined with public
      sign-up being available on the admin login screen, any visitor could
      create a Supabase auth account and gain full write/delete access to
      every portfolio table.

  2. Fix
    - Introduce `is_portfolio_admin()`, a SECURITY DEFINER function that
      checks the calling user's email against a single allow-listed admin
      address (auth.users is not directly readable by regular roles, so
      this needs to run with elevated privileges).
    - Drop all existing authenticated-write policies and recreate them
      gated on `is_portfolio_admin()` instead of merely `authenticated`.
    - Public read access is unchanged.

  3. Manual follow-up required
    - Public sign-up must also be disabled/removed from the client
      (done in src/components/AdminLogin.tsx) and ideally from the
      Supabase Auth provider settings as well, since RLS alone doesn't
      stop someone from creating an account — it just stops that account
      from writing anything.
    - If the admin's login email ever changes, update the email literal
      in `is_portfolio_admin()` below (or migrate to an `admins` table
      keyed by user id for easier rotation).
*/

CREATE OR REPLACE FUNCTION is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
      AND email = 'jsurya860@gmail.com'
  );
$$;

REVOKE ALL ON FUNCTION is_portfolio_admin() FROM public;
GRANT EXECUTE ON FUNCTION is_portfolio_admin() TO authenticated;

-- qa_projects ----------------------------------------------------------

DROP POLICY IF EXISTS "Authenticated users can create projects" ON qa_projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON qa_projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON qa_projects;

CREATE POLICY "Admin can create projects"
  ON qa_projects FOR INSERT TO authenticated
  WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can update projects"
  ON qa_projects FOR UPDATE TO authenticated
  USING (is_portfolio_admin())
  WITH CHECK (is_portfolio_admin());

CREATE POLICY "Admin can delete projects"
  ON qa_projects FOR DELETE TO authenticated
  USING (is_portfolio_admin());

-- portfolio_* tables -----------------------------------------------------

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'portfolio_hero',
    'portfolio_about',
    'portfolio_skills',
    'portfolio_tech_stack',
    'portfolio_achievements',
    'portfolio_education',
    'portfolio_social_links',
    'portfolio_settings'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Auth write access" ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Auth update access" ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Auth delete access" ON %I', t);

    EXECUTE format(
      'CREATE POLICY "Admin write access" ON %I FOR INSERT TO authenticated WITH CHECK (is_portfolio_admin())',
      t
    );
    EXECUTE format(
      'CREATE POLICY "Admin update access" ON %I FOR UPDATE TO authenticated USING (is_portfolio_admin()) WITH CHECK (is_portfolio_admin())',
      t
    );
    EXECUTE format(
      'CREATE POLICY "Admin delete access" ON %I FOR DELETE TO authenticated USING (is_portfolio_admin())',
      t
    );
  END LOOP;
END $$;
