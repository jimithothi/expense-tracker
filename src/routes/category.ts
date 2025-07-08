import { Router } from 'express';
import { categoryValidationRules } from '../validators/category.validation';
import { createCategory } from '../controllers/category.controller';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();

// Add category
router.post('/', categoryValidationRules, handleValidationErrors, createCategory);

export default router; 