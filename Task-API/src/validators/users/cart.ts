import Joi from 'joi';

export const getMenuSchema = Joi.object({
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
  query: Joi.string().optional().messages({
    'string.base': 'Query must be a string',
  }),
});

export const addToCartSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.base': 'Product id must be a string',
    'any.required': 'Product id is required',
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
  }),
});
export const removeFromCartSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.base': 'Product id must be a string',
    'any.required': 'Product id is required',
  }),
});
