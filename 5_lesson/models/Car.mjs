import dataFileManager from '../utils/DataFileManager.mjs'
class Car {
  static loadCarsList() {
    try {
      return dataFileManager.loadData()
    } catch (error) {
      throw new Error('Не вдалось заватажити список продуктів')
    }
  }
  static addNewCar(carObj) {
    try {
      dataFileManager.addItem({ id: new Date().getTime(), ...carObj })
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  static getCarById(id) {
    try {
      return dataFileManager.getItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
  static updateCar(id, carData) {
    try {
      dataFileManager.updateItemById(id, carData)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static deleteCarById(id) {
    try {
      dataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
}
export default Car
