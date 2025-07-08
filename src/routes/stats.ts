import { Router } from 'express';
import {
  getTopDaysController,
  getMonthlyChangeController,
  predictNextMonthController,
} from '../controllers/stats.controller';

const router = Router();

// 1. Top 3 days by expenditure per user
router.get('/top-days', getTopDaysController);

// 2. % change in total expenditure from previous month per user
router.get('/monthly-change', getMonthlyChangeController);

// 3. Predict next month's total expenditure (average of last 3 months)
router.get('/predict-next-month', predictNextMonthController);

export default router; 