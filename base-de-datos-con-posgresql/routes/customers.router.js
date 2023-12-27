const express = require('express')
const CustomerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema')

const router = express.Router()
const service = new CustomerService()

router.get('/', async (_, res, next) => {
  try {
    const customers = await service.find()

    return res.json(customers)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params

    const customer = await service.findOne(id)

    return res.json(customer)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const data = req.body

    const newCustomer = await service.create(data)

    return res.status(201).json(newCustomer)
  } catch (error) {
    next(error)
  }
})

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body

      const customer = service.update(id, body)

      return res.json(customer)
    } catch (error) {
      next(error)
    }
  },
)

router.delete('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params

    await service.delete(id)

    return res.json(201).send({ id })
  } catch (error) {
    next(error)
  }
})

module.exports = router
