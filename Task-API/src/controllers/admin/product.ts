import { Request, Response } from 'express';
import { Product } from '../../models/product.model';
import { FilterQuery } from 'mongoose';
import { ProductDocument } from '../../types/models/product';
export async function addProduct(req: Request, res: Response) {
  try {
    const { name, price, quantityUnit, quantityValue, description, category, isMustTry, isVeg } = req.body;

    const product = await Product.create({
      name,
      price,
      quantityUnit,
      quantityValue,
      description,
      category,
      isMustTry,
      isVeg,
    });
    return res.status(200).send({ message: 'Product created successfully', product });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const { query, limit, page, category } = req.body;

    const productQuery: FilterQuery<ProductDocument> = {
      isDeleted: false,
    };
    if (query) {
      productQuery.$or = [{ name: new RegExp(query, 'gi') }, { description: new RegExp(query, 'gi') }];
    }

    if (category) {
      productQuery.$or = [{ category: new RegExp(category, 'gi') }];
    }
    const products = await Product.find(productQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCounts = await Product.countDocuments(productQuery);
    return res
      .status(200)
      .send({ message: 'Products fetched successfully', data: { products, totalCounts, totalPages: Math.ceil(totalCounts / limit), currentPage: page, limit } });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ id: productId, isDeleted: false });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    return res.status(200).send({ message: 'Product fetched successfully', product });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const { name, price, quantityUnit, quantityValue, description, category, isMustTry, isVeg } = req.body;
    const product = await Product.findOne({ id: productId, isDeleted: false });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    product.name = name;
    product.price = price;
    product.quantityUnit = quantityUnit;
    product.quantityValue = quantityValue;
    product.description = description;
    product.category = category;
    product.isMustTry = isMustTry;
    product.isVeg = isVeg;
    await product.save();
    return res.status(200).send({ message: 'Product updated successfully', product });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ id: productId, isDeleted: false });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    product.isDeleted = true;
    await product.save();
    return res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
