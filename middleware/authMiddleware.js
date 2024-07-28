const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path to your User model

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is correct
      console.log('Decoded Token:', decoded);
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user to request
    const user = await User.findById(decoded.id); // Match the field from the token payload
    console.log('User from Token:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = authMiddleware;



/*Extracted Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTI5ZjZiZjgyM2M2YjYzNDhiZTJiMSIsImlhdCI6MTcyMTkzNjYzNSwiZXhwIjoxNzIxOTQwMjM1fQ.jzNiLS8S8xa01rDRC5oVFl87cUGW9par3JTRNUYJm-0       
Decoded Token: { id: '66a29f6bf823c6b6348be2b1', iat: 1721936635, exp: 1721940235 }        
User from Token: null 66a29f6bf823c6b6348be2b1   
Extracted Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTI5ZjZiZjgyM2M2YjYzNDhiZTJiMSIsImlhdCI6MTcyMTkzNjYzNSwiZXhwIjoxNzIxOTQwMjM1fQ.jzNiLS8S8xa01rDRC5oVFl87cUGW9par3JTRNUYJm-0       
Decoded Token: { id: '66a29f6bf823c6b6348be2b1', iat: 1721936635, exp: 1721940235 }
User from Token: null

*/