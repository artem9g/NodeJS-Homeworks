import Mark from './Mark.mjs'
import mongoose from 'mongoose'
//треба буде потім додати трай кетч до всіх, +-як в getList
class MarksDBService {
  static async getList() {
    try {
      const exists = await Mark.checkCollectionExists
      console.log('-----------------exists')
      console.log(exists)
      if (exists) {
        const data = await mongoose.model(collectionName).find().exec()
        return data
      }
      return (await Mark.find({})) ?? []
    } catch (error) {
      console.error('Error in create2:', error)
      throw error
      return []
    }
  }

  static async create(data) {
    const mark = new Mark(data)
    return await mark.save()
  }

  static async getById(id) {
    return await Mark.findById(id)
  }

  static async update(id, data) {
    return await Mark.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
  }

  static async deleteById(id) {
    return await Mark.findByIdAndDelete(id)
  }
}

export default MarksDBService
