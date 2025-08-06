"use client";

import React from "react";

import { Cell, Pie, PieChart } from "recharts";

import { Badge } from "@/components/ui/badge";
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

interface ServiceData {
  service: string;
  count: number;
  revenue: number;
  fill: string;
}

const mockServiceData: ServiceData[] = [
  {
    service: "Oil Change",
    count: 145,
    revenue: 18125,
    fill: "hsl(var(--chart-1))",
  },
  {
    service: "Brake Service",
    count: 89,
    revenue: 35600,
    fill: "hsl(var(--chart-2))",
  },
  {
    service: "Engine Diagnostic",
    count: 67,
    revenue: 26800,
    fill: "hsl(var(--chart-3))",
  },
  {
    service: "Tire Service",
    count: 78,
    revenue: 31200,
    fill: "hsl(var(--chart-4))",
  },
  {
    service: "Transmission Service",
    count: 34,
    revenue: 20400,
    fill: "hsl(var(--chart-5))",
  },
  {
    service: "AC Service",
    count: 52,
    revenue: 15600,
    fill: "hsl(var(--chart-6))",
  },
  {
    service: "Battery Service",
    count: 45,
    revenue: 9000,
    fill: "hsl(var(--chart-7))",
  },
];

const chartConfig = {
  serviceCount: {
    label: "Service Count",
    color: "hsl(var(--chart-1))",
  },
  "Oil Change": {
    label: "Oil Change",
    color: "hsl(var(--chart-1))",
  },
  "Brake Service": {
    label: "Brake Service",
    color: "hsl(var(--chart-2))",
  },
  "Engine Diagnostic": {
    label: "Engine Diagnostic",
    color: "hsl(var(--chart-3))",
  },
  "Tire Service": {
    label: "Tire Service",
    color: "hsl(var(--chart-4))",
  },
  "Transmission Service": {
    label: "Transmission Service",
    color: "hsl(var(--chart-5))",
  },
  "AC Service": {
    label: "AC Service",
    color: "hsl(var(--chart-6))",
  },
  "Battery Service": {
    label: "Battery Service",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;

export function ServicePopularityChart() {
  const totalServices = mockServiceData.reduce(
    (acc, curr) => acc + curr.count,
    0,
  );
  const totalRevenue = mockServiceData.reduce(
    (acc, curr) => acc + curr.revenue,
    0,
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getPercentage = (count: number) => {
    return ((count / totalServices) * 100).toFixed(1);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pie Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Service Popularity
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Distribution of services by frequency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              chartConfig[name as keyof typeof chartConfig]
                                ?.color || "#8884d8",
                          }}
                        />
                        <span>
                          {name}: {String(value)} services (
                          {getPercentage(value as number)}%)
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={mockServiceData}
                dataKey="count"
                nameKey="service"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
              >
                {mockServiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={
                  <ChartLegendContent
                    className="mt-4 flex flex-wrap justify-center gap-2"
                    payload={mockServiceData.map((item) => ({
                      value: item.service,
                      type: "square",
                      color: item.fill,
                    }))}
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Service Stats Table */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Service Performance
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Detailed breakdown by service type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Services
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalServices}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>

            {/* Service List */}
            <div className="space-y-3">
              {mockServiceData
                .sort((a, b) => b.count - a.count)
                .map((service, index) => (
                  <div
                    key={service.service}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: service.fill }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {service.service}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {service.count} services •{" "}
                          {getPercentage(service.count)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(service.revenue)}
                      </p>
                      <Badge
                        variant={index < 3 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
