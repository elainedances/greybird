# Greybird — Project Status

**Platform for 40+ experienced professionals**  
**URL:** https://greybird.pro  
**Repo:** github.com/elainedances/greybird

---

## ✅ Completed Features

### Core Platform
- [x] Landing page with hero image
- [x] Expert profiles (browse, view, edit)
- [x] Company profiles (browse, view, edit)
- [x] Contact forms (email via Resend)
- [x] Waitlist signup

### Authentication
- [x] Email/password signup with confirmation
- [x] Email/password login
- [x] Google OAuth
- [x] LinkedIn OAuth (OIDC)
- [x] Password reset flow
- [x] Cloudflare Turnstile captcha

### User Features
- [x] Avatar/logo upload (Supabase Storage)
- [x] Profile editor (experts)
- [x] Company profile editor
- [x] Account settings
- [x] Account deletion
- [x] Dynamic navigation (auth-aware)

### Content & SEO
- [x] Blog with markdown posts
- [x] About page
- [x] Privacy Policy
- [x] Terms of Service
- [x] Custom 404 page
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Open Graph images
- [x] Google Search Console

### Technical
- [x] Mobile responsive (Tailwind)
- [x] Vercel Analytics
- [x] Resend email integration
- [x] Supabase Auth + Database + Storage

---

## 📋 TODO

### High Priority
- [ ] Real testimonials (collect from users, re-enable section)

### Features
- [ ] In-app messaging (real-time chat)
- [ ] Admin dashboard (user management, analytics)

### Nice to Have
- [ ] Dark mode toggle
- [ ] Animations (Framer Motion)
- [ ] A/B test landing page copy

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 |
| UI | React 19 + Tailwind CSS 4 |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage |
| Email | Resend |
| Captcha | Cloudflare Turnstile |
| Hosting | Vercel |
| Domain | greybird.pro (Porkbun) |

---

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/experts` | Browse experts |
| `/experts/[id]` | Expert profile |
| `/companies` | Browse companies |
| `/companies/[id]` | Company profile |
| `/profile/edit` | Edit expert profile |
| `/company/edit` | Edit company profile |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/about` | About page |
| `/signup` | Create account |
| `/login` | Sign in |
| `/dashboard` | User dashboard |
| `/settings` | Account settings |
| `/forgot-password` | Password reset |

---

## External Services

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Supabase | Auth, DB, Storage | `.env.local` |
| Resend | Transactional email | `.env.local` |
| Google OAuth | Social login | Supabase Dashboard |
| LinkedIn OAuth | Social login | Supabase Dashboard |
| Cloudflare Turnstile | Captcha | Supabase + code |

---

*Last updated: 2026-02-10*
