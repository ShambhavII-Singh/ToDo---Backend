import express from 'express';

import { getAllUsers,getUserbyID,createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserbyID);

export default router;
