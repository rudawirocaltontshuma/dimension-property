"use client";

import { formatCurrency } from "@/lib/utils";

import { type Expense, expenses } from "../../_lib/data";
import { DataTableCard, type SimpleColumn } from "../../_lib/data-table-card";
import { StatusBadge } from "../../_lib/status-badge";

const columns: SimpleColumn<Expense>[] = [
  { key: "id", header: "Expense", cell: (row) => <span className="font-medium">{row.id}</span> },
  { key: "property", header: "Property", cell: (row) => row.propertyName },
  { key: "category", header: "Category", cell: (row) => row.category },
  {
    key: "amount",
    header: "Amount",
    cell: (row) => <span className="tabular-nums">{formatCurrency(row.amount, { noDecimals: true })}</span>,
  },
  { key: "date", header: "Date", cell: (row) => row.date },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

export function ExpensesTable() {
  return (
    <DataTableCard
      title="All Expenses"
      description="Every logged expense across the portfolio."
      columns={columns}
      rows={expenses}
      getRowId={(row) => row.id}
      searchPlaceholder="Search expenses..."
      filterFn={(row, q) => row.propertyName.toLowerCase().includes(q) || row.category.toLowerCase().includes(q)}
    />
  );
}
