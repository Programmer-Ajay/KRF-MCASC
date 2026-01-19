import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  index,
  unique,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roleEnum } from './enums';
import { competitions } from './competitions';

/**
 * PROFILES
 * - Table already exists in Supabase
 * - Linked to auth.users via trigger + FK (handled in DB, not Drizzle)
 * - This file is a MIRROR for ORM + relations
 */

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey().notNull(), // auth.users.id

    name: text('name').notNull(),

    email: text('email').notNull(),

    role: roleEnum('role').notNull().default('user'),

    isActive: boolean('is_active').notNull().default(true),

    deletedAt: timestamp('deleted_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    // 🔹 UNIQUE CONSTRAINT
    emailUnique: unique('profiles_email_unique').on(table.email),

    // 🔹 INDEXES (match your SQL exactly)
    emailIdx: index('profiles_email_idx').on(table.email),
    roleIdx: index('profiles_role_idx').on(table.role),
    isActiveIdx: index('profiles_is_active_idx').on(table.isActive),
  })
);

/**
 * ORM RELATIONS (for queries only)
 * These do NOT create DB constraints
 */
export const profilesRelations = relations(profiles, ({ many }) => ({
  coordinatedCompetitions: many(competitions),
}));
