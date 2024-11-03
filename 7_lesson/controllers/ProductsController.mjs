import { error, log } from 'console'
import Car from '../models/Car.mjs'
import dataFileManager from '../utils/DataFileManager.mjs'
import fs from 'fs'
import path from 'path'

import { validationResult } from 'express-validator'

class ProductsController {
  static mainProducts(req, res) {
    const productsList = Car.loadCarsList()
    res.render('cars/carsList', {
      products: productsList,
    })
  }

  static productDetail(req, res) {
    const id = req.params.id
    console.log(id)
    //отримати об"єкт продукта за id
    const product = Car.getCarById(id)
    //відредерити сторінку з інформацією про товар
    res.render('cars/carDetail', {
      product,
    })
  }
  static createForm(req, res) {
    //відредерити сторінку з формою
    res.render('cars/carForm', {
      product: null,
      errors: null,
      // errors: [],
    })
  }

  static editForm(req, res) {
    const id = req.params.id
    //отримати об"єкт продукта за id
    const product = Car.getCarById(id)
    //відредерити сторінку з формою
    res.render('cars/carForm', {
      product,
      errors: null,
      // errors: [],
    })
  }

  static createProduct(req, res) {
    const productData = req.body
    const errors = validationResult(req)

    console.log('=====>>> errors')
    console.log(errors)

    if (!errors.isEmpty()) {
      if (req.params.id) productData.id = req.params.id
      return res.status(400).render('cars/carForm', {
        errors: errors.array(),
        product: productData,
      })
    }
    try {
      productData.imgSrc = `/${req.file.filename}`
    } catch (error) {
      console.log(error)
    }
    Car.addNewCar(productData)
    res.redirect('/cars')
  }

  static updateProduct(req, res) {
    // const productData = req.body
    // if (req.file) {
    //   productData.imgSrc = `/${req.file.filename}`
    // }
    const productData = req.body
    const errors = validationResult(req)

    console.log('=====>>> errors')
    console.log(errors)

    if (!errors.isEmpty()) {
      if (req.params.id) productData.id = req.params.id
      return res.status(400).render('cars/carForm', {
        errors: errors.array(),
        product: productData,
      })
    }
    if (req.file) {
      try {
        productData.imgSrc = `/${req.file.filename}`
      } catch (error) {
        console.log(error)
      }
    }

    Car.updateCar(req.params.id, productData)
    res.redirect('/cars')
  }

  static deleteProduct(req, res) {
    const product = Car.getCarById(req.body.id)
    const filePath = path.join(req.__dirname, 'uploads', product.imgSrc)

    console.log('test--------------------')
    console.log(req.__dirname)
    console.log('---')
    console.log(filePath)

    if (product.imgSrc) {
      fs.unlinkSync(filePath) // Передаем `filePath` напрямую
    }

    Car.deleteCarById(req.body.id)
    res.status(200).send({ success: true })
    res.redirect('/cars')
  }
}
export default ProductsController
