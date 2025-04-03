// filepath: c:\Users\SanjayM\Desktop\HARSH  (btech cse)\email app\backend\config\nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Load email from environment variable
    pass: process.env.EMAIL_PASS, // Load password from environment variable
  },
});

// Export the transporter for use in agenda.js
module.exports = transporter;