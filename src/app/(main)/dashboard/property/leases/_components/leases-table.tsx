"use client";

import { formatCurrency } from "@/lib/utils";

import { type Lease, leases } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Lease>[] = [
  { key: "id", header: "Lease", cell: (row) => <span className="font-medium">{row.id}</span> },
  { key: "tenant", header: "Tenant", cell: (row) => row.tenantName },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "unit", header: "Unit", cell: (row) => row.unitNumber },
  { key: "start", header: "Start", cell: (row) => row.start },
  { key: "end", header: "End", cell: (row) => row.end },
  {
    key: "rent",
    header: "Rent",
    cell: (row) => <span className="tabular-nums">{formatCurrency(row.rent, { noDecimals: true })}</span>,
  },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function LeasesTable() {
  return (
    <DataTableCard
      title="All Leases"
      description="Active, expiring, expired, and pending lease agreements."
      columns={columns}
      rows={leases}
      getRowId={(row) => row.id}
      searchPlaceholder="Search leases..."
      filterFn={(row, q) =>
        row.tenantName.toLowerCase().includes(q) ||
        row.propertyName.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q)
      }
    />
  );
}
