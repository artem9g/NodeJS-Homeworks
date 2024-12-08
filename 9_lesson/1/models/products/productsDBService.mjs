import Product from './Product.mjs'
import mongoose from 'mongoose'

class ProductsDBService {
  static async getList() {
    try {
      const exists = await Product.checkCollectionExists
      if (exists) {
        const data = await mongoose.model(collectionName).find().exec()
        return data
      }
      return (await Product.find({})) ?? []
    } catch (error) {
      return []
    }
  }
  static async create(data) {
    const product = new Product(data)
    return await product.save()
  }
  static async getById(id) {
    return await Product.findById(id)
  }
  static async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }
  static async deleteById(id) {
    return await Product.findByIdAndDelete(id)
  }
}
export default ProductsDBService
