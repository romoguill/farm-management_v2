import 'dotenv/config';

import { type MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(process.env.DATABASE_URL || '', { max: 1 });
const dbMigrate = (config: string | MigrationConfig): Promise<void> =>
  migrate(drizzle(migrationClient), config);

const queryClient = postgres(process.env.DATABASE_URL || '');
const db = drizzle(queryClient);

export { db, dbMigrate };
