const ChatModel = require('./chat.model')

class Store {
  add(chat) {
    console.log(chat)
    const newChat = new ChatModel(chat)

    return newChat.save()
  }

  listUsers(filterUser) {
    const filter = {}

    if (filterUser) {
      filter.users = filterUser
    }

    return ChatModel.find(filter).populate('users').exec()
  }
}

module.exports = new Store()
