require('dotenv').config(); // Add this line to load environment variables
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
const { agenda, checkMongoConnection } = require('./config/agenda');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000; // Ensure this matches the frontend .env configuration

// Update CORS configuration
const allowedOrigins = [
  process.env.DEPLOYED_FRONTEND_URL, // Deployed frontend URL
  'http://localhost:5173', // Local development URL
  'https://email-app-xi-cyan.vercel.app', // Previous deployed frontend URL
  'https://email-app-git-master-harsh-kumar-mishras-projects.vercel.app', // New deployed frontend URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.options('*', cors()); // Ensure preflight requests are handled

// Add a middleware to log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Remove auth routes
// app.use('/api/auth', authRoutes);

// Remove auth middleware from email routes
app.use('/api/emails', emailRoutes);

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    console.log('Health check endpoint hit');
    const mongoStatus = await checkMongoConnection();
    console.log('MongoDB status:', mongoStatus);
    res.json({ status: 'OK', mongoStatus });
  } catch (error) {
    console.error('Error in /health endpoint:', error.message);
    res.status(500).json({ error: 'Failed to perform health check' });
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  // Start Agenda and connect to MongoDB
  agenda.on('ready', () => {
    console.log('Agenda is ready');
    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`); // Log allowed origins
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
      }
    });
  });

  agenda.on('error', (error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
