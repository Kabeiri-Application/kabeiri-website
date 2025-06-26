"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { jobsTable, profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

export async function getOrganizationId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  try {
    const profile = await db.query.profilesTable.findFirst({
      where: eq(profilesTable.id, session.user.id),
    });
    if (profile?.organization) {
      return profile.organization;
    }
  } catch (error) {
    console.error("Error in getOrganizationId:", error);
  }
}

export async function getDashboardStats() {
  try {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organization not found");
    }

    // Fetch all jobs with related data
    const jobs = await db.query.jobsTable.findMany({
      where: eq(jobsTable.organization, organizationId),
      with: {
        customer: true,
        vehicle: true,
        service: true,
        assigned_to: true,
        createdBy: true,
      },
    });

    // Calculate metrics
    const totalJobs = jobs.length;
    const inProgressJobs = jobs.filter(job => job.status === "in progress").length;
    
    // Calculate current month revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthJobs = jobs.filter(job => {
      if (!job.createdAt) return false;
      const jobDate = new Date(job.createdAt);
      return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
    });

    const monthlyRevenue = currentMonthJobs.reduce((total, job) => {
      if (job.service && job.service.price) {
        return total + (Number(job.service.price) || 0);
      }
      return total;
    }, 0);

    // Calculate average completion time for completed jobs
    const completedJobs = jobs.filter(job => 
      job.status === "complete" && 
      job.createdAt && 
      job.updatedAt
    );

    let averageCompletionTime = 0;
    if (completedJobs.length > 0) {
      const totalCompletionTime = completedJobs.reduce((total, job) => {
        const createdAt = new Date(job.createdAt!);
        const completedAt = new Date(job.updatedAt!);
        const diffInHours = (completedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
        return total + diffInHours;
      }, 0);
      
      averageCompletionTime = totalCompletionTime / completedJobs.length;
    }

    // Get recent jobs (last 5)
    const recentJobs = jobs
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5)
      .map(job => ({
        id: job.id,
        title: job.title,
        customer: job.customer,
        vehicle: job.vehicle,
        service: job.service,
        created_at: job.createdAt?.toISOString() || null,
        status: job.status,
      }));

    return {
      totalJobs,
      inProgressJobs,
      monthlyRevenue,
      averageCompletionTime,
      recentJobs,
    };

  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    throw error;
  }
}
