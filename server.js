// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json())

server.get('/api/posts', (req, res) => {
  db.find()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching data...')
    console.log(error.message)
  })
})

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual data...')
    console.log(error.message)
  })
})

server.post('/api/posts', (req, res) => {
  let { title, contents } = req.body;
  let post = {
    title,
    contents
  }
  if (post.title === undefined || post.contents === undefined){
      res.status(404).send('Posts need Title and Contents fields...')
    } else {
      db.insert(post)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).send('error adding post...')
      console.log(error.message)
    })
  }
})

server.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  db.remove(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the post could not be removed")
  })
})

server.put('/api/posts/:id', (req, res) => {
  let id = req.params.id;
  let { title, contents } = req.body;
  let changes = {
    title,
    contents
  }
  if (changes.title === undefined || changes.contents === undefined){
      res.status(404).send('Posts need Title and Contents fields...')
    } else {
    db.update(id, changes)
    .then(response => {
      db.findById(req.params.id).then(response2 => {
        res.status(200).json(response2)
      })
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).send('Unable to update information...')
    })
  }
})



server.listen(8000, () => console.log('API Running...'));
