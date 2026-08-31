"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import {
  expensesByCategory,
  maintenanceCostTrend,
  occupancyTrend,
  properties,
  propertyPerformance,
  rentalRevenueTrend,
} from "../../_lib/data";

const currencyTick = (v: number | string) => formatCurrency(Number(v), { noDecimals: true });

const typeBreakdown = (["Residential", "Commercial", "Industrial", "Mixed Use"] as const).map((type) => ({
  type,
  count: properties.filter((p) => p.type === type).length,
}));

const pieColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const occupancyConfig = { occupancy: { label: "Occupancy %", color: "var(--chart-2)" } } satisfies ChartConfig;
const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },
  expenses: { label: "Expenses", color: "var(--chart-4)" },
} satisfies ChartConfig;
const performanceConfig = { revenue: { label: "Revenue", color: "var(--chart-2)" } } satisfies ChartConfig;
const maintenanceConfig = { cost: { label: "Cost", color: "var(--chart-4)" } } satisfies ChartConfig;
const typeConfig = {
  Residential: { label: "Residential", color: pieColors[0] },
  Commercial: { label: "Commercial", color: pieColors[1] },
  Industrial: { label: "Industrial", color: pieColors[2] },
  "Mixed Use": { label: "Mixed Use", color: pieColors[3] },
} satisfies ChartConfig;
const categoryConfig = { amount: { label: "Amount", color: "var(--chart-3)" } } satisfies ChartConfig;

export function OccupancyAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Occupancy Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={occupancyConfig} className="h-72 w-full">
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

export function RevenueAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className="h-72 w-full">
          <BarChart data={rentalRevenueTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              width={72}
              tickFormatter={currencyTick}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => <span className="font-medium tabular-nums">{currencyTick(Number(value))}</span>}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PropertyTypeMixChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Property Mix by Type</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={typeConfig} className="h-64 w-full max-w-xs">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={typeBreakdown} dataKey="count" nameKey="type" innerRadius={50} outerRadius={80} strokeWidth={2}>
              {typeBreakdown.map((entry, index) => (
                <Cell key={entry.type} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="type" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PropertyPerformanceAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Property Revenue Performance</CardTitle>
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
              tickFormatter={currencyTick}
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
                  formatter={(value) => <span className="font-medium tabular-nums">{currencyTick(Number(value))}</span>}
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

export function MaintenanceAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Maintenance Cost Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={maintenanceConfig} className="h-64 w-full">
          <AreaChart data={maintenanceCostTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              width={72}
              tickFormatter={currencyTick}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => <span className="font-medium tabular-nums">{currencyTick(Number(value))}</span>}
                />
              }
            />
            <Area
              dataKey="cost"
              type="monotone"
              stroke="var(--color-cost)"
              fill="var(--color-cost)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ExpenseAnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Expense Analytics by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={categoryConfig} className="h-72 w-full">
          <BarChart data={expensesByCategory} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={currencyTick}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={110}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => <span className="font-medium tabular-nums">{currencyTick(Number(value))}</span>}
                />
              }
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
