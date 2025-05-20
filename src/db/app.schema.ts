import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "@/db/auth.schema";

export const rolesEnum = pgEnum("role", ["admin", "owner", "customer", "user"]);
export const jobStatusEnum = pgEnum("status", [
  "complete",
  "in progress",
  "pending",
]);

export const profilesTable = pgTable("profiles", {
  id: text()
    .primaryKey()
    .references(() => user.id),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  username: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  avatarUrl: text(),
  role: rolesEnum().notNull(),
  organization: uuid().references(() => organizationsTable.id),
  phone: text().notNull(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
});

export const organizationsTable = pgTable("organizations", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),
  businessName: text().notNull(),
  businessPhotoUrl: text(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  phone: text().notNull(),
  website: text(),
});

export const carsTable = pgTable("cars", {
  id: uuid().primaryKey().defaultRandom(),
  owner: text().references(() => profilesTable.id),
  make: text().notNull(),
  model: text().notNull(),
  year: text().notNull(),
  vin: text().notNull(),
  licensePlate: text().notNull(),
  color: text().notNull(),
});

export const jobsTable = pgTable("jobs", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),
  customer: text().references(() => profilesTable.id),
  vehicle: uuid().references(() => carsTable.id),
  organization: uuid().references(() => organizationsTable.id),
  title: text().notNull(),
  service: uuid().references(() => servicesTable.id),
  description: text().notNull(),
  status: jobStatusEnum().notNull().default("pending"),
  due_date: timestamp({ withTimezone: true }),
  assigned_to: text().references(() => profilesTable.id),
  createdBy: text().references(() => profilesTable.id),
});

export const jobRelations = relations(jobsTable, ({ one }) => ({
  customer: one(profilesTable, {
    fields: [jobsTable.customer],
    references: [profilesTable.id],
  }),
  vehicle: one(carsTable, {
    fields: [jobsTable.vehicle],
    references: [carsTable.id],
  }),
  organization: one(organizationsTable, {
    fields: [jobsTable.organization],
    references: [organizationsTable.id],
  }),
  service: one(servicesTable, {
    fields: [jobsTable.service],
    references: [servicesTable.id],
  }),
  assigned_to: one(profilesTable, {
    fields: [jobsTable.assigned_to],
    references: [profilesTable.id],
  }),
  createdBy: one(profilesTable, {
    fields: [jobsTable.createdBy],
    references: [profilesTable.id],
  }),
}));

export const servicesTable = pgTable("services", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),
  organization: uuid().references(() => organizationsTable.id),
  title: text().notNull(),
  description: text().notNull(),
  price: numeric().notNull(),
});

export type Job = typeof jobsTable.$inferSelect;
export type NewJob = typeof jobsTable.$inferInsert;

export type Service = typeof servicesTable.$inferSelect;
export type NewService = typeof servicesTable.$inferInsert;

export type Organization = typeof organizationsTable.$inferSelect;
export type NewOrganization = typeof organizationsTable.$inferInsert;

export type Car = typeof carsTable.$inferSelect;
export type NewCar = typeof carsTable.$inferInsert;

export type Profile = typeof profilesTable.$inferSelect;
export type NewProfile = typeof profilesTable.$inferInsert;
