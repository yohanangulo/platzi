const Joi = require('joi')
const { createUserSchema } = require('./user.schema')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const lastName = Joi.string().min(3).max(15)
const phone = Joi.string()
const userId = Joi.number().integer()

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
})

const getCustomerSchema = Joi.object({
  id: id.required(),
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
})

module.exports = { createCustomerSchema, getCustomerSchema, updateCustomerSchema }
