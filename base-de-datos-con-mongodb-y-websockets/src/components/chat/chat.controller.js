const store = require('./chat.store')

class Controller {
  addChat(users) {
    if (!users || !Array.isArray(users)) {
      throw new Error('Invalid user list')
    }

    const chat = {
      users,
    }

    return store.add(chat)
  }

  listChats(userId) {
    return store.listUsers(userId)
  }
}

const controller = new Controller()

module.exports = controller
