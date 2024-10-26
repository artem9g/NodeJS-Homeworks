import DataFileManager from '../utils/DataFileManager.mjs'

class Flower {
  static loadFlowersList() {
    try {
      return DataFileManager.loadData()
    } catch (error) {
      throw new Error('Не вдалось заватажити список квітів')
    }
  }

  static addNewFlower(flowerObj) {
    try {
      DataFileManager.addItem({ id: new Date().getTime(), ...flowerObj })
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static getFlowerById(id) {
    try {
      return DataFileManager.getItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static updateFlower(id, flowerData) {
    try {
      DataFileManager.updateItemById(id, flowerData)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }

  static deleteFlowerById(id) {
    try {
      DataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error('Операція з даними не пройшла!')
    }
  }
}

export default Flower
