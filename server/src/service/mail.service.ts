import nodemailer from "nodemailer";
import {
    API_URL,
    EMAIL_FROM,
    NODE_ENV,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USER,
} from "../config";
import { User } from "../model/user.model";
import Mail from "nodemailer/lib/mailer";
import { convert } from "html-to-text";
import pug from "pug";
import path from "path";

class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: NODE_ENV === "production" ? true : false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
            logger: true,
            debug: true,
        });
    }

    private async send(user: User, url: string, template: string, subject: string) {
        const html = pug.renderFile(
            path.join(__dirname, "..", "email-templates", `${template}.pug`),
            {
                url,
                firstName: user.displayName.split(" ")[0],
                subject,
            }
        );
        const mailOptions: Mail.Options = {
            from: EMAIL_FROM,
            to: user.email,
            subject,
            text: convert(html),
            html,
        };
        return this.transporter.sendMail(mailOptions);
    }

    async sendVerification(user: User, url: string) {
        return this.send(user, url, "verification", "Подтверждение аккаунта");
    }

    async sendPasswordReset(user: User, url: string) {
        return this.send(user, url, "passwordReset", "Восстановление пароля");
    }
}

export default new MailService();
