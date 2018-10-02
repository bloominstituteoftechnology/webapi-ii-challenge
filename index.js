// import your node modules
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

const cors = require("cors");

server.use(cors());
const port = 8000;

server.listen(port, () => `running on port: ${port}`);

server.get("/api/posts", (req, res) => {
  console.log(req);  
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(404).send({ message: "The post with the specified ID does not exist." })
  }
  db.findById(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(() => res.status(500).send({ error: "The post information could not be retrieved." }));
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = db.findById(id);
  if (foundPost) {   
    db.remove(id).then(() => {
      db.find().then(post => {        
        res.json(post)
        
      });
    }).catch(() => {
      res.status(500).send({ error: "The post could not be removed" })
    });;
  }else{
    res.status(404).send({ message: "The post with the specified ID does not exist." })
  }
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };
  if(!title || !contents){
    res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
  }

  db.insert(newPost).then(() => {
    db.find().then(post => {
      console.log(post);
      res.status(201).json(post);
    });
  }).catch(() => {
    res.status(500).send({ error: "There was an error while saving the post to the database" })
  });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };

  if(!id){
    res.status(404).send({ message: "The post with the specified ID does not exist." })
  }
  if(!title || !contents){
    res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
  }


  db.update(id, newPost).then(() => {
    db.find().then(post => {      
      res.status(200).json(post);
    });
  }).catch(err => res.status(500).send(err));
});
// add your server code starting here
