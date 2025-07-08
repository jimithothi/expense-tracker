// This file contains controller functions for category routes.
// Handler logic will be moved here from routes/category.ts 

import { Request, Response } from 'express';
import { Category } from '../types';
import { addCategory } from '../services/category.service';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body as Omit<Category, 'id'>;
  try {
    const result = await addCategory({ name });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add category', details: err instanceof Error ? err.message : err });
  }
}; 