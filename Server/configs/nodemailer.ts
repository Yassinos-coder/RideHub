import nodemailer from "nodemailer";

const nodemailerConfig = nodemailer.createTransport({
  host: "smtp.example.com", // e.g. smtp.gmail.com
  port: 465, // 587 for TLS, 465 for SSL
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSKEY,
  },
});

export default nodemailerConfig;
