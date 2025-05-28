const express = require('express');
const router = express.Router();

// Removed bcrypt import - Supabase handles password hashing
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import JWT_SECRET and supabase client from index.js
const { JWT_SECRET, supabase } = require('../index'); // Import supabase
const authenticateToken = require('../middleware/authMiddleware'); // Import authentication middleware

// Removed dummy user storage - using Supabase database instead
// const users = []; // In-memory array for temporary user storage

// User Registration (Signup) Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body; // Use email instead of username for Supabase auth

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Use Supabase auth.signUp to create a new user
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error registering user with Supabase:', error.message);
      // Handle specific Supabase auth errors (e.g., user already exists)
      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
      return res.status(500).json({ message: 'Error registering user', error: error.message });
    }

    // User registered successfully in Supabase auth
    // You might want to send a confirmation email or log them in automatically here
    res.status(201).json({ message: 'User registered successfully', user: data.user });

  } catch (error) {
    console.error('Unexpected error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Use Supabase auth.signInWithPassword to log in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error logging in user with Supabase:', error.message);
      // Handle Supabase auth errors (e.g., invalid credentials)
      return res.status(401).json({ message: 'Invalid credentials', error: error.message });
    }

    // User logged in successfully
    // The session object contains the access token (JWT)
    const token = data.session.access_token; // Get the JWT from the session

    // Respond with the JWT
    res.status(200).json({ token });

  } catch (error) {
    console.error('Unexpected error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route - requires a valid JWT (we might adjust this to use Supabase session later)
router.get('/profile', authenticateToken, (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user
  res.status(200).json({ user: req.user, message: 'Protected route accessed successfully' });
});

// TODO: Add other authentication related routes as needed (e.g., logout, get user profile)

module.exports = router; 