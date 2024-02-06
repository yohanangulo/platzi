require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailFromAddress: process.env.MAIL_FROM_ADDRESS,
  mailPassword: process.env.MAIL_PASSWORD,
  mailSmtp: process.env.MAIL_SMTP,
}

module.exports = { config }
