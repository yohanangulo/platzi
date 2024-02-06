const UserService = require('./user.service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { config } = require('../config/config')

const service = new UserService()

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw boom.unauthorized()
    }

    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    }

    // const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 60 })
    const token = jwt.sign(payload, config.jwtSecret)

    return {
      user,
      token,
    }
  }

  async resetPassword(email) {
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const mail = {
      from: config.mailFromAddress,
      to: `${user.email}`,
      subject: 'Hello ✔✔✔',
      text: `hola ${user.email}`,
      html: '<b>Hello world?</b>',
    }

    await this.sendEmail(mail)
  }

  async sendEmail(mailContent) {
    const transporter = nodemailer.createTransport({
      host: config.mailSmtp,
      port: 587,
      auth: {
        user: config.mailFromAddress,
        pass: config.mailPassword,
      },
    })

    await transporter.sendMail(mailContent)

    return { message: 'Mail sent' }
    // console.log('Message sent: %s', info.messageId)
  }
}

module.exports = AuthService
