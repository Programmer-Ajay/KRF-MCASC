import {
  pgTable, uuid, integer, timestamp, index, unique, check
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { competitions } from './competitions';
import { teams } from './teams';
import { participants } from './participants';
import { profiles } from './profiles';

export const results = pgTable('results', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id,{onDelete:'cascade'}),

  teamId: uuid('team_id').references(() => teams.id),
  participantId: uuid('participant_id').references(() => participants.id),

  rank: integer('rank').notNull(),

  declaredBy: uuid('declared_by')
    .notNull()
    .references(() => profiles.id),

  declaredAt: timestamp('declared_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    competitionIdx: index('results_competition_idx').on(table.competitionId),
    // to shared for ties 
//   competitionPositionUnique: unique('results_competition_position_unique')
//     .on(table.competitionId, table.rank),

  resultsCheck: check('results_logic_check', sql`
    (${table.teamId} IS NOT NULL AND ${table.participantId} IS NULL) OR
    (${table.teamId} IS NULL AND ${table.participantId} IS NOT NULL)
  `),
}));

export const resultsRelations = relations(results, ({ one }) => ({
  competition: one(competitions, {
    fields: [results.competitionId],
    references: [competitions.id],
  }),
  team: one(teams, {
    fields: [results.teamId],
    references: [teams.id],
  }),
  participant: one(participants, {
    fields: [results.participantId],
    references: [participants.id],
  }),
  declaredBy:one(profiles,{
    fields:[results.declaredBy],
    references:[profiles.id]
  })
}));
