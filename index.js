// import your node modules
const express = require('express');
const cors = require('cors');

const server = express();

const db = require('./data/db.js');

server.use(express.json())
// add your server code starting here
server.use(cors());

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body
  const newUser = { title, contents }
  if (!title || !contents){return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })}
  db.insert(newUser)
    .then(postId => {
      const { id } = postId;
      db.findById(id)
        .then(post => {
          if (!post) {
            return res
            .status(422)
            .send({Error: `User id: ${postId} does not exist`})
          }
          res.status(201).json(newUser);
        })
    })
    .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
});


server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params
  db.remove(id)
    .then(removedPost => {
      if (removedPost){
        res.status(200).json({message: "successfully removed!"})
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" })
    })
  // res.send(req.params)
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if(!title || !contents) { return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })}
  db.update(id, newPost)
    .then(post => {
      if (post) {
        res.status(200).json(newPost)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." })
    })
})


// ******************
server.get('/', (req, res) => {
  res.send('yo yo amigow')
})

server.get('/posts/', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(post => {
      res.status(200).json({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.listen(3030, () => console.log('\n\n == yes whatever port 7000 == \n\n'))
