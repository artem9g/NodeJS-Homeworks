// server.mjs
import { createServer } from 'node:http'
import fs from 'fs'
import { appendFile, readFile, writeFile, unlink } from 'fs/promises'

const server = createServer(async (req, res) => {
  //Ігнорування favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(204, { 'Content-Type': 'image/x-icon' })
    res.end()
    return
  }
  //--

  //Обробка url,

  //Перевірка на існування файлу numbers.txt і якщо його не існує - то створюємо

  async function createHTMLFile(filePath, content) {
    try {
      await writeFile(filePath, content, 'utf8')
      console.log(`File ${filePath} created successfully!`)
    } catch (error) {
      console.log(error)
    }
  }

  //--

  const filePath = 'public'
  const dateUrl = req.url
  console.log(dateUrl)

  switch (dateUrl) {
    case '/':
      break

    case '/coffee':
      await createHTMLFile(`${filePath}/coffee.html`, 'Coffee')
      break

    case '/music':
      await createHTMLFile(`${filePath}/music.html`, 'Music')
      break

    default:
      break
  }

  // Дописування данних у файл
  async function appendTextToFile(filePath, text) {
    try {
      await appendFile(filePath, text, 'utf8')
      console.log(`Number appended to ${filePath} successfully!`)
    } catch (error) {
      console.log(error)
    }
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`Commands:\n /music \n /coffee \n / \n `)
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
