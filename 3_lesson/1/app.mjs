import express from 'express'
import GetResponse from './GetResponse.mjs'

const app = express()
const port = 3000
// Маршрут для GET запиту до кореневого шляху
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/season', (req, res) => {
  const season = GetResponse.getSeason()
  res.send(season)
})

app.get('/day', (req, res) => {
  const day = GetResponse.getDay()
  res.send(day)
})

app.get('/time', (req, res) => {
  const time = GetResponse.getTime()
  res.send(time)
})

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`)
})

//Задача 1. Розробити додаток з такими маршрутами:
// Маршрут
// Що повертає
// season
// повертає пору року
// day
// повертає поточний день
// time
// повертає час дня (ранок, обід, вечеря)
