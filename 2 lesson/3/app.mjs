// server.mjs
import { log } from 'node:console'
import { createServer } from 'node:http'

const server = createServer(async (req, res) => {
  try {
    //Ігнорування favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' })
      res.end()
      return
    }
    //--

    //Обробка url
    const dateUrl = req.url
    const dateArr = dateUrl.slice(1).split('/')
    const parrametr = dateArr.shift()

    const newDateArr = dateArr[0].split('-').map((el) => Number(el))

    let result

    switch (parrametr) {
      case 'add':
        result = newDateArr.reduce((sum, num) => {
          return sum + num
        })
        console.log(`--Sum = ${result}`)
        result = `--Sum = ${result}`
        break

      case 'subtract':
        result = newDateArr.reduce((sum, num) => {
          return sum - num
        })
        console.log(`--Subtract = ${result}`)
        result = `--Subtract = ${result}`
        break

      case 'mult':
        result = newDateArr.reduce((sum, num) => {
          return sum * num
        })
        console.log(`--Mult = ${result}`)
        result = `--Mult = ${result}`
        break

      default:
        result = 'Use add, subtract, mult - ex.:/add/1-4'
        break
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(` --Result of ${result}\n`)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.statusCode = 500
    res.end('На сервері помилка.')
    return
  }
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
//add, subtract, mult
