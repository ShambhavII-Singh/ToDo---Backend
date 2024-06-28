import express from 'express';

import { getCategories,createCategory,updateCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.route('/').get(getCategories);
router.route('/').post(createCategory);
router.route('/:id').patch(updateCategory);

export default router;
