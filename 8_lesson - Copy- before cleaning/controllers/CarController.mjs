import { error, log } from 'console'
import CarsDBService from '../models/car/CarDBservice.mjs'
import MarkDBService from '../models/car/MarkDBservice.mjs'

import { validationResult } from 'express-validator'

class CarController {
  static async carsList(req, res) {
    try {
      const filters = {}
      for (const key in req.query) {
        if (req.query[key]) {
          filters[key] = req.query[key]
        }
      }

      const dataList = await CarsDBService.getList(filters)
      console.log('=========dataList')
      console.log(dataList)

      res.render('cars/carsList', {
        cars: dataList,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carDetail(req, res) {
    const id = req.params.id
    console.log(id)
    //отримати об"єкт продукта за id
    const car = await CarsDBService.getById(id)
    //відредерити сторінку з інформацією про товар\
    console.log('відредерити сторінку з інформацією про car')
    console.log(car)
    res.render('cars/carDetail', {
      car,
    })
  }

  static async createForm(req, res) {
    let dataMarksList = []
    try {
      dataMarksList = await MarkDBService.getList()
      console.log('========= MarksdataList')
      console.log(dataMarksList)
    } catch (error) {
      console.log('========= Error MarksdataList')
      console.log(error)
    }
    //відредерити сторінку з формою
    res.render('cars/carForm', {
      product: null,
      errors: null,
      // abo errors: [],
      marks: dataMarksList,
    })
  }

  static async editForm(req, res) {
    let dataMarksList = []
    try {
      dataMarksList = await MarkDBService.getList()
      console.log('========= MarksdataList')
      console.log(dataMarksList)
    } catch (error) {
      console.log('========= Error MarksdataList')
      console.log(error)
    }
    const id = req.params.id
    //отримати об"єкт продукта за id
    const car = await CarsDBService.getById(id)
    //відредерити сторінку з формою
    res.render('cars/carForm', {
      product: car,
      errors: null,
      // errors: [],
      marks: dataMarksList,
    })
  }

  static async createCar(req, res) {
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

    try {
      const { title, price, licenseNumber, yearProduction, imgSrc, mark } = req.body
      console.log('====>>> req.body')
      console.log(req.body)
      await CarsDBService.create({ title, price, licenseNumber, yearProduction, imgSrc, mark })
    } catch (error) {}

    const dataList = await CarsDBService.getList()
    console.log('=========dataList')
    console.log(dataList)

    res.redirect('/cars')
  }

  static async updateProduct(req, res) {
    const productData = req.body
    if (req.file) {
      productData.imgSrc = `/${req.file.filename}`
    }

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

    try {
      const { title, price, licenseNumber, yearProduction, imgSrc, mark } = req.body
      console.log('====>>> req.body')
      console.log(req.body)
      // Оновлюємо дані про car в базі даних
      await CarsDBService.update(req.params.id, { title, price, licenseNumber, yearProduction, imgSrc, mark })
    } catch (error) {}

    res.redirect('/cars')
  }

  static async deleteCar(req, res) {
    try {
      await CarsDBService.deleteById(req.body.id)

      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
  }
}
export default CarController
