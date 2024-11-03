class AboutController {
  static info(req, res) {
    res.render('about', { title: 'About page' })
  }
}
export default AboutController
