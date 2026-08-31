import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Dimension Property",
  version: packageJson.version,
  copyright: `© ${currentYear}, Dimension Property.`,
  meta: {
    title: "Dimension Property - Real Estate Management Platform",
    description:
      "Dimension Property is a modern property and real estate management platform built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Manage properties, units, tenants, leases, maintenance, and more. This is a frontend demo with mock data — no backend, authentication, or payments are connected.",
  },
};
