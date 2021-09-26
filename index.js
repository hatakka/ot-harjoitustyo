const http = require('http')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Mate = require('./models/mate')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ""
  }
})

const max = 1000

function postRequests(req, res) {
  return req.method === 'POST'
}

function noPostRequests(req, res) {
  return req.method != 'POST'
}

app.use(morgan('tiny', {
  skip: postRequests
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: noPostRequests
}))


app.get('/info', (request, response) => {
  Mate.find({}).then(mates => {
    response.send(`<div>Phonebook has info for ${mates.length} people</div><br/>${new Date()}`)

//    response.json(mates)
  })
})

app.get('/api/persons', (request, response) => {
  Mate.find({}).then(mates => {
    response.json(mates)
  })
//  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  Mate.findById(request.params.id).then(mate => {
    response.json(mate)
  })
/*  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
*/
})

app.delete('/api/persons/:id', (request, response) => {
  let mateToDelete = null

  Mate.findByIdAndDelete(request.params.id).then(mate => {
    response.json(mate)
  })

  /*
  if (mateToDelete) {
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  } else {
    response.status(404).end()
  }
  */
})

/*
const generateId = () => {

  let id = Math.floor(Math.random() * max)

  while (findPerson(Math.floor(Math.random() * max)) != null) {
   id = Math.floor(Math.random() * max)
  }
  return id
}

const findPerson = (id) => {
  const person = persons.find(person => person.id === id)	
  return person
}
*/

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } 
/*
  Mate.find({ name: body.name }).then(mate => {
    return response.status(409).json({ 
      error: 'name must be unique' 
   })
  })
*/
  const mate = new Mate({
    name: body.name,
    number: body.number,
  })

  mate.save().then(savedMate => {
    response.json(savedMate)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
// const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})