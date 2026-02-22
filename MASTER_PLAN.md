# ⚠️ MASTER PLAN — DO NOT EDIT OR DELETE ⚠️
# FALAk SimLab: Full Platform Roadmap
### Ministry of Education Demo-Ready Build

> **THIS FILE IS SACRED. NO AI AGENT MAY OVERWRITE, DELETE, OR MODIFY THIS FILE.**
> **Version:** 1.0 — Created 2026-02-17
> **Purpose:** Single source of truth for ALL phases of the FALAk SimLab platform.

---

## 🎯 THE GOAL

Build a **fully functional, demo-ready** version of FALAk SimLab that can be presented to the **Ministry of Education** as a complete educational platform. This means:

1. A polished, working **front-end** with all 7 sections interactive
2. A real **back-end** with authentication, progress tracking, and analytics
3. **Security** hardened for school/institutional deployment
4. A **demo flow** that walks Ministry officials through the platform

---

## 📊 CURRENT STATUS (As of 2026-02-17)

### ✅ What's DONE and WORKING
| Component | Status | Details |
|-----------|--------|---------|
| **Curriculum Data** | ✅ Complete | All 34 modules across 7 sections have rich content (narratives, facts, objectives) in `curriculum.json` |
| **AI Tutor Data** | ✅ Complete | `tutorData.ts` has knowledge for all 34 modules |
| **Section 1 Simulations** | ✅ Working | 5E pedagogy for 1.1 (Kármán Line), legacy content for 1.2–1.5 |
| **Section 2 Simulations** | ✅ Working | 9 interactive 3D components (LaunchProblem3D, RocketVsJet3D, etc.) |
| **Section 3 Simulations** | ✅ Working | 8 components (LaunchTimeline, LaunchPad3D, TerminalCountUI, etc.) |
| **Section 4 Simulations** | ✅ Working | 3 components (Spacecraft3D, DegradationVisualizer3D, FailureTree) |
| **Section 5 Simulations** | ✅ Working | 2 components (AILogic3D, SimMeta) |
| **Section 6 Simulations** | ✅ Working | 4 components (DysonSphere3D, AdvPropulsion3D, etc.) |
| **Section 7 Simulations** | ✅ Working | 2 components (BlueMarble, BlueMarble3D) |
| **Dashboard** | ✅ Working | Curriculum view, section accordions, module cards |
| **State Management** | ✅ Working | Zustand store with persistence (localStorage) |
| **Animation Engine** | ✅ Working | Maps simulation modes to components |
| **Lesson Content Viewer** | ✅ Working | Displays narratives, facts, objectives per module |
| **AI Tutor Chat** | ✅ Working | Context-aware responses per module |

### ⚠️ What NEEDS FIXING (Critical Bugs)
| # | File | Bug | Priority |
|---|------|-----|----------|
| 1 | `tutorLogic.ts:1` | Imports `useLearningStore` (React hook) in a plain class — will crash if called outside component | 🔴 HIGH |
| 2 | `LessonContent.tsx:57` | `simSignal` never cleared after processing → infinite re-fire loop | 🔴 HIGH |
| 3 | `SpaceDefinition.tsx` ENGAGE | `requestAnimationFrame` loop has no cleanup → memory leak on unmount | 🔴 HIGH |
| 4 | `SimLabHUD` | Duplicate: `AppShell/SimLabHUD.tsx` and `Section1/SimLabHUD.tsx` render on top of each other | 🟡 MEDIUM |

