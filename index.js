// import your node modules
const db = require('./data/db.js');

const express = require('express');
const server = express();
server.use(express.json());
// add your server code starting here
console.log('hello');

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: " error: 'The posts information could not be retrieved'", error: err });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);

  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts/', (req, res) => {
  console.log(req.body);
  // res.send('success');
  let newpost = req.body;

  db.insert(newpost)
    .then(newpost => {
      if (!newpost) {
        res.status(404).json({ error: 'No new post was passed.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be added. Error is ', err });
    });
});

server.listen(9000, () => console.log('the server is alive!'));
