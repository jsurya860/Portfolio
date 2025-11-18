# Fully Dynamic Portfolio - Database Guide

Your portfolio is now completely dynamic! Every section can be updated directly from the Supabase database.

## Database Tables & Fields

### 1. **portfolio_hero** - Hero Section
Manage the main headline, subheadline, and call-to-action buttons.

```sql
INSERT INTO portfolio_hero (headline, subheadline, description, cta_text, cta_button_text)
VALUES (
  'Surya',
  'Quality Assurance Engineer',
  'Transforming complex systems into reliable software through manual testing, automation frameworks, and strategic quality engineering',
  'Get In Touch',
  'Download Resume'
);
```

**Fields:**
- `headline` - Your name/main title
- `subheadline` - Your job title
- `description` - Long description text
- `cta_text` - "Get In Touch" button text
- `cta_button_text` - "Download Resume" button text

---

### 2. **portfolio_about** - About Section
Store professional summary, approach, and statistics.

```sql
INSERT INTO portfolio_about (summary, approach, experience_years, tests_written, bugs_found, success_rate)
VALUES (
  'Results-driven QA Engineer with a passion for delivering flawless software experiences. I specialize in designing comprehensive test strategies that catch critical bugs before they reach production, ensuring every release meets the highest quality standards.',
  'My methodology combines meticulous manual testing with powerful automation frameworks to create robust, scalable testing solutions. I believe quality isn''t just about finding bugs—it''s about preventing them through strategic planning and continuous improvement.',
  3,
  5000,
  1200,
  99.7
);
```

**Fields:**
- `summary` - Your professional summary
- `approach` - Your testing methodology
- `experience_years` - Years of experience
- `tests_written` - Total test cases written
- `bugs_found` - Total bugs found
- `success_rate` - Success percentage

---

### 3. **portfolio_skills** - Core Competencies
Add your skills with icons and colors.

```sql
INSERT INTO portfolio_skills (name, icon_type, color, display_order)
VALUES
  ('Manual Testing', 'CheckCircle2', 'green', 1),
  ('Test Automation', 'Code2', 'blue', 2),
  ('Selenium & Java', 'Zap', 'yellow', 3),
  ('API Testing', 'BarChart3', 'purple', 4),
  ('Defect Management', 'Bug', 'red', 5),
  ('Security Testing', 'Shield', 'cyan', 6);
```

**Fields:**
- `name` - Skill name
- `icon_type` - Icon from lucide-react (CheckCircle2, Code2, Shield, Zap, Bug, BarChart3)
- `color` - green, blue, yellow, purple, red, cyan
- `display_order` - Sort order (1, 2, 3...)

---

### 4. **portfolio_tech_stack** - Technology Stack
List all your technical tools and frameworks.

```sql
INSERT INTO portfolio_tech_stack (name)
VALUES
  ('Selenium'),
  ('Java'),
  ('TestNG'),
  ('JUnit'),
  ('REST Assured'),
  ('Postman'),
  ('JIRA'),
  ('Jenkins'),
  ('Git');
```

**Fields:**
- `name` - Technology/tool name

---

### 5. **qa_projects** - Testing Projects
Display automation projects as test case cards.

```sql
INSERT INTO qa_projects (ticket_id, name, priority, status, tools, role, responsibilities, outcome, icon_type, color)
VALUES (
  'TC-001',
  'E-Commerce Platform Testing',
  'HIGH',
  'PASSED',
  ARRAY['Selenium', 'Java', 'TestNG', 'Jenkins'],
  'Lead QA Engineer',
  ARRAY[
    'Designed and implemented end-to-end automation framework',
    'Created 500+ automated test scripts for checkout flows',
    'Reduced regression testing time by 60%',
    'Integrated tests with CI/CD pipeline'
  ],
  'Zero payment-related bugs in production for 12 months',
  'Globe',
  'blue'
);
```

**Fields:**
- `ticket_id` - Reference ID (TC-001, TC-002, etc.)
- `name` - Project name
- `priority` - HIGH, CRITICAL, MEDIUM
- `status` - PASSED, FAILED, IN_PROGRESS
- `tools` - Array of technologies used
- `role` - Your role in the project
- `responsibilities` - Array of your responsibilities
- `outcome` - Project result/impact
- `icon_type` - Globe, Database, CheckSquare, Code2
- `color` - green, red, blue, purple

---

### 6. **portfolio_achievements** - Metrics & Achievements
Showcase your key accomplishments.

```sql
INSERT INTO portfolio_achievements (title, metric, description, icon_type, color, status, display_order)
VALUES (
  'Test Coverage Improvement',
  '45% Increase',
  'Elevated automated test coverage from 53% to 98% across critical user flows',
  'TrendingUp',
  'green',
  'VERIFIED',
  1
),
(
  'Bug Detection Rate',
  '1200+ Critical Bugs',
  'Identified and documented pre-production defects, preventing costly production incidents',
  'AlertCircle',
  'red',
  'RESOLVED',
  2
),
(
  'Release Cycle Time',
  '30% Reduction',
  'Streamlined testing process through automation, accelerating time-to-market',
  'Clock',
  'blue',
  'OPTIMIZED',
  3
),
(
  'Zero Production Failures',
  '18 Consecutive Releases',
  'Maintained perfect production stability through comprehensive regression testing',
  'CheckCircle',
  'purple',
  'ACHIEVED',
  4
);
```

