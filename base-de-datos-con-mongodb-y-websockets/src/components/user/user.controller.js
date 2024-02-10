const store = require('./user.store')

class Controller {
  async createUser(name) {
    if (!name) {
      throw new Error('invalid name')
    }

    const user = { name }
    return await store.add(user)
  }
}

const controller = new Controller()

module.exports = controller
