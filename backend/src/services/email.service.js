// src/services/email.service.js
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

// Create transporter
const transport = nodemailer.createTransport(config.email.smtp);

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((error) => {
      logger.warn('Unable to connect to email server. Check SMTP configuration.');
      logger.error(error);
    });
}

const sendEmail = async (to, subject, text, html = '') => {
  const msg = { from: config.email.from, to, subject, text, html };
  try {
    const info = await transport.sendMail(msg);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
    throw new Error('Error sending email');
  }
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset your password';
  const resetPasswordUrl = `http://localhost:3000/v1/auth/reset-password?token=${token}`;
  
  const text = `Dear user,\n\nTo reset your password, click on this link: ${resetPasswordUrl}\nIf you did not request any password resets, please ignore this email.`;
  
  // HTML version of the email for clickable link
  const html = `
    <p>Dear user,</p>
    <p>To reset your password, click on the link below:</p>
    <a href="${resetPasswordUrl}" target="_blank">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
  `;

  // Send the email with both text and HTML versions
  const info = await sendEmail(to, subject, text, html);
  console.log('Email response:', info); // Log the email response
};

/*
 * Send email verification email
 * @param {string} to - The recipient's email address
 * @param {string} token - The email verification token
 * @returns {Promise} - Resolves when the verification email is sent
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;  // Adjust URL based on actual front-end routing
  
  const text = `Dear user,\n\nTo verify your email, click on this link: ${verificationUrl}\nIf you did not create an account, please ignore this email.`;
  
  // HTML version of the verification email
  const html = `
    <p>Dear user,</p>
    <p>To verify your email, click on the link below:</p>
    <a href="${verificationUrl}" target="_blank">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
  `;

  // Call sendEmail function to send the actual email
  await sendEmail(to, subject, text, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
