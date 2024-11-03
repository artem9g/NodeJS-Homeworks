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
      throw new Error('Операція з даними не пройшла!1')
    }
  }
  static getCarById(id) {
    try {
      return dataFileManager.getItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!2')
    }
  }
  static updateCar(id, carData) {
    try {
      dataFileManager.updateItemById(id, carData)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!3')
    }
  }

  static deleteCarById(id) {
    try {
      dataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!4')
    }
  }
}
export default Car
