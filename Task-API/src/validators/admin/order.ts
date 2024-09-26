import Joi from 'joi';

export const getOrdersSchema = Joi.object({
  limit: Joi.number().required().messages({
    'number.base': 'Limit must be a number',
    'any.required': 'Limit is required',
  }),
  page: Joi.number().required().messages({
    'number.base': 'Page must be a number',
    'any.required': 'Page is required',
  }),
});

export const getOrderByIdSchema = Joi.object({
  orderId: Joi.string().required().messages({
    'string.base': 'Order id must be a string',
    'any.required': 'Order id is required',
  }),
});
