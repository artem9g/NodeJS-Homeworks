import ProductsController from '../controllers/ProductsController.mjs'

import { Router } from 'express'
const router = Router()

router.get('/', ProductsController.mainProducts)
router.get('/create', ProductsController.createForm)
router.get('/edit/:id', ProductsController.editForm)
router.get('/:id', ProductsController.productDetail)

router.delete('/', ProductsController.deleteProduct)

router.post('/', ProductsController.createProduct)

export default router
