import { Resend } from 'resend';

const EMAIL_FROM = `Farm <onboarding@${process.env.HOST}>`;

type VerificationOptions = {
  to: string[];
  code: string;
};

export const sendVerificationEmail = async ({
  to,
  code,
}: VerificationOptions) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: 'Farm: Verification Code',
    html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirm Email</title>
        </head>
        <body>
          <p>Welcome to Farm, to complete registration process use this code:</p>
          <p style="font-style:bold;">${code}</p>
        </body>
        </html>
    `,
  });

  return { error };
};
