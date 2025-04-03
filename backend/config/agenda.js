const Agenda = require('agenda');
const nodemailer = require('./nodemailer'); // Import nodemailer

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MongoDB URI is not defined. Please check your configuration.');
}

const agenda = new Agenda({
  db: {
    address: mongoURI,
    collection: 'agendaJobs',
  },
});

// Define the 'send-email' job
agenda.define('send-email', async (job) => {
  const { email, subject, body } = job.attrs.data;

  console.log(`Sending email to ${email} with subject "${subject}"`);

  try {
    // Use nodemailer to send the email
    await nodemailer.sendMail({
      from: 'iconharsh01@gmail.com', // Replace with your email
      to: email,
      subject: subject,
      text: body,
    });

    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
});

// Ensure agenda is initialized before exporting
const agendaReady = new Promise((resolve, reject) => {
  agenda.on('ready', () => {
    console.log('Agenda connected to MongoDB successfully');
    resolve();
  });

  agenda.on('error', (error) => {
    console.error('Agenda failed to connect to MongoDB:', error);
    reject(error);
  });
});

(async () => {
  try {
    await agenda.start();
    console.log('Agenda started successfully');
  } catch (error) {
    console.error('Failed to start agenda:', error);
  }
})();

module.exports = { agenda, agendaReady };