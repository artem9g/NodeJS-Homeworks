import Car from '../models/Car.mjs'

class ProductsController {
  static mainProducts(req, res) {
    const productsList = Car.loadCarsList()
    res.render('cars/carsList', {
      products: productsList,
    })
  }
  static productDetail(req, res) {
    const id = req.params.id
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
    })
  }
  static editForm(req, res) {
    const id = req.params.id
    //отримати об"єкт продукта за id
    const product = Car.getCarById(id)
    //відредерити сторінку з формою
    res.render('cars/carForm', {
      product,
    })
  }
  static createProduct(req, res) {
    const productData = req.body
    //productData.imgSrc = `/${req.file.filename}`
    Car.addNewCar(productData)
    res.redirect('/cars')
  }
  static updateProduct(req, res) {
    const productData = req.body
    // if (req.file) {
    //   productData.imgSrc = `/${req.file.filename}`
    // }
    Car.updateCar(req.params.id, productData)
    res.redirect('/cars')
  }
  static deleteProduct(req, res) {
    const product = Car.getCarById(req.body.id)
    // if (product.imgSrc) {
    //   fs.unlinkSync(path.join(req.__dirname, `uploads\\${product.imgSrc}`))
    // }
    Car.deleteCarById(req.body.id)
    res.send(200, { success: true })
    res.redirect('/cars')
  }
}
export default ProductsController
