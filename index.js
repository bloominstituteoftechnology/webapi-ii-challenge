// import your node modules

const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.send('Go to http://localhost:9000/api/posts to see the list of posts.')
});


server.get('/api/posts', (req, res) => {
    db.find()
      .then(posts => {
          res.json(posts);
      })
      .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
      .then(post => {
          res.json(post);
      })
      .catch(err => console.error(err) )
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
      .then(post => {
          db.findById(post.id)
            .then(foundPost => {
                res.status(201).json(foundPost)
            })
      })
      .catch(err => console.error(err));
});





const port = 9000;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===\n`)
);