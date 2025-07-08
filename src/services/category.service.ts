import pool from '../db';
import { Category } from '../types';

export interface InsertResult {
  insertId: number;
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