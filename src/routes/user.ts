import { Router, Request, Response } from 'express';
import { User } from '../types';
import { addUser } from '../services/user.service';
import { userValidationRules } from '../validators/user.validation';
import { validationResult } from 'express-validator';

const router = Router();

// Add user
router.post('/', userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, status } = req.body as Omit<User, 'id'>;
  try {
    const result = await addUser({ name, email, status });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user', details: err instanceof Error ? err.message : err });
  }
});

export default router; 