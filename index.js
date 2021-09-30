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

function requestsWithBody(req, res) {
  return (req.method === 'POST' || req.method === 'PUT')
}

function requestsNoBody(req, res) {
  return (req.method != 'POST' && req.method != 'PUT')
}

app.use(morgan('tiny', {
  skip: requestsWithBody
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: requestsNoBody
}))


app.get('/info', (request, response) => {
  Mate.find({}).then(mates => {
    response.send(`<div>Phonebook has info for ${mates.length} people</div><br/>${new Date()}`)
  })
})

app.get('/api/persons', (request, response) => {
  Mate.find({}).then(mates => {
    response.json(mates)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Mate.findById(request.params.id).then(mate => {
    if (mate) {
      response.json(mate)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Mate.findByIdAndDelete(request.params.id).then(mate => {
    if (mate) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const mate = new Mate({
    name: body.name,
    number: body.number,
  })

  mate.save().then(savedMate => {
    response.json(savedMate)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const mate = {
    name: body.name,
    number: body.number,
  }

  Mate.findByIdAndUpdate(request.params.id, mate, { new: true })
    .then(updatedMate => {
      response.json(updatedMate)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})