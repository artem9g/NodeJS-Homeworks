import { createServer } from 'node:http'
import { readFile, writeFile } from 'fs/promises'
import JsonDataHistory from './history.json' assert { type: 'json' }
import JsonDataSettings from './settings.json' assert { type: 'json' }

const server = createServer(async (req, res) => {
  try {
    // -favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' })
      res.end()
      return
    }

    const currentUrl = req.url
    // console.log(currentUrl)

    const historyFilePath = JsonDataSettings.historyFilePath
    // console.log(historyFilePath)

    const showHistory = JsonDataHistory
    console.log(showHistory)

    async function readAsyncFile(filePath) {
      try {
        const data = await readFile(filePath, 'utf8')
        return data
      } catch (err) {
        console.log('На сервері помилка!')
        return
      }
    }

    const currentData = await readAsyncFile(historyFilePath)
    const currentDataObj = JSON.parse(currentData)

    if (currentUrl === showHistory) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      return res.end(currentData)
    } else {
      if (currentUrl in currentDataObj) {
        currentDataObj[currentUrl] += 1
        await writeFile(historyFilePath, JSON.stringify(currentDataObj, null, 2), 'utf8')
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        return res.end(`Success - "${currentUrl}" rout count was updated.\n\nJSON:\n${JSON.stringify(currentDataObj)}`)
      } else {
        currentDataObj[currentUrl] = 1
        await writeFile(historyFilePath, JSON.stringify(currentDataObj, null, 2), 'utf8')
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        return res.end(`New Rout - "${currentUrl}"  was added.\n\nJSON:\n${JSON.stringify(currentDataObj)}`)
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('На сервері помилка.\n')
    console.log('Error:', error)
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Сервер 127.0.0.1:3000')
})

//node --experimental-json-modules ./app.mjs
//nodemon --experimental-json-modules ./app.mjs
