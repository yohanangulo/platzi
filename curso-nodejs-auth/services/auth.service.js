const UserService = require('./user.service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { config } = require('../config/config')

const userService = new UserService()

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email)

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

  async sendRecovery(email) {
    const user = await userService.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const payload = {
      sub: user.id,
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })

    const link = `http://myfrontend.com/recovery?token=${token}`

    await userService.update(user.id, {
      recoveryToken: token,
    })

    const mail = {
      from: config.mailFromAddress,
      to: `${user.email}`,
      subject: 'Email para receperar contraseña',
      html: `<b>Ingrsesa al siguiente link para reestablecer tu contraseña: ${link}</b>`,
    }

    const rta = await this.sendEmail(mail)

    return rta
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
