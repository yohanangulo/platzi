const store = require('./message.store')
const config = require('../../../config/config')
const socket = require('../../socket').socket

class Controller {
  async addMessage(chat, user, message, file) {
    let fileUrl

    console.log(user, message, chat)

    if (!user || !message || !chat) {
      throw new Error('los datos no son validos')
    }

    if (file) {
      fileUrl = `${config.appUrl}/app/uploads/files/${file.filename}`
    } else {
      fileUrl = 'o'
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl,
    }

    const storedMessage = store.add(fullMessage)
    socket.io.emit('message', fullMessage)

    return storedMessage
  }

  getMessages(filterUser) {
    return store.list(filterUser)
  }

  async updateMessage(id, message) {
    const updatedMessage = await store.updateMessage(id, message)
    return updatedMessage
  }

  async deleteMessage(id) {
    return await store.deleteMessage(id)
  }
}

const controller = new Controller()

module.exports = controller
