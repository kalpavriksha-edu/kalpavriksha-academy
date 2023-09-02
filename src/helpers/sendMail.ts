import nodemailer from 'nodemailer';
import {SMTP_CONFIG} from '../config/dbConfig'; 

class MailSender {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: SMTP_CONFIG.SMTP_MAIL,
        pass: SMTP_CONFIG.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(email: string, mailSubject: string, content: string) {
    try {
      const mailOptions = {
        from: SMTP_CONFIG.SMTP_MAIL,
        to: email,
        subject: mailSubject,
        html: content,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Mail sent successfully', info.response);
    } catch (error) {
      console.log(error.message);
    }
  }
}

const mailSender = new MailSender();

export default mailSender;
