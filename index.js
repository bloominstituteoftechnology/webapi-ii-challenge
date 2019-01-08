// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

// add your server code starting here
server.use(express.json());

server.get('/', (req, res) => {
  db.find()
  .then(posts => {
    if (posts){
    res.status(200).json({ posts })
  } else{
    res.status(500).json({ error: "The posts information could not be retrieved." })
  }
  }).catch( err => {
    res.send(err);
  });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
  .then(post => {
    if (post.length !== 0) {
      res.status(200).json(post);
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch( err => res.status(500).json(err))
});

server.post('/api/posts', (req, res) => {
  db.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => {
          res.status(200).json(post)
        })
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => res.stats(500).json(err))
});

server.put('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;


  try {
    const result = await db.update(id, changes);
    console.log('result', result);

    res.status(200).json(result);
  } catch (err){
    res.status(500).json(err);
  }
});

server.listen(5000, () => console.log('server running!'));
