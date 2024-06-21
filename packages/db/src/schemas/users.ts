import { numeric, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 100 }),
  username: text('username'),
  passwordHash: varchar('password_hash', { length: 43 }),
  googleId: numeric('google_id'),
});
