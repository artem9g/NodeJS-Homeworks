import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const startParam = process.argv.slice(2).join()
const pensionAge = parseInt(new URLSearchParams(startParam).get('–-pension'))

rl.question('Скількі вам повних років? ', (answer) => {
  const age = parseInt(answer)
  // console.log(age)
  // console.log(pensionAge)
  if (age >= pensionAge) console.log('Ви пенсіонер.')
  else console.log('Ви ще не пенсіонер.')
  rl.close()
})

//node app.mjs –-pension=65
