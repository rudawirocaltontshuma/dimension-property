# Dimension Property

**Property & Real Estate Management Platform**

Dimension Property is a modern, responsive property management interface for portfolio managers, property owners, and real estate operators — covering properties, units, tenants, leases, applications, maintenance, inspections, rent, expenses, vendors, documents, tasks, reports, and analytics in one cohesive dashboard.

> **Demo build:** this is a frontend-only implementation. There is no backend, database, authentication, real payment processing, or persistent storage — all data shown is fictional and generated in-memory for demonstration purposes.

## Features

- Full property portfolio dashboard with KPIs and trend, revenue, performance, maintenance-cost, and lease-expiration charts
- Property directory and a 360° property detail view (overview, units, tenants, leases, maintenance, inspections, expenses, documents, activity)
- Unit, tenant, and lease management with status tracking
- Rental applications pipeline with scoring and review states
- Maintenance and task boards (kanban)
- Inspections tracking
- Rent overview with expected/collected/outstanding/overdue breakdowns
- Expense tracking with category and property-level charts
- Vendor directory with performance and job tracking
- Categorized document center
- Reports and analytics
- Fully responsive: desktop layout, mobile sheet navigation, responsive tables and charts

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Validation**: Zod
- **Forms & State Management**: React Hook Form, Zustand
- **Tables & Data Handling**: TanStack Table
- **Tooling & DX**: Biome, Husky

## Screens

- Dashboard
- Properties + Property Detail
- Units
- Tenants + Tenant Detail
- Leases
- Applications
- Maintenance
- Inspections
- Rent Overview
- Expenses
- Vendors
- Documents
- Tasks
- Reports
- Analytics
- Settings

## Architecture

The project follows a **colocation-based file system**: each feature keeps its own pages, components, and logic inside its route folder under `src/app`. Shared UI, hooks, and configuration live at the top level, keeping the codebase modular, scalable, and easy to extend.

## Getting Started

### Run locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/rudawirocaltontshuma/property_reeal_estate_management.git
   ```

2. **Navigate into the project**
   ```bash
   cd property_reeal_estate_management
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

Your app will be running at [http://localhost:3000](http://localhost:3000)

### Formatting and Linting

Format, lint, and organize imports:
```bash
npx @biomejs/biome check --write
```
> For more information on available rules, fixes, and CLI options, refer to the [Biome documentation](https://biomejs.dev/).

### Production build

```bash
npm run build
```

---

Contributions are welcome. Feel free to open issues, feature requests, or start a discussion. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.
