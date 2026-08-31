"use client";

import { useRouter } from "next/navigation";

import { formatCurrency } from "@/lib/utils";

import { type Tenant, tenants } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Tenant>[] = [
  {
    key: "tenant",
    header: "Tenant",
    cell: (row) => (
      <div>
        <div className="font-medium text-sm">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.email}</div>
      </div>
    ),
  },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "unit", header: "Unit", cell: (row) => row.unitNumber },
  { key: "lease", header: "Lease", cell: (row) => row.leaseId },
  {
    key: "rent",
    header: "Rent",
    cell: (row) => <span className="tabular-nums">{formatCurrency(row.rent, { noDecimals: true })}</span>,
  },
  { key: "leaseEnd", header: "Lease End", cell: (row) => row.leaseEnd },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function TenantsTable() {
  const router = useRouter();

  return (
    <DataTableCard
      title="All Tenants"
      description="Everyone currently or previously leasing a unit."
      columns={columns}
      rows={tenants}
      getRowId={(row) => row.id}
      searchPlaceholder="Search tenants..."
      filterFn={(row, q) =>
        row.name.toLowerCase().includes(q) ||
        row.propertyName.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q)
      }
      onRowClick={(row) => router.push(`/dashboard/property/tenants/${row.id}`)}
    />
  );
}
