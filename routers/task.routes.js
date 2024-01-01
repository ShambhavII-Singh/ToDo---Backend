import express from 'express';

import { getTasks,createTask,completeTask,priorityTask,changeCategory,deleteTask } from '../controllers/task.controller';

const router = express.Router();

router.route('/').get(getTasks);
router.route('/').post(createTask);
router.route('/:id').patch(completeTask);
router.route('/:id').patch(priorityTask);
router.route('/:id').patch(changeCategory);
router.route('/:id').delete(deleteTask);

export default router;
