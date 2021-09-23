const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('DB password, name and phone number missing! Give DB password, name and phone number as arguments')
  process.exit(1)
}

if (process.argv.length < 5 && process.argv.length != 3) {
  console.log('Phone number missing! Give DB password, name and phone number as arguments')
  process.exit(1)
}

const password = process.argv[2]

const name = (process.argv.length != 3) ? process.argv[3] : null
const number = (process.argv.length != 3) ? process.argv[4] : null

const url =
  `mongodb+srv://AdminUserFullstack:${password}@cluster0.dfq1o.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url).then(() => {

  const mateSchema = new mongoose.Schema({
      name: String,
      number: String
    })
    
  const Mate = mongoose.model('Mate', mateSchema)

  const mate = new Mate({
    name: `${name}`,
    number: `${number}`,
  })

  if ((process.argv.length != 3)) {
    mate.save().then(response => {
      console.log(`added ${name} nuber ${number} to phonebook`)
      mongoose.connection.close()
    })
  } else {

    console.log('phonebook:')
    Mate.find({}).then(mates => {
      mates.forEach(mate => {
        console.log(`${mate.name} ${mate.number}`)
      })
      mongoose.connection.close()
    })
  }
})
