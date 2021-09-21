const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

const app = express()

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

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendick",
    "number": "39-23-6423122"
  }
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people</div><br/>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

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

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } 
  const exists = persons.find(person => person.name === body.name)	

  if (exists != null) {
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }
    
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})