import AboutController from '../controllers/AboutController.mjs'

import { Router } from 'express'
const router = Router()

router.get('/', AboutController.info)

export default router
