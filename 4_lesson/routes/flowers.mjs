import FlowersController from '../controllers/flowersController.mjs'

import { Router } from 'express'

const router = Router()

router.get('/', FlowersController.mainFlowers)

router.get('/create', FlowersController.createForm)

router.get('/:id', FlowersController.flowerDetail)

router.post('/', FlowersController.createFlower)

export default router
