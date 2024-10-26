import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import indexRouter from './routes/index.mjs'

import goalsRouter from './routes/goals.mjs'
import aboutRouter from './routes/about.mjs'
import newsRouter from './routes/news.mjs'
import infoRouter from './routes/info.mjs'

const app = express()
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use('/goals', goalsRouter)
app.use('/about', aboutRouter)
app.use('/news', newsRouter)
app.use('/info', infoRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
export default app

// Задача 3. Розробити програму з такими функціональними можливостями:
// обробка статичних маршрутів:
// “/”
// Вітання користувача
// “/goals”
// Ваші цілі

// обробка статичних файлів:
// about
// містить тему та умову задачі
// news
// містить перелік важливі новини (для Вас)

// обробка параметрів запитів:
// /info/:myLinks
// у залежності від значення параметра повертає сторінку з :
// «sites» -  адресами улюблених сайтів
// «films» -  адреси улюблених онлайн кінотеатрі
// «me» - або інформацію про себе
