import { db, emailVerifications } from '@farm/db';
import { eq } from 'drizzle-orm';
import { TimeSpan, createDate } from 'oslo';
import { generateRandomString, alphabet } from 'oslo/crypto';

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  // Only 1 code per user is relevant. Delete all previous before
  await db
    .delete(emailVerifications)
    .where(eq(emailVerifications.userId, userId));

  const code = generateRandomString(8, alphabet('0-9'));

  await db.insert(emailVerifications).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(15, 'm')),
  });

  return code;
}
