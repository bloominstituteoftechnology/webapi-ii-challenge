// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');


// add your server code starting here
const server = express();
const port = 3333;

server.use(cors());
server.listen(port, () => { console.log(`Server running on port ${port}`)});

server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    console.log('posts: ', posts);
    res.json(posts);
  })
  .catch(e => res.send(e));
})

server.get('api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
  .then(post => { res.json(post) })
  .catch(e => res.send(e))
  })
