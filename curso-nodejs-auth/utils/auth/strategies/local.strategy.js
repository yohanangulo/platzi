const { Strategy } = require('passport-local')
const AuthService = require('../../../services/auth.service')

const authService = new AuthService()

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await authService.getUser(email, password)

      done(null, user)
    } catch (e) {
      done(e, false)
    }
  },
)

module.exports = LocalStrategy
