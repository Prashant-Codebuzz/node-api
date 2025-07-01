import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  // secure:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS
  }
});

export const sendOtpEmail = async (otp, email, type,fullname) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `Reset Your Makan Account Password`,
    text: `Hi ${fullname},

We received a request to reset the password for your Makan account. Please use the verification code below to reset your password:

Verification Code: ${otp}

If you didn't request a password reset, please ignore this email or contact our support team for assistance.

Steps to reset your password:

1. Enter the verification code on the password reset page.
2. Follow the instructions to create a new password.

 For your account security, this code will expire in 5 minutes.

Thank you,
The Makan Team`,
  });
  return info.messageId;
};
