"use client";

import { type Inspection, inspections } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Inspection>[] = [
  { key: "id", header: "Inspection", cell: (row) => <span className="font-medium">{row.id}</span> },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "unit", header: "Unit", cell: (row) => row.unitNumber },
  { key: "type", header: "Type", cell: (row) => row.type },
  { key: "date", header: "Date", cell: (row) => row.date },
  { key: "inspector", header: "Inspector", cell: (row) => row.inspector },
  { key: "result", header: "Result", cell: (row) => <StatusBadge status={row.result} /> },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function InspectionsTable() {
  return (
    <DataTableCard
      title="All Inspections"
      description="Move-in, move-out, and routine inspection records."
      columns={columns}
      rows={inspections}
      getRowId={(row) => row.id}
      searchPlaceholder="Search inspections..."
      filterFn={(row, q) =>
        row.propertyName.toLowerCase().includes(q) ||
        row.inspector.toLowerCase().includes(q) ||
        row.type.toLowerCase().includes(q)
      }
    />
  );
}
