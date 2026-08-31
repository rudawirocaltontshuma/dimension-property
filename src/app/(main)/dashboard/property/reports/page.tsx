import Link from "next/link";

import { Building2, ClipboardList, FileBarChart, Home, ReceiptText, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { expenses, leases, maintenanceRequests, occupancyRate, properties, rentCollection } from "../_lib/data";
import { PageHeader } from "../_lib/page-header";

const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

const reports = [
  {
    title: "Property Report",
    description: "Portfolio composition, revenue, and status by property.",
    icon: Building2,
    href: "/dashboard/property/properties",
    stat: `${properties.length} properties`,
  },
  {
    title: "Occupancy Report",
    description: "Unit-level occupancy across the entire portfolio.",
    icon: Home,
    href: "/dashboard/property/units",
    stat: `${occupancyRate}% occupied`,
  },
  {
    title: "Rent Report",
    description: "Expected vs. collected rent and outstanding balances.",
    icon: ReceiptText,
    href: "/dashboard/property/rent",
    stat: `${rentCollection.collectionRate}% collection rate`,
  },
  {
    title: "Maintenance Report",
    description: "Work order volume, cost, and vendor performance.",
    icon: Wrench,
    href: "/dashboard/property/maintenance",
    stat: `${maintenanceRequests.filter((m) => m.status !== "Completed").length} open orders`,
  },
  {
    title: "Expense Report",
    description: "Spend by property, category, and month.",
    icon: FileBarChart,
    href: "/dashboard/property/expenses",
    stat: formatCurrency(totalExpenses, { noDecimals: true }),
  },
  {
    title: "Lease Report",
    description: "Lease status, terms, and upcoming expirations.",
    icon: ClipboardList,
    href: "/dashboard/property/leases",
    stat: `${leases.filter((l) => l.status === "Expiring").length} expiring soon`,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Reports" description="Jump into a focused report for any part of the portfolio." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <Link key={report.title} href={report.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <report.icon className="size-4.5 text-muted-foreground" />
                </div>
                <CardTitle className="font-normal">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground text-sm">{report.description}</p>
                <p className="font-medium text-sm">{report.stat}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
