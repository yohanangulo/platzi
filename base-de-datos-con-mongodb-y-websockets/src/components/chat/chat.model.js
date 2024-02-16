const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
  users: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
})

module.exports = mongoose.model('Chat', chatSchema)
