import {
  pgTable, uuid, timestamp, index, check,unique
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { certificateTypeEnum } from './enums';
import { competitions } from './competitions';
import { teams } from './teams';
import { participants } from './participants';
import { profiles } from './profiles';

export const certificates = pgTable('certificates', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id,{onDelete:'cascade'}),

  teamId: uuid('team_id').references(() => teams.id,{onDelete:'cascade'}),
  participantId: uuid('participant_id').references(() => participants.id,{onDelete:'cascade'}),

  certificateType: certificateTypeEnum('certificate_type').notNull(),

  issuedBy: uuid('issued_by')
    .notNull()
    .references(() => profiles.id),

  issuedAt: timestamp('issued_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
      
    //  1. INDEXES (Fast lookup for "My Certificates")
  participantIdx: index('certificates_participant_idx').on(table.participantId),
  teamIdx: index('certificates_team_idx').on(table.teamId),

// 
// 2. UNIQUENESS (Prevent duplicate issuance)
  // A person can only get ONE "Winner" cert and ONE "Participation" cert per event.
  uniqueParticipantCert: unique('unique_participant_cert')
    .on(table.competitionId, table.participantId, table.certificateType),

  uniqueTeamCert: unique('unique_team_cert')
    .on(table.competitionId, table.teamId, table.certificateType),


  certificatesCheck: check('certificates_logic_check', sql`
    (${table.teamId} IS NOT NULL AND ${table.participantId} IS NULL) OR
    (${table.teamId} IS NULL AND ${table.participantId} IS NOT NULL)
  `),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  competition: one(competitions, {
    fields: [certificates.competitionId],
    references: [competitions.id],
  }),
  team:one(teams,{
    fields:[certificates.teamId],
    references:[teams.id]
    }),
    participant: one(participants, {
    fields: [certificates.participantId],
    references: [participants.id],
  }),
  issuedBy: one(profiles, {
    fields: [certificates.issuedBy],
    references: [profiles.id],
  }),
}));
