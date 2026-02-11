-- ============================================
-- PHASE 1: Modify profiles table
-- ============================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_headline TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_size TEXT;

-- ============================================
-- PHASE 2: Create posts table
-- ============================================

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  post_type TEXT NOT NULL CHECK (post_type IN ('offering', 'seeking')),

  title TEXT NOT NULL,
  description TEXT,
  
  category TEXT,
  categories TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  
  availability TEXT,
  hours_per_week TEXT,
  hourly_rate_min INTEGER,
  hourly_rate_max INTEGER,
  
  engagement_type TEXT,
  duration TEXT,
  
  location TEXT,
  remote_ok BOOLEAN DEFAULT true,
  
  is_active BOOLEAN DEFAULT true,
  expiry_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_post_type ON posts(post_type);
CREATE INDEX idx_posts_is_active ON posts(is_active) WHERE is_active = true;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_expiry ON posts(expiry_date) WHERE expiry_date IS NOT NULL;
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_categories ON posts USING GIN(categories);
CREATE INDEX idx_posts_skills ON posts USING GIN(skills);

-- RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active posts are viewable by everyone"
  ON posts FOR SELECT
  USING (
    is_active = true 
    AND (expiry_date IS NULL OR expiry_date > now())
  );

CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- PHASE 3: Data migration
-- ============================================

-- Create "offering" posts from expert profiles
INSERT INTO posts (user_id, post_type, title, description, category, categories, skills,
  availability, hourly_rate_min, hourly_rate_max, location, is_active, created_at)
SELECT 
  id AS user_id,
  'offering' AS post_type,
  COALESCE(headline, full_name || ' — Available for projects') AS title,
  bio AS description,
  CASE WHEN categories IS NOT NULL AND array_length(categories, 1) > 0 
    THEN categories[1] ELSE NULL END AS category,
  COALESCE(categories, '{}') AS categories,
  COALESCE(skills, '{}') AS skills,
  availability,
  hourly_rate_min,
  hourly_rate_max,
  location,
  is_public AS is_active,
  created_at
FROM profiles
WHERE user_type = 'expert'
  AND (full_name IS NOT NULL OR headline IS NOT NULL);

-- Create "seeking" posts from company profiles
INSERT INTO posts (user_id, post_type, title, description, categories, location, is_active, created_at)
SELECT
  c.id AS user_id,
  'seeking' AS post_type,
  COALESCE(c.headline, c.company_name || ' — Looking for talent') AS title,
  c.description,
  COALESCE(c.looking_for, '{}') AS categories,
  c.location,
  c.is_public AS is_active,
  c.created_at
FROM companies c
WHERE c.company_name IS NOT NULL OR c.headline IS NOT NULL;

-- Migrate company info into profiles
UPDATE profiles p
SET 
  company_name = c.company_name,
  company_headline = c.headline,
  industry = c.industry,
  company_size = c.company_size,
  bio = COALESCE(p.bio, c.description),
  location = COALESCE(p.location, c.location),
  website_url = COALESCE(p.website_url, c.website_url),
  linkedin_url = COALESCE(p.linkedin_url, c.linkedin_url),
  contact_email = COALESCE(p.contact_email, c.contact_email),
  avatar_url = COALESCE(p.avatar_url, c.logo_url)
FROM companies c
WHERE p.id = c.id;

-- ============================================
-- PHASE 4: Cleanup (run AFTER app code is updated)
-- ============================================
-- ALTER TABLE profiles DROP COLUMN IF EXISTS user_type;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS hourly_rate_min;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS hourly_rate_max;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS availability;
-- DROP TABLE IF EXISTS companies;
