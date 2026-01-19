import { pgEnum, PgEnum } from "drizzle-orm/pg-core";

export const roleEnum= pgEnum("role",['admin','user','coordinator']);

export const competitionTypeEnum= pgEnum("competition_type",['solo','team']);
export const genderEnum=pgEnum("gender",['male','female','other']);
export const registrationTypeEnum=pgEnum("registration_type",['solo','team']);
export const certificateTypeEnum=pgEnum("certificate_type",['participation','winner']);
export const participantsCategoryEnum=pgEnum("participant_category",['ug','pg','junior college']);
export const competitionStatusEnum=pgEnum("competition_status",['postponed','open','closed','ongoing','completed','cancelled']);
