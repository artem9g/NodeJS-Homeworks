import Product from '../models/productModel.mjs'
import dataFileManager from '../utils/DataFileManager.mjs'
import fs from 'fs'
import path from 'path'

class ProductController {
  static getAllProducts(req, res) {
    const products = Product.getAll()
    res.render('products/productList', { products })
  }

  static getProductById(req, res) {
    const product = Product.getById(req.params.id)
    res.render('products/productDetail', { product })
  }

  static getCreateProductForm(req, res) {
    res.render('products/productForm', { product: {} })
  }

  static createProduct(req, res) {
    // console.log(req.file)
    const prodData = { imgSrc: req.file.filename, ...req.body }
    Product.create(prodData)
    res.redirect('/products')
  }

  static getEditProductForm(req, res) {
    const product = Product.getById(req.params.id)
    res.render('products/productForm', { product })
  }

  static updateProduct(req, res) {
    console.log('-----updateProduct')
    console.log(req.body)

    Product.update(req.params.id, req.body)
    res.redirect('/products')
  }

  static deleteProduct(req, res) {
    const product = Product.getById(req.body.id)
    if (product.imgSrc) {
      fs.unlinkSync(path.join(req.__dirname, `uploads\\${product.imgSrc}`))
    }

    Product.delete(req.body.id)
    res.send(200, 'ok')
    res.redirect('/products')
  }
}

export default ProductController
