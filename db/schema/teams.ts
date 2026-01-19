import  { pgTable,uuid, text, boolean, timestamp, index ,unique} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';
import { competitions } from './competitions';
import { profiles } from './profiles';
import { teamMembers } from './team-members';
export const teams= pgTable('teams',{
    id:uuid('id').primaryKey().defaultRandom(),
    competitionId:uuid('competition_id').notNull().references(()=>competitions.id,{onDelete:'cascade'}),
    teamName:text('team_name').notNull(),
    leaderProfileId:uuid('leader_profile_id').notNull().references(()=>profiles.id,{onDelete:'restrict'}),
      isActive: boolean('is_active').notNull().default(true),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  deletedBy: uuid('deleted_by').references(() => profiles.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
},(table)=>({
competitionTeamUnique:unique('competition_team_unique').on(table.competitionId,table.teamName),
}));

export const teamRelations=relations(teams,({one,many})=>({
    competition:one(competitions,{
        fields:[teams.competitionId],
        references:[competitions.id]
    }),
    leader:one(profiles,{
        fields:[teams.leaderProfileId],
        references:[profiles.id]
    }),
    members:many(teamMembers),
}))
