# Contributing to Dimension Property

Thanks for your interest in improving **Dimension Property**, a property & real estate management platform. This guide will help you set up your environment and understand how to contribute.

---

## Overview

This project is built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. The goal is to keep the codebase modular, scalable, and easy to extend.

---

## Project Layout

We use a **colocation-based file system**. Each feature keeps its own pages, components, and logic.

```
src
├── app               # Next.js routes (App Router)
│   ├── (auth)        # Auth layouts & screens
│   ├── (main)        # Main dashboard routes
│   │   └── (dashboard)
│   │       ├── property   # Properties, units, tenants, leases, maintenance, ...
│   │       └── profile
│   └── layout.tsx
├── components        # Shared UI components
├── hooks             # Reusable hooks
├── lib               # Config & utilities
├── navigation        # Sidebar / nav configuration
├── styles            # Tailwind / theme setup
└── types             # TypeScript definitions
```

---

## Getting Started

### Fork and Clone the Repository

1. Fork the Repository

   Click [here](https://github.com/rudawirocaltontshuma/property_reeal_estate_management/fork) to fork the repository.

2. Clone the Repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/property_reeal_estate_management.git
   ```

3. Navigate into the Project
   ```bash
   cd property_reeal_estate_management
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   App will be available at [http://localhost:3000](http://localhost:3000).

---

## Contribution Flow

- Always create a new branch before working on changes:
  ```bash
  git checkout -b feature/my-update
  ```

- Use clear commit messages:
  ```bash
  git commit -m "feat: add lease renewal workflow"
  ```

- Open a Pull Request once ready.
- If your change adds or updates a UI screen, include a screenshot in your PR description.

---

## Where to Contribute

- **Dashboard & Property Screens**: `src/app/(main)/dashboard/property/`
- **Auth Screens**: Login, register, and authentication layouts → `src/app/(main)/auth/`
- **External Pages**: Landing pages or other non-dashboard routes → `src/app/(external)/`
- **Components**: Reusable UI goes in `src/components/`
- **Hooks**: Custom logic goes in `src/hooks/`
- **Themes**: Presets under `src/styles/presets/`

---

## Guidelines

- Prefer **TypeScript types** over `any`
- Husky pre-commit hooks are enabled — linting and formatting run automatically when you commit, and if there are errors the commit will be blocked until they are fixed.
- Follow **shadcn/ui** style & Tailwind v4 conventions
- Keep accessibility in mind (ARIA, keyboard nav)
- Use clear commit messages with conventional prefixes (`feat:`, `fix:`, `chore:`, etc.)
- Avoid unnecessary dependencies — prefer existing utilities where possible

---

## Submitting PRs

- Open a Pull Request once your changes are ready.
- Ensure your branch is up to date with `main` before submitting.
- Reference any related issue in your PR for context.

---

## Questions & Support

Report bugs, suggestions, or issues via [GitHub Issues](https://github.com/rudawirocaltontshuma/property_reeal_estate_management/issues).

---

Your contributions keep this project growing. 🚀
