import express from 'express';

import { getUser,createUser,updateUser,deleteUser } from '../controllers/user.controller';

const router = express.Router();

router.route('/:id').get(getUser);
router.route('/').post(createUser);
router.route('/:id').patch(updateUser);
router.route('/:id').delete(deleteUser);

export default router;
