// This file contains controller functions for stats routes.
// Handler logic will be moved here from routes/stats.ts 
import { Request, Response } from 'express';
import { getTopDays, getMonthlyChange, predictNextMonth } from '../services/stats.service';

/**
 * Gets the days with the highest expenses.
 * @param {Request} _req - Express request object (unused)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with grouped top days or error message
 */
export const getTopDaysController = async (_req: Request, res: Response) => {
  try {
    // Call service to get top days by expenses
    const grouped = await getTopDays();
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top days', details: err instanceof Error ? err.message : err });
  }
};

/**
 * Gets the monthly change in expenses.
 * @param {Request} _req - Express request object (unused)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with monthly change data or error message
 */
export const getMonthlyChangeController = async (_req: Request, res: Response) => {
  try {
    // Call service to get monthly change in expenses
    const changes = await getMonthlyChange();
    res.json(changes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly change', details: err instanceof Error ? err.message : err });
  }
};

/**
 * Predicts expenses for the next month.
 * @param {Request} _req - Express request object (unused)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with predictions or error message
 */
export const predictNextMonthController = async (_req: Request, res: Response) => {
  try {
    // Call service to predict next month's expenses
    const predictions = await predictNextMonth();
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to predict next month', details: err instanceof Error ? err.message : err });
  }
}; 