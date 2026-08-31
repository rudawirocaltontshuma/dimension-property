"use client";

import * as React from "react";

import { Search } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type SimpleColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTableCard<T>({
  title,
  description,
  columns,
  rows,
  getRowId,
  searchPlaceholder = "Search...",
  filterFn,
  onRowClick,
  extraActions,
}: {
  title: string;
  description?: string;
  columns: SimpleColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  searchPlaceholder?: string;
  filterFn?: (row: T, query: string) => boolean;
  onRowClick?: (row: T) => void;
  extraActions?: React.ReactNode;
}) {
  const [query, setQuery] = React.useState("");

  const filteredRows = React.useMemo(() => {
    if (!query.trim() || !filterFn) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) => filterFn(row, q));
  }, [rows, query, filterFn]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        <CardAction>
          <div className="flex items-center gap-2">
            {filterFn ? (
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 w-44 pl-8 md:w-60"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            ) : null}
            {extraActions}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-0">
        <div className="overflow-x-auto">
          <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
            <TableHeader className="border-t **:data-[slot='table-head']:h-10 **:data-[slot='table-head']:font-medium **:data-[slot='table-head']:text-foreground **:data-[slot='table-head']:text-sm">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.length ? (
                filteredRows.map((row) => (
                  <TableRow
                    key={getRowId(row)}
                    className={onRowClick ? "cursor-pointer" : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="px-4 text-muted-foreground text-xs">
          Showing {filteredRows.length} of {rows.length} records.
        </p>
      </CardContent>
    </Card>
  );
}
