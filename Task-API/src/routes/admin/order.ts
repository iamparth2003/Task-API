import { Router } from 'express';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';
import { validateRequest } from '../../middlewares/validate_request';
import { getOrderByIdSchema, getOrdersSchema } from '../../validators/admin/order';
import { getOrderById, getOrders } from '../../controllers/admin/order';

const orderRouter = Router();

orderRouter.post('/getAllOrders', verifyAuthToken('ADMIN'), validateRequest(getOrdersSchema), getOrders);
orderRouter.get('/getOrderById/:orderId', verifyAuthToken('ADMIN'), validateRequest(getOrderByIdSchema), getOrderById);

export default orderRouter;
