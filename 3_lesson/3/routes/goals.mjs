import { Router } from 'express'
const router = Router()
router.get('/', (req, res) => {
  res.render('goals', { title: 'Goals', goalsArr: ['1 goal', '2 goal', '3 goal', '4 goal'] })
})
export default router
