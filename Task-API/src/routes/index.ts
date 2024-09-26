import { Router } from 'express';
import adminRouter from './admin/admin';
import userRouter from './user/user';

const router = Router();

router.use('/admin', adminRouter);
router.use('/user', userRouter);

export default router;
