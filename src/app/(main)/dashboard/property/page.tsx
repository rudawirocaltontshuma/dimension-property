import { Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  LeaseExpirationsChart,
  MaintenanceCostChart,
  OccupancyTrendChart,
  PropertyPerformanceChart,
  RentalRevenueChart,
} from "./_components/dashboard-charts";
import { KpiCards } from "./_components/kpi-cards";
import { PageHeader } from "./_lib/page-header";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Dimension Property"
        description="Property & Real Estate Management Platform — a frontend-only demonstration."
        actions={
          <Badge variant="outline" className="gap-1">
            <Building2 className="size-3" />
            Demo data only
          </Badge>
        }
      />

      <KpiCards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <OccupancyTrendChart />
        <RentalRevenueChart />
      </div>

      <PropertyPerformanceChart />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MaintenanceCostChart />
        <LeaseExpirationsChart />
      </div>
    </div>
  );
}
