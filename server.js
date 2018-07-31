// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

//* POST Request
// TODO: When the client makes a POST request to /api/posts:

// TODO:  If the request body is missing the title or contents property:
// TODO: cancel the request.
// TODO: respond with HTTP status code 400 (Bad Request).
// TODO: return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// TODO: If the information about the post is valid:
// TODO: save the new post the the database.
// TODO: return HTTP status code 201 (Created).
// TODO: return the newly created post.

// TODO: If there's an error while saving the post:
// TODO: cancel the request.
// TODO: respond with HTTP status code 500 (Server Error).
// TODO: return the following JSON object: { error: "There was an error while saving the post to the database" }.

server.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db.insert({
    title: req.body.title,
    contents: req.body.contents
  })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

server.listen(8000, () => console.log("API running on port 8000"));
