class MainController {
  static info(req, res) {
    res.render('index', { title: 'Home page' })
  }
}
export default MainController
