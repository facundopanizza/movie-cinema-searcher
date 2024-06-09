import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
  keywords: string;
  sendgridApiKey: string;
  toEmail: string;
  fromEmail: string;
  cronExpression: string;
}

export const config: IConfig = {
  keywords: process.env.KEYWORDS ?? '',
  sendgridApiKey: process.env.SENDGRID_API_KEY ?? '',
  toEmail: process.env.TO_EMAIL ?? '',
  fromEmail: process.env.FROM_EMAIL ?? '',
  cronExpression: process.env.CRON_EXPRESSION ?? '0 12 * * *',
};
