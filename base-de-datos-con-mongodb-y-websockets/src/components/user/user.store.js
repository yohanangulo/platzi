const UserModel = require('./user.model')

class Store {
  add(user) {
    const newUser = new UserModel(user)
    return newUser.save()
  }

  list() {
    return UserModel.find()
  }
}

const store = new Store()

module.exports = store
