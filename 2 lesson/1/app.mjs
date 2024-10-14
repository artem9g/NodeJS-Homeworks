import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

//node app.mjs –-pension=65

const startParam = process.argv.slice(2).join()
const pensionAge = Number(new URLSearchParams(startParam).get('–-pension'))

rl.question('Скількі вам повних років? ', (answer) => {
  const age = Number(answer)

  if (age >= pensionAge) console.log('Ви пенсіонер.')
  else console.log('Ви ще не пенсіонер.')
  rl.close()
})
