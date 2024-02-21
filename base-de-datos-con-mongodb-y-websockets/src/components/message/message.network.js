const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./message.controller')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './public/uploads/files/',
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(' ', '-')}`),
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
  try {
    const { chat = null } = req.query

    const messages = await controller.getMessages(chat)

    response.success(req, res, messages)
  } catch (error) {
    response.error(req, res, 'algo salio mal', 401, 'detalles')
  }
})

router.post('/', async (req, res) => {
  try {
    // const { file = null } = req
    const { user, message, chat } = req.body
    console.log('👉🏻', user, message, chat)

    const rta = await controller.addMessage(chat, user, message, null)
    response.success(req, res, rta)
  } catch (error) {
    response.error(req, res, 'algo salio mal', 401, error)
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
