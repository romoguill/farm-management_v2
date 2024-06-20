import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '../client';
import { sessions } from '../schemas/sessions';
import { users } from '../schemas/users';

export const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
