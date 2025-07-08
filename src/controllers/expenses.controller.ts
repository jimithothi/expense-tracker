// This file contains controller functions for expenses routes.
// Handler logic will be moved here from routes/expenses.ts 

import { Request, Response } from 'express';
import { Expense } from '../types';
import {
  addExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
} from '../services/expenses.service';

export const createExpense = async (req: Request, res: Response) => {
  const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
  try {
    const result = await addExpense({ user_id, category, amount, date, description });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense', details: err instanceof Error ? err.message : err });
  }
};

export const updateExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, category, amount, date, description } = req.body as Omit<Expense, 'id'>;
  try {
    const result = await updateExpense(Number(id), { user_id, category, amount, date, description });
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense', details: err instanceof Error ? err.message : err });
  }
};

export const deleteExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteExpense(Number(id));
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense', details: err instanceof Error ? err.message : err });
  }
};

export const listExpensesController = async (req: Request, res: Response) => {
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
}; 