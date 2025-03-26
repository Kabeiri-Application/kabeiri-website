import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase/rls';

export const rolesEnum = pgEnum('role', ['admin', 'owner', 'customer', 'user']);
export const jobStatusEnum = pgEnum('status', [
  'complete',
  'in progress',
  'pending',
]);

export const profilesTable = pgTable('profiles', {
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  username: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  avatarUrl: text().notNull(),
  role: rolesEnum().notNull(),
  organization: uuid().references(() => organizationsTable.id),
  phone: text().notNull(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
});

export const organizationsTable = pgTable('organizations', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  businessName: text().notNull(),
  businessPhotoUrl: text().notNull(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  phone: text().notNull(),
  website: text(),
});

export const carsTable = pgTable('cars', {
  id: uuid().primaryKey().defaultRandom(),
  owner: uuid().references(() => profilesTable.id),
  make: text().notNull(),
  model: text().notNull(),
  year: text().notNull(),
  vin: text().notNull(),
  licensePlate: text().notNull(),
  color: text().notNull(),
});

export const jobsTable = pgTable('jobs', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  customer: uuid().references(() => profilesTable.id),
  vehicle: uuid().references(() => carsTable.id),
  organization: uuid().references(() => organizationsTable.id),
  title: text().notNull(),
  service: uuid().references(() => servicesTable.id),
  description: text().notNull(),
  status: jobStatusEnum().notNull().default('pending'),
  dueDate: timestamp({ withTimezone: true }),
  assignedTo: uuid().references(() => profilesTable.id),
  createdBy: uuid().references(() => profilesTable.id),
});

export const servicesTable = pgTable('services', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  organization: uuid().references(() => organizationsTable.id),
  title: text().notNull(),
  description: text().notNull(),
  price: numeric().notNull(),
});