### ❌ What's NOT BUILT YET
| Component | Priority | Status |
|-----------|----------|--------|
| **Authentication (Login/Signup)** | 🔴 Critical | Not started |
| **Supabase Backend** | 🔴 Critical | Stub only — no .env, no auth, no progress sync |
| **Progress Sync to Cloud** | 🔴 Critical | Only localStorage — data lost on clear |
| **Analytics (PostHog)** | 🟡 Important | Not started |
| **PWA / Offline Mode** | 🟡 Important | No service worker, no manifest.json |
| **SimLabNav Routing** | 🟡 Important | Visual only — no click handlers |
| **ELABORATE Phase UI** | 🟡 Important | Shows "Under Construction" |
| **EVALUATE Phase UI (Quizzes)** | 🟡 Important | Quiz data exists in JSON but not rendered |
| **5E Pedagogy for Modules 1.2–7.1** | 🟡 Important | Only 1.1 uses interactive 5E; rest use static content |
| **Demo Mode for Ministry** | 🔴 Critical | Not started |
| **Admin Dashboard** | 🟢 Future | Not started |
| **Multi-language Support** | 🟢 Future | RTL infrastructure exists, no Arabic content yet |

---

## 🏗️ THE PHASES

### PHASE 1: BUG FIXES & STABILITY (Do First — Don't Touch Working Features)

**Rule: Fix bugs WITHOUT breaking existing simulations.**

