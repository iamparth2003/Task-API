import { Router } from 'express';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';
import { addProduct, deleteProduct, editProduct, getProductById, getProducts } from '../../controllers/admin/product';
import { validateRequest } from '../../middlewares/validate_request';
import { addProductSchema, editProductSchema, getProductByIdSchema, getProductsSchema } from '../../validators/admin/product';

const productRouter = Router();

productRouter.post('/add', verifyAuthToken('ADMIN'), validateRequest(addProductSchema), addProduct);
productRouter.get('/:productId', verifyAuthToken('ADMIN'), validateRequest(getProductByIdSchema), getProductById);
productRouter.put('/edit/:productId', verifyAuthToken('ADMIN'), validateRequest(editProductSchema), editProduct);
productRouter.delete('/delete/:productId', verifyAuthToken('ADMIN'), validateRequest(getProductByIdSchema), deleteProduct);
productRouter.post('/getAll', verifyAuthToken('ADMIN'), validateRequest(getProductsSchema), getProducts);

export default productRouter;
