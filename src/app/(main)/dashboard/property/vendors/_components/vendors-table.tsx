"use client";

import { Progress } from "@/components/ui/progress";

import { type Vendor, vendors } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Vendor>[] = [
  {
    key: "vendor",
    header: "Vendor",
    cell: (row) => (
      <div>
        <div className="font-medium text-sm">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.email}</div>
      </div>
    ),
  },
  { key: "service", header: "Service", cell: (row) => row.service },
  { key: "properties", header: "Properties", cell: (row) => row.properties },
  { key: "openJobs", header: "Open Jobs", cell: (row) => row.openJobs },
  {
    key: "performance",
    header: "Performance",
    cell: (row) => (
      <div className="flex w-32 items-center gap-2">
        <Progress value={row.performance} className="h-1.5" />
        <span className="text-muted-foreground text-xs tabular-nums">{row.performance}%</span>
      </div>
    ),
  },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function VendorsTable() {
  return (
    <DataTableCard
      title="All Vendors"
      description="Service providers supporting the portfolio."
      columns={columns}
      rows={vendors}
      getRowId={(row) => row.id}
      searchPlaceholder="Search vendors..."
      filterFn={(row, q) => row.name.toLowerCase().includes(q) || row.service.toLowerCase().includes(q)}
    />
  );
}
