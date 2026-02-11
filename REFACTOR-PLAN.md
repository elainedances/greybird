# Greybird Refactor Plan: From Rigid Roles to Flexible Posts

## Overview

**Current model:** Users choose "expert" or "company" at signup. Experts have profiles; companies have separate profiles. Browse pages show profiles.

**New model:** Everyone is just a "user" with a profile. Users create **posts** — either "Offering expertise" or "Looking for talent." The same user can create both types. Browse pages become feeds of active posts.

---

## 1. Database Schema Changes

### 1a. Modify `profiles` table

The profiles table is created by a Supabase trigger (not in the migration files — likely set up via dashboard or an `001_` migration). Current known columns from code:

```
id, user_type, full_name, headline, bio, location, avatar_url,
years_experience, hourly_rate_min, hourly_rate_max, availability,
categories, skills, contact_email, linkedin_url, website_url,
preferred_contact, is_public, created_at, updated_at
```

**Migration: `004_posts_refactor.sql`**

```sql
-- ============================================
-- PHASE 1: Modify profiles table
-- ============================================

-- Remove user_type dependency (keep column temporarily for migration, drop later)
-- Remove expert-specific fields that now belong on posts
-- Keep: general identity fields

-- Add new general fields if missing
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

  -- Post type: 'offering' or 'seeking'
  post_type TEXT NOT NULL CHECK (post_type IN ('offering', 'seeking')),

  -- Content
  title TEXT NOT NULL,
  description TEXT,
  
  -- Categorization
  category TEXT,                    -- primary category
  categories TEXT[] DEFAULT '{}',   -- multiple categories
  skills TEXT[] DEFAULT '{}',       -- relevant skills/tags
  
  -- Availability & rates (for 'offering' posts)
  availability TEXT,                -- 'available', 'limited', 'starting_soon'
  hours_per_week TEXT,              -- '5-10', '10-20', '20-40', 'flexible'
  hourly_rate_min INTEGER,
  hourly_rate_max INTEGER,
  
  -- Duration & engagement (for 'seeking' posts)
  engagement_type TEXT,             -- 'advisory', 'part-time', 'project', 'board', 'mentoring'
  duration TEXT,                    -- '1-3 months', '3-6 months', '6-12 months', 'ongoing'
  
  -- Location
  location TEXT,
  remote_ok BOOLEAN DEFAULT true,
  
  -- Lifecycle
  is_active BOOLEAN DEFAULT true,
  expiry_date TIMESTAMPTZ,
  
  -- Metadata
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

-- Anyone can view active, non-expired posts
CREATE POLICY "Active posts are viewable by everyone"
  ON posts FOR SELECT
  USING (
    is_active = true 
    AND (expiry_date IS NULL OR expiry_date > now())
  );

-- Users can view their own posts (even inactive)
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own posts
CREATE POLICY "Users can create their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- PHASE 3: Update profiles RLS (remove user_type from any policies)
-- ============================================

-- Update profiles to be viewable regardless of user_type
-- (Existing policies likely already work — they check is_public, not user_type)

-- ============================================
-- PHASE 4: Data migration — move existing data to posts
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

-- Migrate company info into profiles for company users
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
-- PHASE 5: Cleanup (run AFTER app code is updated)
-- ============================================
-- These should be run in a separate migration after all code is updated:

-- ALTER TABLE profiles DROP COLUMN IF EXISTS user_type;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS hourly_rate_min;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS hourly_rate_max;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS availability;
-- DROP TABLE IF EXISTS companies;
```

### 1b. Final `profiles` table structure (after refactor)

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | References auth.users |
| full_name | TEXT | |
| headline | TEXT | General tagline |
| bio | TEXT | About yourself |
| location | TEXT | |
| avatar_url | TEXT | |
| years_experience | INT | |
| categories | TEXT[] | General expertise areas |
| skills | TEXT[] | General skills |
| contact_email | TEXT | |
| linkedin_url | TEXT | |
| website_url | TEXT | |
| preferred_contact | TEXT | |
| company_name | TEXT | Optional — if representing a company |
| company_headline | TEXT | Optional |
| industry | TEXT | Optional |
| company_size | TEXT | Optional |
| is_public | BOOLEAN | Profile visibility |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

Fields **moved to posts**: `hourly_rate_min`, `hourly_rate_max`, `availability`  
Fields **removed**: `user_type`

