import Car from './Car.mjs'
import Mark from './Mark.mjs'

import mongoose from 'mongoose'

class CarsDBService {
  static async getList(filters) {
    try {
      console.log('=====  filters =====')
      console.log(filters)
      const data = (await Car.find(filters, { licenseNumber: 0 }).populate('mark', 'title')) ?? []
      // console.log('=====  Data =====')
      // console.log(data)
      return data
    } catch (error) {
      console.error('Error in getList:', error)
      return []
    }
  }

  // з перевіркою помилок з монгодб, як unique
  static async create(data) {
    console.log('===== Incoming Data =====')
    console.log(data)

    try {
      if (!data.mark || typeof data.mark !== 'string' || !data.mark.trim()) {
        throw new Error('Invalid mark value')
      }

      const trimmedMark = data.mark.trim()

      let carMark1 = await Mark.findOne({ title: trimmedMark })
      console.log('Found carMark:', carMark1)

      if (!carMark1) {
        console.log('Creating new mark with title:', trimmedMark)
        carMark1 = await Mark.create({ title: trimmedMark })
        console.log('Newly created mark:', carMark1)
      }

      const carData = {
        ...data,
        mark: carMark1._id,
      }

      const car = new Car(carData)

      const savedCar = await car.save()
      console.log('---------Saved car:', savedCar)

      return savedCar
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Перевірка на дублікат- вже в базі перевіряється uniq поля - не доробив щоб на строні кліента оброблялось, gpt..
        const duplicateField = Object.keys(error.keyValue)[0]
        const duplicateValue = error.keyValue[duplicateField]
        console.error(`Duplicate key error: ${duplicateField} with value "${duplicateValue}" already exists.`)
        throw new Error(`Duplicate key error: "${duplicateField}" with value"${duplicateValue}"already exists.`)
      } else if (error instanceof mongoose.Error.ValidationError) {
        // хиби валидації Mongoose
        const validationErrors = Object.values(error.errors).map((err) => err.message)
        console.error('Validation Errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      } else {
        // інші хиби
        console.error('Error in create:', error)
        throw error
      }
    }
  }

  static async update(id, data) {
    console.log('===== Incoming Data for Update =====')
    console.log(data)

    try {
      if (data.mark && (typeof data.mark !== 'string' || !data.mark.trim())) {
        throw new Error('Invalid mark value')
      }

      const trimmedMark = data.mark ? data.mark.trim() : null

      let carMark1 = null
      if (trimmedMark) {
        carMark1 = await Mark.findOne({ title: trimmedMark })
        console.log('Found carMark:', carMark1)

        if (!carMark1) {
          console.log('Creating new mark with title:', trimmedMark)
          carMark1 = await Mark.create({ title: trimmedMark })
          console.log('Newly created mark:', carMark1)
        }
      }

      if (data.licenseNumber) {
        const existingCar = await Car.findOne({ licenseNumber: data.licenseNumber })
        if (existingCar && existingCar._id.toString() !== id) {
          throw new Error(`Car with license number ${data.licenseNumber} already exists.`)
        }
      }

      if (carMark1) {
        data.mark = carMark1._id
      }

      const updatedCar = await Car.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate('mark', 'title')

      console.log('Updated car:', updatedCar)

      return updatedCar
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0]
        const duplicateValue = error.keyValue[duplicateField]
        console.error(`Duplicate key error: ${duplicateField} with value "${duplicateValue}" already exists.`)
        throw new Error(` "${duplicateField}" with value "${duplicateValue}" already exists.`)
      } else if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map((err) => err.message)
        console.error('Validation Errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      } else {
        console.error('Error in update:', error)
        throw error
      }
    }
  }

  static async getById(id) {
    try {
      return await Car.findById(id).populate('mark', 'title')
    } catch (error) {
      console.error('Error in getById:', error)
      return null
    }
  }

  static async deleteById(id) {
    try {
      return await Car.findByIdAndDelete(id)
    } catch (error) {
      console.error('Error in deleteById:', error)
      return null
    }
  }
}

export default CarsDBService
