import { Router } from 'express'

import ProductController from '../controllers/productController.mjs'
// import ProductValidator from '../validators/productValidator.mjs'
// import {checkSchema} from 'express-validator'

const router = new Router()

router.get('/', (req, res) => {
  res.render('addProduct', { title: 'Add Product' })
})

router.post('/', ProductController.createProduct)

export default router
