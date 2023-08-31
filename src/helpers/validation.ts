import { check, ValidationChain } from 'express-validator';

export const signUpValidation: ValidationChain[] = [
  check('name', 'Name is required').not().isEmpty(),
  check('role', 'Role is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password is required').isLength({ min: 6 }),
];

export const loginValidation: ValidationChain[] = [
  check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];
