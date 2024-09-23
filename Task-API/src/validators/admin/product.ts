import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is required',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required',
  }),
  quantityValue: Joi.number().optional().messages({
    'number.base': 'Quantity must be a number',
  }),
  quantityUnit: Joi.string().optional().messages({
    'string.base': 'Quantity must be a string',
  }),
  isMustTry: Joi.boolean().optional().messages({
    'boolean.base': 'Is must try must be a boolean',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),
  isVeg: Joi.boolean().required().messages({
    'boolean.base': 'Is veg must be a boolean',
    'any.required': 'Is veg is required',
  }),
});

export const getProductsSchema = Joi.object({
  query: Joi.string().optional().messages({
    'string.base': 'Query must be a string',
  }),
  limit: Joi.number().required().messages({
    'number.base': 'Limit must be a number',
    'any.required': 'Limit is required',
  }),
  page: Joi.number().required().messages({
    'number.base': 'Page must be a number',
    'any.required': 'Page is required',
  }),
  category: Joi.string().optional().messages({
    'string.base': 'Category must be a string',
  }),
});
export const editProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is required',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required',
  }),
  quantityValue: Joi.number().optional().messages({
    'number.base': 'Quantity must be a number',
  }),
  quantityUnit: Joi.string().optional().messages({
    'string.base': 'Quantity must be a string',
  }),
  isMustTry: Joi.boolean().optional().messages({
    'boolean.base': 'Is must try must be a boolean',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),
  isVeg: Joi.boolean().required().messages({
    'boolean.base': 'Is veg must be a boolean',
    'any.required': 'Is veg is required',
  }),
  productId: Joi.string().required().messages({
    'string.base': 'Product id must be a string',
    'any.required': 'Product id is required',
  }),
});

export const deleteProductSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.base': 'Product id must be a string',
    'any.required': 'Product id is required',
  }),
});

export const getProductByIdSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.base': 'Product id must be a string',
    'any.required': 'Product id is required',
  }),
});
