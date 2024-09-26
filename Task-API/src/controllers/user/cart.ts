import { Request, Response } from 'express';
import { Product } from '../../models/product.model';
import { ProductDocument } from '../../types/models/product';
import { FilterQuery } from 'mongoose';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';

export async function getMenu(req: Request, res: Response) {
  try {
    const { limit, page, category, query } = req.body;

    const menuQuery: FilterQuery<ProductDocument> = {
      isDeleted: false,
    };
    if (query) {
      menuQuery.$or = [{ name: new RegExp(query, 'gi') }, { description: new RegExp(query, 'gi') }];
    }

    if (category) {
      menuQuery.$or = [{ category: new RegExp(category, 'gi') }];
    }

    const [products, totalCounts] = await Promise.all([
      Product.find(menuQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(menuQuery),
    ]);

    return res.status(200).send({ message: 'Menu fetched successfully', data: { products, totalCounts, totalPages: Math.ceil(totalCounts / limit), currentPage: page, limit } });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function viewCart(req: Request, res: Response) {
  try {
    const { id } = req.user;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const productIds = user.products.map((product) => product.productId);
    const products = await Product.find({ id: { $in: productIds }, isDeleted: false });

    const cartProducts = [];
    for (const product of products) {
      cartProducts.push({
        ...product.toJSON(),
        quantity: user.products.find((p) => p.productId === product.id)?.quantity,
        price: product.price,
      });
    }

    return res.status(200).send({ message: 'Cart fetched successfully', data: cartProducts });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const product = await Product.findOne({ id: productId, isDeleted: false });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const existingProduct = user.products.find((p) => p.productId === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.products.push({ productId, quantity, price: product.price });
    }

    await user.save();

    return res.status(200).send({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const index = user.products.findIndex((p) => p.productId === productId);
    if (index !== -1) {
      user.products.splice(index, 1);
    }

    await user.save();

    return res.status(200).send({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
export async function placeOrder(req: Request, res: Response) {
  try {
    const { id } = req.user;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const productIds = user.products.map((product) => product.productId);
    const products = await Product.find({ id: { $in: productIds }, isDeleted: false });

    const order = await Order.create({
      userId: id,
      products: products.map((product) => ({
        productId: product.id,
        quantity: user.products.find((p) => p.productId === product.id)?.quantity,
        price: product.price,
      })),
      orderAmount: products.reduce((total, product) => total + product.price * (user.products.find((p) => p.productId === product.id)?.quantity || 0), 0),
      orderDate: new Date(),
      status: 'Placed',
    });

    user.products = [];
    await user.save();

    return res.status(200).send({ message: `Your order has been placed successfully with id ${order.id}` });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
