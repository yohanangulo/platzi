import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query

  if (!limit || !offset) {
    return res.status(400).send('bad request, but api is working')
  }

  res.json({
    limit,
    offset,
  })
})

export default router
