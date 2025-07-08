import pool from '../db';
import { User } from '../types';

export interface InsertResult {
  insertId: number;
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