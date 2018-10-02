// import your node modules
const db = require("./data/db.js");
const express = require("express");
const cors = require("cors");

// creates an server express application using the express module
const server = express();
server.use(cors());
// server.use(express.json());

// configures our server to execute a function for every GET request to "/api/posts"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
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

// The port that the server we're creating will host the info on
const port = 5000;
server.listen(port, () =>
  console.log(`Server is listening on Port ${port}`)
);