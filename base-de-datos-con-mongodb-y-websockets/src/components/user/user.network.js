const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./user.controller')

router.get('/', async (req, res) => {
  try {
    const rta = await controller.getUsers()
    response.success(req, res, rta)
  } catch (e) {
    response.error(req, res, e.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const rta = await controller.createUser(name)
    response.success(req, res, rta)
  } catch (e) {
    response.error(req, res, e.message)
  }
})

module.exports = router
