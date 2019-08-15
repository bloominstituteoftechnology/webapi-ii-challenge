// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const cors = require('cors');


server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send({ API: 'running...' })
})

// get all posts
server.get('/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      return res.status(200).json({ posts })
    })
    .catch(() => {
      return status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// get posts by id
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      //console.log(posts)
      if (posts.length === 1) {
        res.status(200).json(posts)
      } else {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(() => {
      return res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

// post a post
server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."}) 
  }
  db
    .insert({ title, contents })
    .then((newPostId)=> {
      //console.log(newPostId)
      return res.status(201).json({
        message: `The post with id of ${newPostId.id} was added`
      })
    })
    .catch(() => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
})

// delete post
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      //console.log('response', response)
      if (response === 0) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else {
        return res.status(200).json({ success: "Removed from database"})
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post could not be removed"
      })
    })
})

// edit post
server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!title || !contents) {
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .update(id, { title, contents })
    .then(response => {
      if (response == 0) {
        return res.status(404).json({errorMessage: "Please provide title and contents for the post."})
      }
      db
        .findById(id)
        .then(user => {
          if (user.length === 0) {
            return res.status(404).json({message: "The post with the specified ID does not exist."})
          } else {
            return res.status(200).json(user);
          }
        })
        .catch(error => {
          return res.status(500).json({ errorMessage: 'Error looking up user'})
        })
      })
    .catch(() => {
      return res.status(500).json({ error: "The post information could not be modified."})
    })
})

module.exports = server;
