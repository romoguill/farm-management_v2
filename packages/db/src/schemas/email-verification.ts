import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const emailVerifications = pgTable('email_verifications', {
  id: uuid('id').primaryKey(),
  code: varchar('code', { length: 50 }),
  userId: uuid('user_id').references(() => users.id),
  email: varchar('email', { length: 100 }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
