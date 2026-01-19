import {
  pgTable, uuid, index, unique
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { competitions } from './competitions';
import { teams } from './teams';
import { participants } from './participants';

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),

  competitionId: uuid('competition_id')
    .notNull()
    .references(() => competitions.id, { onDelete: 'cascade' }),

  teamId: uuid('team_id')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),

  participantId: uuid('participant_id')
    .notNull()
    .references(() => participants.id, { onDelete: 'cascade' }),
}, (table) => ({
  competitionParticipantUnique: unique('team_members_competition_participant_unique')
    .on(table.competitionId, table.participantId),

    //  2. Speed up looking up "Who is in this team?"
  teamIdx: index('team_members_team_idx').on(table.teamId),
  
  //  3. Speed up looking up "What teams is Ajay in?"
  participantIdx: index('team_members_participant_idx').on(table.participantId)
}));


export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  competition: one(competitions, {
    fields: [teamMembers.competitionId],
    references: [competitions.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  participant: one(participants, {
    fields: [teamMembers.participantId],
    references: [participants.id],
  }),
}));
