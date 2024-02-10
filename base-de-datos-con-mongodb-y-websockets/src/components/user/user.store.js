const UserModel = require('./user.model')

class Store {
  async add(user) {
    const newUser = new UserModel(user)
    return await newUser.save()
  }
}

const store = new Store()

module.exports = store
