const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./message.controller')

router.get('/', async (req, res) => {
  try {
    const { user = null } = req.query

    const messages = await controller.getMessages(user)

    response.success(req, res, messages)
  } catch (error) {
    response.error(req, res, 'algo salio mal', 401, 'detalles')
  }
})

router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body

    const rta = await controller.addMessage(user, message)
    response.success(req, res, rta)
  } catch (error) {
    response.error(req, res, 'algo salio mal', 401, 'detalles')
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { message } = req.body

    if ((!id, !message)) {
      throw new Error('bad request')
    }

    const rta = await controller.updateMessage(id, message)
    response.success(req, res, rta, 200)
  } catch (e) {
    response.error(req, res, e.message, 401, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      throw new Error('bad request')
    }

    const deletedMesage = await controller.deleteMessage(id)

    response.success(req, res, deletedMesage)
  } catch (e) {
    // response.error(req, ros, e.message, 500, e.message)
    response.error(req, res, e.message, 500, e.message)
  }
})

module.exports = router
