const express = require('express');
const router = express.Router();

// Removed bcrypt import - Supabase handles password hashing
// const bcrypt = require('bcrypt');
// Removed unused jwt import
// const jwt = require('jsonwebtoken');

// Import JWT_SECRET and supabase client from index.js
const { supabase } = require('../index'); // Import supabase
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
    
    // Create a profile entry for the new user in the 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id }]); // Link profile to auth.users with the user's ID

    if (profileError) {
      console.error('Error creating user profile:', profileError.message);
      // Depending on how critical profile creation is, you might want to delete the user here
      // await supabase.auth.admin.deleteUser(data.user.id);
      return res.status(500).json({ message: 'Error creating user profile', error: profileError.message });
    }

    res.status(201).json({ message: 'User registered successfully', user: data.user, profile: profileData });

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
router.get('/profile', authenticateToken, async (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user

  try {
    // Fetch the user's profile from the 'profiles' table using the user ID from the token
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*') // Select all columns from the profile
      .eq('id', req.user.id) // Filter by the user's ID
      .single(); // Expecting a single profile for a given user ID

    if (error) {
      console.error('Error fetching user profile:', error.message);
      return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }

    if (!profile) {
      // This case should ideally not happen if a profile is created on signup,
      // but it's good to handle it.
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Respond with the user's profile data
    res.status(200).json({ user: req.user, profile });

  } catch (error) {
    console.error('Unexpected error during profile fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add route to update user profile
router.patch('/profile', authenticateToken, async (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user
  const updates = req.body; // Get updates from the request body

  try {
    // Update the user's profile in the 'profiles' table
    const { data, error } = await supabase
      .from('profiles')
      .update(updates) // Apply the updates from the request body
      .eq('id', req.user.id) // Filter by the user's ID
      .select(); // Select the updated row to return

    if (error) {
      console.error('Error updating user profile:', error.message);
      return res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }

    if (!data || data.length === 0) {
       // This might happen if the profile was not found (though unlikely with the current flow)
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Respond with the updated profile data
    res.status(200).json({ message: 'Profile updated successfully', profile: data[0] });

  } catch (error) {
    console.error('Unexpected error during profile update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add route to logout user
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Use Supabase auth.signOut to invalidate the user's session
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out user with Supabase:', error.message);
      return res.status(500).json({ message: 'Error logging out', error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });

  } catch (error) {
    console.error('Unexpected error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: Consider other authentication related tasks if needed

module.exports = router; 