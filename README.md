# SkillForge — Learn something worth building.

> **Full-Stack Development with Next.js — Academic Assignment 1**  
> **Topic:** Responsive Accessible Component Architecture, Client State Management & End-to-End Type-Safe Form Mutations

SkillForge is a professional university learning and workshop discovery platform engineered for students and early-career developers. Rather than aggregating dozens of passive, generic video courses, SkillForge focuses on focused 2–3 hour hands-on laboratory modules that produce verified codebases and working technical artifacts.

---

## 1. Core Assignment Requirements & Features

### Part A: Architecture & Primitives
- **Next.js App Router (v16.3 / React 19):** Modern folder-based routing with nested layouts (`/`, `/workshops`, `/workshops/[id]`, `/learning-plan`, `/enroll`, `/about`).
- **Tailwind CSS & Design Tokens:** Restrained, academic editorial design system using calm light blue (`#1e40af`) + soft green (`#ecfdf5` / `#065f46`), crisp borders (`#e2e8f0`), and dark navy typography (`#0f172a`). Completely avoids generic AI/SaaS gradients and cliché templates.
- **Radix UI Primitives:** Backed by accessible primitives including `@radix-ui/react-dialog` (mobile navigation sheet), `@radix-ui/react-select` (accessible department, year, and workshop pickers), `@radix-ui/react-checkbox` (accessible terms acceptance), `@radix-ui/react-label`, and `@radix-ui/react-separator`.
- **Theme Switching with `next-themes`:** Seamless, accessible switching between Light, Dark, and System modes.
- **Zero Hydration Mismatch:** Implements hydration guards (`useSyncExternalStore` and `suppressHydrationWarning` on `<html>`) to guarantee zero console warnings or markup flicker.
- **RSC vs. Client Component Boundaries:** All main pages, static content, metadata, and catalogues are pure React Server Components. Interactive controls (filters, theme toggles, Add to Plan buttons, enrollment form) are isolated into minimal Client Component islands.
- **Serializable Props:** Only plain strings, numbers, booleans, and serializable plain objects cross the RSC/client boundary.

### Part B: Centralized Persistent Client State (Zustand)
- **Centralized Store (`store/learning-plan-store.ts`):** Lightweight Zustand store equipped with official `persist` middleware.
- **Separation of Server Data & Client State:** The Zustand store strictly stores only workshop identifiers (`selectedWorkshopIds: string[]`), avoiding redundant client caching of the full workshop catalogue (`lib/data/workshops.ts`).
- **Persistence Across Sessions:** Fully persists to browser `localStorage` across page navigation and hard browser reloads (`Ctrl + R`).
- **Duplicate Prevention:** Atomic verification in `addWorkshop(id)` prevents duplicate selections.
- **Immediate State Synchronization:** Header badge counter (`My Learning Plan 3`), workshop card buttons, and `/learning-plan` roadmap view update instantaneously.

### Part C: Type-Safe Form Mutations & Native Server Actions
- **React Hook Form & `@hookform/resolvers/zod`:** Accessible form management with interactive validation attached directly to input elements via ARIA attributes.
- **Shared Zod Schema (`lib/validations/enrollment-schema.ts`):** Single source of truth validating Full Name, Institutional Email, Indian Mobile Number (`^[6-9]\d{9}$`), Year of Study, Department, Workshop Selection, Learning Goals, and Terms Acceptance.
- **Native Next.js Server Action (`lib/actions/enrollment-action.ts`):** Defined using `"use server"`. Validates the incoming payload against the Zod schema on the server, verifies workshop existence, strips dangerous HTML characters to prevent XSS, normalizes phone numbers, and generates a structured confirmation response.
- **Suspense & Loading States:** Clear submission loading spinner, button disabling, duplicate submission prevention, and an interactive confirmation screen upon completion.

---

