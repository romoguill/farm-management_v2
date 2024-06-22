import 'dotenv/config';

import { type MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as usersSchema from './schemas/users';
import * as sessionsSchema from './schemas/sessions';
import * as emailVerificationsSchema from './schemas/email-verification';

const migrationClient = postgres(process.env.DATABASE_URL || '', { max: 1 });
const dbMigrate = (config: string | MigrationConfig): Promise<void> =>
  migrate(drizzle(migrationClient), config);

const queryClient = postgres(process.env.DATABASE_URL || '', { max: 1 });
const db = drizzle(queryClient, {
  schema: { ...usersSchema, ...sessionsSchema, ...emailVerificationsSchema },
});

export { db, dbMigrate };
