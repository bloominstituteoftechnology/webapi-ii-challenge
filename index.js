// 1. Inside folder: yarn
// 2. Inside folder: yarn add express
// 3. nodemon index.js (or current file, e.g., nodemon server.js)
const express = require('express');

const db = require('./data/db.js'); // CommonJS for Node.js
// import db from './data/db.js'    // ES6 imports
const server = express();

server.use(express.json()); //teaches express how to parse the JSON request body   -- express automatically uses body-parser underneath
// needed for posts (but not gets)


// root of our site
// req is a requestHandler
server.get('/', (req, res) => {
  // console.log(db.find());
  res.send('<h2>API running on localhost:8000</h2><p>To see all posts: localhost:8000/api/posts</p></h2><p>To see a specific post by id (e.g., id = 1): localhost:8000/api/posts/1</p>')
})

// GET/READ ALL POSTS
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts)       
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The posts information could not be retrieved.",
        error: err })
    })
})

// GET/READ POSTS BY ID
server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;     // const { id } = req.params
  console.log('params:', req.params); // params: { id: '1' }

  db.findById(id)
    .then(post => {
      // console.log(post) // logs id, title, contents, create_at, updated_at
      !(post.length) // fixed issue of empty array
        ? res.status(404).json({ message: "The post with the specified ID does not exist."})
        : res.status(200).json(post[0]);
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The post information could not be retrieved.",
        error: err })
    })
})

// POST/CREATE
server.post('/api/posts', async (req, res) => {

  try {
    const postBody = req.body;
    console.log('postBody:', postBody);

    if (!postBody.title || !postBody.contents) {
      return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      } 
      
    const postId = await db.insert(postBody);
    // console.log('postId:', postId)
    const addPost = await db.findById(postId.id);
    // console.log('addPost', addPost)
    res.status(201).json(addPost)
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})

// PUT/UPDATE
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(count => {
      count 
        ? res.status(200).json({ message: `${count} posts updated`})
        : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})



// DELETE
server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)

  .then(count => {
    count
    ? res.status(200).json(count) // don't return count return deleted post
    : res.status(404).json( { message: "The post with the specified ID does not exist." } );
  })
  .catch(err => {
    res.status(500).json({ error: "The post could not be removed" })
  })
})





server.listen(8000, () => {console.log('API running on port 8000')})