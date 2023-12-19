import express from 'express';

import { getCategories,createCategory,updateCategory,deleteCategory } from '../controllers/category.controller';

const router = express.Router();

router.route('/').get(getCategories);
router.route('/').post(createCategory);
router.route('/:id').patch(updateCategory);
router.route('/:id').delete(deleteCategory);

export default router;
