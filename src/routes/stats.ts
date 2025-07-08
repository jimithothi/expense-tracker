import { Router, Request, Response } from 'express';
import { getTopDays, getMonthlyChange, predictNextMonth } from '../services/stats.service';

const router = Router();

// Query result row interfaces
interface TopDayRow {
  user_id: number;
  date: string;
  total: number;
}
interface MonthlyChangeRow {
  user_id: number;
  month: string;
  total: number;
}

// 1. Top 3 days by expenditure per user
router.get('/top-days', async (_req: Request, res: Response) => {
  try {
    const grouped = await getTopDays();
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top days', details: err instanceof Error ? err.message : err });
  }
});

// 2. % change in total expenditure from previous month per user
router.get('/monthly-change', async (_req: Request, res: Response) => {
  try {
    const changes = await getMonthlyChange();
    res.json(changes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly change', details: err instanceof Error ? err.message : err });
  }
});

// 3. Predict next month's total expenditure (average of last 3 months)
router.get('/predict-next-month', async (_req: Request, res: Response) => {
  try {
    const predictions = await predictNextMonth();
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to predict next month', details: err instanceof Error ? err.message : err });
  }
});

export default router; 