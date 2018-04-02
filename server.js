// import your node modules
const bodyParser = require("body-parser");
const express = require("express");

const db = require("./data/db.js");

const server = express();
server.use(bodyParser.json());

// add your server code starting here

server.get("/api/posts/", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else {
      res.json(users[0]);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  
  if (title === undefined || contents === undefined ) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {

    const newPost = {...req.body};

    db
    .insert(newPost)
    .then(newID => {
      res.status(201).json(newID)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    });
  }
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(deletions => {
    if (deletions === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else {
      res.status(200).json({ message: `Post ${id} deleted`})
    }
  }).catch(error => {
    res.status(500).json({error: "The post could not be removed" })
  });
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if(title === undefined || contents === undefined) {
      res.error(400).json({errorMessage: 'Please provide title and contents for the post.'})
  }
  else{
  const newPost = { title, contents}
  db
  .update(id, newPost)
 
  .then(insertions => {
      if(insertions === 0){
          res.error(404).json({message: 'The post with the specified ID does not exist.'})
      }
      else{
          res.status(200).json({message: `Updated post ${id}`})
      }
   }
  )
  .catch(error => {
      res.status(500).json({error: 'The post information could not be modified.'})
  })
  }
})

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000"));
