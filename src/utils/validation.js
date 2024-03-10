// utils/validation.js

import { body, validationResult } from 'express-validator';

// Validation middleware for user registration
export const validateUserRegistration = [
  body('username').trim().notEmpty()
  .withMessage('Username is required'),
  body('password').trim().notEmpty()
  .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for creating a transaction
export const validateTransaction = [
  body('type').trim().notEmpty()
  .withMessage('Type is required')
  .isIn(['income', 'expense'])
  .withMessage('Invalid type'),
  body('amount').trim().notEmpty()
  .withMessage('Amount is required')
  .isNumeric().withMessage('Amount must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
