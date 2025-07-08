import { Router } from 'express';
import { userValidationRules } from '../validators/user.validation';
import { createUser } from '../controllers/user.controller';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();

// Add user
router.post('/', userValidationRules, handleValidationErrors, createUser);

export default router; 