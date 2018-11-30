// import your node modules
const express = require('express'); // imports express package
const server = express(); // creates the server

const db = require('./data/db.js');

// add your server code starting here
const hostname = '127.0.0.1'; // local computer ip address
const port = 3000; // port to watch traffic

//middleware
server.use(express.json());

// GET
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => { res.json(posts) })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" })
    })
});

// GET
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params; // destructuring
  db.findById(id)
    .then(post => {
      if (post.length === 1) {
        res.json(post)
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    })
});

// POST
server.post('/api/posts', (req, res) => {
  const post = req.body;
  console.log('post form bod', post);
  if (post.title && post.contents) {
    db.insert(post)
      .then(postId => {
        res
          .status(201) // Created
          .json(post)
      })
      .catch(err => {
        res
          .status(500) // Internal Server Error
          .json({ error: "There was an error while saving the post to the database" })
      })
  } else {
      res
        .status(400) // Bad Request Error
        .json({ errorMessage: "Please provide title and contents for the post." })
  }
});

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then()
    .catch()
})
// 200
// 404 ID NOT FOUND { message: "The post with the specified ID does not exist." }
// 500 { error: "The post could not be removed" }

// PUT
server.put('/api/posts/:id', (req, res) => {

})
// 200
// 404 ID NOT FOUND { message: "The post with the specified ID does not exist." }
// Missing title or content 400  { errorMessage: "Please provide title and contents for the post." }
// error updating 500 { error: "The post information could not be modified." }

//start watching for connections
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
