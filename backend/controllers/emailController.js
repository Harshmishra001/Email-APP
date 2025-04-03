const { agenda, agendaReady } = require('../config/agenda');

const scheduleEmail = async (req, res) => {
  const { email, subject, body, delay } = req.body;

  console.log('Received email data:', req.body); // Log request data for debugging

  if (!email || !subject || !body || !delay) {
    console.error('Validation error: Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Wait for Agenda to be ready
    await agendaReady;

    const job = await agenda.schedule(delay, 'send-email', { email, subject, body });

    console.log(`Email scheduled: ${job.attrs._id} - ${email} at ${delay}`);

    res.status(200).json({
      message: 'Email scheduled successfully',
      jobId: job.attrs._id,
      email,
      subject,
      delay,
    });
  } catch (error) {
    console.error('Error scheduling email:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to schedule email', 
      details: error.message || 'An unknown error occurred' 
    });
  }
};

module.exports = { scheduleEmail };