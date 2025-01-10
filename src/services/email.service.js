// src/services/email.service.js
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

// Create the transporter object using the SMTP configuration from the config file
const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
// Verify the connection to the email server (only in non-test environments)
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((error) => {
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env');
      logger.error(error);
    });
}

/**
 * Send an email
 * @param {string} to - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text content of the email
 * @returns {Promise} - Resolves when the email is sent
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };

  try {
    await transport.sendMail(msg);
    logger.info(`Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
    throw new Error('Error sending email');
  }
};

/**
 * Send reset password email
 * @param {string} to - The recipient's email address
 * @param {string} token - The password reset token
 * @returns {Promise} - Resolves when the reset password email is sent
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;  // Adjust URL based on actual front-end routing
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, please ignore this email.`;

  console.log('Sending reset password email to:', to);
  
  // Call sendEmail function to send the actual email
  await sendEmail(to, subject, text);
  console.log('Password reset email sent');
};

/**
 * Send email verification email
 * @param {string} to - The recipient's email address
 * @param {string} token - The email verification token
 * @returns {Promise} - Resolves when the verification email is sent
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;  // Adjust URL based on actual front-end routing
  const text = `Dear user,
  To verify your email, click on this link: ${verificationUrl}
  If you did not create an account, please ignore this email.`;

  // Call sendEmail function to send the actual email
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
