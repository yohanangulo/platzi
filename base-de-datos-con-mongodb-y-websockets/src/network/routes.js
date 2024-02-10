const express = require('express')
const message = require('../components/message/message.network')
const user = require('../components/user/user.network')

const routes = app => {
  app.use('/message', message)
  app.use('/user', user)
}

module.exports = routes
