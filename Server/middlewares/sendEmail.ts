import nodemailerConfig from "../configs/nodemailer";
import { SendMailOptions } from "nodemailer";
import path from "path";
import fs from "fs";

type SendEmailProps = {
  recipient: string;
  subject: string;
  message: string;
  file?: {
    filename: string;
    path: string;
  };
};

const sendEmail = async ({ recipient, subject, message, file }: SendEmailProps): Promise<void> => {
  try {
    const mailOptions: SendMailOptions = {
      from: '"Your App Name" <your_email@example.com>',
      to: recipient,
      subject,
      html: message,
    };

    if (file) {
      // Make sure file exists
      if (!fs.existsSync(file.path)) {
        throw new Error(`File not found at path: ${file.path}`);
      }

      mailOptions.attachments = [
        {
          filename: file.filename,
          path: file.path,
        },
      ];
    }

    const info = await nodemailerConfig.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
