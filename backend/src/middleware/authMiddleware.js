const jwt = require('jsonwebtoken'); // Import jsonwebtoken (needed for now, although we use Supabase session)
const JWT_SECRET = process.env.JWT_SECRET;

// Import supabase client from index.js
// const { supabase } = require('../../index'); // Removed old import
const { supabase } = require('../supabaseClient'); // Import from new file

const authenticateToken = async (req, res, next) => { // Made middleware async
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN" format

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Try to verify as a custom JWT (wallet user)
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (jwtError) {
    // If JWT verification fails, try Supabase session verification (for email/password users)
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = user;
      return next();
    } catch (supabaseError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
};

module.exports = authenticateToken; 