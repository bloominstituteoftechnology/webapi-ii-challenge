// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

const PORT = 5000;

// add your server code starting here

//Allowing CORS so I could use it on my react app
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(express.json())


//grabbing a list of all posts
server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      res.json(posts)
    })
    .catch( err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved."})
    })
})

//grabbing an individual post by id
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then( post => {
      if (post.length > 0) {
        res.json(post)
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch( err => {
      res.json({message: 'unable to load posts'})
    })
})

//deleting an individual post by id
server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then( post => {
      if (post) {
        res
          .json({message: 'post was successfully deleted'})
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch( err => {
      res
        .status(500)
        .json({error: "The post could not be removed"})
    })
})

//updating an individual post by id
server.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  const {id} = req.params;

  if (changes.title && changes.contents) {
    db.update(id, changes)
      .then( count => {
        console.log(count)
        if (count) {
          db.findById(id)
            .then( post => {
              res.json(post)
            })  
        } else {
            res
              .status(404)
              .res.json({message: "The post with the specified ID does not exist."})
        }
      }).catch( err => {
        res
          .status(500)
          .json({error: "The post information could not be modified."})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: "Please provide title and contents for the post."})
  }
})

server.post('/api/posts', (req, res) => {
  const post = req.body;
  
  if (post.title && post.contents) {
    db.insert(post)
      .then( post => {
        db.findById(post.id)
          .then( post => {
            res
              .status(201)
              .json(post)
          })
          
      }).catch( err => {
        res
          .status(500)
          .json({error: "There was an error while saving the post to the database"})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: "Please provide title and contents for the post."})
  } 
})

//listening
server.listen(PORT, () => {
  console.log(`my server is running on port ${PORT}`)
})