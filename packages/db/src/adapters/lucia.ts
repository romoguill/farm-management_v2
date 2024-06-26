import { Lucia } from 'lucia';
import { luciaAdapter } from './lucia-drizzle.adapter';

export interface DatabaseUserAttributes {
  google_id: number;
  username: string;
  email: string;
  email_verified: boolean;
  id: string;
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
      email: attributes.email,
      emailVerified: attributes.email_verified,
      id: attributes.id,
    };
  },
});
