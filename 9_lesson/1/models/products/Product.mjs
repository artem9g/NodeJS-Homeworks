import mongoose from 'mongoose'
import config from '../../config/default.mjs'

const { Schema } = mongoose

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be at least 1'],
    max: [1000000, 'Price must be at most 120'],
    toInt: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1'],
    max: [1000000, 'Amount must be at most 120'],
    toInt: true,
  },
})

productSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases()
  return databases.databases.some((db) => db.name === config.databaseName)
}
productSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db.listCollections({ name: 'products' }).toArray()
    return collections.length > 0
  }
  return false
}
const Product = mongoose.model('Product', productSchema)
export default Product
