"use client";

import { type Applicant, applicants } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Applicant>[] = [
  {
    key: "applicant",
    header: "Applicant",
    cell: (row) => (
      <div>
        <div className="font-medium text-sm">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.email}</div>
      </div>
    ),
  },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "unit", header: "Unit", cell: (row) => row.unitNumber },
  { key: "date", header: "Application Date", cell: (row) => row.applicationDate },
  {
    key: "score",
    header: "Score",
    cell: (row) => (
      <span className={row.score >= 700 ? "font-medium text-foreground" : "text-muted-foreground"}>{row.score}</span>
    ),
  },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function ApplicationsTable() {
  return (
    <DataTableCard
      title="All Applications"
      description="Prospective tenant applications awaiting review."
      columns={columns}
      rows={applicants}
      getRowId={(row) => row.id}
      searchPlaceholder="Search applicants..."
      filterFn={(row, q) => row.name.toLowerCase().includes(q) || row.propertyName.toLowerCase().includes(q)}
    />
  );
}
