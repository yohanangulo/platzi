const store = require('./message.store')

class Controller {
  async addMessage(user, message) {
    if (!user || !message) {
      throw new Error('los datos no son validos')
    }

    const fullMessage = {
      user,
      message,
      date: new Date(),
    }

    store.add(fullMessage)

    return fullMessage
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
