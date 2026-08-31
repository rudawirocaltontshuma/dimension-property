import { Building2, type LucideIcon } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        id: "property",
        title: "Dimension Property",
        icon: Building2,
        subItems: [
          { id: "property-dashboard", title: "Dashboard", url: "/dashboard/property" },
          { id: "property-properties", title: "Properties", url: "/dashboard/property/properties" },
          { id: "property-units", title: "Units", url: "/dashboard/property/units" },
          { id: "property-tenants", title: "Tenants", url: "/dashboard/property/tenants" },
          { id: "property-leases", title: "Leases", url: "/dashboard/property/leases" },
          { id: "property-applications", title: "Applications", url: "/dashboard/property/applications" },
          { id: "property-maintenance", title: "Maintenance", url: "/dashboard/property/maintenance" },
          { id: "property-inspections", title: "Inspections", url: "/dashboard/property/inspections" },
          { id: "property-rent", title: "Rent", url: "/dashboard/property/rent" },
          { id: "property-expenses", title: "Expenses", url: "/dashboard/property/expenses" },
          { id: "property-vendors", title: "Vendors", url: "/dashboard/property/vendors" },
          { id: "property-documents", title: "Documents", url: "/dashboard/property/documents" },
          { id: "property-tasks", title: "Tasks", url: "/dashboard/property/tasks" },
          { id: "property-reports", title: "Reports", url: "/dashboard/property/reports" },
          { id: "property-analytics", title: "Analytics", url: "/dashboard/property/analytics" },
          { id: "property-settings", title: "Settings", url: "/dashboard/property/settings" },
        ],
      },
    ],
  },
];
