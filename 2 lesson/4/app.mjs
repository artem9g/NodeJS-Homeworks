// server.mjs
import { createServer } from 'node:http'
import { readFile } from 'fs/promises'
import { join } from 'path'

const server = createServer(async (req, res) => {
  try {
    //Ігнорування favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' })
      res.end()
      return
    }

    const rootPath = 'public'
    const dateUrl = req.url
    console.log(dateUrl)
    let data

    switch (dateUrl) {
      case '/':
        data = await readFile('about-me.html', 'utf8')
        break

      case '/coffee':
        data = await readFile(join(rootPath, 'coffee.html'), 'utf8')
        break

      case '/music':
        data = await readFile('music.html', 'utf8')
        break

      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
        return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.statusCode = 500
    res.end('На сервері помилка')
    return
  }
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
