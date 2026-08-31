"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import {
  leaseExpirationTrend,
  maintenanceCostTrend,
  occupancyTrend,
  propertyPerformance,
  rentalRevenueTrend,
} from "../_lib/data";

const occupancyConfig = {
  occupancy: { label: "Occupancy %", color: "var(--chart-2)" },
} satisfies ChartConfig;

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },
  expenses: { label: "Expenses", color: "var(--chart-4)" },
} satisfies ChartConfig;

const performanceConfig = {
  revenue: { label: "Monthly Revenue", color: "var(--chart-2)" },
} satisfies ChartConfig;

const maintenanceConfig = {
  cost: { label: "Maintenance Cost", color: "var(--chart-4)" },
} satisfies ChartConfig;

const leaseConfig = {
  count: { label: "Expiring Leases", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function OccupancyTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Occupancy Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={occupancyConfig} className="h-64 w-full">
          <AreaChart data={occupancyTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              domain={[80, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="occupancy"
              type="monotone"
              stroke="var(--color-occupancy)"
              fill="var(--color-occupancy)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RentalRevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Rental Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className="h-64 w-full">
          <LineChart data={rentalRevenueTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => formatCurrency(Number(v), { noDecimals: true })}
              width={72}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span className="flex w-full justify-between gap-4">
                      <span className="text-muted-foreground capitalize">{name}</span>
                      <span className="font-medium tabular-nums">
                        {formatCurrency(Number(value), { noDecimals: true })}
                      </span>
                    </span>
                  )}
                />
              }
            />
            <Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
            <Line dataKey="expenses" type="monotone" stroke="var(--color-expenses)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PropertyPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Property Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={performanceConfig} className="h-72 w-full">
          <BarChart data={propertyPerformance} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => formatCurrency(Number(v), { noDecimals: true })}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={120}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-medium tabular-nums">
                      {formatCurrency(Number(value), { noDecimals: true })}
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function MaintenanceCostChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Maintenance Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={maintenanceConfig} className="h-64 w-full">
          <BarChart data={maintenanceCostTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => formatCurrency(Number(v), { noDecimals: true })}
              width={72}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-medium tabular-nums">
                      {formatCurrency(Number(value), { noDecimals: true })}
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function LeaseExpirationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Lease Expirations</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={leaseConfig} className="h-64 w-full">
          <BarChart data={leaseExpirationTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              width={30}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
