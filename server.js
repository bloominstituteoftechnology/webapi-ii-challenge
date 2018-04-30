var express = require('express')
var bodyParser = require('body-parser')
var db = require('./data/db')

app = express()
app.use(bodyParser.json())

app.get('/api/posts/', (req, res) => {
  db.find()
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send({ error: "The posts information could not be retrieved" }))
})

app.post('/api/posts/', (req, res) => {
  var post = req.body
  if (post && post.title && post.content) {
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
      .send({ errorMessage: 'Please provide title and content for the post.' })
  }  
})

app.get('/api/posts/:id', (req, res) => {
  var id = req.params.id
  db.findById(id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).send({ message: "The post with the specified ID does not exist" })
      } else {
        res.status(200).send(response)
      }
    })
    .catch(error => res.status(500).send({ error: "The post information could not be retrieved" }))
})

app.delete('/api/posts/:id', (req, res) => {
  var id = req.params.id
  db.remove(id)
    .then(response => {
      if (response == 0) {
        res.status(404).send({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).send({ message: `User with id ${id} deleted` })
      }
    })
    .catch(error => res.status(500).send({ error: "The post could not be removed" }))
})

app.put('/api/posts/:id', (req, res) => {
  var id = req.params.id
  var post = req.body
  if (post && (post.title || post.contents)) {
    db.update(id, post)
      .then(response => {
        if (response == 0) {
          res.status(404).send({ message: "The post with the specified ID does not exist" })
        } else {
          db.findById(id)
            .then(response => {
              res.status(200).send(response)
            })
            .catch(error => res.status(500).send( { error: "There was an error updating the post" }))
        }
      })
  } else {
    res.status(400).send({ error: "Please provide title or content for the post" })
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))