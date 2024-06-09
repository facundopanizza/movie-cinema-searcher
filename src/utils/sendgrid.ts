import sgMail from '@sendgrid/mail';
import { config } from '../config';

export class Sendgrid {
  constructor() {
    sgMail.setApiKey(config.sendgridApiKey);
  }

  async sendEmail(subject: string, html: string): Promise<void> {
    await sgMail.send({
      to: config.toEmail,
      from: config.fromEmail,
      subject,
      html,
    });
  }
}
