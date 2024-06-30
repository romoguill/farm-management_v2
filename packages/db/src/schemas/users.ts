import {
  boolean,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 100 }),
  username: text('username'),
  passwordHash: varchar('password_hash', { length: 60 }),
  googleId: numeric('google_id'),
  emailVerified: boolean('email_verified').default(false),
});
