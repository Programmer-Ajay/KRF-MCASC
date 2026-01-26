import {
  pgTable, uuid, text, boolean, timestamp, index
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { genderEnum,participantsCategoryEnum } from './enums';
import { profiles } from './profiles';
import { teamMembers } from './team-members';
import { registrations } from './registrations';
import { attendance } from './attendance';
export const participants = pgTable('participants', {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id').references(() => profiles.id, { onDelete: 'set null' }), // nullable
    fullName: text('full_name').notNull(),
     email: text('email').notNull().unique(),
  mobileNo: text('mobile_no').notNull(),
  gender: genderEnum('gender').notNull(),

  guardianMobile: text('guardian_mobile'),
  collegeName: text('college_name').notNull(),
  courseName: text('course_name').notNull(),
  class: text('class').notNull(),
  category: participantsCategoryEnum('participants_category').notNull(),
  status: text('status'),

  isActive: boolean('is_active').notNull().default(true),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  deletedBy: uuid('deleted_by').references(() => profiles.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
},(table)=>({
    emailIdx:index('participants_email_idx').on(table.email),

}));

export const participantsRelations=relations(participants,({one,many})=>({
    profile:one(profiles,{
        fields:[participants.profileId],
        references:[profiles.id]
    }),
    registrations: many(registrations),
    teamMemberships:many(teamMembers),

    // attendance for fetching the attendance
    attendances:many(attendance),
}))