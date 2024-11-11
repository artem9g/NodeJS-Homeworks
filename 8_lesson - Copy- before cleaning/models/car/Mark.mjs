import mongoose from 'mongoose'
import config from '../../config/default.mjs'

const { Schema } = mongoose
console.log('22222222222222222222222222222222222')

const carMarkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Car mark is required'],
    unique: true,
    minlength: [1, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
    trim: true,
  },
})

carMarkSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases()
  return databases.databases.some((db) => db.name === config.databaseName)
}

carMarkSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db.listCollections({ name: 'marks' }).toArray()
    return collections.length > 0
  }
  return false
}

const Mark = mongoose.model('Mark', carMarkSchema)
export default Mark
