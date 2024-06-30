import { Resend } from 'resend';

type SendEmailOps = {
  from: string;
  to: string[];
  subject: string;
  code: string;
};

export const sendVerificationEmail = async ({
  from,
  to,
  subject,
  code,
}: SendEmailOps) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirm Email</title>
        </head>
        <body>
          <h1>Welcome to Farm, to complete registration process use this code:</h1>
          <p>${code}</p>
        </body>
        </html>
    `,
  });

  return { error };
};
