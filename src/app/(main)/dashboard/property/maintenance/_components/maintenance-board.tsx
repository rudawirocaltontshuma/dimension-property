"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { type MaintenanceStatus, maintenanceRequests } from "../../_lib/data";
import { StatusBadge } from "../../_lib/status-badge";

const columns: MaintenanceStatus[] = ["Reported", "Scheduled", "In Progress", "Waiting", "Completed"];

export function MaintenanceBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 xl:grid-cols-5">
      {columns.map((status) => {
        const items = maintenanceRequests.filter((request) => request.status === status);
        return (
          <div key={status} className="flex min-w-0 flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-sm">{status}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">{items.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((request) => (
                <Card key={request.id} className="gap-2 py-3">
                  <CardHeader className="gap-1 px-3">
                    <CardTitle className="font-medium text-sm leading-snug">{request.issue}</CardTitle>
                    <p className="text-muted-foreground text-xs">
                      {request.propertyName} · Unit {request.unitNumber}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2 px-3">
                    <div className="flex items-center justify-between">
                      <StatusBadge status={request.priority} />
                      <span className="text-muted-foreground text-xs">{request.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{request.vendor}</span>
                      <span className="font-medium tabular-nums">
                        {formatCurrency(request.cost, { noDecimals: true })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {items.length === 0 && (
                <div className="rounded-lg border border-dashed p-4 text-center text-muted-foreground text-xs">
                  No work orders
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