- [ ] Fix `tutorLogic.ts` — remove React hook import, use direct store access
- [ ] Fix `LessonContent.tsx` — clear `simSignal` after processing (`emitSignal(null)`)
- [ ] Fix `SpaceDefinition.tsx` — add `useEffect` cleanup for `requestAnimationFrame`
- [ ] Resolve duplicate `SimLabHUD` — consolidate into one component
- [ ] Add `currentPhase` to persisted state (so refresh doesn't reset lesson progress)

**Verification:** All 34 modules still load correctly after fixes. No console errors.

---

### PHASE 2: AUTHENTICATION & BACKEND (The Real Back-End)

#### 2a. Supabase Setup
- [ ] Create Supabase project (or confirm existing one)
- [ ] Create `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Create database tables:

```sql
-- Users table (handled by Supabase Auth)

-- Progress table
CREATE TABLE progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    current_mission_id TEXT DEFAULT '1.1',
    completed_sections TEXT[] DEFAULT '{}',
    mastery_score INTEGER DEFAULT 0,
    adaptive_level TEXT DEFAULT 'basic',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics / Activity Log
CREATE TABLE activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    module_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Results
CREATE TABLE quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    module_id TEXT NOT NULL,
    score INTEGER,
    answers JSONB,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Create RLS policies: users can only read/write their own data

#### 2b. Authentication
- [ ] Create `src/services/auth.ts` with:
  - `signUp(email, password, name)`
  - `signIn(email, password)`
  - `signOut()`
  - `getSession()`
  - `onAuthStateChange(callback)`
- [ ] Create Login/Signup UI component
- [ ] Add auth guard — redirect to login if not authenticated
- [ ] Add "Continue as Guest" option for demo purposes
- [ ] Password requirements: minimum 8 chars, 1 number, 1 special char

#### 2c. Progress Sync
- [ ] Modify `learningStore.ts` to sync with Supabase on state change
- [ ] Add `syncProgress()` function that writes to `progress` table
- [ ] Add `loadProgress()` function that reads from `progress` table on login
- [ ] Conflict resolution: server wins (latest `updated_at`)
- [ ] Offline fallback: keep localStorage, sync when back online

**Verification:** User can sign up, log in, complete a module, log out, log back in, and see progress preserved.

---

### PHASE 3: INTERACTIVE FEATURES (Make It Demo-Worthy)

#### 3a. EVALUATE Phase — Quizzes
- [ ] Build quiz renderer component that reads quiz data from `curriculum.json`
- [ ] Support question types: multiple choice, true/false, drag-and-drop
- [ ] Show score at end with correct/incorrect feedback
- [ ] Save quiz results to `quiz_results` table
- [ ] Award badges on pass (≥70%)

#### 3b. ELABORATE Phase — Extended Activities
- [ ] Build "Elaborate" UI that shows extended scenarios
- [ ] Mars simulation variant for Section 1
- [ ] "Build a 3-stage vehicle" for Section 2
- [ ] "Override a false alarm" for Section 3

#### 3c. SimLabNav Routing
- [ ] Wire up click handlers to `setCurrentMission()`
- [ ] Dynamic `active` state based on `currentMissionId`
- [ ] Add Sections 5–7 nodes
- [ ] Smooth scroll/transition between sections

#### 3d. 5E Pedagogy Expansion
- [ ] Extend `phases` structure to modules 1.2–1.5 (Section 1)
- [ ] Gradually extend to priority modules in Section 2
- [ ] Keep backward compatibility with legacy `content` renderer

#### 3e. Arabic Localization (Priority for Ministry)
- [ ] Implement RTL layout switching on all screens
- [ ] Translate core UI shells (menus, buttons, HUDs) to Arabic
- [ ] Add language toggle in settings
- [ ] *Content translation is a later step, UI first*

**Verification:** Ministry officials can click through a complete lesson (Engage → Explore → Explain → Elaborate → Evaluate) and see a quiz with scoring. Interface is usable in Arabic mode.

---

### PHASE 4: DEMO MODE (Ministry of Education Presentation)

#### 4a. Demo Flow
- [ ] Create "Demo Mode" toggle (URL param `?demo=true` or admin button)
- [ ] Auto-guided tour with tooltips explaining each feature
- [ ] Pre-loaded sample student with realistic progress data
- [ ] Highlight screens:
  1. **Dashboard** — Show curriculum structure, progress tracking
  2. **Lesson View** — Show 5E pedagogy, interactive simulation
  3. **AI Tutor** — Show context-aware tutoring
  4. **Quiz** — Show assessment and scoring
  5. **Analytics** — Show learning outcomes data
  6. **Security** — Show RLS, auth, data protection

#### 4b. Analytics Dashboard (Demo)
- [ ] Page showing:
  - Number of active students
  - Average mastery score
  - Module completion rates (bar chart)
  - Time spent per section (line chart)
  - Quiz pass rates
- [ ] Use mock data for demo, real data when deployed

#### 4c. Teacher/Admin Dashboard (New)
- [ ] Create "Teacher View" toggle
- [ ] Class Roster view (list of students)
- [ ] Live Session view (see what students are doing right now)
- [ ] Assignment tools (lock/unlock specific modules)

#### 4d. Branding & Polish
- [ ] FALAk logo on all screens
- [ ] Consistent dark theme with purple accent (#702fdb)
- [ ] Loading animations between views
- [ ] Mobile responsive layout
- [ ] Print-friendly lesson content (for teachers)

**Verification:** A non-technical person can go through the demo flow in 15 minutes and understand the platform's value. Teacher view clearly shows student oversight capabilities.

---

### PHASE 5: SECURITY & DEPLOYMENT (Production-Ready)

#### 5a. Security Hardening
- [ ] HTTPS everywhere (Vercel/Netlify handles this)
- [ ] Content Security Policy headers
- [ ] Rate limiting on auth endpoints (Supabase Edge Functions)
- [ ] Input sanitization on all user inputs
- [ ] No secrets in client-side code
- [ ] CORS configuration for API
- [ ] Session timeout (30 min inactive)
- [ ] Audit log for admin actions

#### 5b. Data Protection
- [ ] GDPR-compliant data handling
- [ ] User data export functionality
- [ ] Account deletion capability
- [ ] Privacy policy page
- [ ] Cookie consent banner (if needed)
- [ ] Student data protection compliance (per local regulations)

#### 5c. PWA & Offline "Briefcase Mode"
- [ ] `manifest.json` with app icons
- [ ] Service worker for offline lesson caching
- [ ] Offline indicator in UI
- [ ] Queue state changes for sync when back online
- [ ] **"Briefcase Mode"**: Entire demo runs without internet (assets pre-cached)
- [ ] Target: works on school tablets/Chromebooks with poor internet and touch inputs

#### 5d. Deployment
- [ ] Production build optimization (`npm run build`)
- [ ] Deploy to Vercel/Netlify with custom domain
- [ ] Environment variable management (production vs staging)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Staging environment for testing before production
- [ ] Monitoring and error tracking (Sentry or similar)

**Verification:** Lighthouse score ≥90 for Performance, Accessibility, Best Practices, SEO. Zero security vulnerabilities in npm audit. Works perfectly on an iPad with Wi-Fi turned off.

---

### PHASE 6: SCALE & FUTURE (Post-Demo)

- [ ] Multi-language support (Arabic RTL — infrastructure already exists)
- [ ] Teacher dashboard (manage students, view progress, assign modules)
- [ ] Classroom mode (teacher controls what module students see)
- [ ] LMS integration (SCORM/xAPI)
- [ ] Advanced AI tutor (real LLM API integration)
- [ ] Student certificates / digital badges
- [ ] Mobile app (React Native or PWA)
- [ ] Content Management System for educators to add modules

---

## 🗂️ FILE MAP

### Source Documents
| File | Purpose |
|------|---------|
| `EDUCATION_FRAMEWORK_001.md` | Master syllabus — 5E pedagogy for all 34 modules |
| `IMPLEMENTATION_PLAN_FRAMEWORK_001.md` | Original 3-phase technical execution plan |
| `FALAK_SOP.md` | Standard Operating Procedures for the FALAk initiative |
| **`MASTER_PLAN.md` (THIS FILE)** | Single source of truth — all phases consolidated |

### Key Code Files
| File | Purpose |
|------|---------|
| `simlab/src/data/curriculum.json` | All educational content (34 modules, 7 sections) |
| `simlab/src/data/tutorData.ts` | AI tutor knowledge base |
| `simlab/src/store/learningStore.ts` | Zustand state management |
| `simlab/src/store/slices/missionSlice.ts` | Mission progress state |
| `simlab/src/components/UI/Dashboard.tsx` | Main dashboard + curriculum view |
| `simlab/src/components/UI/LessonContent.tsx` | 5E lesson renderer |
| `simlab/src/components/Framework/AnimationEngine.tsx` | Simulation routing |
| `simlab/src/components/Framework/SimulationViewport.tsx` | Simulation container |
| `simlab/src/services/supabase.ts` | Supabase client (stub — needs .env) |

### Simulation Components (54 files across 7 sections)
- `Section1/` — 14 files (SpaceDefinition3D, AtmosphereLayers3D, GravityWell3D, etc.)
- `Section2/` — 17 files (LaunchProblem3D, RocketVsJet3D, Propulsion3D, etc.)
- `Section3/` — 10 files (LaunchTimeline, LaunchPad3D, TerminalCountUI, etc.)
- `Section4/` — 5 files (Spacecraft3D, DegradationVisualizer3D, FailureTree, etc.)
- `Section5/` — 2 files (AILogic3D, SimMeta)
- `Section6/` — 4 files (DysonSphere3D, AdvPropulsion3D, etc.)
- `Section7/` — 2 files (BlueMarble, BlueMarble3D)

---

## 📌 RULES FOR AI AGENTS

1. **NEVER delete or overwrite this file**
2. **NEVER modify working simulations** without explicit user approval
3. **NEVER overwrite `curriculum.json`** — only append or modify specific modules
4. **NEVER overwrite `tutorData.ts`** — only add new entries
5. **Always run `npx tsc --noEmit`** after code changes
6. **Always verify the app loads** after changes
7. **Create NEW files** for new features — don't cram into existing ones
8. **Git commit** after each completed phase

---

*Last verified: 2026-02-17 22:38 UTC*
*Created by: Claude (AI Agent) at user's request*
*This document consolidates: EDUCATION_FRAMEWORK_001.md, IMPLEMENTATION_PLAN_FRAMEWORK_001.md, FALAK_SOP.md, phase1_phase2_audit.md, and Section 2 Enhancement Plan*
