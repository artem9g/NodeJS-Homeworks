import { Router } from 'express'
const router = Router()
router.get('/', (req, res) => {
  res.render('about', { title: 'Розробити програму з такими функціональними можливостями:' })
})
export default router
