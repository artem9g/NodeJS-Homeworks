// server.mjs
import { createServer } from 'node:http'
import fs from 'fs'
import { appendFile, readFile, writeFile, unlink } from 'fs/promises'

const server = createServer(async (req, res) => {
  try {
    const filePath = 'public/numbers.txt'

    //Перевірка на існування файлу numbers.txt і якщо його не існує - то створюємо
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`File none`)
        //Створення текстового файлу, якщо не існує
        async function createTextFile(filePath, content) {
          try {
            await writeFile(filePath, content, 'utf8')
            console.log(`File ${filePath} created successfully!`)
          } catch (error) {
            console.log(error)
          }
        }
        createTextFile(filePath, '')
      } else {
        //   console.log('Файл існує')
      }
    })
    //--

    //Ігнорування favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' })
      res.end()
      return
    }
    //--

    //Обробка url,
    const dateUrl = req.url
    const dateArr = dateUrl.slice(1).split('/')
    //   console.log(dateArr)
    let result

    switch (dateArr[0]) {
      case 'save_num':
        const currentNumber = Number(dateArr[1])
        //якщо це число то додаємо
        if (currentNumber) await appendTextToFile(filePath, `${currentNumber},`)
        result = `New number was added -- ${currentNumber}`
        break

      case 'sum':
        const arrNumbersSum = await readAsyncFile(filePath)
        const sumNumbers = arrNumbersSum.reduce((sum, num) => sum + num)
        console.log(arrNumbersSum)
        result = `--Sum = ${sumNumbers}`
        console.log(result)
        break

      case 'mult':
        const arrNumbersMult = await readAsyncFile(filePath)
        console.log(arrNumbersMult)

        const multNumbers = arrNumbersMult.reduce((sum, num) => sum * num)
        result = `--Mult = ${multNumbers}`
        console.log(result)
        break

      case 'remove':
        deleteFile(filePath)
        result = 'File with Numbers was deleted'
        break

      default:
        break
    }

    //Видалення
    async function deleteFile(filePath) {
      try {
        await unlink(filePath)
        console.log(`File ${filePath} deleted successfully!`)
      } catch (error) {
        console.log(error)
      }
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

    // Зчитування данних з файла з числами, та додавання їх одразу type nubmer числами в масив
    async function readAsyncFile(filePath) {
      try {
        const data = await readFile(filePath, 'utf8')
        //   console.log(data)
        const numberArr = data
          .split(',')
          .filter((num) => num.trim() !== '')
          .map(Number)
          .filter((num) => !isNaN(num))
        //   console.log(typeof data)
        return numberArr
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
        res.statusCode = 500
        res.end('На сервері помилка!')
        return
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`Commands:\n /save-num/... \n /sum/ \n /mult/ \n /remove/\n\n Result: ${result} `)
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
