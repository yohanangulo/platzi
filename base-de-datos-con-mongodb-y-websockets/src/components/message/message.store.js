const MessageModel = require('./message.model')

class Store {
  async findById(id) {
    try {
      return await MessageModel.findById(id)
    } catch (e) {
      throw new Error('message not found')
    }
  }

  /**
   *
   * @param {{name: string}} message
   */
  add(message) {
    const myMessage = new MessageModel(message)
    return myMessage.save()
  }

  async list(filterUser) {
    let filter = {}

    if (filterUser) {
      filter.chat = filterUser
    }

    return await MessageModel.find(filter).populate('user').exec()
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
