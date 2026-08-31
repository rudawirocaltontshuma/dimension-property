"use client";

import { formatCurrency } from "@/lib/utils";

import { type Unit, units } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Unit>[] = [
  { key: "unit", header: "Unit", cell: (row) => <span className="font-medium">{row.unitNumber}</span> },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "type", header: "Type", cell: (row) => row.type },
  { key: "floor", header: "Floor", cell: (row) => row.floor },
  { key: "tenant", header: "Tenant", cell: (row) => row.tenantName ?? "—" },
  {
    key: "rent",
    header: "Rent",
    cell: (row) => <span className="tabular-nums">{formatCurrency(row.rent, { noDecimals: true })}</span>,
  },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function UnitsTable() {
  return (
    <DataTableCard
      title="All Units"
      description="Every unit across the managed portfolio."
      columns={columns}
      rows={units}
      getRowId={(row) => row.id}
      searchPlaceholder="Search units..."
      filterFn={(row, q) =>
        row.unitNumber.toLowerCase().includes(q) ||
        row.propertyName.toLowerCase().includes(q) ||
        (row.tenantName ?? "").toLowerCase().includes(q) ||
        row.type.toLowerCase().includes(q)
      }
    />
  );
}
