import { db, dbMigrate } from './client';
import { luciaAdapter } from './adapters/lucia-drizzle.adapter';
import { type DatabaseUserAttributes, lucia } from './adapters/lucia';
import { users } from './schemas/users';
import { sessions } from './schemas/sessions';

export { db, dbMigrate, luciaAdapter, users, sessions, lucia };
export type { DatabaseUserAttributes };
