import ProductsController from '../controllers/ProductsController.mjs'
import UploadManager from '../utils/UploadManager.mjs'

import CarValidator from '../models/carValidator.mjs'
import { checkSchema } from 'express-validator'

import { Router } from 'express'
const router = Router()

router.get('/', ProductsController.mainProducts)

router.get('/create', ProductsController.createForm)
router.get('/edit/:id', ProductsController.editForm)

router.get('/:id', ProductsController.productDetail)

router.post('/create', UploadManager.getUploadStorage().single('prodImg'), checkSchema(CarValidator.carSchema), ProductsController.createProduct)
router.post('/edit/:id', UploadManager.getUploadStorage().single('prodImg'), checkSchema(CarValidator.carSchema), ProductsController.updateProduct)

router.delete('/', ProductsController.deleteProduct)

export default router
