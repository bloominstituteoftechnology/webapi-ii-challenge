// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// add your server code starting here
server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {res.status(200).json(post)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
})

server.post('/api/posts', (req, res) => {
    db.insert(req.body)
    .then(post => {
        if (!post.title || !post.contents) {
            res.status(400).json(post.length);
            //{ error: "Please provide title and contents for the post." }
        } else {
            res.status(201).json(post);
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
  });

  server.delete('/api/posts/:id', (req, res) => {
      const copy = req.body;

      db.remove(req.params.id)
      .then(post => {
          if (post) {
              res.status(204).json(copy);
          } else {
              res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post could not be removed" })
        });
  })

  server.put('/api/posts/:id', (req, res) => {
      db.update(req.params.id, req.body)
      .then(post => {
          if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          } else if (!post.title || !post.conent) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
          } else {
            res.status(200).json(post);
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post information could not be modified." })
    });
  })


server.listen(8000, () => console.log('API running on port 8000'));