**Fields:**
- `title` - Achievement title
- `metric` - Key metric/number
- `description` - Detailed description
- `icon_type` - TrendingUp, AlertCircle, CheckCircle, Clock
- `color` - green, red, blue, purple
- `status` - VERIFIED, RESOLVED, OPTIMIZED, ACHIEVED
- `display_order` - Sort order

---

### 7. **portfolio_education** - Education Timeline
Add degrees and certifications.

```sql
INSERT INTO portfolio_education (title, subtitle, institution, date, type, version, icon_type, color, display_order)
VALUES
  (
    'Bachelor of Technology',
    'Computer Science Engineering',
    'Technology University',
    '2018 - 2022',
    'degree',
    'v1.0',
    'GraduationCap',
    'blue',
    1
  ),
  (
    'ISTQB Certified Tester',
    'Foundation Level',
    'International Software Testing Qualifications Board',
    '2022',
    'cert',
    'v2.0',
    'Award',
    'green',
    2
  ),
  (
    'Selenium WebDriver with Java',
    'Test Automation',
    'Professional Development Course',
    '2023',
    'cert',
    'v3.0',
    'Award',
    'purple',
    3
  );
```

**Fields:**
- `title` - Degree/certification name
- `subtitle` - Specialization/level
- `institution` - University/organization
- `date` - Date range or year
- `type` - degree, cert
- `version` - Version number (v1.0, v2.0...)
- `icon_type` - GraduationCap, Award
- `color` - blue, green, purple, cyan, yellow
- `display_order` - Sort order

---

### 8. **portfolio_social_links** - Social Media
Add social media and contact links.

```sql
INSERT INTO portfolio_social_links (platform, url, icon_type, display_order)
VALUES
  ('LinkedIn', 'https://linkedin.com/in/surya', 'Linkedin', 1),
  ('GitHub', 'https://github.com/surya', 'Github', 2),
  ('Email', 'mailto:surya@example.com', 'Mail', 3);
```

**Fields:**
- `platform` - Platform name
- `url` - Profile/contact URL
- `icon_type` - Linkedin, Github, Mail
- `display_order` - Sort order

---

### 9. **portfolio_settings** - Global Settings
Configure site-wide settings.

```sql
INSERT INTO portfolio_settings (site_title, site_description, email)
VALUES (
  'Surya - QA Engineer',
  'Quality Assurance Engineer',
  'surya@example.com'
);
```

**Fields:**
- `site_title` - Site title (used in footer)
- `site_description` - Site description
- `email` - Contact email

---

## How to Update Content

### Via Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" tab
3. Run the INSERT or UPDATE queries above

### Example Updates

**Update Hero Section:**
```sql
UPDATE portfolio_hero
SET headline = 'John Doe', subheadline = 'Senior QA Engineer'
WHERE id = '<uuid>';
```

**Add New Project:**
```sql
INSERT INTO qa_projects (ticket_id, name, priority, status, tools, role, responsibilities, outcome, icon_type, color)
VALUES ('TC-005', 'Your New Project', 'HIGH', 'IN_PROGRESS', ARRAY['Tool1', 'Tool2'], 'Role', ARRAY['Responsibility 1'], 'Outcome', 'Globe', 'blue');
```

**Add New Achievement:**
```sql
INSERT INTO portfolio_achievements (title, metric, description, icon_type, color, status, display_order)
VALUES ('New Achievement', '100%', 'Description', 'CheckCircle', 'green', 'ACHIEVED', 5);
```

---

## Available Icon Types

**Skills:**
- CheckCircle2, Code2, Shield, Zap, Bug, BarChart3

**Achievements:**
- TrendingUp, AlertCircle, CheckCircle, Clock

**Education:**
- GraduationCap, Award

**Social Links:**
- Linkedin, Github, Mail

**Projects:**
- Globe, Database, CheckSquare, Code2

---

## Available Colors

- green
- blue
- yellow
- purple
- red
- cyan

---

## Frontend Updates

Once you update the database, the frontend will automatically fetch and display the new content:

1. **Hero Section** - Updates headline, subheadline, CTA buttons
2. **About Section** - Updates bio, skills list, tech stack
3. **Achievements** - Displays all achievements with metrics
4. **Projects** - Shows all QA automation projects
5. **Education** - Timeline of degrees and certifications
6. **Footer** - Displays social links and site settings

The website caches data on initial load and updates whenever you refresh the page. For real-time updates without refresh, consider implementing Supabase real-time subscriptions.

---

## Tips

1. **Display Order** - Use `display_order` field (1, 2, 3...) to control the sequence
2. **Colors** - Match your content theme with appropriate colors
3. **Icons** - Choose icons that best represent your content
4. **Arrays** - For fields like `tools` and `responsibilities`, use PostgreSQL array syntax: `ARRAY['item1', 'item2', 'item3']`

All changes are reflected automatically on your portfolio website!
