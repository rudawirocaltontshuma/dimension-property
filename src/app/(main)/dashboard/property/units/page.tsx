import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  maintenanceUnitsCount,
  occupiedUnitsCount,
  reservedUnitsCount,
  totalUnits,
  vacantUnitsCount,
} from "../_lib/data";
import { PageHeader } from "../_lib/page-header";
import { UnitsTable } from "./_components/units-table";

const summary = [
  { label: "Total Units", value: totalUnits },
  { label: "Occupied", value: occupiedUnitsCount },
  { label: "Vacant", value: vacantUnitsCount },
  { label: "Reserved", value: reservedUnitsCount },
  { label: "Maintenance", value: maintenanceUnitsCount },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Units" description="Track occupancy status across every unit in the portfolio." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {summary.map((item) => (
          <Card key={item.label} className="gap-2">
            <CardHeader className="pb-0">
              <CardTitle className="font-normal text-muted-foreground text-sm">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl tracking-tight">{item.value}</CardContent>
          </Card>
        ))}
      </div>
      <UnitsTable />
    </div>
  );
}
