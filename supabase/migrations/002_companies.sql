-- Companies table for company profiles
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT,
  headline TEXT,
  description TEXT,
  industry TEXT,
  company_size TEXT, -- '1-10', '11-50', '51-200', '201-500', '500+'
  location TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  logo_url TEXT,
  looking_for TEXT[], -- categories they're hiring for
  contact_email TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public companies are viewable by everyone"
  ON companies FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view their own company profile"
  ON companies FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own company profile"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own company profile"
  ON companies FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create company profile on signup (for company users)
-- Note: The existing trigger creates profiles. We'll need to handle companies separately via the app.
