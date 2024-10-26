import { request, Router } from 'express'
const router = Router()
router.get('/:typeInfo', (req, res) => {
  const typeInfo = req.params['typeInfo']

  let result
  let title

  switch (typeInfo) {
    case 'sites':
      title = 'Favorite sites:'
      result = ['www.site-1.com', 'www.site-2.com', 'www.site-3.com']
      break
    case 'films':
      title = 'Favorite films:'
      result = ['film-1', 'film-2', 'film-3']
      break
    case 'me':
      title = 'Info about me:'
      result = ['fact-1', 'fact-2', 'fact-3']
      break

    default:
      title = 'Page not Found.'
      result = ['Use: /info/sites , /info/films , /info/me ']
      break
  }

  res.render('info', { title: title, info: result })
})
export default router
