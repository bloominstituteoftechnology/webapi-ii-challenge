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

//* GET Request
// TODO: When the client makes a GET request to /api/posts:

// TODO: If there's an error in retrieving the posts from the database:
// TODO: cancel the request.
// TODO: respond with HTTP status code 500.
// TODO: return the following JSON object: { error: "The posts information could not be retrieved." }.

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

//* GET Request by ID
// TODO: When the client makes a GET request to /api/posts/:id:

// TODO: If the post with the specified id is not found:
// TODO: return HTTP status code 404 (Not Found).
// TODO: return the following JSON object: { message: "The post with the specified ID does not exist." }.

// TODO: If there's an error in retrieving the post from the database:
// TODO: cancel the request.
// TODO: respond with HTTP status code 500.
// TODO: return the following JSON object: { error: "The post information could not be retrieved." }.

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post[0]);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//* DELETE Request
// TODO: When the client makes a DELETE request to /api/posts/:id:

// TODO: If the post with the specified id is not found:
// TODO: return HTTP status code 404 (Not Found).
// TODO: return the following JSON object: { message: "The post with the specified ID does not exist." }.

// TODO: If there's an error in removing the post from the database:
// TODO: cancel the request.
// TODO: respond with HTTP status code 500.
// TODO: return the following JSON object: { error: "The post could not be removed" }.

server.delete("/api/post/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The post has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

//* UPDATE Request
// TODO: When the client makes a PUT request to /api/posts/:id:
// TODO: If the post with the specified id is not found:
// TODO: return HTTP status code 404 (Not Found).
// TODO: return the following JSON object: { message: "The post with the specified ID does not exist." }.

// TODO: If the request body is missing the title or contents property:
// TODO: cancel the request.
// TODO: respond with HTTP status code 400 (Bad Request).
// TODO: return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// TODO: If there's an error when updating the post:
// TODO: cancel the request.
// TODO: respond with HTTP status code 500.
// TODO: return the following JSON object: { error: "The post information could not be modified." }.

// TODO: If the post is found and the new information is valid:
// TODO: update the post document in the database using the new information sent in the reques body.
// TODO: return HTTP status code 200 (OK).
// TODO: return the newly updated post.

server.put("/api/post/:id", (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.update(id, { title, contents })
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ title, contents });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.listen(8000, () => console.log("API running on port 8000"));
