import { Building2, Home, KeyRound, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import {
  expiringLeasesCount,
  monthlyRent,
  occupancyRate,
  occupiedUnitsCount,
  openMaintenanceCount,
  outstandingRent,
  totalProperties,
  totalUnits,
  vacantUnitsCount,
} from "../_lib/data";

const kpis = [
  { label: "Total Properties", value: totalProperties.toString(), meta: "Across 12 markets", icon: Building2 },
  { label: "Occupied Units", value: occupiedUnitsCount.toString(), meta: `of ${totalUnits} total units`, icon: Home },
  { label: "Vacant Units", value: vacantUnitsCount.toString(), meta: "Ready to list", icon: KeyRound },
  { label: "Occupancy Rate", value: `${occupancyRate}%`, meta: "+1.4 pts vs last month", icon: Home },
  {
    label: "Monthly Rent",
    value: formatCurrency(monthlyRent, { noDecimals: true }),
    meta: "Billed this month",
    icon: Building2,
  },
  {
    label: "Outstanding Rent",
    value: formatCurrency(outstandingRent, { noDecimals: true }),
    meta: "Across delinquent tenants",
    icon: KeyRound,
  },
  { label: "Open Maintenance", value: openMaintenanceCount.toString(), meta: "Active work orders", icon: Wrench },
  { label: "Expiring Leases", value: expiringLeasesCount.toString(), meta: "Within 60 days", icon: KeyRound },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="font-normal text-muted-foreground text-sm">{kpi.label}</CardTitle>
            <kpi.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl leading-none tracking-tight">{kpi.value}</div>
            <p className="mt-1.5 text-muted-foreground text-xs">{kpi.meta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
