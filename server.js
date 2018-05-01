// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const bodyParser = require('body-parser');
server.use(bodyParser.json());
// add your server code starting here
server.post('/api/posts', (req, res) => {
  const {title, contents} = req.body;
  const post = {title, contents};

  if (title === "" || title === undefined || contents === undefined || contents === "") {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }

  db.insert(post)
  .then((response) => {
    db.findById(response.id)
      .then(newPost => {
        res.status(201).json(newPost);
      })
  })
  .catch(err => {
    res.status(500).json({err:'server error'})
  })
});

server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params;

  db.findById(id)
    .then(data => {
      const post = {...data[0]};
      db.remove(id)
        .then(() => {
          res.status(200).json(post);
        })
    })
    .catch(err => {
      res.status(500).json({error: "The post could not be removed"})
    })
});

server.put('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  const update = req.body;

  db.update(id, update)
    .then(() => {
      db.findById(id)
        .then(post => {
          res.status(200).json(post[0]);
        })
    }).catch(err => {
      res.status(404).send({error: err});
    })
})

server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.json(posts);
  }).catch(err => {
    res.json({error: err});
  })
});

server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(post => {
      res.json(post);
    }).catch(err => {
      res.json({error: err});
    })
});

server.listen(5000, () => console.log('server listening on port 5000'))
