import { Request, Response } from 'express';
import { Expense } from '../types';
import {
  addExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
} from '../services/expenses.service';

/**
 * Creates a new expense.
 * @param {Request} req - Express request object containing expense data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the new expense ID or error message
 */
export const createExpense = async (req: Request, res: Response) => {
  // Extract expense details from request body
  const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
  try {
    // Call service to add expense to the database
    const result = await addExpense({ user_id, category, amount, date, description });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    // Handle errors and send error response
    res.status(500).json({ error: 'Failed to add expense', details: err instanceof Error ? err.message : err });
  }
};

/**
 * Updates an existing expense by ID.
 * @param {Request} req - Express request object containing expense ID in params and updated data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with affected rows or error message
 */
export const updateExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
  try {
    // Call service to update expense in the database
    const result = await updateExpense(Number(id), { user_id, category, amount, date, description });
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense', details: err instanceof Error ? err.message : err });
  }
};

/**
 * Deletes an expense by ID.
 * @param {Request} req - Express request object containing expense ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with affected rows or error message
 */
export const deleteExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Call service to delete expense from the database
    const result = await deleteExpense(Number(id));
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense', details: err instanceof Error ? err.message : err });
  }
};

/**
 * Lists expenses filtered by user, category, and date range.
 * @param {Request} req - Express request object containing query parameters
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with a list of expenses or error message
 */
export const listExpensesController = async (req: Request, res: Response) => {
  const { user_id, category, start_date, end_date } = req.query;
  try {
    // Call service to fetch expenses with optional filters
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
}; 