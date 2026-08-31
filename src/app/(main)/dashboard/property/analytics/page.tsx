import { PageHeader } from "../_lib/page-header";
import {
  ExpenseAnalyticsChart,
  MaintenanceAnalyticsChart,
  OccupancyAnalyticsChart,
  PropertyPerformanceAnalyticsChart,
  PropertyTypeMixChart,
  RevenueAnalyticsChart,
} from "./_components/analytics-charts";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Analytics" description="Deeper trends across occupancy, revenue, maintenance, and spend." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <OccupancyAnalyticsChart />
        <RevenueAnalyticsChart />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <PropertyTypeMixChart />
        </div>
        <div className="xl:col-span-2">
          <PropertyPerformanceAnalyticsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MaintenanceAnalyticsChart />
        <ExpenseAnalyticsChart />
      </div>
    </div>
  );
}
