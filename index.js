// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

server.use(cors());

server.use(express.json());

const port = 5000;
server.listen(port, () => console.log(`--- Server running on port ${port} ---\n`));

server.get('/', (req, res) => {
  res.send('<h1>Welcome to posts!</h1>')
})

server.get('/api/posts/', (req, res) => {
  db.find()
    .then(response => res.json(response))
    .catch(err => res.status(500).json({error: "The post information could not be retrieved."}))
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if(!user) {
        res.status(500).json(user)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => res.status(404).json({ error: "The post information could not be retrieved." }))
})

server.post('/api/posts/', (req, res) => {
  const { title, contents } = req.body;
  const newUser = { title, contents };
  db.insert(newUser)
    .then(userId => {
      const { id } = userId;
      db.findById(id)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error:  "There was an error while saving the post to the database." }))
    })
    .catch(err => res.status(400).json({errorMessage: "Please provide title and contents for the post."}));
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      console.log(user)
      if(user === 1) {
        res.status(200).json({message: 'Successful delete!'})
      } else {
        res.status(500).json({ error: { message: "The post with the specified ID does not exist." } })
      }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed." }))
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newUser = { title, contents };
  if(title !== '' && contents !== '') {
    db.update(id, newUser)
      .then(user => {
        db.findById(id) 
        .then(userId => {
          console.log(userId)
          if(userId !== []) {
            res.status(200).json(userId);
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
        })
      .catch(err => res.status(404).json('error'))
      if(user === 0) {
        res.status(500).json({ error: "The post information could not be modified." })
      }

      })
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  
})