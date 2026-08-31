"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

import { rentCollection, rentCollectionTrend, tenants } from "../../_lib/data";
import { StatusBadge } from "../../_lib/status-badge";

const chartConfig = {
  expected: { label: "Expected", color: "var(--chart-1)" },
  collected: { label: "Collected", color: "var(--chart-2)" },
} satisfies ChartConfig;

const cards = [
  { label: "Expected Rent", value: rentCollection.expected },
  { label: "Collected", value: rentCollection.collected },
  { label: "Outstanding", value: rentCollection.outstanding },
];

export function RentOverview() {
  const delinquent = tenants.filter((t) => t.balance > 0).sort((a, b) => b.balance - a.balance);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label} className="gap-2">
            <CardHeader className="pb-0">
              <CardTitle className="font-normal text-muted-foreground text-sm">{card.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl tracking-tight">
              {formatCurrency(card.value, { noDecimals: true })}
            </CardContent>
          </Card>
        ))}
        <Card className="gap-2">
          <CardHeader className="pb-0">
            <CardTitle className="font-normal text-muted-foreground text-sm">Overdue Tenants</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{rentCollection.overdue}</CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="pb-0">
            <CardTitle className="font-normal text-muted-foreground text-sm">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl tracking-tight">{rentCollection.collectionRate}%</div>
            <Progress value={rentCollection.collectionRate} className="h-1.5" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Rent Collection Trend</CardTitle>
          <p className="text-muted-foreground text-xs">
            Illustrative figures for this demo — no real rent is collected or processed.
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={rentCollectionTrend} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                width={72}
                tickFormatter={(v) => formatCurrency(Number(v), { noDecimals: true })}
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
              <Bar dataKey="expected" fill="var(--color-expected)" radius={4} />
              <Bar dataKey="collected" fill="var(--color-collected)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Tenants with Outstanding Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {delinquent.length ? (
            delinquent.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between border-b py-2 text-sm last:border-0">
                <div>
                  <p className="font-medium">{tenant.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {tenant.propertyName} · Unit {tenant.unitNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium tabular-nums">
                    {formatCurrency(tenant.balance, { noDecimals: true })}
                  </span>
                  <StatusBadge status="Overdue" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No tenants currently have an outstanding balance.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
