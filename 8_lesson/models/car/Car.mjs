import mongoose from 'mongoose'
import config from '../../config/default.mjs'

const { Schema } = mongoose

const carSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Car brand is required'],
    minlength: [1, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
    trim: true,
  },
  mark: {
    type: Schema.Types.ObjectId,
    ref: 'Mark',
    required: [true, 'Car mark is required'],
  },
  price: {
    type: Number,
    required: [true, 'Car Price is required'],
    min: [100, 'Car Price must be numeric value, at least 3 characters long'],
    max: [2000000, 'Car Price must be between 100 and 2000000'],
    toInt: true,
  },
  licenseNumber: {
    type: String,
    unique: [true, '1111111111111111111111111111222222222222222222222222'],
    required: [
      true,
      'Ukrainian car number must be in the format "AA0000AA", where: ' +
        'the first two and last two characters are Latin letters, ' +
        'and the middle four characters can be Latin letters or digits.',
    ],
  },
  yearProduction: { type: Number, required: [true, `Year of production must be a number between 1886 and ${new Date().getFullYear()}`] },
  imgSrc: { type: String, required: [true, 'Car image is required'], trim: true },
})

carSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases()
  return databases.databases.some((db) => db.name === config.databaseName)
}

carSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db.listCollections({ name: 'cars' }).toArray()
    return collections.length > 0
  }
  return false
}

const Car = mongoose.model('Car', carSchema)
export default Car
