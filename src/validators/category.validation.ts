import { body } from 'express-validator';

export const categoryValidationRules = [
  body('name').isString().notEmpty().withMessage('name is required'),
]; 