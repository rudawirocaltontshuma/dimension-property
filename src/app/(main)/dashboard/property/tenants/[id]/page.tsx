import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, getInitials } from "@/lib/utils";

import { getTenantById, leases, maintenanceRequests } from "../../_lib/data";
import { StatusBadge } from "../../_lib/status-badge";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenant = getTenantById(id);
  if (!tenant) notFound();

  const tenantLeases = leases.filter((lease) => lease.tenantId === tenant.id);
  const tenantMaintenance = maintenanceRequests.filter((m) => m.unitId === tenant.unitId);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/dashboard/property/tenants"
        className="flex w-fit items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to tenants
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback>{getInitials(tenant.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl tracking-tight">{tenant.name}</h1>
            <p className="text-muted-foreground text-sm">{tenant.id}</p>
          </div>
        </div>
        <StatusBadge status={tenant.status} className="w-fit" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-muted-foreground" />
              {tenant.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 text-muted-foreground" />
              {tenant.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 text-muted-foreground" />
              {tenant.propertyName} — Unit {tenant.unitNumber}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Lease Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between border-b py-1.5">
              <span className="text-muted-foreground">Rent</span>
              <span className="tabular-nums">{formatCurrency(tenant.rent, { noDecimals: true })}</span>
            </div>
            <div className="flex justify-between border-b py-1.5">
              <span className="text-muted-foreground">Lease Start</span>
              <span>{tenant.leaseStart}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Lease End</span>
              <span>{tenant.leaseEnd}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl tracking-tight">{formatCurrency(tenant.balance, { noDecimals: true })}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              {tenant.balance > 0 ? "Outstanding balance due" : "Account current"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Lease History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0">
          <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
            <TableHeader>
              <TableRow>
                <TableHead>Lease</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantLeases.map((lease) => (
                <TableRow key={lease.id}>
                  <TableCell className="font-medium">{lease.id}</TableCell>
                  <TableCell>{lease.unitNumber}</TableCell>
                  <TableCell>{lease.start}</TableCell>
                  <TableCell>{lease.end}</TableCell>
                  <TableCell className="tabular-nums">{formatCurrency(lease.rent, { noDecimals: true })}</TableCell>
                  <TableCell>
                    <StatusBadge status={lease.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Unit Maintenance History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0">
          <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
            <TableHeader>
              <TableRow>
                <TableHead>Work Order</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantMaintenance.length ? (
                tenantMaintenance.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.issue}</TableCell>
                    <TableCell>
                      <StatusBadge status={request.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-20 text-center text-muted-foreground">
                    No maintenance requests for this unit.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
