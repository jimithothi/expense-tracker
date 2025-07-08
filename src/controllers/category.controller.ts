import { Request, Response } from 'express';
import { Category } from '../types';
import { addCategory } from '../services/category.service';

/**
 * Creates a new category.
 * @param {Request} req - Express request object containing category data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the new category ID or error message
 */
export const createCategory = async (req: Request, res: Response) => {
  // Extract category name from request body
  const { name } = req.body as Omit<Category, 'id'>;
  try {
    // Call service to add category to the database
    const result = await addCategory({ name });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    // Handle errors and send error response
    res.status(500).json({ error: 'Failed to add category', details: err instanceof Error ? err.message : err });
  }
}; 