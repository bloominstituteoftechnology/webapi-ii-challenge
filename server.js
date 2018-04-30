var express = require('express')
var bodyParser = require('body-parser')
var db = require('./data/db')

app = express()
app.use(bodyParser.json())

app.get('/api/users/', (req, res) => {
  db.find()
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send({ error: "The users information could not be retrieved" }))
})

app.post('/api/users/', (req, res) => {
  var user = req.body
  if (user && user.name && user.bio) {
    db.insert(user)
      .then(response => {
        res.status(201).send(response)
      })
      .catch(error => {
        res.status(500).send({ error: "There was an error while saving the user to the database" })
      })
  } else {
    res
      .status(400)
      .send({ errorMessage: 'Please provide name and bio for the user.' })
  }  
})

app.get('/api/users/:id', (req, res) => {
  var id = req.params.id
  db.findById(id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).send({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).send(response)
      }
    })
    .catch(error => res.status(500).send({ error: "The user information could not be retrieved" }))
})

app.delete('/api/users/:id', (req, res) => {
  var id = req.params.id
  db.remove(id)
    .then(response => {
      if (response == 0) {
        res.status(404).send({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).send({ message: `User with id ${id} deleted` })
      }
    })
    .catch(error => res.status(500).send({ error: "The user could not be removed" }))
})

app.put('/api/users/:id', (req, res) => {
  var id = req.params.id
  var user = req.body
  if (user && (user.name || user.bio)) {
    db.update(id, user)
      .then(response => {
        if (response == 0) {
          res.status(404).send({ message: "The user with the specified ID does not exist" })
        } else {
          db.findById(id)
            .then(response => {
              res.status(200).send(response)
            })
        }
      })
  } else {
    res.status(400).send({ error: "Please provide name and bio for the user" })
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))