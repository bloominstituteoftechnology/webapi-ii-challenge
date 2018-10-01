// import your node modules
const db = require("./data/db.js");
const express = require("express");
const cors = require("cors");

// creates an server express application using the express module
const server = express();
server.use(cors());

// configures our server to execute a function for every GET request to "/api/posts"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"

server.get("/api/posts", (req, res) => {
  db.find()
		.then(posts => res.json(posts))
    .catch(err => res.send(err));
    console.log(`Here are the posts I've found: ${posts}`);
});

// Port listening code
const port = 8000;
server.listen(port, () =>
  console.log(`Server is listening on Port ${port}`)
);