## 2. Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.5 (App Router) | Server components, file-system routing, Server Actions |
| **Library** | React 19.2.8 | Declarative UI, Concurrent features, Action hooks |
| **Language** | TypeScript 5 (Strict Mode) | Complete end-to-end type safety |
| **State Management** | Zustand 5 | Centralized, persistent client-side state |
| **Forms & Validation** | React Hook Form + Zod | Client-side and server-side schema validation |
| **Styling** | Tailwind CSS v4 | Responsive layout utilities and custom theme variables |
| **Primitives** | Radix UI | Accessible dialogs, selects, checkboxes, and labels |
| **Notifications** | Sonner | Accessible, non-intrusive toast feedback |
| **Theming** | `next-themes` | Light / Dark / System theme switching |

---

## 3. Architecture & Render Tree

```text
app/layout.tsx (Server Component)
├── Header (Server Component with semantic <header>)
│   ├── Desktop Nav (Server Component)
│   ├── LearningPlanCounter (Client Component Island - Zustand)
│   ├── ThemeToggle (Client Component Island - next-themes)
│   └── MobileNav (Client Component Island - Radix Sheet)
├── Page Routes (Server Components)
│   ├── / (Server Component - Editorial Hero, Categories, Curated Preview)
│   ├── /workshops (Server Component fetching catalogue)
│   │   └── WorkshopFilters (Client Component Island - Search, Pills, Level)
│   │       └── WorkshopCard (Server Component / Client Hybrid)
│   │           └── AddToPlanButton (Client Component Island - Zustand)
│   ├── /workshops/[id] (Server Component - generateStaticParams, Syllabus)
│   │   └── AddToPlanButton (Client Component Island - Zustand)
│   ├── /learning-plan (Server Component)
│   │   └── LearningPlanContent (Client Component Island - Zustand + Statistics)
│   ├── /enroll (Server Component)
│   │   └── EnrollmentForm (Client Component Island - React Hook Form + Server Action)
│   └── /about (Server Component - Educational Stance & Viva Notes)
└── Footer (Server Component)
```

---

## 4. End-to-End Type-Safe Mutation Flow

```text
User fills out Enrollment Form
      ↓
React Hook Form (Client-Side)
      ↓
Zod Client Validation (enrollmentSchema via zodResolver)
      ↓ (If valid, triggers async submission)
Loading State Activated (Submit button disabled, spinner displayed)
      ↓
Native Next.js Server Action: enrollStudent(formData) ["use server"]
      ↓
Zod Server Validation (Exact same enrollmentSchema on Node runtime)
      ↓
Sanitization & Normalization (Strips HTML tags, formats Indian mobile number)
      ↓
Catalogue Verification (Validates workshopId against lib/data/workshops.ts)
      ↓
Structured Action Response Returned
      ├── Success: { success: true, enrollmentId: "SF-2025-XXXXX", data: {...} }
      └── Failure: { success: false, errors: { [field]: string[] } }
      ↓
Client Renders Structured Success Confirmation Card & Toasts Feedback
```

---

## 5. Viva Preparation: Questions & Answers

### Q1: Why are most components Server Components, and why do some use `"use client"`?
> **Answer:** React Server Components (RSC) run only on the server, producing zero client-side JavaScript overhead, improving First Contentful Paint (FCP) and Largest Contentful Paint (LCP). We reserve `"use client"` strictly for interactive leaf nodes that require browser APIs or state: event handlers (`onClick`, `onChange`), Zustand state subscriptions, and React Hook Form.

### Q2: Why is Zustand used, and why do we store only workshop IDs?
> **Answer:** Zustand provides a minimal, boilerplate-free state container with official `persist` middleware. Storing only `selectedWorkshopIds: string[]` instead of full workshop objects prevents duplicating application/server state in global client storage. The UI dynamically derives workshop metadata from the static catalogue, ensuring a single source of truth and minimizing localStorage payload size.

### Q3: Why is Zod validation executed twice (on both client and server)?
> **Answer:** Client-side validation improves user experience by providing instantaneous inline feedback before a network round-trip. However, client validation can be easily bypassed by inspecting HTTP traffic or disabling JavaScript. Server-side validation inside the Server Action guarantees data integrity and security against malformed or malicious payloads.

