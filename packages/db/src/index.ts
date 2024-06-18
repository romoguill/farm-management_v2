import 'dotenv/config';

import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { type MigrationConfig } from 'drizzle-orm/migrator';

const migrationClient = postgres(process.env.DATABASE_URL || '', { max: 1 });
const dbMigrate = (config: string | MigrationConfig) =>
  migrate(drizzle(migrationClient), config);

const queryClient = postgres(process.env.DATABASE_URL || '');
const db = drizzle(queryClient);

export { db, dbMigrate };
