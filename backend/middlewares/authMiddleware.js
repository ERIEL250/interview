const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If token is invalid
      res.status(401).json({ message: 'Token is not valid' });
    }
  }

  // If no token was provided
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

// Admin authorization middleware to check if user is an admin
const admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden, admin only' });
  }
  next();
};

module.exports =  protect, admin ;
