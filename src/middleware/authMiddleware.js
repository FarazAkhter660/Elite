import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware function to verify JWT token and authenticate user
export const authenticateUser = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID from token to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};
