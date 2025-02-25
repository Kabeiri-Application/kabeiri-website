import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase/rls';

export const profilesTable = pgTable('profiles', {
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  username: text().notNull(),
  fullName: text().notNull(),
  avatarUrl: text().notNull(),
  website: text().notNull(),
});

export const organizationsTable = pgTable('organizations', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp({ withTimezone: true }),
  owner: uuid().references(() => authUsers.id),
  businessName: text().notNull(),
  streetAddress: varchar().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
});
