"use client";

import React, { useState } from "react";

import {
  MessageSquareIcon,
  StarIcon,
  ThumbsUpIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SatisfactionData {
  month: string;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  npsScore: number;
}

interface ServiceRating {
  service: string;
  rating: number;
  reviews: number;
  improvement: number;
}

const mockSatisfactionData: SatisfactionData[] = [
  {
    month: "Jan",
    averageRating: 4.2,
    totalReviews: 28,
    responseRate: 65,
    npsScore: 42,
  },
  {
    month: "Feb",
    averageRating: 4.3,
    totalReviews: 32,
    responseRate: 68,
    npsScore: 45,
  },
  {
    month: "Mar",
    averageRating: 4.1,
    totalReviews: 29,
    responseRate: 62,
    npsScore: 38,
  },
  {
    month: "Apr",
    averageRating: 4.4,
    totalReviews: 35,
    responseRate: 72,
    npsScore: 48,
  },
  {
    month: "May",
    averageRating: 4.5,
    totalReviews: 31,
    responseRate: 74,
    npsScore: 52,
  },
  {
    month: "Jun",
    averageRating: 4.6,
    totalReviews: 38,
    responseRate: 76,
    npsScore: 55,
  },
  {
    month: "Jul",
    averageRating: 4.7,
    totalReviews: 42,
    responseRate: 78,
    npsScore: 58,
  },
  {
    month: "Aug",
    averageRating: 4.6,
    totalReviews: 39,
    responseRate: 75,
    npsScore: 56,
  },
  {
    month: "Sep",
    averageRating: 4.8,
    totalReviews: 45,
    responseRate: 82,
    npsScore: 62,
  },
  {
    month: "Oct",
    averageRating: 4.7,
    totalReviews: 41,
    responseRate: 79,
    npsScore: 59,
  },
  {
    month: "Nov",
    averageRating: 4.9,
    totalReviews: 48,
    responseRate: 85,
    npsScore: 67,
  },
  {
    month: "Dec",
    averageRating: 4.8,
    totalReviews: 52,
    responseRate: 83,
    npsScore: 64,
  },
];

const mockServiceRatings: ServiceRating[] = [
  { service: "Oil Change", rating: 4.9, reviews: 145, improvement: 8.2 },
  { service: "Brake Service", rating: 4.7, reviews: 89, improvement: 5.4 },
  { service: "Engine Diagnostic", rating: 4.6, reviews: 67, improvement: 12.1 },
  { service: "Tire Service", rating: 4.8, reviews: 78, improvement: 6.7 },
  {
    service: "Transmission Service",
    rating: 4.5,
    reviews: 34,
    improvement: 15.3,
  },
  { service: "AC Service", rating: 4.4, reviews: 52, improvement: 9.8 },
  { service: "Battery Service", rating: 4.7, reviews: 45, improvement: 4.2 },
];

const chartConfig = {
  averageRating: {
    label: "Average Rating",
    color: "hsl(var(--chart-1))",
  },
  totalReviews: {
    label: "Total Reviews",
    color: "hsl(var(--chart-2))",
  },
  responseRate: {
    label: "Response Rate",
    color: "hsl(var(--chart-3))",
  },
  npsScore: {
    label: "NPS Score",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CustomerSatisfactionChart() {
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");
  const [metric, setMetric] = useState<
    "averageRating" | "responseRate" | "npsScore"
  >("averageRating");

  const currentRating =
    mockSatisfactionData[mockSatisfactionData.length - 1].averageRating;
  const previousRating =
    mockSatisfactionData[mockSatisfactionData.length - 2].averageRating;
  const ratingTrend = ((currentRating - previousRating) / previousRating) * 100;

  const totalReviews = mockSatisfactionData.reduce(
    (acc, curr) => acc + curr.totalReviews,
    0,
  );
  const avgResponseRate =
    mockSatisfactionData.reduce((acc, curr) => acc + curr.responseRate, 0) /
    mockSatisfactionData.length;
  const currentNPS =
    mockSatisfactionData[mockSatisfactionData.length - 1].npsScore;

  const getChartComponent = () => {
    const commonProps = {
      accessibilityLayer: true,
      data: mockSatisfactionData,
      margin: { left: 12, right: 12, top: 12, bottom: 12 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
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
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Area
              dataKey={metric}
              type="monotone"
              fill={`var(--color-${metric})`}
              fillOpacity={0.6}
              stroke={`var(--color-${metric})`}
              strokeWidth={2}
            />
          </AreaChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
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
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Line
              dataKey={metric}
              type="monotone"
              stroke={`var(--color-${metric})`}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
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
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Bar
              dataKey={metric}
              fill={`var(--color-${metric})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      default:
        return (
          <AreaChart {...commonProps}>
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
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Area
              dataKey={metric}
              type="monotone"
              fill={`var(--color-${metric})`}
              fillOpacity={0.6}
              stroke={`var(--color-${metric})`}
              strokeWidth={2}
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900">
                <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Current Rating
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentRating.toFixed(1)}
                  </p>
                  <Badge
                    variant={ratingTrend >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {ratingTrend >= 0 ? "+" : ""}
                    {ratingTrend.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                <MessageSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalReviews}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                <ThumbsUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Response Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgResponseRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                <TrendingUpIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  NPS Score
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentNPS}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Trends Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">
                Customer Satisfaction Trends
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Track customer satisfaction metrics over time
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={metric === "averageRating" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("averageRating")}
              >
                Rating
              </Button>
              <Button
                variant={metric === "responseRate" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("responseRate")}
              >
                Response
              </Button>
              <Button
                variant={metric === "npsScore" ? "default" : "outline"}
                size="sm"
                onClick={() => setMetric("npsScore")}
              >
                NPS
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={chartType}
            onValueChange={(value: string) =>
              setChartType(value as "area" | "line" | "bar")
            }
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>

            <TabsContent value={chartType} className="space-y-4">
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[300px] w-full"
              >
                {getChartComponent()}
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Service-Specific Ratings */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Service-Specific Ratings
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Customer satisfaction breakdown by service type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockServiceRatings
              .sort((a, b) => b.rating - a.rating)
              .map((service, index) => (
                <div
                  key={service.service}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {service.service}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {service.reviews} reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {service.rating.toFixed(1)}
                      </span>
                    </div>
                    <Badge
                      variant={
                        service.improvement >= 10
                          ? "default"
                          : service.improvement >= 5
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {service.improvement >= 0 ? "+" : ""}
                      {service.improvement.toFixed(1)}% improvement
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
