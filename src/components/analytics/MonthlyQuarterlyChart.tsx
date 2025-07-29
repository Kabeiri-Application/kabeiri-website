"use client";

import React, { useState } from "react";

import { CalendarIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MonthlyData {
  period: string;
  currentYear: number;
  previousYear: number;
  growth: number;
}

interface QuarterlyData {
  quarter: string;
  currentYear: number;
  previousYear: number;
  growth: number;
}

const mockMonthlyRevenue: MonthlyData[] = [
  { period: "Jan", currentYear: 67000, previousYear: 45000, growth: 48.9 },
  { period: "Feb", currentYear: 72000, previousYear: 52000, growth: 38.5 },
  { period: "Mar", currentYear: 68000, previousYear: 48000, growth: 41.7 },
  { period: "Apr", currentYear: 81000, previousYear: 61000, growth: 32.8 },
  { period: "May", currentYear: 75000, previousYear: 55000, growth: 36.4 },
  { period: "Jun", currentYear: 87000, previousYear: 67000, growth: 29.9 },
  { period: "Jul", currentYear: 92000, previousYear: 72000, growth: 27.8 },
  { period: "Aug", currentYear: 88000, previousYear: 68000, growth: 29.4 },
  { period: "Sep", currentYear: 94000, previousYear: 74000, growth: 27.0 },
  { period: "Oct", currentYear: 89000, previousYear: 69000, growth: 29.0 },
  { period: "Nov", currentYear: 96000, previousYear: 76000, growth: 26.3 },
  { period: "Dec", currentYear: 102000, previousYear: 82000, growth: 24.4 },
];

const mockQuarterlyRevenue: QuarterlyData[] = [
  { quarter: "Q1", currentYear: 207000, previousYear: 145000, growth: 42.8 },
  { quarter: "Q2", currentYear: 243000, previousYear: 183000, growth: 32.8 },
  { quarter: "Q3", currentYear: 274000, previousYear: 214000, growth: 28.0 },
  { quarter: "Q4", currentYear: 287000, previousYear: 227000, growth: 26.4 },
];

const mockMonthlyJobs: MonthlyData[] = [
  { period: "Jan", currentYear: 45, previousYear: 32, growth: 40.6 },
  { period: "Feb", currentYear: 48, previousYear: 38, growth: 26.3 },
  { period: "Mar", currentYear: 46, previousYear: 35, growth: 31.4 },
  { period: "Apr", currentYear: 52, previousYear: 42, growth: 23.8 },
  { period: "May", currentYear: 49, previousYear: 39, growth: 25.6 },
  { period: "Jun", currentYear: 55, previousYear: 45, growth: 22.2 },
  { period: "Jul", currentYear: 58, previousYear: 48, growth: 20.8 },
  { period: "Aug", currentYear: 56, previousYear: 46, growth: 21.7 },
  { period: "Sep", currentYear: 60, previousYear: 50, growth: 20.0 },
  { period: "Oct", currentYear: 57, previousYear: 47, growth: 21.3 },
  { period: "Nov", currentYear: 62, previousYear: 52, growth: 19.2 },
  { period: "Dec", currentYear: 65, previousYear: 55, growth: 18.2 },
];

const chartConfig = {
  currentYear: {
    label: "2024",
    color: "hsl(var(--chart-1))",
  },
  previousYear: {
    label: "2023",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MonthlyQuarterlyChart() {
  const [metric, setMetric] = useState<"revenue" | "jobs">("revenue");
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly");

  const getData = () => {
    if (period === "quarterly") {
      return metric === "revenue" ? mockQuarterlyRevenue : [];
    }
    return metric === "revenue" ? mockMonthlyRevenue : mockMonthlyJobs;
  };

  const formatValue = (value: number) => {
    if (metric === "revenue") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    }
    return value.toString();
  };

  const data = getData();
  const currentYearTotal = data.reduce(
    (acc, curr) => acc + curr.currentYear,
    0,
  );
  const previousYearTotal = data.reduce(
    (acc, curr) => acc + curr.previousYear,
    0,
  );
  const overallGrowth =
    ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100;

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 dark:text-white">
              Year-over-Year Comparison
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Compare current and previous year performance
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={metric === "revenue" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetric("revenue")}
              className="flex items-center gap-2"
            >
              <DollarSignIcon className="h-4 w-4" />
              Revenue
            </Button>
            <Button
              variant={metric === "jobs" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetric("jobs")}
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Jobs
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={period}
          onValueChange={(value: string) =>
            setPeriod(value as "monthly" | "quarterly")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly View</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  2024 Total
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatValue(currentYearTotal)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  2023 Total
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatValue(previousYearTotal)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Growth
                </p>
                <p
                  className={`flex items-center gap-1 text-xl font-bold ${overallGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  <TrendingUpIcon className="h-4 w-4" />
                  {overallGrowth >= 0 ? "+" : ""}
                  {overallGrowth.toFixed(1)}%
                </p>
              </div>
            </div>

            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[350px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-gray-600 dark:text-gray-300"
                  tickFormatter={formatValue}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[200px]"
                      labelFormatter={(value) => `Month: ${value}`}
                      formatter={(value, name) => [
                        formatValue(value as number),
                        name === "currentYear" ? "2024" : "2023",
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="currentYear"
                  fill="var(--color-currentYear)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="previousYear"
                  fill="var(--color-previousYear)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="quarterly" className="space-y-4">
            {/* Quarterly Summary Stats */}
            <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  2024 Total
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatValue(
                    mockQuarterlyRevenue.reduce(
                      (acc, curr) => acc + curr.currentYear,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  2023 Total
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatValue(
                    mockQuarterlyRevenue.reduce(
                      (acc, curr) => acc + curr.previousYear,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Growth
                </p>
                <p className="flex items-center gap-1 text-xl font-bold text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-4 w-4" />
                  +32.5%
                </p>
              </div>
            </div>

            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[350px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={mockQuarterlyRevenue}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-gray-600 dark:text-gray-300"
                  tickFormatter={formatValue}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[200px]"
                      labelFormatter={(value) => `Quarter: ${value}`}
                      formatter={(value, name) => [
                        formatValue(value as number),
                        name === "currentYear" ? "2024" : "2023",
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="currentYear"
                  fill="var(--color-currentYear)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="previousYear"
                  fill="var(--color-previousYear)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
