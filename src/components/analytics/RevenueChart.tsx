"use client";

import React, { useState } from "react";

import { BarChart3Icon, TrendingUpIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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

interface RevenueData {
  month: string;
  revenue: number;
  jobs: number;
  avgJobValue: number;
}

const mockRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 45000, jobs: 32, avgJobValue: 1406 },
  { month: "Feb", revenue: 52000, jobs: 38, avgJobValue: 1368 },
  { month: "Mar", revenue: 48000, jobs: 35, avgJobValue: 1371 },
  { month: "Apr", revenue: 61000, jobs: 42, avgJobValue: 1452 },
  { month: "May", revenue: 55000, jobs: 39, avgJobValue: 1410 },
  { month: "Jun", revenue: 67000, jobs: 45, avgJobValue: 1489 },
  { month: "Jul", revenue: 72000, jobs: 48, avgJobValue: 1500 },
  { month: "Aug", revenue: 68000, jobs: 46, avgJobValue: 1478 },
  { month: "Sep", revenue: 74000, jobs: 50, avgJobValue: 1480 },
  { month: "Oct", revenue: 69000, jobs: 47, avgJobValue: 1468 },
  { month: "Nov", revenue: 76000, jobs: 52, avgJobValue: 1462 },
  { month: "Dec", revenue: 82000, jobs: 55, avgJobValue: 1491 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  jobs: {
    label: "Jobs",
    color: "hsl(var(--chart-2))",
  },
  avgJobValue: {
    label: "Avg Job Value",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [activeMetric, setActiveMetric] =
    useState<keyof typeof chartConfig>("revenue");

  const totalRevenue = mockRevenueData.reduce(
    (acc, curr) => acc + curr.revenue,
    0,
  );
  const totalJobs = mockRevenueData.reduce((acc, curr) => acc + curr.jobs, 0);
  const avgJobValue = totalRevenue / totalJobs;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipValue = (
    value: unknown,
    name: string | number,
  ): React.ReactNode => {
    // Type guard and handle array values by taking the first element
    const singleValue = Array.isArray(value) ? value[0] : value;
    const numValue =
      typeof singleValue === "string"
        ? parseFloat(singleValue)
        : typeof singleValue === "number"
          ? singleValue
          : 0;
    const nameStr = typeof name === "string" ? name : name.toString();
    if (nameStr === "revenue" || nameStr === "avgJobValue") {
      return formatCurrency(numValue);
    }
    return numValue.toString();
  };

  const ChartComponent = chartType === "bar" ? BarChart : LineChart;

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-col items-stretch border-b border-gray-200 !p-0 sm:flex-row dark:border-gray-700">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle className="text-gray-900 dark:text-white">
            Revenue Analytics
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Monthly revenue trends and job performance metrics
          </CardDescription>
        </div>
        <div className="flex">
          {(["revenue", "jobs", "avgJobValue"] as const).map((key) => {
            const config = chartConfig[key];
            const total =
              key === "revenue"
                ? totalRevenue
                : key === "jobs"
                  ? totalJobs
                  : avgJobValue;
            const isActive = activeMetric === key;

            return (
              <button
                key={key}
                data-active={isActive}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-gray-200 px-6 py-4 text-left transition-colors even:border-l hover:bg-gray-50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() => setActiveMetric(key)}
              >
                <span className="text-muted-foreground text-xs text-gray-500 dark:text-gray-400">
                  {config.label}
                </span>
                <span className="text-lg leading-none font-bold text-gray-900 sm:text-2xl dark:text-white">
                  {key === "revenue"
                    ? formatCurrency(total)
                    : key === "jobs"
                      ? total.toLocaleString()
                      : formatCurrency(total)}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="mb-4 flex gap-2">
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
            className="flex items-center gap-2"
          >
            <BarChart3Icon className="h-4 w-4" />
            Bar Chart
          </Button>
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
            className="flex items-center gap-2"
          >
            <TrendingUpIcon className="h-4 w-4" />
            Line Chart
          </Button>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <ChartComponent
            accessibilityLayer
            data={mockRevenueData}
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
              dataKey="month"
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
              tickFormatter={(value) => {
                if (
                  activeMetric === "revenue" ||
                  activeMetric === "avgJobValue"
                ) {
                  return formatCurrency(value);
                }
                return value.toString();
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  labelFormatter={(value) => `Month: ${value}`}
                  formatter={formatTooltipValue}
                />
              }
            />
            {chartType === "bar" ? (
              <Bar
                dataKey={activeMetric}
                fill={`var(--color-${activeMetric})`}
                radius={[4, 4, 0, 0]}
              />
            ) : (
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={`var(--color-${activeMetric})`}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </ChartComponent>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
