import Car from './Car.mjs'
import Mark from './Mark.mjs'

import mongoose from 'mongoose'

class CarsDBService {
  static async getList() {
    try {
      const exists = await Car.checkCollectionExists
      if (exists) {
        // Используем populate, чтобы подтянуть данные из коллекции marks
        const data = await Car.find().populate('mark', 'title').exec()
        return data
      }
      return (await Car.find({}).populate('mark', 'title')) ?? []
    } catch (error) {
      console.error('Error in getList:', error)
      return []
    }
  }

  // static async create(data) {
  //   try {
  //     const car = new Car(data)
  //     return await car.save()
  //   } catch (error) {
  //     console.error('Error in create:', error)
  //     throw error
  //   }
  // }

  // static async create(data) {
  //   console.log('===== Incoming Data =====')
  //   console.log(data)

  //   try {
  //     // Проверяем, что mark не пустой и не null
  //     if (!data.mark || typeof data.mark !== 'string' || !data.mark.trim()) {
  //       throw new Error('Invalid mark value')
  //     }

  //     const trimmedMark = data.mark.trim()

  //     // Ищем марку автомобиля по полю title
  //     let carMark1 = await Mark.findOne({ title: trimmedMark })
  //     console.log('Found carMark:', carMark1)

  //     // Если марка не найдена, создаем новую запись
  //     if (!carMark1) {
  //       console.log('Creating new mark with title:', trimmedMark)
  //       carMark1 = await Mark.create({ title: trimmedMark })
  //       console.log('Newly created mark:', carMark1)
  //     }

  //     // Создаем объект автомобиля с корректной привязкой к mark
  //     const carData = {
  //       ...data,
  //       mark: carMark1._id, // Привязываем ID марки
  //     }

  //     const car = new Car(carData)
  //     const savedCar = await car.save()
  //     console.log('Saved car:', savedCar)

  //     return savedCar
  //   } catch (error) {
  //     console.error('Error in create:', error)
  //     throw error
  //   }
  // }

  // з перевыркою помилок з монгодб, як unique
  static async create(data) {
    console.log('===== Incoming Data =====')
    console.log(data)

    try {
      // Проверяем, что mark не пустой и не null
      if (!data.mark || typeof data.mark !== 'string' || !data.mark.trim()) {
        throw new Error('Invalid mark value')
      }

      const trimmedMark = data.mark.trim()

      // Ищем марку автомобиля по полю title
      let carMark1 = await Mark.findOne({ title: trimmedMark })
      console.log('Found carMark:', carMark1)

      // Если марка не найдена, создаем новую запись
      if (!carMark1) {
        console.log('Creating new mark with title:', trimmedMark)
        carMark1 = await Mark.create({ title: trimmedMark })
        console.log('Newly created mark:', carMark1)
      }

      // Создаем объект автомобиля с корректной привязкой к mark
      const carData = {
        ...data,
        mark: carMark1._id, // Привязываем ID марки
      }

      const car = new Car(carData)

      // Сохраняем автомобиль в базе данных
      const savedCar = await car.save()
      console.log('Saved car:', savedCar)

      return savedCar
    } catch (error) {
      // Обработка ошибок MongoDB
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Проверка на дубликат (ошибка уникальности)
        const duplicateField = Object.keys(error.keyValue)[0]
        const duplicateValue = error.keyValue[duplicateField]
        console.error(`Duplicate key error: ${duplicateField} with value "${duplicateValue}" already exists.`)
        throw new Error(`Поле "${duplicateField}" с значением "${duplicateValue}" уже существует.`)
      } else if (error instanceof mongoose.Error.ValidationError) {
        // Обработка ошибок валидации Mongoose
        const validationErrors = Object.values(error.errors).map((err) => err.message)
        console.error('Validation Errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      } else {
        // Обработка других ошибок
        console.error('Error in create:', error)
        throw error
      }
    }
  }

  // static async update(id, data) {
  //   try {
  //     // Пополняем и возвращаем обновленные данные с маркой
  //     return await Car.findByIdAndUpdate(id, data, {
  //       new: true,
  //       runValidators: true,
  //     }).populate('mark', 'title')

  //   } catch (error) {
  //     console.error('Error in update:', error)
  //     throw error
  //   }
  // }

  static async update(id, data) {
    console.log('===== Incoming Data for Update =====')
    console.log(data)

    try {
      // Если поле mark передается, проверяем его на пустоту
      if (data.mark && (typeof data.mark !== 'string' || !data.mark.trim())) {
        throw new Error('Invalid mark value')
      }

      const trimmedMark = data.mark ? data.mark.trim() : null

      // Если mark изменился, проверяем или создаем новую марку
      let carMark1 = null
      if (trimmedMark) {
        // Ищем марку автомобиля по полю title
        carMark1 = await Mark.findOne({ title: trimmedMark })
        console.log('Found carMark:', carMark1)

        // Если марка не найдена, создаем новую запись
        if (!carMark1) {
          console.log('Creating new mark with title:', trimmedMark)
          carMark1 = await Mark.create({ title: trimmedMark })
          console.log('Newly created mark:', carMark1)
        }
      }

      // Проверка уникальности licenseNumber (если оно передается)
      if (data.licenseNumber) {
        const existingCar = await Car.findOne({ licenseNumber: data.licenseNumber })
        if (existingCar && existingCar._id.toString() !== id) {
          throw new Error(`Car with license number ${data.licenseNumber} already exists.`)
        }
      }

      // Если марка изменена, обновляем mark в данных
      if (carMark1) {
        data.mark = carMark1._id
      }

      // Обновляем автомобиль с новыми данными
      const updatedCar = await Car.findByIdAndUpdate(id, data, {
        new: true, // Возвращаем обновленный документ
        runValidators: true, // Запускаем валидацию
      }).populate('mark', 'title')

      console.log('Updated car:', updatedCar)

      return updatedCar
    } catch (error) {
      // Обработка ошибок MongoDB
      if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0]
        const duplicateValue = error.keyValue[duplicateField]
        console.error(`Duplicate key error: ${duplicateField} with value "${duplicateValue}" already exists.`)
        throw new Error(`Поле "${duplicateField}" с значением "${duplicateValue}" уже существует.`)
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
      // Используем populate для получения данных о марке
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
