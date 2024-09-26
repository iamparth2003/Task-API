import { Router } from 'express';
import { validateRequest } from '../../middlewares/validate_request';
import { userLoginSchema } from '../../validators/users/auth';
import { UserLogin } from '../../controllers/user/auth';
import { addToCartSchema, getMenuSchema, removeFromCartSchema } from '../../validators/users/cart';
import { addToCart, getMenu, placeOrder, removeFromCart, viewCart } from '../../controllers/user/cart';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';

const userRouter = Router();

userRouter.post('/login', verifyAuthToken('USER'), validateRequest(userLoginSchema), UserLogin);
userRouter.post('/getMenu', verifyAuthToken('USER'), validateRequest(getMenuSchema), getMenu);
userRouter.get('/viewCart', verifyAuthToken('USER'), viewCart);
userRouter.post('/addToCart', verifyAuthToken('USER'), validateRequest(addToCartSchema), addToCart);
userRouter.put('/removeFromCart', verifyAuthToken('USER'), validateRequest(removeFromCartSchema), removeFromCart);
userRouter.post('/placeOrder', verifyAuthToken('USER'), placeOrder);

export default userRouter;
