// import { Router } from 'express'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const router = Router()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// router.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '..', 'public', 'html', 'music.html'))
// })

// export default router

import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('music', { title: 'Music' })
})
export default router
