const store = require('./user.store')

class Controller {
  createUser(name) {
    if (!name) {
      throw new Error('invalid name')
    }

    const user = { name }
    return store.add(user)
  }

  getUsers() {
    return store.list()
  }
}

const controller = new Controller()

module.exports = controller
