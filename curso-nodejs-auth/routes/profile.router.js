const express = require('express')
const passport = require('passport')

const OrderService = require('../services/order.service')

const router = express.Router()
const orderService = new OrderService()

router.get('/my-orders', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { user } = req
    const orders = await orderService.findByUser(user.sub)

    res.json(orders)
  } catch (e) {
    next(e)
  }
})

module.exports = router
