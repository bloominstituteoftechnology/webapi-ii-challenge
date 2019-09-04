// implement your API here

const express = require('express');

const db = require('./data/db.js');

const port = 8000;

const server = express();
server.use(express.json());

server.post('/api/posts', (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(result => {
      res.json(result);
      res.status(201);
    })
    .catch(error => {
      res.send(error);
      res.status(500);
    });
});

server.post('/api/posts/:id/comments', (req, res) => {
  let comment = req.body;
  const id = req.params.id;
  comment.post_id = id;

  db.insertComment(comment)
    .then(result => {
      res.json(result);
      res.status(201);
    })
    .catch(error => {
      res.send(error);
      res.status(500);
    });
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .then(error => {
      res.send(error);
      res.status(500);
    });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(response => {
      res.json(response);
      res.status(201);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
});

server.get('/api/posts/:id/comments', (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(response => {
      res.json(response);
      res.status(201);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
  .then(response => {
    res.json(response);
    res.status(201);
  })
  .catch(error => {
    res.json(error);
    res.status(500);
  });
});

server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
})

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
