// This file contains controller functions for user routes.
// Handler logic will be moved here from routes/user.ts 

import { Request, Response } from 'express';
import { User } from '../types';
import { addUser } from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, status } = req.body as Omit<User, 'id'>;
  try {
    const result = await addUser({ name, email, status });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user', details: err instanceof Error ? err.message : err });
  }
}; 