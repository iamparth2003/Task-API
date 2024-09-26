import { Request, Response } from 'express';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
export async function getOrders(req: Request, res: Response) {
  try {
    const { limit, page } = req.body;

    const [orders, totalCounts] = await Promise.all([
      Order.find({ isDeleted: false })
        .skip((page - 1) * limit)
        .limit(limit),
      Order.countDocuments({ isDeleted: false }),
    ]);

    return res.status(200).send({ message: 'Orders fetched successfully', data: { orders, totalCounts, totalPages: Math.ceil(totalCounts / limit), currentPage: page, limit } });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
export async function getOrderById(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ id: orderId, isDeleted: false });
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    const products = await Product.find({ id: { $in: order.products.map((product) => product.productId) }, isDeleted: false });

    order.products = order.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: products.find((p) => p.id === product.productId)?.price || 0,
      name: products.find((p) => p.id === product.productId)?.name || '',
      description: products.find((p) => p.id === product.productId)?.description || '',
      category: products.find((p) => p.id === product.productId)?.category || '',
      imagePath: products.find((p) => p.id === product.productId)?.imagePath || '',
    }));
    return res.status(200).send({ message: 'Order fetched successfully', order });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
