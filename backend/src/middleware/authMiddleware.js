const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../index');

const authenticateToken = (req, res, next) => {
  // Get token from header, query string, or cookies
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN" format

  if (token == null) {
    // If no token, unauthorized
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // If token is invalid, forbidden
      return res.sendStatus(403); // Forbidden
    }

    // If token is valid, add user information to the request object
    // The user object here is the payload we signed in the login route ({ userId, username })
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken; 