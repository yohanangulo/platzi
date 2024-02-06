const nodemailer = require('nodemailer')
const { config } = require('./config/config')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: config.mailFromAddress,
    pass: config.mailPassword,
  },
})

async function sendMail() {
  const info = await transporter.sendMail({
    from: 'anguloyohan98@gmail.com',
    to: 'anguloyohan98@gmail.com',
    subject: 'Hello ✔✔✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  })

  console.log('Message sent: %s', info.messageId)
}

sendMail()
