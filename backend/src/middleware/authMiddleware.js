// Removed jsonwebtoken import - using Supabase auth instead
// const jwt = require('jsonwebtoken');
// Removed JWT_SECRET import - not needed with Supabase auth
// const { JWT_SECRET } = require('../index');

// Import supabase client
const { supabase } = require('../index'); // Import supabase

const authenticateToken = async (req, res, next) => { // Made middleware async
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN" format

  if (token == null) {
    // If no token, unauthorized
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Use Supabase auth.getUser to verify the token and get user information
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      // If token is invalid or user not found, forbidden
      console.error('Supabase auth.getUser error:', error?.message);
      return res.sendStatus(403); // Forbidden
    }

    // If token is valid and user found, add user information to the request object
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();

  } catch (error) {
    // Handle unexpected errors during token verification
    console.error('Unexpected error verifying token with Supabase:', error);
    res.sendStatus(500); // Internal server error
  }
};

module.exports = authenticateToken; 