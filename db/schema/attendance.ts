import {
  pgTable, uuid, boolean, timestamp, index, unique, check
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { competitions } from './competitions';
import { teams } from './teams';
import { participants } from './participants';
import { profiles } from './profiles';

export const attendance = pgTable('attendance', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id, { onDelete: 'cascade' }), //  Added Cascade
   //optional
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  // mandotory:Attendance is a physical
  participantId: uuid('participant_id').notNull().references(() => participants.id, { onDelete: 'cascade' }),

  isPresent: boolean('is_present').notNull().default(false),

  markedBy: uuid('marked_by')
    .notNull()
    .references(() => profiles.id, { onDelete: 'restrict' }), // Keep history

  markedAt: timestamp('marked_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  // 1. INDEXES (Speed up queries like "Show me everyone present")
  competitionIdx: index('attendance_competition_idx').on(table.competitionId),
  teamIdx: index('attendance_team_idx').on(table.teamId),
  participantIdx: index('attendance_participant_idx').on(table.participantId),

  // 2. UNIQUENESS (Prevent duplicate attendance entries)
  // Logic: "For this competition, this Team can only have ONE attendance row."
  
  competitionParticipantUnique: unique('attendance_competition_participant_unique')
    .on(table.competitionId, table.participantId),

}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  competition: one(competitions, {
    fields: [attendance.competitionId],
    references: [competitions.id],
  }),
  // Added  relations so you can fetch the names easily
  team: one(teams, {
    fields: [attendance.teamId],
    references: [teams.id],
  }),
  participant: one(participants, {
    fields: [attendance.participantId],
    references: [participants.id],
  }),
  markedBy: one(profiles, {
    fields: [attendance.markedBy],
    references: [profiles.id],
  }),
}));