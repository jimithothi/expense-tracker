// This file contains controller functions for user routes.
// Handler logic will be moved here from routes/user.ts 
import { Request, Response } from 'express';
import { User } from '../types';
import { addUser } from '../services/user.service';

/**
 * Creates a new user.
 * @param {Request} req - Express request object containing user data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the new user ID or error message
 */
export const createUser = async (req: Request, res: Response) => {
  // Extract user details from request body
  const { name, email, status } = req.body as Omit<User, 'id'>;
  try {
    // Call service to add user to the database
    const result = await addUser({ name, email, status });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    // Handle errors and send error response
    res.status(500).json({ error: 'Failed to add user', details: err instanceof Error ? err.message : err });
  }
}; 