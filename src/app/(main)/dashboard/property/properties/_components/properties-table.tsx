"use client";

import { useRouter } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

import { type Property, properties } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Property>[] = [
  {
    key: "name",
    header: "Property",
    cell: (row) => (
      <div>
        <div className="font-medium text-sm">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.id}</div>
      </div>
    ),
  },
  { key: "type", header: "Type", cell: (row) => row.type },
  { key: "location", header: "Location", cell: (row) => `${row.city}, ${row.state}` },
  { key: "units", header: "Units", cell: (row) => row.units },
  {
    key: "occupancy",
    header: "Occupancy",
    cell: (row) => (
      <div className="flex w-32 items-center gap-2">
        <Progress value={row.occupancyRate} className="h-1.5" />
        <span className="text-muted-foreground text-xs tabular-nums">{row.occupancyRate}%</span>
      </div>
    ),
  },
  {
    key: "revenue",
    header: "Monthly Revenue",
    cell: (row) => (
      <span className="font-medium tabular-nums">{formatCurrency(row.monthlyRevenue, { noDecimals: true })}</span>
    ),
  },
  { key: "manager", header: "Manager", cell: (row) => row.manager },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function PropertiesTable() {
  const router = useRouter();

  return (
    <DataTableCard
      title="All Properties"
      description="Directory of every property under management."
      columns={columns}
      rows={properties}
      getRowId={(row) => row.id}
      searchPlaceholder="Search properties..."
      filterFn={(row, q) =>
        row.name.toLowerCase().includes(q) ||
        row.city.toLowerCase().includes(q) ||
        row.manager.toLowerCase().includes(q) ||
        row.type.toLowerCase().includes(q)
      }
      onRowClick={(row) => router.push(`/dashboard/property/properties/${row.id}`)}
    />
  );
}
