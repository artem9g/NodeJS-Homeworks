import Flower from '../models/Flower.mjs'

class FlowersController {
  static mainFlowers(req, res) {
    const flowersList = Flower.loadFlowersList()
    res.render('flowers/flowersList', {
      flowers: flowersList,
    })
  }

  static flowerDetail(req, res) {
    const id = req.params.id
    //отримати об"єкт продукта за id
    const flower = Flower.getFlowerById(id)
    console.log('-----------')
    console.log(flower)
    //відредерити сторінку з інформацією про товар
    res.render('flowers/flowersDetail', {
      flower,
    })
  }

  static createForm(req, res) {
    //відредерити сторінку з формою
    res.render('flowers/flowersForm', {})
  }

  static createFlower(req, res) {
    console.log('TEST 1')
    console.log(req.body)
    const flowerData = req.body
    Flower.addNewFlower(flowerData)
    res.redirect('/flowers')
  }
}

export default FlowersController
