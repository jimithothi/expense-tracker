import { body, query, param } from 'express-validator';

export const expenseValidationRules = [
  body('user_id').isInt().withMessage('user_id must be an integer'),
  body('category').isInt().notEmpty().withMessage('category is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('amount must be a positive number'),
  body('date').isISO8601().withMessage('date must be a valid ISO8601 date'),
  body('description').optional().isString().withMessage('description must be a string'),
];

export const expenseListValidation = [
  query('user_id').optional().isInt().withMessage('user_id must be an integer'),
  query('category').optional().isInt().withMessage('category must be an integer'),
  query('start_date').optional().isISO8601().withMessage('start_date must be a valid date'),
  query('end_date').optional().isISO8601().withMessage('end_date must be a valid date'),
];

export const expenseDeleteValidation = [
  param('id').isInt().withMessage('Expense id must be an integer'),
]; 