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
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  
  db
      .findById(id)
      .then(posts => {
          if (posts.length === 0) {
              res.status(404).json({ message: "The post with the specified ID does not exist." });
          } else {
              res.json(posts[0]);
          }
      })
      .catch (message => {
          res.status(500).json({ message: "The post information could not be retrieved." })
      })
})

server.post('/api/posts', (req, res) => {

  const {title, contents} = req.body;
  if (!title || !contents) {
    res.status(400).json({error: "Please provide title and contents for the post."});
  return; 
  }

  db
      .insert({title, contents})
      .then(response => {
        db
          .findById(response.id)
          .then(response => {
            res.status(201).json(response);
          })
      })
      .catch(errorMessage => {
          res.status(500).json({error: "There was an error while saving the post to the database"})
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

server.put('/api/posts/:id', (req, res) => {
  const {id} = req.params
  const update = req.body
  db
      .update(id, update)
      .then(count => {
          if ( count > 0 ) {
              db
                  .findById(id)
                  .then(posts => {
                      res.status(200).json(posts[0])
                  })
          } else {
             res.status(404).json({message: "The post with the specified ID does not exist."}) 
          }
      })
      .catch(err => {
          res.status(500).json({message: "The post information could not be modified."})
      })

})

  server.listen(port, () => console.log(`Server is listening to port ${port}`)); // Our server will only send a response to GET requests made to the / route on port 3000
