"use client";

import React from "react";

import {
  BarChart3Icon,
  PieChartIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import {
  CustomerSatisfactionChart,
  MonthlyQuarterlyChart,
  RevenueChart,
  ServicePopularityChart,
  TechnicianWorkloadChart,
} from "@/components/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground text-gray-600 dark:text-gray-300">
          Comprehensive analytics and insights for your automotive service
          business
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3Icon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="technicians" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Technicians
          </TabsTrigger>
          <TabsTrigger value="satisfaction" className="flex items-center gap-2">
            <StarIcon className="h-4 w-4" />
            Satisfaction
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            {/* Revenue Overview */}
            <RevenueChart />

            {/* Service Popularity Grid */}
            <ServicePopularityChart />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6">
            <RevenueChart />
            <MonthlyQuarterlyChart />
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServicePopularityChart />
        </TabsContent>

        <TabsContent value="technicians" className="space-y-6">
          <TechnicianWorkloadChart />
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <CustomerSatisfactionChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
