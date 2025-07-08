import { body } from 'express-validator';

export const userValidationRules = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('email must be valid'),
  body('status').isString().notEmpty().withMessage('status is required'),
]; 