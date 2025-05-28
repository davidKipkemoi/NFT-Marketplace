const express = require('express');
const router = express.Router();

// Import necessary libraries (will need bcrypt once it's installed)
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import JWT_SECRET from index.js and the authentication middleware
const { JWT_SECRET } = require('../index');
const authenticateToken = require('../middleware/authMiddleware'); // Import authentication middleware

// Dummy user storage (replace with database later)
const users = []; // In-memory array for temporary user storage

// User Registration (Signup) Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body

  // TODO: Basic input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // TODO: Check if user already exists (placeholder for database check)
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // TODO: Hash the password (requires bcrypt)
  // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // TODO: Store user in the database (placeholder for database insertion)
  const newUser = { id: Date.now(), username, password: password }; // Adding a dummy ID and storing plain password temporarily - REPLACE WITH HASHED PASSWORD
  users.push(newUser);

  // Respond with success
  res.status(201).json({ message: 'User registered successfully' });
});

// User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body

  // TODO: Basic input validation
   if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // TODO: Find the user in the database (placeholder for database lookup)
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // TODO: Compare the provided password with the stored password (requires bcrypt.compare)
  // const passwordMatch = await bcrypt.compare(password, user.password);
  // For now, compare plain passwords (TEMPORARY)
  const passwordMatch = password === user.password;

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  // Include user information in the token payload (e.g., user ID, username)
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

  // Respond with the JWT
  res.status(200).json({ token });
});

// Protected route - requires a valid JWT
router.get('/profile', authenticateToken, (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user
  res.status(200).json({ user: req.user, message: 'Protected route accessed successfully' });
});

// TODO: Add other authentication related routes as needed (e.g., logout, get user profile)

module.exports = router; 