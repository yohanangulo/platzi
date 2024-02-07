const express = require('express')
const passport = require('passport')
const AuthService = require('../services/auth.service')

const router = express.Router()
const authService = new AuthService()

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body
    const rta = await authService.sendRecovery(email)
    res.json(rta)
  } catch (e) {
    next(e)
  }
})

router.post('/login', passport.authenticate('local', { session: false }), async (req, res, next) => {
  try {
    const { user } = req

    const userAndToken = authService.signToken(user)

    res.send(userAndToken)
  } catch (e) {
    next(e)
  }
})

router.post(
  '/change-password',
  // validation layer
  async (req, res, next) => {
    try {
      const { token, password } = req.body
      const rta = await authService.changePassword(token, password)
      res.json(rta)
    } catch (e) {
      next(e)
    }
  },
)

module.exports = router
