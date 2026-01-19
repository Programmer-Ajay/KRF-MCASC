import {
  pgTable, uuid, text, timestamp, index
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { competitions } from './competitions';
import { profiles } from './profiles';

export const gallery = pgTable('gallery', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id),

  mediaUrl: text('media_url').notNull(),

  uploadedBy: uuid('uploaded_by')
    .notNull()
    .references(() => profiles.id),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const galleryRelations = relations(gallery, ({ one }) => ({
  competition: one(competitions, {
    fields: [gallery.competitionId],
    references: [competitions.id],
  }),
}));
