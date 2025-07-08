import { Router } from 'express';
import { expenseValidationRules, expenseListValidation, expenseDeleteValidation } from '../validators/expense.validation';
import {
  createExpense,
  updateExpenseController,
  deleteExpenseController,
  listExpensesController,
} from '../controllers/expenses.controller';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();

// Add expense
router.post('/', expenseValidationRules, handleValidationErrors, createExpense);

// Update expense
router.put('/:id', expenseValidationRules, handleValidationErrors, updateExpenseController);

// Delete expense
router.delete('/:id', expenseDeleteValidation, handleValidationErrors, deleteExpenseController);

// List expenses with optional filters
router.get('/', expenseListValidation, handleValidationErrors, listExpensesController);

export default router; 