import CarController from '../controllers/CarController.mjs'
import UploadManager from '../utils/UploadManager.mjs'

import CarValidator from '../models/carValidator.mjs'
import { checkSchema } from 'express-validator'

import { Router } from 'express'
const router = Router()

router.get('/', CarController.carsList)

router.get('/create', CarController.createForm)
// router.get('/edit/:id', CarController.editForm)

router.get('/:id', CarController.carDetail)

router.post('/create', UploadManager.getUploadStorage().single('prodImg'), checkSchema(CarValidator.carSchema), CarController.createCar)
router.post('/edit/:id', UploadManager.getUploadStorage().single('prodImg'), checkSchema(CarValidator.carSchema), CarController.updateProduct)

router.delete('/', CarController.deleteCar)

export default router
