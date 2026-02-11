-- ============================================
-- SEED DATA: Expert profiles and offering posts
-- Run in Supabase SQL Editor
-- ============================================

-- Create auth users (with random passwords they'll never use)
-- These are seed/demo accounts to populate the platform

INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role)
VALUES
  ('a1000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'margaret.chen@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '12 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'james.oconnor@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '10 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'priya.sharma@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '9 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'robert.lindqvist@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '8 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'susan.whitfield@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '7 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'ahmed.hassan@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '7 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'karen.mueller@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '6 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'david.nakamura@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '5 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'elena.rossi@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '5 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'michael.thompson@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '4 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'lisa.andersson@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '4 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000000', 'thomas.weber@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '3 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000000', 'nina.petrov@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '3 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000000', 'richard.okafor@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '2 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000000', 'claudia.fernandez@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '2 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000000', 'peter.johansson@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '1 day', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000000', 'maria.dubois@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '1 day', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000000', 'william.chang@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '12 hours', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000000', 'sarah.nielsen@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '8 hours', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000000', 'frank.martinez@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '4 hours', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000000', 'anna.kowalski@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '11 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000000', 'george.patel@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '6 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000000', 'helena.berg@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '3 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000000', 'victor.almeida@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '2 days', now(), 'authenticated', 'authenticated'),
  ('a1000001-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000000', 'diane.rousseau@seed.greybird.pro', crypt('SeedUser2026!', gen_salt('bf')), now(), now() - interval '1 day', now(), 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Create identities for each user (required by Supabase auth)
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
SELECT id, id, jsonb_build_object('sub', id, 'email', email), 'email', id, now(), created_at, now()
FROM auth.users
WHERE id IN (
  'a1000001-0000-0000-0000-000000000001','a1000001-0000-0000-0000-000000000002','a1000001-0000-0000-0000-000000000003',
  'a1000001-0000-0000-0000-000000000004','a1000001-0000-0000-0000-000000000005','a1000001-0000-0000-0000-000000000006',
  'a1000001-0000-0000-0000-000000000007','a1000001-0000-0000-0000-000000000008','a1000001-0000-0000-0000-000000000009',
  'a1000001-0000-0000-0000-000000000010','a1000001-0000-0000-0000-000000000011','a1000001-0000-0000-0000-000000000012',
  'a1000001-0000-0000-0000-000000000013','a1000001-0000-0000-0000-000000000014','a1000001-0000-0000-0000-000000000015',
  'a1000001-0000-0000-0000-000000000016','a1000001-0000-0000-0000-000000000017','a1000001-0000-0000-0000-000000000018',
  'a1000001-0000-0000-0000-000000000019','a1000001-0000-0000-0000-000000000020','a1000001-0000-0000-0000-000000000021',
  'a1000001-0000-0000-0000-000000000022','a1000001-0000-0000-0000-000000000023','a1000001-0000-0000-0000-000000000024',
  'a1000001-0000-0000-0000-000000000025'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- PROFILES
-- ============================================

INSERT INTO profiles (id, full_name, headline, bio, location, years_experience, categories, skills, is_public, contact_email, created_at)
VALUES
-- 1. Margaret Chen — polished, formal, complete
('a1000001-0000-0000-0000-000000000001', 'Margaret Chen', 'Former CFO | Financial Strategy & Governance',
 'Twenty-five years in corporate finance across Asia-Pacific. I served as CFO at Meridian Holdings (2008-2016) and later at Apex Industrial Group, where I led the finance function through an IPO on the SGX. My core strengths are in financial restructuring, capital allocation strategy, and building finance organizations that can scale. I am currently seeking non-executive director and advisory engagements.',
 'Singapore', 28, ARRAY['Finance & Accounting', 'Executive Leadership'], ARRAY['Financial Strategy', 'IPO Readiness', 'Corporate Governance', 'M&A', 'Risk Management'],
 true, 'margaret.chen@seed.greybird.pro', now() - interval '12 days'),

-- 2. James O'Connor — casual, friendly
('a1000001-0000-0000-0000-000000000002', 'James O''Connor', 'Operations guy - manufacturing & logistics',
 'Hey, I''ve been running factory floors and supply chains for about 24 years now. Started on the shop floor in Cork, worked my way up through plant management, ended up overseeing operations across 3 countries for a mid-size industrial group. I know lean inside and out — not the textbook version, the version where you''re fighting with union reps at 6am and trying to hit delivery targets by Friday. Semi-retired now but I get restless, so here I am.',
 'Dublin, Ireland', 24, ARRAY['Operations & Supply Chain', 'Manufacturing'], ARRAY['Lean Manufacturing', 'Supply Chain', 'Process Optimization', 'Six Sigma', 'ERP Implementation'],
 true, 'james.oconnor@seed.greybird.pro', now() - interval '10 days'),

-- 3. Priya S. — brief, confident
('a1000001-0000-0000-0000-000000000003', 'Priya S.', 'CTO & Tech Advisor',
 'Former CTO at two SaaS companies, one acquired. I help non-tech companies figure out their technology strategy without overspending. Fractional CTO or advisory, either works.',
 'London, UK', 22, ARRAY['Technology & Engineering'], ARRAY['Digital Transformation', 'Cloud Architecture', 'Engineering Leadership', 'SaaS'],
 true, 'priya.sharma@seed.greybird.pro', now() - interval '9 days'),

-- 4. Robert Lindqvist — incomplete profile, no bio
('a1000001-0000-0000-0000-000000000004', 'Robert Lindqvist', 'HR & Organizational Development',
 NULL,
 'Stockholm, Sweden', 26, ARRAY['Human Resources'], ARRAY['Organizational Development', 'Executive Coaching', 'Change Management'],
 true, 'robert.lindqvist@seed.greybird.pro', now() - interval '8 days'),

-- 5. Susan Whitfield — rambly, detailed
('a1000001-0000-0000-0000-000000000005', 'Susan Whitfield', 'CMO - Brand Strategy, Go-to-Market, the whole nine yards',
 'So I''ve been in marketing for 30 years which sounds insane when I say it out loud. Started at Ogilvy back when print was still king, then moved client-side and ended up running marketing departments at three different companies — a CPG brand, a B2B software company (that was a learning curve), and a luxury goods group. What I''m really good at is market entry. I''ve launched brands in 14 countries and I know all the ways it can go wrong because I''ve lived most of them. I also have strong opinions about digital marketing spend — most companies waste about 40% of it and I can usually tell you where within the first week. I''m based in New York but I travel constantly anyway so location doesn''t really matter. Oh and I should mention I speak French and Spanish, which has come in handy more times than I can count.',
 'New York, USA', 30, ARRAY['Marketing & Sales', 'Executive Leadership'], ARRAY['Brand Strategy', 'Market Entry', 'Go-to-Market', 'Digital Marketing', 'Marketing Leadership'],
 true, 'susan.whitfield@seed.greybird.pro', now() - interval '7 days'),

-- 6. Ahmed Hassan — formal, corporate
('a1000001-0000-0000-0000-000000000006', 'Ahmed Hassan', 'General Counsel | Regulatory & Compliance',
 'I bring over two decades of experience in corporate law and regulatory compliance, with particular depth in financial services and fintech. As General Counsel for a Dubai-based fintech group, I oversaw regulatory strategy across the UAE, Saudi Arabia, and Egypt. Prior to that, I was a partner at a regional law firm where I advised on cross-border M&A transactions valued in excess of $2 billion. I maintain active memberships with the Dubai International Financial Centre Courts and the Law Society of England and Wales.',
 'Dubai, UAE', 23, ARRAY['Legal & Compliance', 'Finance & Accounting'], ARRAY['Corporate Law', 'Regulatory Compliance', 'GDPR', 'Data Privacy', 'Cross-border M&A', 'Fintech Regulation'],
 true, 'ahmed.hassan@seed.greybird.pro', now() - interval '7 days'),

-- 7. Karen Mueller — no headline, minimal bio
('a1000001-0000-0000-0000-000000000007', 'Karen Mueller', NULL,
 'Retired hospital COO. 18 years in healthcare operations. Open to part-time consulting.',
 'Zurich, Switzerland', 21, ARRAY['Healthcare & Life Sciences'], ARRAY['Hospital Operations', 'Quality Improvement'],
 true, NULL, now() - interval '6 days'),

-- 8. David Nakamura — mid-level, not C-suite
('a1000001-0000-0000-0000-000000000008', 'David Nakamura', 'Engineering Manager → Independent Consultant',
 'I spent 15 years as an engineering manager (not VP, not CTO — the person actually in the trenches with the team). Most recently managed a 40-person engineering org at a Tokyo startup. I''m good at the messy middle stuff: hiring processes that actually work, getting teams to ship on time without burning out, and figuring out when to refactor vs. when to just live with the tech debt. Based in Tokyo, comfortable working in English or Japanese.',
 'Tokyo, Japan', 15, ARRAY['Technology & Engineering'], ARRAY['Engineering Management', 'Agile/Scrum', 'Hiring & Scaling', 'DevOps'],
 true, 'david.nakamura@seed.greybird.pro', now() - interval '5 days'),

-- 9. Elena Rossi — slightly awkward phrasing
('a1000001-0000-0000-0000-000000000009', 'Elena Rossi', 'Sustainability & ESG — helping companies get serious about it',
 'I have been working in sustainability since before it was trendy, which is something I''m proud of but also means I''ve seen a lot of greenwashing. At my previous company (a large industrial group based in Northern Italy) I built the sustainability program from zero and we achieved our carbon neutrality targets two years ahead of schedule. I am particularly knowledgeable about EU reporting requirements which are becoming very complex and many companies are not prepared for this. I can help with the strategy part but also the practical implementation which is where most consultants fall short in my experience.',
 'Milan, Italy', 18, ARRAY['Sustainability & ESG'], ARRAY['ESG Strategy', 'Carbon Neutrality', 'EU Taxonomy', 'Sustainability Reporting', 'Circular Economy'],
 true, 'elena.rossi@seed.greybird.pro', now() - interval '5 days'),

-- 10. Mike Thompson — casual name, sales bro energy
('a1000001-0000-0000-0000-000000000010', 'Mike Thompson', 'Sales leadership & revenue growth',
 'I build sales teams. That''s basically it. 22 years of doing it across SaaS, manufacturing, and professional services. I''ve taken teams from 0 to $50M ARR and I''ve fixed broken sales orgs that were hemorrhaging talent. Not a consultant who''s going to give you a 90-page deck — I get in the room with your reps and figure out what''s actually going on.',
 'Chicago, USA', 25, ARRAY['Marketing & Sales'], ARRAY['Enterprise Sales', 'Business Development', 'Sales Leadership', 'CRM Strategy', 'Negotiation'],
 true, 'michael.thompson@seed.greybird.pro', now() - interval '4 days'),

-- 11. Lisa Andersson — retired teacher turned edtech
('a1000001-0000-0000-0000-000000000011', 'Lisa Andersson', 'Former teacher & university lecturer, now EdTech consultant',
 'I taught high school math and physics for 12 years before moving into higher education. Spent another 10 years as a lecturer and eventually associate dean at a university in Gothenburg. When the pandemic hit, I ended up becoming our department''s unofficial EdTech person — evaluating platforms, training other faculty, figuring out what actually works for online learning. Turns out I was pretty good at it. Now I consult on learning design and EdTech selection. I''m not a technologist — I''m a teacher who understands technology, which I think is actually more useful.',
 'Gothenburg, Sweden', 22, ARRAY['Education & Training'], ARRAY['Curriculum Design', 'EdTech', 'Learning & Development', 'E-learning', 'Program Evaluation'],
 true, 'lisa.andersson@seed.greybird.pro', now() - interval '4 days'),

-- 12. Thomas Weber — complete, professional
('a1000001-0000-0000-0000-000000000012', 'Thomas Weber', 'CISO | Cybersecurity for Financial Services',
 'Nineteen years protecting critical systems, the last seven as CISO at a major European bank. My focus areas are security program development, regulatory compliance (NIS2, DORA, ISO 27001), and incident response planning. I also have experience testifying before regulatory bodies and presenting to boards — security isn''t just technical, it''s about communication.',
 'Frankfurt, Germany', 22, ARRAY['Technology & Engineering', 'Legal & Compliance'], ARRAY['Cybersecurity', 'Incident Response', 'Security Audits', 'ISO 27001', 'NIST Framework', 'Cloud Security'],
 true, 'thomas.weber@seed.greybird.pro', now() - interval '3 days'),

-- 13. Nina Petrov — incomplete, missing years_experience and location
('a1000001-0000-0000-0000-000000000013', 'Nina Petrov', 'Data & analytics',
 'Analytics lead turned independent consultant. I set up data teams and governance frameworks.',
 NULL, NULL, ARRAY['Technology & Engineering', 'Data & Analytics'], ARRAY['Data Strategy', 'Machine Learning', 'Business Intelligence', 'Python'],
 true, 'nina.petrov@seed.greybird.pro', now() - interval '3 days'),

-- 14. Richard Okafor — mission-driven, warm
('a1000001-0000-0000-0000-000000000014', 'Richard Okafor', 'Non-profit strategy & fundraising',
 'I''ve spent my career in international development — 20 years working with NGOs across East and West Africa. Started as a field officer, ended up directing programs with $30M+ budgets. What I care about is impact that lasts after the funding ends. I''m good at grant writing (80%+ success rate over the last decade), donor relationship management, and helping organizations figure out if they''re actually making a difference or just staying busy. Recently started doing some advisory work for social enterprises too, which is an interesting space.',
 'Nairobi, Kenya', 23, ARRAY['Non-profit & Social Impact'], ARRAY['Fundraising', 'Grant Writing', 'Program Evaluation', 'Donor Relations', 'Impact Measurement'],
 true, 'richard.okafor@seed.greybird.pro', now() - interval '2 days'),

-- 15. Claudia Fernandez — professional but brief
('a1000001-0000-0000-0000-000000000015', 'Claudia Fernandez', 'Commercial Real Estate — Investment & Asset Management',
 'Managed commercial property portfolios in Spain, Mexico, and Colombia. Background in investment analysis and development oversight. Available for advisory work or investment committee roles.',
 'Barcelona, Spain', 24, ARRAY['Real Estate & Property', 'Finance & Accounting'], ARRAY['Commercial Real Estate', 'Property Investment', 'Asset Management', 'Portfolio Management', 'Market Analysis'],
 true, 'claudia.fernandez@seed.greybird.pro', now() - interval '2 days'),

-- 16. Peter Johansson — energy sector, matter-of-fact
('a1000001-0000-0000-0000-000000000016', 'Peter Johansson', '30 years in energy, ready for something new',
 'Started in oil and gas, spent the last 12 years in renewables. Built a 500MW wind portfolio from scratch — site selection through to commissioning. Also did grid integration work and some project finance advisory. I know the energy transition from both sides, which not many people can say. Looking for advisory roles, especially with investors who are trying to evaluate energy assets but don''t have deep sector expertise on their team.',
 'Oslo, Norway', 28, ARRAY['Energy & Utilities', 'Sustainability & ESG'], ARRAY['Renewable Energy', 'Wind Power', 'Grid Integration', 'Energy Trading', 'Project Finance'],
 true, 'peter.johansson@seed.greybird.pro', now() - interval '1 day'),

-- 17. Maria Dubois — luxury/retail, slightly aloof
('a1000001-0000-0000-0000-000000000017', 'Maria Dubois', 'Luxury Retail & Brand Expansion',
 'Eighteen years growing luxury brands in Asia-Pacific. I have opened flagship stores in Shanghai, Tokyo, and Seoul, and built e-commerce operations for heritage European brands entering digital channels for the first time. Luxury is a specific discipline — the rules that work for mass market do not apply. I advise on brand positioning, retail strategy, and market entry for premium and luxury companies exclusively.',
 'Paris, France', 21, ARRAY['Marketing & Sales', 'Retail & E-commerce'], ARRAY['Luxury Retail', 'Brand Management', 'Asia-Pacific Expansion', 'E-commerce', 'Customer Experience'],
 true, 'maria.dubois@seed.greybird.pro', now() - interval '1 day'),

-- 18. William Chang — incomplete, no bio, missing contact
('a1000001-0000-0000-0000-000000000018', 'William', 'Venture / startup advisory',
 NULL,
 'San Francisco, USA', 19, ARRAY['Finance & Accounting'], ARRAY['Venture Capital', 'Fundraising', 'Board Governance'],
 true, NULL, now() - interval '12 hours'),

-- 19. Sarah Nielsen — project management, no-nonsense
('a1000001-0000-0000-0000-000000000019', 'Sarah Nielsen', 'Program Director | Delivery-focused',
 'I deliver projects. Large, complex ones — IT transformations, infrastructure builds, organizational restructurings. PMP and PRINCE2 certified but honestly the cert matters less than the 20 years of figuring out how to get 50 stakeholders aligned and keep things moving. I don''t do death-by-PowerPoint. I run tight ships and I''m upfront when things are going sideways.',
 'Copenhagen, Denmark', 20, ARRAY['Operations & Supply Chain', 'Technology & Engineering'], ARRAY['Program Management', 'PMP', 'PRINCE2', 'Agile Transformation', 'Stakeholder Management'],
 true, 'sarah.nielsen@seed.greybird.pro', now() - interval '8 hours'),

-- 20. Frank Martinez — small business owner background
('a1000001-0000-0000-0000-000000000020', 'Frank Martinez', 'Available for consulting',
 'I ran a construction company in Mexico City for 22 years. We did commercial projects, some residential, grew from 5 employees to about 80 at peak. Sold the business in 2023. I''m not an architect or engineer by training — I''m a business person who happens to know construction really well. I think I could be useful to small and mid-size construction firms who need help with the business side: bidding strategy, project costing, managing subcontractors, growing without losing money on every other job. I''ve made all the mistakes already so you don''t have to.',
 'Mexico City, Mexico', 27, ARRAY['Architecture & Construction'], ARRAY['Project Management', 'Cost Estimation', 'Subcontractor Management'],
 true, 'frank.martinez@seed.greybird.pro', now() - interval '4 hours'),

-- 21. Anna Kowalski — procurement specialist, direct
('a1000001-0000-0000-0000-000000000021', 'Anna Kowalski', 'Procurement & Strategic Sourcing',
 'Procurement specialist with 19 years across manufacturing and FMCG. Managed $2B+ in annual spend. I''ve built procurement functions from scratch twice and I know how to get savings without destroying supplier relationships. Direct, no-fluff approach. If you want someone who''ll shake hands and write reports, I''m not your person. If you want someone who''ll actually renegotiate your top 20 contracts and save you money, let''s talk.',
 'Warsaw, Poland', 19, ARRAY['Operations & Supply Chain', 'Manufacturing'], ARRAY['Strategic Sourcing', 'Procurement', 'Cost Optimization', 'Supplier Management', 'Contract Negotiation'],
 true, 'anna.kowalski@seed.greybird.pro', now() - interval '11 days'),

-- 22. George Patel — incomplete, 1-sentence bio, no categories
('a1000001-0000-0000-0000-000000000022', 'George P.', 'Risk & insurance',
 'Former CRO at a Lloyd''s syndicate, now doing independent advisory.',
 'London, UK', NULL, ARRAY[]::text[], ARRAY['Enterprise Risk', 'Insurance'],
 true, 'george.patel@seed.greybird.pro', now() - interval '6 days'),

-- 23. Helena Berg — comms/PR, slightly awkward
('a1000001-0000-0000-0000-000000000023', 'Helena Berg', 'Corporate communications & crisis PR',
 'I have 20 years in corporate communications, most of them at a large Nordic bank where I was head of communications for the last 6 years. I''ve handled IPO communications, two major crises (one regulatory, one reputational), and internal comms for a workforce of 8,000. Crisis PR is really my speciality because I''ve learned that how you communicate in the first 48 hours determines everything that comes after. I also do a lot of work with internal communications which is honestly underrated, most companies are terrible at it and then wonder why their employees don''t know what''s going on.',
 'Helsinki, Finland', 20, ARRAY['Marketing & Sales'], ARRAY['Crisis Communications', 'Corporate PR', 'Media Relations', 'Internal Communications', 'Reputation Management'],
 true, 'helena.berg@seed.greybird.pro', now() - interval '3 days'),

-- 24. Victor Almeida — logistics, no location
('a1000001-0000-0000-0000-000000000024', 'Victor Almeida', 'Logistics & supply chain optimization',
 'Ran logistics across 15 countries for a Fortune 500 manufacturer. Warehouse automation, last-mile delivery, freight cost reduction — that''s what I know. I''ve seen pretty much every logistics problem there is and at this point I can usually diagnose the issue within a week. Currently based in Brazil but I travel for the right engagement.',
 NULL, 23, ARRAY['Operations & Supply Chain', 'Technology & Engineering'], ARRAY['Logistics', 'Warehouse Automation', 'Last-mile Delivery', 'Freight Optimization', 'WMS Implementation'],
 true, 'victor.almeida@seed.greybird.pro', now() - interval '2 days'),

-- 25. Diane Rousseau — incomplete, missing skills
('a1000001-0000-0000-0000-000000000025', 'Diane', NULL,
 'Hospitality background. Hotels mostly. Looking for advisory or board roles.',
 'Switzerland', 22, ARRAY['Hospitality & Tourism'], ARRAY[]::text[],
 true, 'diane.rousseau@seed.greybird.pro', now() - interval '1 day')

ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  headline = EXCLUDED.headline,
  bio = EXCLUDED.bio,
  location = EXCLUDED.location,
  years_experience = EXCLUDED.years_experience,
  categories = EXCLUDED.categories,
  skills = EXCLUDED.skills,
  is_public = EXCLUDED.is_public,
  contact_email = EXCLUDED.contact_email,
  created_at = EXCLUDED.created_at;


-- ============================================
-- POSTS (offering type — experts available for work)
-- ============================================

INSERT INTO posts (user_id, post_type, title, description, category, categories, skills, availability, hours_per_week, hourly_rate_min, hourly_rate_max, location, remote_ok, is_active, created_at)
VALUES
-- Margaret Chen
('a1000001-0000-0000-0000-000000000001', 'offering', 'CFO-Level Financial Advisory & Board Roles',
 'I am available for non-executive director positions, audit committee membership, and financial advisory engagements. My experience is strongest in IPO preparation, financial restructuring, and building finance teams in high-growth environments. I work best with companies that have reached a stage where they need institutional-grade financial governance but are not yet ready to hire a full-time CFO at that level. Typical engagement is 2-4 days per month.',
 'Finance & Accounting', ARRAY['Finance & Accounting', 'Executive Leadership'], ARRAY['Financial Strategy', 'IPO Readiness', 'M&A', 'Corporate Governance'],
 'available', '10-15', 280, 400, 'Singapore (Remote OK)', true, true, now() - interval '12 days'),

-- James O'Connor
('a1000001-0000-0000-0000-000000000002', 'offering', 'Manufacturing operations - lean transformation, supply chain fixes',
 'If your factory floor is a mess or your supply chain keeps surprising you, I can probably help. I''ve done lean transformations at 6 different plants and I won''t sugarcoat what I find. Fair warning: I''m hands-on. I''ll be on your shop floor, not in a conference room. Typical gig is 3-6 months, can do less if it''s a specific problem.',
 'Operations & Supply Chain', ARRAY['Operations & Supply Chain', 'Manufacturing'], ARRAY['Lean Manufacturing', 'Process Optimization', 'Supply Chain'],
 'available', '15-20', 150, 250, 'Ireland (will travel)', true, true, now() - interval '10 days'),

-- Priya S.
('a1000001-0000-0000-0000-000000000003', 'offering', 'Fractional CTO / Tech Advisory',
 'Fractional CTO for non-tech companies that need senior technical guidance. I do tech stack evaluations, vendor selection, engineering team assessments, and digital transformation roadmaps. Not interested in writing code for you — interested in making sure you''re building the right thing the right way. 2-3 days a week max.',
 'Technology & Engineering', ARRAY['Technology & Engineering'], ARRAY['Digital Transformation', 'Cloud Architecture', 'Engineering Leadership'],
 'limited', '10-15', 300, 450, 'London, UK', true, true, now() - interval '9 days'),

-- Robert Lindqvist
('a1000001-0000-0000-0000-000000000004', 'offering', 'Interim HR Director / Organizational Consulting',
 'Available for interim HR leadership during transitions or restructurings. Also do executive coaching on the side.',
 'Human Resources', ARRAY['Human Resources'], ARRAY['Organizational Development', 'Executive Coaching', 'Change Management'],
 'available', '20-30', 200, NULL, 'Stockholm, Sweden', true, true, now() - interval '8 days'),

-- Susan Whitfield
('a1000001-0000-0000-0000-000000000005', 'offering', 'Brand Strategy & Market Entry — Fractional CMO',
 'I do two things really well: help companies enter new markets and fix marketing departments that aren''t working. If you''re spending $5M+ on marketing and can''t tell me what''s working, we should talk. I typically work as a fractional CMO for 6-12 months — long enough to actually change things, not just diagnose them. Best fit is companies in the $10M-$200M revenue range that have outgrown their marketing but aren''t ready for a $400K CMO hire.',
 'Marketing & Sales', ARRAY['Marketing & Sales', 'Executive Leadership'], ARRAY['Brand Strategy', 'Market Entry', 'Go-to-Market', 'Digital Marketing'],
 'available', '10-15', 275, 425, 'New York, USA', true, true, now() - interval '7 days'),

-- Ahmed Hassan
('a1000001-0000-0000-0000-000000000006', 'offering', 'Legal Counsel — Regulatory Compliance & Cross-Border Transactions',
 'I provide fractional general counsel services to companies operating in or expanding into the Middle East and North Africa region, with particular expertise in fintech regulatory frameworks. My services include regulatory strategy and licensing, GDPR and data privacy compliance, cross-border transaction structuring, and legal function setup for scaling companies. I am also available for specific project-based engagements such as regulatory audits or transaction support.',
 'Legal & Compliance', ARRAY['Legal & Compliance', 'Finance & Accounting'], ARRAY['Regulatory Compliance', 'GDPR', 'Corporate Law', 'Fintech Regulation', 'Cross-border M&A'],
 'available', '10-20', 280, 400, 'Dubai, UAE', true, true, now() - interval '7 days'),

-- Karen Mueller
('a1000001-0000-0000-0000-000000000007', 'offering', 'Healthcare consulting',
 'Available for part-time consulting in hospital operations. Prefer short engagements.',
 'Healthcare & Life Sciences', ARRAY['Healthcare & Life Sciences'], ARRAY['Hospital Operations', 'Quality Improvement'],
 'limited', '5-10', NULL, NULL, 'Switzerland', true, true, now() - interval '6 days'),

-- David Nakamura
('a1000001-0000-0000-0000-000000000008', 'offering', 'Engineering Team Coaching & Process Improvement',
 'I help engineering managers and small CTOs get better at the people side of their job. How to run hiring that actually finds good people, how to set up sprint processes that don''t make everyone miserable, how to have the hard conversations about performance. I''m not going to tell you about "engineering excellence" or whatever — I''m going to help you solve the specific problems your team has right now. I do this as coaching (1-on-1 with your eng lead) or as a short consulting engagement where I embed with the team for a few weeks.',
 'Technology & Engineering', ARRAY['Technology & Engineering'], ARRAY['Engineering Management', 'Agile/Scrum', 'Hiring & Scaling'],
 'available', '10-15', 180, 300, 'Tokyo (remote OK)', true, true, now() - interval '5 days'),

-- Elena Rossi
('a1000001-0000-0000-0000-000000000009', 'offering', 'ESG Strategy and EU Sustainability Reporting',
 'I help companies develop real sustainability strategies — not just reports that look good. From materiality assessments to full EU taxonomy alignment. I''m especially useful if you''re an industrial or manufacturing company because that''s where my background is and I understand the operational realities. I''m tired of seeing companies hire big consultancies who produce beautiful documents that nobody implements, so I focus on practical stuff you can actually do.',
 'Sustainability & ESG', ARRAY['Sustainability & ESG'], ARRAY['ESG Strategy', 'Sustainability Reporting', 'EU Taxonomy', 'Carbon Neutrality'],
 'available', '15-20', 180, 300, 'Milan, Italy', true, true, now() - interval '5 days'),

-- Mike Thompson
('a1000001-0000-0000-0000-000000000010', 'offering', 'Sales team building & revenue acceleration',
 'Fractional VP Sales or sales coaching. I get in the room with your reps, ride along on calls, and figure out why deals are stalling. Then we fix it. No 90-page decks.',
 'Marketing & Sales', ARRAY['Marketing & Sales'], ARRAY['Enterprise Sales', 'Business Development', 'Sales Leadership'],
 'available', '15-20', 200, 350, 'Chicago, USA', true, true, now() - interval '4 days'),

-- Lisa Andersson
('a1000001-0000-0000-0000-000000000011', 'offering', 'EdTech evaluation & learning program design',
 'I think I could be really useful for organizations that are trying to figure out online learning and don''t know where to start. There are hundreds of EdTech platforms out there and most of them overpromise. I can help you evaluate what actually fits your needs, design curricula that work in digital formats, and train your staff to use it all effectively. I come at this from a teaching background, not a tech background, which means I focus on whether people are actually learning — not just whether the platform looks nice.

I''m also happy to work with universities or schools that need help modernizing. I''ve been through it myself and I know how resistant faculty can be (I was one of them for a while).',
 'Education & Training', ARRAY['Education & Training'], ARRAY['EdTech', 'Curriculum Design', 'E-learning'],
 'available', '15-20', 120, 200, 'Sweden', true, true, now() - interval '4 days'),

-- Thomas Weber
('a1000001-0000-0000-0000-000000000012', 'offering', 'Fractional CISO & Security Program Development',
 'Offering fractional CISO services for mid-size companies, particularly in financial services and fintech. I build security programs, prepare organizations for regulatory audits (NIS2, DORA, ISO 27001), and establish incident response capabilities. I also do one-off security assessments and board-level security briefings. If you''ve just had an incident or a near-miss and you''re not sure what to do next, that''s a good time to call me.',
 'Technology & Engineering', ARRAY['Technology & Engineering', 'Legal & Compliance'], ARRAY['Cybersecurity', 'Security Audits', 'ISO 27001', 'NIST Framework', 'Incident Response'],
 'limited', '10-15', 300, 420, 'Frankfurt, Germany', true, true, now() - interval '3 days'),

-- Nina Petrov
('a1000001-0000-0000-0000-000000000013', 'offering', 'Data strategy & analytics setup',
 'I help companies get value from their data. Governance, pipelines, dashboards that people actually use.',
 'Data & Analytics', ARRAY['Technology & Engineering', 'Data & Analytics'], ARRAY['Data Strategy', 'Business Intelligence'],
 'available', '15-20', 175, NULL, 'Remote', true, true, now() - interval '3 days'),

-- Richard Okafor
('a1000001-0000-0000-0000-000000000014', 'offering', 'Non-profit strategy, fundraising, and impact measurement',
 'I advise NGOs and social enterprises on three things: getting funded, measuring impact, and scaling without losing your soul. My grant writing has about an 80% success rate over the last decade — not because I''m magic but because I only write proposals for programs that actually make sense. I''m most useful for organizations in the $1M-$30M range that are past the startup phase but haven''t yet figured out how to grow sustainably.

I also do board advisory for foundations and impact investors who want someone with field experience, not just financial modeling.',
 'Non-profit & Social Impact', ARRAY['Non-profit & Social Impact'], ARRAY['Fundraising', 'Grant Writing', 'Impact Measurement', 'Strategic Planning'],
 'available', '10-15', 130, 220, 'Nairobi, Kenya', true, true, now() - interval '2 days'),

-- Claudia Fernandez
('a1000001-0000-0000-0000-000000000015', 'offering', 'Real Estate Investment Advisory',
 'Available for commercial real estate advisory — investment analysis, portfolio reviews, and development project oversight. Strong in European and LatAm markets. Can join investment committees or advise on specific transactions.',
 'Real Estate & Property', ARRAY['Real Estate & Property', 'Finance & Accounting'], ARRAY['Commercial Real Estate', 'Property Investment', 'Portfolio Management'],
 'available', '10-15', 220, 350, 'Barcelona, Spain', true, true, now() - interval '2 days'),

-- Peter Johansson
('a1000001-0000-0000-0000-000000000016', 'offering', 'Energy transition advisory — renewables, grid, project finance',
 'If you''re an investor looking at energy assets, I can help you figure out what''s real and what''s hype. If you''re an energy company trying to navigate the transition, I''ve done it myself. I know wind development inside and out, I understand grid economics, and I can talk to both engineers and finance people. Most of my work lately has been with PE firms and family offices evaluating renewable energy investments. Happy to do longer advisory engagements too.',
 'Energy & Utilities', ARRAY['Energy & Utilities', 'Sustainability & ESG'], ARRAY['Renewable Energy', 'Wind Power', 'Project Finance', 'Grid Integration'],
 'available', '15-20', 240, 380, 'Oslo, Norway', true, true, now() - interval '1 day'),

-- Maria Dubois
('a1000001-0000-0000-0000-000000000017', 'offering', 'Luxury Brand Strategy & APAC Market Entry',
 'I advise luxury and premium brands on expansion into Asian markets. This includes market assessment, retail strategy (flagship stores and department store concessions), and e-commerce channel development. I only work with genuine premium and luxury brands — if you''re selling mid-market products and hoping to ''premiumize,'' I am not the right fit.',
 'Retail & E-commerce', ARRAY['Marketing & Sales', 'Retail & E-commerce'], ARRAY['Luxury Retail', 'Brand Management', 'E-commerce', 'Asia-Pacific Expansion'],
 'available', '10-15', 280, 420, 'Paris, France', true, true, now() - interval '1 day'),

-- William Chang
('a1000001-0000-0000-0000-000000000018', 'offering', 'Startup fundraising help',
 'Pitch deck review, fundraising strategy, investor intros. Also available as an independent board member.',
 'Finance & Accounting', ARRAY['Finance & Accounting'], ARRAY['Venture Capital', 'Fundraising'],
 'available', '5-10', NULL, NULL, 'San Francisco, USA', true, true, now() - interval '12 hours'),

-- Sarah Nielsen
('a1000001-0000-0000-0000-000000000019', 'offering', 'Interim Program Director — large-scale project delivery',
 'I run large programs. $50M-$200M, multi-year, lots of moving parts. Available for interim program director roles or PMO setup. I''m PMP/PRINCE2 certified but what actually matters is that I''ve delivered 15+ major programs without a single one going off the rails (well, one did, but I caught it early and we course-corrected). I''m direct, organized, and I don''t let scope creep happen on my watch.',
 'Operations & Supply Chain', ARRAY['Operations & Supply Chain', 'Technology & Engineering'], ARRAY['Program Management', 'PMP', 'PRINCE2', 'Stakeholder Management', 'Risk Management'],
 'available', '20-30', 210, 330, 'Copenhagen, Denmark', true, true, now() - interval '8 hours'),

-- Frank Martinez
('a1000001-0000-0000-0000-000000000020', 'offering', 'Construction business consulting',
 'I ran a construction company for 22 years so I know what it''s like to be in your shoes. I can help with bidding strategy, project costing, subcontractor management, and general business growth. I''m not going to tell you about theory — I''m going to tell you what actually worked for me and what didn''t. Best fit for small to mid-size construction firms that are trying to grow but keep running into the same problems.',
 'Architecture & Construction', ARRAY['Architecture & Construction'], ARRAY['Project Management', 'Cost Estimation'],
 'available', '10-15', 100, 180, 'Mexico City, Mexico', true, true, now() - interval '4 hours'),

-- Anna Kowalski
('a1000001-0000-0000-0000-000000000021', 'offering', 'Procurement overhaul & cost reduction',
 'I come in, look at your supplier contracts, your procurement processes, and your spend data, and I find money. Usually 10-20% savings on the categories I address, within the first year. I''ve done this at companies spending anywhere from $50M to $2B annually. I can also build your procurement function if you don''t have one, or fix it if it''s not working. I''m not gentle about it — if your team is rubber-stamping POs without competitive bidding, I''m going to say so.',
 'Operations & Supply Chain', ARRAY['Operations & Supply Chain', 'Manufacturing'], ARRAY['Strategic Sourcing', 'Procurement', 'Cost Optimization', 'Contract Negotiation'],
 'available', '15-20', 170, 280, 'Warsaw, Poland', true, true, now() - interval '11 days'),

-- George Patel
('a1000001-0000-0000-0000-000000000022', 'offering', 'Risk management advisory',
 'Enterprise risk frameworks, insurance program optimization. Former CRO.',
 'Finance & Accounting', ARRAY['Finance & Accounting'], NULL,
 'available', '10-15', 250, 380, 'London, UK', true, true, now() - interval '6 days'),

-- Helena Berg
('a1000001-0000-0000-0000-000000000023', 'offering', 'Crisis communications and corporate PR',
 'If you''re in a crisis right now, I can start immediately — I''ve handled regulatory investigations, product recalls, and executive departures. If you''re not in a crisis, I can help you prepare so you''re not scrambling when one hits. I also do ongoing corporate communications advisory — internal comms strategy, investor communications, media training for executives. The internal comms piece is honestly where most companies need the most help, they just don''t realize it until it''s too late.',
 'Marketing & Sales', ARRAY['Marketing & Sales'], ARRAY['Crisis Communications', 'Corporate PR', 'Internal Communications', 'Reputation Management'],
 'available', '10-15', 200, 320, 'Helsinki, Finland', true, true, now() - interval '3 days'),

-- Victor Almeida
('a1000001-0000-0000-0000-000000000024', 'offering', 'Logistics optimization — warehousing, freight, last-mile',
 'I optimize logistics networks. Warehouse layout and automation, freight cost reduction, last-mile delivery improvement. I''ve done this across 15 countries for a Fortune 500 company and now I do it independently for companies that need the expertise but can''t justify a full-time logistics VP. Typical engagement is a 4-6 week diagnostic followed by implementation support. I can usually find 15-25% freight cost savings — it''s almost always there if nobody''s looked in a while.',
 'Operations & Supply Chain', ARRAY['Operations & Supply Chain'], ARRAY['Logistics', 'Warehouse Automation', 'Freight Optimization', 'Last-mile Delivery'],
 'available', '15-20', 160, 280, 'Brazil (will travel)', true, true, now() - interval '2 days'),

-- Diane Rousseau
('a1000001-0000-0000-0000-000000000025', 'offering', 'Hotel operations & hospitality advisory',
 'Looking for advisory or board roles in hospitality. Managed luxury and boutique hotel properties across Europe and the Middle East for 22 years.',
 'Hospitality & Tourism', ARRAY['Hospitality & Tourism'], NULL,
 'available', '10-20', NULL, NULL, 'Switzerland', true, true, now() - interval '1 day')

ON CONFLICT DO NOTHING;
