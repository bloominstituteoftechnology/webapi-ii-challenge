// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The posts information could not be retrieved'});
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
  .then(post => {
    post.length === 0 ?
    res.status(404).json({message: "The post with the specified ID does not exist."})
    :
    res.status(200).json(post);
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The post information could not be retrieved'});
  });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
  .then(post => {
    post.length === 0 ?
    res.status(404).json({message: "The post with the specified ID does not exist."})
    :
    res.status(200).json(post);
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The post could not be removed'});
  });
});

server.put('/api/posts/:id', (req, res) => {
  const { id, title, contents } = req.params;
  
  const body = {title, contents}
  db.update(id, body)
  .then(post => {
    post.length === 0 ?
    res.status(404).json({message: "The post with the specified ID does not exist."})
    :
    res.status(200).json(post);
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).json({messege: 'The post could not be removed'});
  });
});


// add your server code starting here
server.listen(5000, () => console.log('Hello'))
