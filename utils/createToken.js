// Import dotenv to load environment variables if needed
require('dotenv').config();

const jwt = require('jsonwebtoken');

// Function to create a JWT token
const createToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret key not found');
  }

  // Create and return the token
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

module.exports = createToken;
