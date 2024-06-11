import nodemailer from "nodemailer";
import { BASE_DOMAIN, NODE_ENV, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "../config";
import { User } from "../model/user.model";
import Mail from "nodemailer/lib/mailer";
import { convert } from "html-to-text";
import pug from "pug";
import path from "path";

class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            // gmail
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
            logger: NODE_ENV === "development" ? true : false,
            debug: NODE_ENV === "development" ? true : false,
            requireTLS: false,
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
            from: {
                address: SMTP_USER,
                name: BASE_DOMAIN,
            },
            to: user.email,
            subject,
            text: convert(html),
            html,
        };
        return await new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
    async sendVerification(user: User, url: string) {
        return this.send(user, url, "verification", "Подтверждение аккаунта");
    }
    async sendPasswordReset(user: User, url: string) {
        return this.send(user, url, "passwordReset", "Восстановление пароля");
    }
}

export default new MailService();
