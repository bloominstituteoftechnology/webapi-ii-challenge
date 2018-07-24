// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const cors = require('cors');
server.use(express.json());

// ? check to see if this is correct
//server.use(cors({ origin: http://localhost:5000/ }));

server.get('/', (req, res) => {
  res.send({ API: 'running...' })
})

// get all posts
server.get('/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json({posts})
    })
    .catch(() => {
      status(500).json({ error: "The posts information could not be retrieved." })
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
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(() => {
      status(500).json({ error: "The post information could not be retrieved." })
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
      res.status(201).json({
        message: `The post with id of ${newPostId.id} was added`
      })
    })
    .catch(()=> {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
})

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      //çconsole.log('response', response)
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












server.listen(5000);

// add your server code starting here
