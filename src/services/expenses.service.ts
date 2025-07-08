import pool from '../db';
import { Expense, User, Category } from '../types';

export interface InsertResult {
  insertId: number;
}
export interface UpdateDeleteResult {
  affectedRows: number;
}

/**
 * Adds a new expense to the database.
 * 
 * @param expense - The expense to be added, excluding the 'id' property.
 * @returns A promise that resolves to an object containing the insertId of the newly added expense.
 */
export async function addExpense(expense: Omit<Expense, 'id'>): Promise<InsertResult> {
  const { user_id, category, amount, date, description } = expense;
  const [result] = await pool.execute(
    'INSERT INTO Expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
    [user_id, category, amount, date, description]
  );
  return { insertId: (result as InsertResult).insertId };
}

/**
 * Updates an existing expense in the database.
 * 
 * @param id - The id of the expense to be updated.
 * @param expense - The updated expense details, excluding the 'id' property.
 * @returns A promise that resolves to an object containing the number of affected rows.
 */
export async function updateExpense(id: number, expense: Omit<Expense, 'id'>): Promise<UpdateDeleteResult> {
  const { user_id, category, amount, date, description } = expense;
  const [result] = await pool.execute(
    'UPDATE Expenses SET user_id=?, category=?, amount=?, date=?, description=? WHERE id=?',
    [user_id, category, amount, date, description, id]
  );
  return { affectedRows: (result as UpdateDeleteResult).affectedRows };
}

/**
 * Deletes an expense from the database.
 * 
 * @param id - The id of the expense to be deleted.
 * @returns A promise that resolves to an object containing the number of affected rows.
 */
export async function deleteExpense(id: number): Promise<UpdateDeleteResult> {
  const [result] = await pool.execute('DELETE FROM Expenses WHERE id=?', [id]);
  return { affectedRows: (result as UpdateDeleteResult).affectedRows };
}

/**
 * Lists expenses from the database based on provided filters.
 * 
 * @param filters - An object containing optional filters for user_id, category, start_date, and end_date.
 * @returns A promise that resolves to an array of Expense objects.
 */
export async function listExpenses(filters: {
  user_id?: number;
  category?: number;
  start_date?: string;
  end_date?: string;
}): Promise<Expense[]> {
  let query = 'SELECT * FROM Expenses WHERE 1=1';
  const params: (string | number)[] = [];
  if (filters.user_id) {
    query += ' AND user_id = ?';
    params.push(filters.user_id);
  }
  if (filters.category) {
    query += ' AND category = ?';
    params.push(filters.category);
  }
  if (filters.start_date) {
    query += ' AND date >= ?';
    params.push(filters.start_date);
  }
  if (filters.end_date) {
    query += ' AND date <= ?';
    params.push(filters.end_date);
  }
  const [rows] = await pool.execute(query, params);
  return rows as Expense[];
}

/**
 * Adds a new user to the database.
 * 
 * @param user - The user to be added, excluding the 'id' property.
 * @returns A promise that resolves to an object containing the insertId of the newly added user.
 */
export async function addUser(user: Omit<User, 'id'>): Promise<InsertResult> {
  const { name, email, status } = user;
  const [result] = await pool.execute(
    'INSERT INTO Users (name, email, status) VALUES (?, ?, ?)',
    [name, email, status]
  );
  return { insertId: (result as InsertResult).insertId };
}

/**
 * Adds a new category to the database.
 * 
 * @param category - The category to be added, excluding the 'id' property.
 * @returns A promise that resolves to an object containing the insertId of the newly added category.
 */
export async function addCategory(category: Omit<Category, 'id'>): Promise<InsertResult> {
  const { name } = category;
  const [result] = await pool.execute(
    'INSERT INTO Categories (name) VALUES (?)',
    [name]
  );
  return { insertId: (result as InsertResult).insertId };
} 