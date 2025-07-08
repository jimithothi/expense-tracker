// This file contains controller functions for stats routes.
// Handler logic will be moved here from routes/stats.ts 

import { Request, Response } from 'express';
import { getTopDays, getMonthlyChange, predictNextMonth } from '../services/stats.service';

export const getTopDaysController = async (_req: Request, res: Response) => {
  try {
    const grouped = await getTopDays();
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top days', details: err instanceof Error ? err.message : err });
  }
};

export const getMonthlyChangeController = async (_req: Request, res: Response) => {
  try {
    const changes = await getMonthlyChange();
    res.json(changes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly change', details: err instanceof Error ? err.message : err });
  }
};

export const predictNextMonthController = async (_req: Request, res: Response) => {
  try {
    const predictions = await predictNextMonth();
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to predict next month', details: err instanceof Error ? err.message : err });
  }
}; 