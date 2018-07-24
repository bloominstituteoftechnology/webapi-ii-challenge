// import your node modules
const express = require('express'); //  to import the express module and make it available to our application
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express(); // creates our Express application
const port = 3000;
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => { // two arguments (the homies): an object that represents the request and another object that represents the response
    res.send('Hello World');
  });

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  
  db
      .findById(id)
      .then(posts => {
          if (posts.length === 0) {
              res.status(404).json({ message: "The user with the specified ID does not exist." });
          } else {
              res.json(posts[0]);
          }
      })
      .catch (message => {
          res.status(500).json({ message: "The user information could not be retrieved." })
      })
})

server.post('/api/posts', (req, res) => {
  // if (!name||!bio) {
  //     return res.status(400)({error: "Please provide name and bio for the user."})
  // }

  const newPost = req.body;

  db
      .insert(newPost)
      .then(response => {
          res.status(201).json(response);
      })
      .catch(errorMessage => {
          res.status(500).json({errorMessage: "Please provide title and contents for the post."})
      })
})

server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params
  db
    .remove(id)
    .then(
      res.status(404).json({message: "The user with the specified ID does not exist."})
    )
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" })
    })
})

  server.listen(port, () => console.log(`Server is listening to port ${port}`)); // Our server will only send a response to GET requests made to the / route on port 3000
