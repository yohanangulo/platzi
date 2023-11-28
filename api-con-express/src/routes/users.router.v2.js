import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  return res.send('v2 users')
})

export default router
