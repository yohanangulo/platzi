const store = require('./message.store')
const config = require('../../../config/config')

class Controller {
  async addMessage(chat, user, message, file) {
    let fileUrl

    if (!user || !message || !chat) {
      throw new Error('los datos no son validos')
    }

    if (file) {
      fileUrl = `${config.appUrl}/app/uploads/files/${file.filename}`
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl,
    }

    return store.add(fullMessage)
  }

  async getMessages(filterUser) {
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
