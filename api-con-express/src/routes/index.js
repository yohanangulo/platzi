import productsRouter from './products.router.js'
import usersRouter from './users.route.js'
import categoriesRouter from './categories.router.js'
import usersRouterv2 from './users.router.v2.js'
import { Router } from 'express'

export function routerApi(app) {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}

export function routerApiV2(app) {
  const router = Router()

  app.use('/api/v2', router)
  router.use('/users', usersRouterv2)
}
