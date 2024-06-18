import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from 'src/client';
import { sessions } from 'src/schemas/sessions';
import { users } from 'src/schemas/users';

export const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
