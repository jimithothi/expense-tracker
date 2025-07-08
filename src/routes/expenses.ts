import { Router, Request, Response } from 'express';
import { validationResult, query, param } from 'express-validator';
import { Expense, User, Category } from '../types';
import { expenseValidationRules, expenseListValidation, expenseDeleteValidation } from '../validators/expense.validation';
import {
  addExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
  addUser as serviceAddUser,
  addCategory as serviceAddCategory,
} from '../services/expenses.service';

const router = Router();

// Add expense
router.post(
  '/',
  expenseValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
    try {
      const result = await addExpense({ user_id, category, amount, date, description });
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add expense', details: err instanceof Error ? err.message : err });
    }
  }
);

// Update expense
router.put(
  '/:id',
  expenseValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
    try {
      const result = await updateExpense(Number(id), { user_id, category, amount, date, description });
      res.json({ affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update expense', details: err instanceof Error ? err.message : err });
    }
  }
);

// Delete expense
router.delete(
  '/:id',
  expenseDeleteValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    try {
      const result = await deleteExpense(Number(id));
      res.json({ affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete expense', details: err instanceof Error ? err.message : err });
    }
  }
);

// List expenses with optional filters
router.get(
  '/',
  expenseListValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, category, start_date, end_date } = req.query;
    try {
      const expenses = await listExpenses({
        user_id: user_id ? Number(user_id) : undefined,
        category: category ? Number(category) : undefined,
        start_date: start_date ? String(start_date) : undefined,
        end_date: end_date ? String(end_date) : undefined,
      });
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch expenses', details: err instanceof Error ? err.message : err });
    }
  }
);

export default router; 