"use client";

import React, { useState } from "react";

import {
  BarChart3Icon,
  ClockIcon,
  PieChartIcon,
  UsersIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechnicianWorkload {
  name: string;
  completedJobs: number;
  inProgressJobs: number;
  pendingJobs: number;
  totalHours: number;
  efficiency: number;
  revenue: number;
  specialty: string;
  fill: string;
}

const mockTechnicianData: TechnicianWorkload[] = [
  {
    name: "Mike Johnson",
    completedJobs: 34,
    inProgressJobs: 3,
    pendingJobs: 2,
    totalHours: 156,
    efficiency: 94.2,
    revenue: 28400,
    specialty: "Engine",
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Sarah Davis",
    completedJobs: 31,
    inProgressJobs: 4,
    pendingJobs: 1,
    totalHours: 148,
    efficiency: 91.8,
    revenue: 26200,
    specialty: "Transmission",
    fill: "hsl(var(--chart-2))",
  },
  {
    name: "Carlos Rodriguez",
    completedJobs: 29,
    inProgressJobs: 2,
    pendingJobs: 3,
    totalHours: 142,
    efficiency: 87.5,
    revenue: 24800,
    specialty: "Electrical",
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "David Kim",
    completedJobs: 27,
    inProgressJobs: 5,
    pendingJobs: 2,
    totalHours: 145,
    efficiency: 83.2,
    revenue: 23100,
    specialty: "Brakes",
    fill: "hsl(var(--chart-4))",
  },
  {
    name: "Jennifer Liu",
    completedJobs: 25,
    inProgressJobs: 3,
    pendingJobs: 4,
    totalHours: 138,
    efficiency: 89.1,
    revenue: 21700,
    specialty: "AC/Heating",
    fill: "hsl(var(--chart-5))",
  },
  {
    name: "Robert Wilson",
    completedJobs: 22,
    inProgressJobs: 6,
    pendingJobs: 1,
    totalHours: 135,
    efficiency: 78.9,
    revenue: 19500,
    specialty: "Diagnostics",
    fill: "hsl(var(--chart-6))",
  },
];

const chartConfig = {
  completedJobs: {
    label: "Completed Jobs",
    color: "hsl(var(--chart-1))",
  },
  inProgressJobs: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  pendingJobs: {
    label: "Pending Jobs",
    color: "hsl(var(--chart-3))",
  },
  totalHours: {
    label: "Total Hours",
    color: "hsl(var(--chart-4))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TechnicianWorkloadChart() {
  const [viewType, setViewType] = useState<"bar" | "pie">("bar");
  const [metric, setMetric] = useState<"jobs" | "hours" | "revenue">("jobs");

  const getBarData = () => {
    if (metric === "hours") {
      return mockTechnicianData.map((tech) => ({
        name: tech.name.split(" ")[0], // First name only for chart
        value: tech.totalHours,
        fullName: tech.name,
        specialty: tech.specialty,
        efficiency: tech.efficiency,
      }));
    }
    if (metric === "revenue") {
      return mockTechnicianData.map((tech) => ({
        name: tech.name.split(" ")[0],
        value: tech.revenue,
        fullName: tech.name,
        specialty: tech.specialty,
        efficiency: tech.efficiency,
      }));
    }
    return mockTechnicianData.map((tech) => ({
      name: tech.name.split(" ")[0],
      value: tech.completedJobs,
      fullName: tech.name,
      specialty: tech.specialty,
      efficiency: tech.efficiency,
    }));
  };

  const getPieData = () => {
    return mockTechnicianData.map((tech) => ({
      name: tech.name.split(" ")[0],
      value: tech.completedJobs,
      fill: tech.fill,
      fullName: tech.name,
      specialty: tech.specialty,
    }));
  };

  const formatValue = (value: number) => {
    if (metric === "revenue") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    }
    if (metric === "hours") {
      return `${value}h`;
    }
    return value.toString();
  };

  const totalJobs = mockTechnicianData.reduce(
    (acc, curr) => acc + curr.completedJobs,
    0,
  );
  const totalHours = mockTechnicianData.reduce(
    (acc, curr) => acc + curr.totalHours,
    0,
  );

  const avgEfficiency =
    mockTechnicianData.reduce((acc, curr) => acc + curr.efficiency, 0) /
    mockTechnicianData.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                <UsersIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Active Technicians
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockTechnicianData.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                <BarChart3Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Jobs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalJobs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                <ClockIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Hours
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalHours}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                <PieChartIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Efficiency
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgEfficiency.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">
                Technician Workload Distribution
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Performance metrics and job distribution by technician
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={metric === "jobs" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("jobs")}
              >
                Workload by Jobs Completed
              </Button>
              <Button
                variant={metric === "hours" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("hours")}
              >
                Workload by Hours Worked
              </Button>
              <Button
                variant={metric === "revenue" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("revenue")}
              >
                Workload by Revenue Generated
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={viewType}
            onValueChange={(value) => setViewType(value as "bar" | "pie")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            </TabsList>

            <TabsContent value="bar" className="space-y-4">
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[350px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={getBarData()}
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
                    dataKey="name"
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
                        labelFormatter={(value, payload): React.ReactNode => {
                          const firstItem = payload?.[0] as
                            | {
                                payload?: {
                                  fullName?: string;
                                  specialty?: string;
                                };
                              }
                            | undefined;
                          const data = firstItem?.payload;
                          return data?.fullName && data?.specialty
                            ? `${data.fullName} (${data.specialty})`
                            : String(value);
                        }}
                        formatter={(value) => [
                          formatValue(value as number),
                          metric,
                        ]}
                      />
                    }
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="pie" className="space-y-4">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[350px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        formatter={(value, name, item) => {
                          const data = (
                            item as {
                              payload?: {
                                fullName?: string;
                                specialty?: string;
                              };
                            }
                          )?.payload;
                          return [
                            `${value} jobs`,
                            data?.fullName && data?.specialty
                              ? `${data.fullName} (${data.specialty})`
                              : String(name),
                          ];
                        }}
                      />
                    }
                  />
                  <Pie
                    data={getPieData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    paddingAngle={2}
                  >
                    {getPieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={
                      <ChartLegendContent
                        className="mt-4 flex flex-wrap justify-center gap-2"
                        payload={mockTechnicianData.map((item) => ({
                          value: item.name,
                          type: "square",
                          color: item.fill,
                        }))}
                      />
                    }
                  />
                </PieChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detailed Technician Table */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Detailed Performance Metrics
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Complete breakdown of each technician&apos;s performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTechnicianData
              .sort((a, b) => b.completedJobs - a.completedJobs)
              .map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: tech.fill }}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tech.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {tech.specialty} Specialist
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Completed
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tech.completedJobs}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Hours
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tech.totalHours}h
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Revenue
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        }).format(tech.revenue)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        tech.efficiency >= 90
                          ? "default"
                          : tech.efficiency >= 85
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {tech.efficiency.toFixed(1)}% eff
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
