import { Lucia } from 'lucia';
import { luciaAdapter } from './lucia-drizzle.adapter';

interface DatabaseUserAttributes {
  google_id: number;
  username: string;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      googleId: attributes.google_id,
      username: attributes.username,
    };
  },
});