---

## 2. Pages to Modify

### 2a. Signup (`src/app/signup/page.tsx`)
- **Remove** the "I am... Expert / Company" selector (`userType` state, the grid of two buttons)
- **Remove** `user_type` from `signUp({ options: { data: { user_type } } })`
- **Remove** `user_type` from OAuth redirect URL
- Keep everything else (social login, email form, Turnstile)

### 2b. Auth Callback (`src/app/auth/callback/route.ts`)
- **Remove** the `user_type` parameter handling (lines that read `searchParams.get("user_type")` and `updateUser`)

### 2c. Dashboard (`src/app/dashboard/page.tsx`)
- **Remove** `userType` logic and conditional rendering (expert vs company cards)
- **Replace with:**
  - "Your Posts" section — fetch from `posts` table where `user_id = user.id`
  - "Create New Post" button (links to `/posts/new`)
  - Quick stats: X active posts, profile completeness
  - Keep: profile edit link, settings link, account status

### 2d. Profile Edit (`src/app/profile/edit/page.tsx`)
- **Remove** `user_type` from Profile type and all `isExpert` conditional logic
- **Remove** expert-specific sections: hourly rate, availability (these move to posts)
- **Add** optional company fields: company_name, industry, company_size
- **Keep**: name, headline, bio, location, avatar, categories, skills, contact info, visibility toggle
- All users see the same form

### 2e. Browse/Feed — **NEW** (`src/app/posts/page.tsx`) — replaces `/experts` and `/companies`
- Unified feed of active posts
- Filters: post_type (offering/seeking/all), category, skills, location
- Search by title/description
- Sort: newest, expiring soon
- Card shows: title, post_type badge, user name+avatar, categories, location, rate range (if offering)

### 2f. Post Detail — **NEW** (`src/app/posts/[id]/page.tsx`)
- Shows full post details
- Links to author's profile
- MessageButton to contact the poster
- If offering: skills, availability, rate, engagement types
- If seeking: requirements, duration, engagement type

### 2g. Create/Edit Post — **NEW** (`src/app/posts/new/page.tsx` and `src/app/posts/[id]/edit/page.tsx`)
- Post type selector: "I'm offering expertise" / "I'm looking for talent"
- Common fields: title, description, categories, skills, location, remote_ok, expiry_date
- Offering-specific: availability, hours_per_week, hourly_rate_min/max
- Seeking-specific: engagement_type, duration
- Preview before publishing

### 2h. User Profile — **NEW** (`src/app/users/[id]/page.tsx`) — replaces `/experts/[id]`
- Shows profile info (name, bio, avatar, location, categories, skills, contact)
- Lists their active posts
- MessageButton
- Company info section if they have company_name

---

## 3. Pages to Remove or Repurpose

| Current Path | Action | Notes |
|---|---|---|
| `src/app/company/edit/page.tsx` | **DELETE** | Absorbed into `/profile/edit` |
| `src/app/companies/page.tsx` | **REDIRECT** → `/posts?type=seeking` | Or delete entirely |
| `src/app/companies/[id]/page.tsx` | **REDIRECT** → `/users/[id]` | |
| `src/app/experts/page.tsx` | **REDIRECT** → `/posts?type=offering` | Or delete entirely |
| `src/app/experts/[id]/page.tsx` | **REDIRECT** → `/users/[id]` | |
| `src/app/experts/[id]/contact-form.tsx` | **MOVE** to shared component | Reuse on user profile page |

Add redirect files for SEO:
```typescript
// src/app/experts/page.tsx (replacement)
import { redirect } from "next/navigation";
export default function ExpertsRedirect() { redirect("/posts?type=offering"); }

// src/app/companies/page.tsx (replacement)
import { redirect } from "next/navigation";
export default function CompaniesRedirect() { redirect("/posts?type=seeking"); }

// src/app/experts/[id]/page.tsx (replacement)
import { redirect } from "next/navigation";
export default async function ExpertRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/users/${id}`);
}

// src/app/companies/[id]/page.tsx (replacement)  
import { redirect } from "next/navigation";
export default async function CompanyRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/users/${id}`);
}
```

---

## 4. Components to Modify

### 4a. Navigation (`src/components/Navigation.tsx`)
- Replace "Find Experts" → "Browse Posts" (link to `/posts`)
- Replace "Browse Companies" → remove (or keep as filtered link `/posts?type=seeking`)
- Consider: "Offering" and "Seeking" as two nav items, or just one "Browse" link
- Add "Create Post" quick-action for logged-in users

