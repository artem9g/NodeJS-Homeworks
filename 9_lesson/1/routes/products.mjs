import { Router } from 'express'
import ProductController from '../controllers/productController.mjs'

const router = new Router()

router.get('/', ProductController.productsList)

export default router
