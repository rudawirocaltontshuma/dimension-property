import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Building2, Calendar, MapPin, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

import {
  getDocumentsForProperty,
  getExpensesForProperty,
  getInspectionsForProperty,
  getLeasesForProperty,
  getMaintenanceForProperty,
  getPropertyById,
  getTenantsForProperty,
  getUnitsForProperty,
} from "../../_lib/data";
import { StatusBadge } from "../../_lib/status-badge";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const propertyUnits = getUnitsForProperty(id);
  const propertyTenants = getTenantsForProperty(id);
  const propertyLeases = getLeasesForProperty(id);
  const propertyMaintenance = getMaintenanceForProperty(id);
  const propertyInspections = getInspectionsForProperty(id);
  const propertyExpenses = getExpensesForProperty(id);
  const propertyDocuments = getDocumentsForProperty(id);
  const totalExpenses = propertyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const activityFeed = [
    ...propertyMaintenance
      .slice(0, 3)
      .map((m) => ({ date: m.reportedDate, text: `Work order ${m.id} reported: ${m.issue}` })),
    ...propertyInspections
      .slice(0, 3)
      .map((i) => ({ date: i.date, text: `${i.type} inspection ${i.status.toLowerCase()} — ${i.result}` })),
    ...propertyLeases
      .slice(0, 2)
      .map((l) => ({ date: l.start, text: `Lease ${l.id} for unit ${l.unitNumber} is ${l.status.toLowerCase()}` })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/property/properties"
          className="flex w-fit items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to properties
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl tracking-tight">{property.name}</h1>
              <StatusBadge status={property.status} />
            </div>
            <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="size-3.5" />
              {property.address}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{property.id}</Badge>
            <Badge variant="outline">{property.type}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-normal text-muted-foreground text-sm">Units</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{property.units}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-normal text-muted-foreground text-sm">Occupancy</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <span className="text-2xl tracking-tight">{property.occupancyRate}%</span>
            <Progress value={property.occupancyRate} className="h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-normal text-muted-foreground text-sm">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">
            {formatCurrency(property.monthlyRevenue, { noDecimals: true })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-normal text-muted-foreground text-sm">Manager</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl tracking-tight">
            <UserRound className="size-4 text-muted-foreground" />
            <span className="text-base">{property.manager}</span>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="flex flex-col gap-4">
        <TabsList variant="line" className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="leases">Leases</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-normal">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Type</span>
                <span>{property.type}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Year Built</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  {property.yearBuilt}
                </span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Address</span>
                <span className="text-right">{property.address}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Total Units</span>
                <span>{property.units}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={property.status} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-normal">Financial Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Monthly Revenue</span>
                <span className="font-medium tabular-nums">
                  {formatCurrency(property.monthlyRevenue, { noDecimals: true })}
                </span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Expenses (YTD)</span>
                <span className="font-medium tabular-nums">{formatCurrency(totalExpenses, { noDecimals: true })}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Active Tenants</span>
                <span>{propertyTenants.filter((t) => t.status === "Active").length}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Open Maintenance</span>
                <span>{propertyMaintenance.filter((m) => m.status !== "Completed").length}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyUnits.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.unitNumber}</TableCell>
                      <TableCell>{unit.type}</TableCell>
                      <TableCell>{unit.floor}</TableCell>
                      <TableCell>{unit.tenantName ?? "—"}</TableCell>
                      <TableCell className="tabular-nums">{formatCurrency(unit.rent, { noDecimals: true })}</TableCell>
                      <TableCell>
                        <StatusBadge status={unit.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Lease End</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.unitNumber}</TableCell>
                      <TableCell className="tabular-nums">
                        {formatCurrency(tenant.rent, { noDecimals: true })}
                      </TableCell>
                      <TableCell>{tenant.leaseEnd}</TableCell>
                      <TableCell>
                        <StatusBadge status={tenant.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {propertyTenants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                        No tenants currently assigned.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leases">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Lease</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyLeases.map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">{lease.id}</TableCell>
                      <TableCell>{lease.tenantName}</TableCell>
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
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Work Order</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyMaintenance.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>{request.unitNumber}</TableCell>
                      <TableCell>
                        <StatusBadge status={request.priority} />
                      </TableCell>
                      <TableCell>{request.vendor}</TableCell>
                      <TableCell className="tabular-nums">
                        {formatCurrency(request.cost, { noDecimals: true })}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={request.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {propertyMaintenance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                        No maintenance history for this property.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Inspection</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyInspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">{inspection.id}</TableCell>
                      <TableCell>{inspection.unitNumber}</TableCell>
                      <TableCell>{inspection.type}</TableCell>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>
                        <StatusBadge status={inspection.result} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={inspection.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {propertyInspections.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                        No inspections recorded for this property.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell className="tabular-nums">
                        {formatCurrency(expense.amount, { noDecimals: true })}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={expense.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="overflow-x-auto px-0">
              <Table className="**:data-[slot='table-cell']:px-4 **:data-[slot='table-head']:px-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.uploadedDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                    </TableRow>
                  ))}
                  {propertyDocuments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-20 text-center text-muted-foreground">
                        No documents uploaded for this property.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="font-normal">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {activityFeed.map((item) => (
                  <li key={`${item.date}-${item.text}`} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
                    <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-muted-foreground text-xs">{item.date}</p>
                    </div>
                  </li>
                ))}
                {activityFeed.length === 0 && <p className="text-muted-foreground text-sm">No recent activity.</p>}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
