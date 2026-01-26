import {
  pgTable, uuid, json, timestamp, index, unique, check
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { registrationTypeEnum } from './enums';
import { competitions } from './competitions';
import { teams } from './teams';
import { participants } from './participants';
import { profiles } from './profiles';

export const registrations = pgTable('registrations', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id, { onDelete: 'cascade' }),

  teamId: uuid('team_id').references(() => teams.id),
  participantId: uuid('participant_id').references(() => participants.id),

  registeredBy: uuid('registered_by')
    .notNull()
    .references(() => profiles.id),

  registrationType: registrationTypeEnum('registration_type').notNull(),
  submissionData: json('submission_data'),

  registeredAt: timestamp('registered_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({



    //  ADDED INDEXES BACK FOR SPEED
  competitionIdx: index('registrations_competition_idx').on(table.competitionId),
  teamIdx: index('registrations_team_idx').on(table.teamId),
  participantIdx: index('registrations_participant_idx').on(table.participantId),
  registeredByIdx: index('registrations_registered_by_idx').on(table.registeredBy),

  competitionTeamUnique: unique('registrations_competition_team_unique')
    .on(table.competitionId, table.teamId),

  competitionParticipantUnique: unique('registrations_competition_participant_unique')
    .on(table.competitionId, table.participantId),

  registrationCheck: check('registration_logic_check', sql`
    (${table.teamId} IS NOT NULL AND ${table.participantId} IS NULL) OR
    (${table.teamId} IS NULL AND ${table.participantId} IS NOT NULL)
  `),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  competition: one(competitions, {
    fields: [registrations.competitionId],
    references: [competitions.id],
  }),
  team: one(teams, {
    fields: [registrations.teamId],
    references: [teams.id],
  }),
  participant: one(participants, {
    fields: [registrations.participantId],
    references: [participants.id],
  }),
  registeredBy: one(profiles, {
    fields: [registrations.registeredBy],
    references: [profiles.id],
  }),
}));

