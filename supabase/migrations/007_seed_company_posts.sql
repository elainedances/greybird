-- ============================================
-- SEED DATA: Company "seeking" posts
-- Run in Supabase SQL Editor
-- ============================================

-- Create auth users for companies
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role)
VALUES
  ('b2000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'hr@nordicscale.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '9 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'ops@greenfield-energy.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '6 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'talent@meridianhealth.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '5 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'ceo@boutique-digital.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '4 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'admin@legalbridge.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '3 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'recruiting@axelgroup.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '2 days', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'founder@saaspilot.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '1 day', now(), 'authenticated', 'authenticated'),
  ('b2000001-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'maria@cloudnine-travel.seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '6 hours', now(), 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Create identities
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
SELECT id, id, jsonb_build_object('sub', id, 'email', email), 'email', id, now(), created_at, now()
FROM auth.users
WHERE id IN (
  'b2000001-0000-0000-0000-000000000001','b2000001-0000-0000-0000-000000000002','b2000001-0000-0000-0000-000000000003',
  'b2000001-0000-0000-0000-000000000004','b2000001-0000-0000-0000-000000000005','b2000001-0000-0000-0000-000000000006',
  'b2000001-0000-0000-0000-000000000007','b2000001-0000-0000-0000-000000000008'
)
ON CONFLICT DO NOTHING;

-- Company profiles
INSERT INTO profiles (id, full_name, headline, bio, location, company_name, industry, is_public, contact_email, created_at)
VALUES
-- 1. Nordic Scale — HR/recruiting firm
('b2000001-0000-0000-0000-000000000001', 'Nordic Scale Talent', 'We help Nordic startups find senior talent',
 'Recruitment agency focused on the Nordics. We work with growth-stage companies who need experienced people but can''t compete with FAANG salaries.',
 'Stockholm, Sweden', 'Nordic Scale', 'Recruiting', true, 'hr@nordicscale.seed.greybird.pro', now() - interval '9 days'),

-- 2. Greenfield Energy — energy company
('b2000001-0000-0000-0000-000000000002', 'Greenfield Energy', NULL,
 'Renewable energy developer. Wind and solar across Northern Europe.',
 'Oslo, Norway', 'Greenfield Energy AS', 'Energy', true, 'ops@greenfield-energy.seed.greybird.pro', now() - interval '6 days'),

-- 3. Meridian Health — hospital group
('b2000001-0000-0000-0000-000000000003', 'Meridian Health Group', 'Private healthcare group — 4 hospitals across Germany',
 NULL,
 'Munich, Germany', 'Meridian Health GmbH', 'Healthcare', true, NULL, now() - interval '5 days'),

-- 4. Boutique Digital — small agency, casual
('b2000001-0000-0000-0000-000000000004', 'Alex from Boutique Digital', 'Small agency, big ambitions',
 'I run a 6-person digital agency. We''re good at execution but honestly need help with strategy and scaling. Looking for someone who''s done it before.',
 'Amsterdam', 'Boutique Digital', 'Marketing', true, 'ceo@boutique-digital.seed.greybird.pro', now() - interval '4 days'),

-- 5. LegalBridge — law firm
('b2000001-0000-0000-0000-000000000005', 'LegalBridge Partners', 'Mid-size law firm specializing in cross-border corporate work',
 'Full service commercial law firm with offices in London and Dubai. 40 lawyers across two jurisdictions.',
 'London, UK', 'LegalBridge LLP', 'Legal', true, 'admin@legalbridge.seed.greybird.pro', now() - interval '3 days'),

-- 6. Axel Group — manufacturing, minimal profile
('b2000001-0000-0000-0000-000000000006', 'Axel Group', NULL,
 'Industrial manufacturing. 2000+ employees.',
 'Gothenburg, Sweden', 'Axel Group AB', 'Manufacturing', true, NULL, now() - interval '2 days'),

-- 7. SaaS Pilot — startup founder
('b2000001-0000-0000-0000-000000000007', 'Johan K.', 'Building a B2B SaaS for logistics',
 'Pre-seed startup. Just me and a technical co-founder right now. We''re building a route optimization tool and need experienced advisors who''ve been through the SaaS journey.',
 NULL, 'SaaS Pilot', 'Technology', true, 'founder@saaspilot.seed.greybird.pro', now() - interval '1 day'),

-- 8. CloudNine Travel — hospitality
('b2000001-0000-0000-0000-000000000008', 'Maria at CloudNine', 'Boutique hotel management company',
 'We manage 3 boutique hotels in Portugal and are expanding to Spain. Need help with the operational side of the expansion.',
 'Lisbon, Portugal', 'CloudNine Hospitality', 'Hospitality', true, 'maria@cloudnine-travel.seed.greybird.pro', now() - interval '6 hours')

ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  headline = EXCLUDED.headline,
  bio = EXCLUDED.bio,
  location = EXCLUDED.location,
  company_name = EXCLUDED.company_name,
  industry = EXCLUDED.industry,
  is_public = EXCLUDED.is_public,
  contact_email = EXCLUDED.contact_email,
  created_at = EXCLUDED.created_at;


-- ============================================
-- POSTS (seeking type — companies looking for experts)
-- ============================================

INSERT INTO posts (user_id, post_type, title, description, category, categories, skills, availability, hours_per_week, hourly_rate_min, hourly_rate_max, location, remote_ok, is_active, created_at)
VALUES

-- Nordic Scale — looking for a CFO type
('b2000001-0000-0000-0000-000000000001', 'seeking', 'Part-time CFO for Series A fintech startup',
 'One of our clients (a Stockholm-based fintech doing ~$2M ARR) needs a part-time CFO to help with fundraising prep, financial modeling, and getting investor materials in order. They''ve outgrown their accountant but aren''t ready for a full-time hire. Ideally someone who''s been through a Series B+ before. 2-3 days per week for 3-6 months.',
 'Finance & Accounting', ARRAY['Finance & Accounting', 'Strategy & Consulting'], ARRAY['Financial Modeling', 'Fundraising', 'SaaS Metrics'],
 NULL, '15-20', 200, 350, 'Stockholm (hybrid preferred)', true, true, now() - interval '9 days'),

-- Greenfield Energy — needs a project manager
('b2000001-0000-0000-0000-000000000002', 'seeking', 'Senior project manager — offshore wind development',
 'We have two offshore wind projects in the pipeline (North Sea) and need an experienced PM to oversee permitting and early-stage development. Must have energy sector background. This is a contract role, probably 12+ months.',
 'Engineering', ARRAY['Engineering', 'Operations'], ARRAY['Project Management', 'Renewables', 'Permitting'],
 NULL, '30-40', NULL, NULL, 'Oslo, Norway', false, true, now() - interval '6 days'),

-- Meridian Health — brief post, minimal effort
('b2000001-0000-0000-0000-000000000003', 'seeking', 'Interim COO needed',
 'Looking for an interim COO for our hospital group while we recruit permanently. Healthcare operations experience required. Start ASAP.',
 'Operations', ARRAY['Operations', 'Strategy & Consulting'], NULL,
 NULL, '40', NULL, NULL, 'Munich, Germany', false, true, now() - interval '5 days'),

-- Boutique Digital — casual, honest
('b2000001-0000-0000-0000-000000000004', 'seeking', 'Need a marketing mentor/advisor — small agency trying to grow',
 'OK so here''s the deal. We''re a small digital agency (6 people) doing about €400K/year and we''re stuck. Good at the work, bad at growing the business. Looking for someone who''s scaled an agency before and can help us figure out pricing, positioning, and how to get bigger clients without burning out. Not looking for a consultant who''ll give us a 50-page deck — just someone to talk to regularly and keep us honest. Maybe a few hours per week?',
 'Marketing & Content', ARRAY['Marketing & Content', 'Strategy & Consulting'], ARRAY['Agency Growth', 'Business Development', 'Pricing Strategy'],
 NULL, '3-5', 100, 180, 'Amsterdam (remote is fine)', true, true, now() - interval '4 days'),

-- LegalBridge — formal
('b2000001-0000-0000-0000-000000000005', 'seeking', 'GDPR & Data Privacy Specialist — Ongoing Advisory',
 'LegalBridge Partners is seeking an experienced data privacy professional to provide ongoing advisory services to our corporate clients. The ideal candidate will have deep expertise in GDPR compliance, DPIA processes, and cross-border data transfer mechanisms. Prior experience with financial services or healthcare data is strongly preferred. This is a retainer-based engagement with an expected commitment of 8-12 hours per month.',
 'Legal & Compliance', ARRAY['Legal & Compliance', 'Tech & IT'], ARRAY['GDPR', 'Data Privacy', 'DPIA', 'Compliance'],
 NULL, '8-12', 250, 400, 'London / Dubai (remote)', true, true, now() - interval '3 days'),

-- Axel Group — dry, corporate
('b2000001-0000-0000-0000-000000000006', 'seeking', 'Lean manufacturing consultant — production optimization',
 'Axel Group is seeking a consultant with expertise in lean manufacturing and production optimization for our main facility in Gothenburg. Scope includes value stream mapping, waste reduction analysis, and implementation support. Initial engagement 3 months with potential extension. Must be able to work on-site.',
 'Operations', ARRAY['Operations', 'Engineering'], ARRAY['Lean Manufacturing', 'Six Sigma', 'Value Stream Mapping'],
 NULL, '20-30', 180, 280, 'Gothenburg, Sweden', false, true, now() - interval '2 days'),

-- SaaS Pilot — startup energy, slightly scattered
('b2000001-0000-0000-0000-000000000007', 'seeking', 'Looking for a SaaS advisor/mentor (pre-seed stage)',
 'We''re two technical founders building a route optimization SaaS for logistics companies. We have a working MVP and 3 pilot customers but honestly have no idea how to do sales, pricing, or fundraising. Looking for someone who''s built a B2B SaaS before and is willing to be an informal advisor — maybe a call every other week plus some async help? We can''t pay market rates yet but happy to discuss equity or a reduced rate. We just need someone who gets it.',
 'Tech & IT', ARRAY['Tech & IT', 'Strategy & Consulting', 'Sales'], ARRAY['SaaS', 'B2B Sales', 'Go-to-market'],
 NULL, '2-4', NULL, NULL, NULL, true, true, now() - interval '1 day'),

-- CloudNine Travel — hotel expansion
('b2000001-0000-0000-0000-000000000008', 'seeking', 'Hotel operations advisor — expanding from Portugal to Spain',
 'We run 3 boutique hotels in Lisbon and Porto and we''re looking at opening our first property in Barcelona or Madrid next year. Need someone who knows the Spanish hospitality market and can advise on everything from property selection to local regulations to staffing. Ideally someone who''s opened hotels in Spain before. Part-time, probably 2-3 days per month for the next 6-8 months.',
 'Operations', ARRAY['Operations', 'Strategy & Consulting'], ARRAY['Hospitality', 'Hotel Operations', 'Market Entry'],
 NULL, '5-10', 180, 300, 'Lisbon / Spain', true, true, now() - interval '6 hours')

ON CONFLICT DO NOTHING;
