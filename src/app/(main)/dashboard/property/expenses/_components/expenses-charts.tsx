"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import { expensesByCategory, expensesByProperty, monthlyExpensesTrend } from "../../_lib/data";

const propertyConfig = { amount: { label: "Expenses", color: "var(--chart-2)" } } satisfies ChartConfig;
const categoryConfig = { amount: { label: "Expenses", color: "var(--chart-3)" } } satisfies ChartConfig;
const monthlyConfig = { amount: { label: "Expenses", color: "var(--chart-4)" } } satisfies ChartConfig;

const currencyTick = (v: number | string) => formatCurrency(Number(v), { noDecimals: true });

export function ExpensesByPropertyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Expenses by Property</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={propertyConfig} className="h-72 w-full">
          <BarChart data={expensesByProperty} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
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
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ExpensesByCategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Expenses by Category</CardTitle>
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

export function MonthlyExpensesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={monthlyConfig} className="h-64 w-full">
          <LineChart data={monthlyExpensesTrend} margin={{ left: 0, right: 8, top: 8 }}>
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
            <Line dataKey="amount" type="monotone" stroke="var(--color-amount)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
