import { Router } from 'express'
import ProductsService from '../services/products.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import * as productSchema from '../schemas/product.schema.js'

const service = new ProductsService()
const router = Router()

router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

/**
 * @get filter
 */
router.get('/filter', (_, res) => {
  res.send('filtering products')
})

/**
 * @get
 */
router.get('/:id', validatorHandler(productSchema.getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params

    const productFound = await service.findOne(id)

    if (!productFound) {
      res.status(404).json({ message: 'not product found' })
    }

    return res.send(productFound)
  } catch (error) {
    next(error)
  }

  // if (id === '999') {
  //   return res.status(404).json({ message: 'not found' })
  // }

  // res.json({
  //   id,
  //   name: 'Monitor',
  //   price: 2000,
  // })
})

/**
 * @post
 */
router.post('/', validatorHandler(productSchema.createProductSchema, 'body'), async (req, res) => {
  const body = req.body

  const newProduct = await service.create(body)

  res.status(200).json({
    message: 'product created sucessfully',
    data: newProduct,
  })
})

/**
 * @patch
 */
router.patch(
  '/:id',
  validatorHandler(productSchema.getProductSchema, 'params'),
  validatorHandler(productSchema.updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = req.body

      const product = await service.update(id, data)

      return res.status(200).json(product)
    } catch (e) {
      next(e)
    }
  },
)

/**
 * @delete
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const deleteProduct = await service.delete(id)

  return res.status(200).json({ id, ...deleteProduct })
})

export default router
