// import your node modules

const db = require('./data/db.js');
const express = require("express");
const server = express();
server.use(express.json());

// add your server code starting here


// G-E-T
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

// P-O-S-T
 server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;


   db.findById(id)
    
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Post not found." 
    });
});


// P-U-T




// D-E-L-E-T-E 
 server.listen(9000, () => console.log("server be runnin"));