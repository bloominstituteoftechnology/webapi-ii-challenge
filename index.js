// import your node modules

const db = require('./data/db.js');
const express = require("express");
const server = express();

// add your server code starting here

server.get("/", (req, res) => {
  res.status(200).send("sup");
});

 server.get("/api/posts", (req, res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    res.status(500).json({ message: "Error 500: Posts not found."
  });
});


 server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;


   db.findById(id)
    
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Post not found." 
    });
});
 server.listen(9000, () => console.log("server be runnin"));