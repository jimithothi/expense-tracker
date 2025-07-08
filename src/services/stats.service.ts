import pool from '../db';

export interface TopDayRow {
  user_id: number;
  date: string;
  total: number;
}
export interface MonthlyChangeRow {
  user_id: number;
  month: string;
  total: number;
}

/**
 * Retrieves the top 3 days by total expenditure for each user.
 * 
 * This function queries the database to group expenses by user and date, 
 * calculates the total expenditure for each day, and orders the results 
 * by user and total expenditure in descending order. It then groups the 
 * results by user and limits each user's results to the top 3 days.
 * 
 * @returns A promise that resolves to a record where each key is a user ID 
 * and the value is an array of the top 3 days by total expenditure for that user.
 */
export async function getTopDays(): Promise<Record<number, TopDayRow[]>> {
  const [rows] = await pool.query(`
    SELECT user_id, date, SUM(amount) as total
    FROM Expenses
    GROUP BY user_id, date
    ORDER BY user_id, total DESC
  `);
  const grouped: Record<number, TopDayRow[]> = {};
  (rows as TopDayRow[]).forEach(row => {
    const userId = Number(row.user_id);
    row.date = new Date(row.date).toISOString().slice(0, 10);
    if (!grouped[userId]) grouped[userId] = [];
    if (grouped[userId].length < 3) grouped[userId].push(row);
  });
  return grouped;
}

/**
 * Calculates the percentage change in total expenditure from the previous month for each user.
 * 
 * This function queries the database to group expenses by user and month, 
 * calculates the total expenditure for each month, and orders the results 
 * by user and month in descending order. It then calculates the percentage 
 * change in total expenditure from the previous month for each user.
 * 
 * @returns A promise that resolves to a record where each key is a user ID 
 * and the value is the percentage change in total expenditure from the previous month, 
 * or null if there is not enough data to calculate the change.
 */
export async function getMonthlyChange(): Promise<Record<number, number | null>> {
  const [rows] = await pool.query(`
    SELECT user_id, DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
    FROM Expenses
    GROUP BY user_id, month
    ORDER BY user_id, month DESC
  `);
  const changes: Record<number, number | null> = {};
  const grouped: Record<number, MonthlyChangeRow[]> = {};
  (rows as MonthlyChangeRow[]).forEach(row => {
    const userId = Number(row.user_id);
    if (!grouped[userId]) grouped[userId] = [];
    grouped[userId].push(row);
  });
  Object.entries(grouped).forEach(([user, arr]) => {
    const userId = Number(user);
    if (arr.length >= 2) {
      const [latest, prev] = arr;
      const change = prev.total === 0 ? null : ((latest.total - prev.total) / prev.total) * 100;
      changes[userId] = change;
    } else {
      changes[userId] = null;
    }
  });
  return changes;
}

/**
 * Predicts the next month's total expenditure for each user based on their historical data.
 * 
 * This function queries the database to group expenses by user and month, 
 * calculates the total expenditure for each month, and orders the results 
 * by user and month in descending order. It then calculates the average 
 * total expenditure for the last 3 months for each user to predict the next month's expenditure.
 * 
 * @returns A promise that resolves to a record where each key is a user ID 
 * and the value is the predicted total expenditure for the next month, or null 
 * if there is not enough data to make a prediction.
 */
export async function predictNextMonth(): Promise<Record<number, number | null>> {
  const [rows] = await pool.query(`
    SELECT user_id, DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
    FROM Expenses
    GROUP BY user_id, month
    ORDER BY user_id, month DESC
  `);
  const predictions: Record<number, number | null> = {};
  const grouped: Record<number, MonthlyChangeRow[]> = {};
  (rows as MonthlyChangeRow[]).forEach(row => {
    const userId = Number(row.user_id);
    if (!grouped[userId]) grouped[userId] = [];
    if (grouped[userId].length < 3) grouped[userId].push(row);
  });
  Object.entries(grouped).forEach(([user, arr]) => {
    const userId = Number(user);
    if (arr.length > 0) {
      const avg = arr.reduce((sum, r) => sum + Number(r.total), 0) / arr.length;
      predictions[userId] = avg;
    } else {
      predictions[userId] = null;
    }
  });
  return predictions;
} 