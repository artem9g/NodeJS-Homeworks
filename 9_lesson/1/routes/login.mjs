import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' })
})
export default router
