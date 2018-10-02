// import your node modules
const db = require("./data/db.js");
const express = require("express");
const cors = require("cors");

// creates an server express application using the express module
const server = express();
server.use(cors());
// server.use(express.json());

// GET //
server.get("/api/posts", (req, res) => {
  db.find()
		.then(posts => res.json(posts))
    .catch(err => res.send(err));
});

server.get("api/posts/:id", (req, res) => {
  db.findById(parseInt(req.params.id))
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
          res.status(500).json({ error: "Post could not be found" });
      });
});
//////////

// POST //
server.post("/api/posts", (req, res) => {
  res.status(201).json({  });
});
//////////

// DELETE //
server.delete("/api/posts", (req, res) => {
  res.status(204);
});
//////////

// PUT //
server.put("/api/posts", (req, res) => {
  res.status(200).json({  });
});
//////////

// The port that the server we're creating will host the info on
const port = 5000;
server.listen(port, () =>
  console.log(`Server is listening on Port ${port}`)
);