### 4b. MessageButton (`src/components/MessageButton.tsx`)
- **No changes needed** — it already takes `targetUserId` and works generically
- Ensure it's used on both post detail pages and user profile pages

### 4c. AvatarUpload (`src/components/AvatarUpload.tsx`)
- **No changes needed** — already generic

### 4d. Landing Page (`src/app/page.tsx`)
- Update CTAs: instead of "I'm hiring" / "I'm an expert" → "Create a Post" / "Browse Opportunities"
- Update "How It Works" section to reflect post-based flow
- Update category grid to link to `/posts?category=X`

---

## 5. Migration Strategy

### Data migration
1. Run `004_posts_refactor.sql` which:
   - Adds new columns to profiles
   - Creates posts table
   - Migrates expert profiles → offering posts
   - Migrates company profiles → seeking posts
   - Copies company data into profiles table

2. **Do NOT drop `user_type` or `companies` table yet** — keep for rollback safety

3. After app code is fully deployed and verified, run cleanup migration:
   - Drop `user_type` from profiles
   - Drop `hourly_rate_min`, `hourly_rate_max`, `availability` from profiles
   - Drop `companies` table

### User impact
- Existing experts: their profile data becomes a post automatically
- Existing companies: their company profile becomes a post, company details merge into their profile
- No one loses data
- Everyone can now create both types of posts

---

## 6. Implementation Order

### Phase 1: Database & Core (do first)
1. Write and run `004_posts_refactor.sql`
2. Verify data migration worked (check posts table has entries)
3. Test RLS policies

### Phase 2: New Pages (can be built in parallel)
1. `src/app/posts/page.tsx` — Browse posts feed
2. `src/app/posts/[id]/page.tsx` — Post detail
3. `src/app/posts/new/page.tsx` — Create post
4. `src/app/posts/[id]/edit/page.tsx` — Edit post
5. `src/app/users/[id]/page.tsx` — User profile with posts

### Phase 3: Modify Existing Pages
1. Update `src/app/signup/page.tsx` — remove user_type
2. Update `src/app/auth/callback/route.ts` — remove user_type
3. Update `src/app/dashboard/page.tsx` — show posts
4. Update `src/app/profile/edit/page.tsx` — unified profile form
5. Update `src/components/Navigation.tsx` — new links

### Phase 4: Redirects & Cleanup
1. Replace old expert/company pages with redirects
2. Delete `src/app/company/edit/page.tsx`
3. Update landing page CTAs
4. Update sitemap (`src/app/sitemap.ts`)

### Phase 5: Database Cleanup (after Phase 4 is deployed & stable)
1. Run cleanup migration to drop old columns/tables
2. Update any remaining references

---

## File Summary

### New files to create:
- `supabase/migrations/004_posts_refactor.sql`
- `src/app/posts/page.tsx`
- `src/app/posts/[id]/page.tsx`
- `src/app/posts/new/page.tsx`
- `src/app/posts/[id]/edit/page.tsx`
- `src/app/users/[id]/page.tsx`

### Files to modify:
- `src/app/signup/page.tsx`
- `src/app/auth/callback/route.ts`
- `src/app/dashboard/page.tsx`
- `src/app/profile/edit/page.tsx`
- `src/app/page.tsx` (landing)
- `src/app/sitemap.ts`
- `src/components/Navigation.tsx`

### Files to replace with redirects:
- `src/app/experts/page.tsx`
- `src/app/experts/[id]/page.tsx`
- `src/app/companies/page.tsx`
- `src/app/companies/[id]/page.tsx`

### Files to delete:
- `src/app/company/edit/page.tsx`
- `src/app/experts/[id]/contact-form.tsx` (move logic to shared component or inline in users/[id])

---

## API Routes

### New routes needed:
- None strictly required — can use Supabase client directly for CRUD on posts
- Optional: `src/app/api/posts/route.ts` if server-side validation is wanted

### Existing routes — no changes needed:
- `src/app/api/messages/*` — already user-id based, works with posts model
- `src/app/api/contact/route.ts` — generic, works as-is
- `src/app/api/account/delete/route.ts` — CASCADE handles posts deletion
- `src/app/api/waitlist/route.ts` — unrelated, keep as-is
