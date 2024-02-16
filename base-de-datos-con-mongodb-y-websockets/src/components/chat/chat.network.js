const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./chat.controller')

router.post('/', async (req, res) => {
  try {
    const { users } = req.body
    await controller.addChat(users)
    response.success(req, res, 'succes')
  } catch (e) {
    response.error(req, res, e.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const { userId = null } = req.query

    const chatList = await controller.listChats(userId)
    response.success(req, res, chatList)
  } catch (e) {
    response.error(req, res, e.message)
  }
})

module.exports = router
