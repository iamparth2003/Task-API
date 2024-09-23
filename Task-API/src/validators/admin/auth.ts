import Joi from 'joi';

export const adminLoginSchema = Joi.object({
  mobileNumber: Joi.number().required().min(1000000000).max(9999999999).messages({
    'number.base': 'Mobile number must be a number',
    'number.max': 'Mobile number must be 10 digits',
    'number.min': 'Mobile number must be 10 digits',
    'any.required': 'Mobile number is required',
  }),
  password: Joi.string().required().min(6).max(20).messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be at most 20 characters long',
  }),
});