### Q4: Why use a native Next.js Server Action instead of a traditional API route (`/api/enroll`)?
> **Answer:** Native Server Actions (`"use server"`) provide end-to-end type safety directly between server and client without needing manual fetch wrappers, status code decoding, or separate URL endpoint routing. They execute atomically and integrate cleanly with React's transition and action lifecycle.

### Q5: What is hydration, and how was hydration mismatch avoided?
> **Answer:** Hydration is the process where React attaches event listeners and takes over pre-rendered server HTML in the browser. A hydration mismatch occurs when server-rendered HTML differs from the initial client render (for example, if client `localStorage` content is rendered synchronously during SSR). We eliminated hydration mismatches by utilizing React 19's `useSyncExternalStore` in our hydration-safe hooks and adding `suppressHydrationWarning` to the `<html>` root for `next-themes`.

---

## 6. Running Locally

### Prerequisites
- Node.js version 18.18+ or 20+ (Tested on Node.js v22.20.0)
- npm, pnpm, or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Run
```bash
# Build the production bundle and generate static pages
npm run build

# Start the production Next.js server
npm run start
```

### 4. Code Quality & Verification
```bash
# Run TypeScript type checks
npx tsc --noEmit

# Run ESLint checks
npm run lint
```

---

## 7. Project Structure

```text
SkillForge/
├── app/
│   ├── layout.tsx              # Root RSC layout, ThemeProvider, Toaster, SEO metadata
│   ├── page.tsx                # Editorial homepage (hero, categories, preview, philosophy)
│   ├── loading.tsx             # Suspense skeleton loading state
│   ├── not-found.tsx           # Accessible 404 handler
│   ├── opengraph-image.tsx     # Dynamic branded OpenGraph card via ImageResponse
│   ├── globals.css             # Tailored academic design tokens & dark theme variables
│   ├── workshops/
│   │   ├── page.tsx            # Workshop discovery catalogue page (RSC)
│   │   └── [id]/
│   │       └── page.tsx        # Workshop curriculum details page (RSC + SSG)
│   ├── learning-plan/
│   │   └── page.tsx            # Personalized Learning Plan page
│   ├── enroll/
│   │   └── page.tsx            # Registration page with pre-selection support
│   └── about/
│       └── page.tsx            # Academic methodology & technical architecture notes
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Responsive navbar with skip-to-content
│   │   ├── footer.tsx          # Semantic footer with academic links
│   │   ├── theme-toggle.tsx    # Accessible 3-state theme selector
│   │   ├── mobile-nav.tsx      # Accessible Radix Sheet navigation drawer
│   │   └── learning-plan-counter.tsx # Zustand badge counter island
│   ├── workshops/
│   │   ├── workshop-card.tsx   # Editorial workshop card with metadata
│   │   └── workshop-filters.tsx# Interactive client search & filter island
│   ├── learning-plan/
│   │   ├── add-to-plan-button.tsx   # Client toggle island with toast feedback
│   │   └── learning-plan-content.tsx# Roadmap view with stats and clear action
│   ├── enrollment/
│   │   └── enrollment-form.tsx # React Hook Form + Zod + Server Action island
│   ├── providers/
│   │   └── theme-provider.tsx  # Next-themes client wrapper
│   └── ui/                     # Accessible Radix-backed UI primitives
├── lib/
│   ├── actions/
│   │   └── enrollment-action.ts# Native Next.js Server Action with sanitization
│   ├── data/
│   │   └── workshops.ts        # Academic catalogue data (10 realistic workshops)
│   ├── validations/
│   │   └── enrollment-schema.ts# Shared Zod validation schema
│   └── utils.ts                # Tailwind class merge helper (cn)
├── store/
│   └── learning-plan-store.ts  # Zustand store with persistent localStorage adapter
├── .env.example                # Example environment variables
└── README.md                   # Comprehensive technical documentation
```
