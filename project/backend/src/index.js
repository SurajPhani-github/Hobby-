require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleRegistration } = require('./services/registrationService');
const { registerUser, loginUser } = require('./services/userService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// Registration Routes
app.post('/api/registrations', async (req, res) => {
  try {
    const result = await handleRegistration(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 