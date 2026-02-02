import { pgTable,uuid,text,integer,date,time,boolean,timestamp,index } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { competitionTypeEnum,competitionStatusEnum } from "./enums";
import { profiles } from "./profiles";
import { teams } from "./teams";
import { registrations } from "./registrations";

export const competitions =  pgTable('competitions',{
   id:uuid('id').primaryKey().defaultRandom(),
   name:text('name').notNull(),
   type:competitionTypeEnum('type').notNull(),
   maxTeamSize:integer('max_team_size').notNull().default(1),
   minTeamSize:integer('min_team_size').notNull().default(1),
   rules:text('rules'),
   eventDate: date('event_date').notNull(),
  eventTime: time('event_time').notNull(),
  venue: text('venue').notNull(),
  status: competitionStatusEnum('status').notNull().default('open'),
  coordinatorId:uuid('coordinator_id').notNull().references(()=>profiles.id,{onDelete:'restrict'}),
 coordinatorContactNumber: text('coordinator_contact_number').notNull(),
  // lock for attendane and certificate

  isResultDeclacred: boolean('is_result_declared').notNull().default(false),
  areCertificatesIssued: boolean('are_certificates_issued').notNull().default(false),

  coordinatorContactHours: text('coordinator_contact_hours'),

  registrationDeadline: timestamp('registration_deadline', { withTimezone: true }).notNull(),

  isActive: boolean('is_active').notNull().default(true),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  deletedBy: uuid('deleted_by').references(() => profiles.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  coordinatorIdx: index('competitions_coordinator_idx').on(table.coordinatorId),
  statusIdx: index('competitions_status_idx').on(table.status),
}));

export const competitionsRelations=relations(competitions,({one,many})=>({coordinator:one(profiles,{
    fields:[competitions.coordinatorId],
    references:[profiles.id]
}),
teams:many(teams),
registrations:many(registrations)

}))