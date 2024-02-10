const MessageModel = require('./message.model')

class Store {
  async findById(id) {
    try {
      return await MessageModel.findById(id)
    } catch (e) {
      throw new Error('message not found')
    }
  }

  add(message) {
    const myMessage = new MessageModel(message)
    myMessage.save()
  }

  async list(filterUser) {
    let filter = {}

    if (filterUser) {
      filter.user = filterUser
    }

    const messages = await MessageModel.find(filter)

    return messages
  }

  async updateMessage(id, message) {
    const foundMessage = await this.findById(id)

    foundMessage.message = message
    const updatedMessage = foundMessage.save()
    return updatedMessage
  }

  async deleteMessage(_id) {
    const deletedMessage = await MessageModel.deleteOne({ _id })
    console.log('[deleted]', deletedMessage)

    if (!deletedMessage.deletedCount) {
      throw new Error('message not found')
    }
    return deletedMessage
  }
}

const store = new Store()

module.exports = store
