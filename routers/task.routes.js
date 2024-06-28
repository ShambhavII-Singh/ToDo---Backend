import express from 'express';

import { getTasks,createTask,completeTask,priorityTask,updateTask,deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.route('/').get(getTasks);

router.route('/').post(createTask);

router.route('/:id/status').patch(completeTask);
router.route('/:id/priority').patch(priorityTask);
router.route('/:id').patch(updateTask);

router.route('/:id').delete(deleteTask);

export default router;
