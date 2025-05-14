// src/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model for authentication

// Middleware to verify the JWT token
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and extract the user info (e.g., user ID)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data (e.g., user ID) to the request object for later use
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports =  verifyToken ;
