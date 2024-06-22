import { db, dbMigrate } from './client';
import { luciaAdapter } from './adapters/lucia-drizzle.adapter';
import { type DatabaseUserAttributes, lucia } from './adapters/lucia';
import { users } from './schemas/users';
import { sessions } from './schemas/sessions';
import { emailVerifications } from './schemas/email-verification';

export {
  db,
  dbMigrate,
  luciaAdapter,
  users,
  sessions,
  lucia,
  emailVerifications,
};
export type { DatabaseUserAttributes };
