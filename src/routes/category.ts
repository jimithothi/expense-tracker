import { Router, Request, Response } from 'express';
import { Category } from '../types';
import { addCategory } from '../services/category.service';
import { categoryValidationRules } from '../validators/category.validation';
import { validationResult } from 'express-validator';

const router = Router();

// Add category
router.post('/', categoryValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body as Omit<Category, 'id'>;
  try {
    const result = await addCategory({ name });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add category', details: err instanceof Error ? err.message : err });
  }
});

export default router; 