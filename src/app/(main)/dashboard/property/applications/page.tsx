import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { applicants } from "../_lib/data";
import { PageHeader } from "../_lib/page-header";
import { ApplicationsTable } from "./_components/applications-table";

const statusCounts = (["New", "Review", "Approved", "Rejected"] as const).map((status) => ({
  label: status,
  value: applicants.filter((a) => a.status === status).length,
}));

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Applications" description="Screen and track rental applications from prospective tenants." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statusCounts.map((item) => (
          <Card key={item.label} className="gap-2">
            <CardHeader className="pb-0">
              <CardTitle className="font-normal text-muted-foreground text-sm">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl tracking-tight">{item.value}</CardContent>
          </Card>
        ))}
      </div>
      <ApplicationsTable />
    </div>
  );
}
