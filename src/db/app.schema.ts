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

import { organization, user } from "@/db/auth.schema";

export const rolesEnum = pgEnum("role", ["admin", "owner", "user"]);
export const jobStatusEnum = pgEnum("status", [
  "complete",
  "in progress",
  "pending",
]);
// export const jobPriorityEnum = pgEnum("priority", ["low", "medium", "high"]);

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
  organization: text().references(() => organization.id),
  phone: text().notNull(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
});

export const customersTable = pgTable("customers", {
  id: text().primaryKey(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  organization: text().references(() => organization.id),
  phoneNumber: text().notNull(),
  email: text(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
});

export const carsTable = pgTable("cars", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  deletedAt: timestamp({ withTimezone: true }),
  owner: uuid().references(() => customersTable.id),
  make: text().notNull(),
  model: text().notNull(),
  year: text().notNull(),
  vin: text().notNull(),
  licensePlate: text().notNull(),
  color: text().notNull(),
  miles: numeric(),
});

export const jobsTable = pgTable("jobs", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),
  customer: uuid().references(() => customersTable.id),
  vehicle: uuid().references(() => carsTable.id),
  organization: text().references(() => organization.id),
  title: text().notNull(),
  service: uuid().references(() => servicesTable.id),
  description: text().notNull(),
  status: jobStatusEnum().notNull().default("pending"),
  due_date: timestamp({ withTimezone: true }),
  assigned_to: text().references(() => profilesTable.id),
  createdBy: text().references(() => profilesTable.id),
});

export const jobRelations = relations(jobsTable, ({ one }) => ({
  customer: one(customersTable, {
    fields: [jobsTable.customer],
    references: [customersTable.id],
  }),
  vehicle: one(carsTable, {
    fields: [jobsTable.vehicle],
    references: [carsTable.id],
  }),
  organization: one(organization, {
    fields: [jobsTable.organization],
    references: [organization.id],
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
  organization: text().references(() => organization.id),
  title: text().notNull(),
  description: text().notNull(),
  price: numeric().notNull(),
});

export type Job = typeof jobsTable.$inferSelect;
export type NewJob = typeof jobsTable.$inferInsert;

export type Service = typeof servicesTable.$inferSelect;
export type NewService = typeof servicesTable.$inferInsert;

export type Organization = typeof organization.$inferSelect;
export type NewOrganization = typeof organization.$inferInsert;

export type Car = typeof carsTable.$inferSelect;
export type NewCar = typeof carsTable.$inferInsert;

export type Profile = typeof profilesTable.$inferSelect;
export type NewProfile = typeof profilesTable.$inferInsert;

export type Customer = typeof customersTable.$inferSelect;
export type NewCustomer = typeof customersTable.$inferInsert;
