const jwt = require('jsonwebtoken'); // Import jsonwebtoken (needed for now, although we use Supabase session)

// Import supabase client from index.js
// const { supabase } = require('../../index'); // Removed old import
const { supabase } = require('../supabaseClient'); // Import from new file

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