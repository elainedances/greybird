# Greybird Visual Audit — 2026-02-11

## Summary
The landing page and core pages (dashboard, about) are well-polished. The refactored pages (posts/*, users/*) are **mostly consistent** but have notable gaps: remaining emojis, missing Lucide icons, missing Navigation on detail pages, and inconsistent footer styling.

---

## 1. Plus Jakarta Sans ✅
- **layout.tsx**: Google Fonts link loads `Plus+Jakarta+Sans` (400–800) + Inter fallback
- **globals.css:21–25**: `body` and headings both set to `'Plus Jakarta Sans'` first
- **Verdict**: ✅ Done correctly

## 2. Lucide Icons — Mostly Done ✅ / ⚠️ Remaining Emojis

### ✅ Pages using Lucide properly:
- `src/app/page.tsx` — 19 Lucide imports, zero emojis
- `src/app/dashboard/page.tsx` — UserCircle, PlusCircle, Eye, EyeOff, Settings, etc.
- `src/app/about/page.tsx` — UserCircle, Building2, Handshake, Target, Zap, Gem
- `src/components/Navigation.tsx` — MessageSquare
- `src/components/MessageButton.tsx` — MessageCircle
- `src/components/MessagesClient.tsx` — ArrowLeft, Send

### ⚠️ Remaining emojis (need Lucide replacement):
| File | Line | Emoji | Suggested Lucide Icon |
|------|------|-------|-----------------------|
| `src/app/users/[id]/page.tsx` | 108 | 🏢 | `Building2` |
| `src/app/users/[id]/page.tsx` | 117 | 👥 | `Users` |
| `src/app/posts/[id]/edit/page.tsx` | 175 | 💡 | `Lightbulb` |
| `src/app/posts/[id]/edit/page.tsx` | 188 | 🔍 | `Search` |
| `src/app/posts/new/page.tsx` | 146 | 💡 | `Lightbulb` |
| `src/app/posts/new/page.tsx` | 159 | 🔍 | `Search` |

### ⚠️ Pages with NO Lucide imports at all:
- `src/app/posts/page.tsx` — no icons used (filter buttons are text-only)
- `src/app/posts/[id]/page.tsx` — no icons
- `src/app/posts/[id]/edit/page.tsx` — no icons (uses emojis instead)
- `src/app/posts/new/page.tsx` — no icons (uses emojis instead)
- `src/app/users/[id]/page.tsx` — no icons (uses emojis instead)

## 3. Teal/Amber Accent Colors ✅
- **globals.css**: CSS custom properties define teal-700/800/500 and amber-500/400
- **Landing page**: Teal dominates (hero, categories, how-it-works, CTAs). Amber used for waitlist CTA button, success icon, and background blurs
- **Dashboard**: Amber used for visibility badge (private state)
- **Posts pages**: Amber used for "seeking" post type badges and gradients — good differentiation
- **About page**: Amber used for Handshake and Zap icons
- **Verdict**: ✅ Both accents well-integrated

## 4. Card Shadows + Hover Lift ✅ / ⚠️ Inconsistency

### ✅ globals.css defines reusable classes:
- `.card` (line 48): `shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
- `.category-pill` (line 52): `shadow-md hover:shadow-lg hover:-translate-y-0.5`
- `.btn-primary` / `.btn-secondary` / `.btn-cta`: all have `hover:shadow-lg hover:-translate-y-0.5`

### ✅ Consistent usage on refactored pages:
- `posts/page.tsx:222` — card with `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`
- `users/[id]/page.tsx:210` — same pattern
- `dashboard/page.tsx:183` — same pattern

### ⚠️ Minor: Refactored pages use inline Tailwind instead of `.card` class
- Posts list cards and user profile post cards duplicate the card styling inline rather than using the `.card` utility class. Not broken, but inconsistent.

## 5. Subtle Gradients & Micro-interactions ✅
- **Hero**: `bg-gradient-to-br from-slate-50 via-white to-teal-50/30` + animated ping dot
- **ValueProps**: `bg-gradient-to-br from-slate-50 to-teal-50/20`
- **How It Works cards**: `bg-gradient-to-br from-teal-700 to-teal-800` and `from-slate-800 to-slate-900`
- **Waitlist**: `bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900`
- **Gradient text**: `.gradient-text` class for hero heading
- **Post detail headers**: `bg-gradient-to-r` — teal for offering, amber for seeking
- **Hover transitions**: `transition-all duration-300` used consistently
- **Verdict**: ✅ Well done

## 6. Alternating Section Backgrounds ✅
Landing page sections alternate correctly:
1. Hero: `bg-gradient-to-br from-slate-50 via-white to-teal-50/30`
2. Categories: `bg-white`
3. ValueProps: `bg-gradient-to-br from-slate-50 to-teal-50/20`
4. HowItWorks: `bg-white`
5. Waitlist: `bg-gradient-to-br from-teal-700...` (dark)
6. Footer: `bg-slate-900` (dark)

**Verdict**: ✅ Clear visual rhythm

---

## 7. Refactored Pages (posts/*, users/*) — Style Consistency ⚠️

### ⚠️ Missing Navigation component:
| File | Issue |
|------|-------|
| `src/app/posts/[id]/page.tsx` | No `<Navigation />` — uses inline back link only |
| `src/app/users/[id]/page.tsx` | No `<Navigation />` — uses inline back link only |

### ⚠️ Inconsistent footer:
- **Landing page / blog**: Full dark footer (`bg-slate-900`) with logo + links
- **posts/[id], users/[id]**: Minimal inline `<footer>` with just 3 text links and a border-top — looks cheap by comparison

### ✅ What the refactored pages DO match:
- Teal/slate color palette ✅
- Card hover patterns ✅
- Rounded corners (xl/2xl) ✅
- Gradient headers on detail pages ✅
- Amber/teal differentiation for post types ✅
- Font inherits from layout.tsx globals ✅

---

## Priority Fix List

### High Priority
1. **Replace 6 emojis with Lucide icons** (users/[id], posts/new, posts/[id]/edit)
2. **Add `<Navigation />` to posts/[id] and users/[id]** detail pages
3. **Standardize footer** — extract Footer component from landing page, reuse on all pages

### Low Priority
4. Refactor inline card styles on posts/page.tsx and users/[id] to use `.card` class
5. Consider adding Lucide icons to posts/page.tsx filter controls for visual polish
6. Blog page uses `Navigation transparent` but has its own inline footer — could share the Footer component
