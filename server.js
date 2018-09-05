// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

let nextId = 10;

// SIMPLE GET
server.get("/", (req, res) => {
  res.send("Hello FSW12");
});

// GET DATA
server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      const sortField = req.query.sortby || "id";
      const response = posts.sort(
        (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
      );
      res.status(200).json(response);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//GET DATA FROM ID
server.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      console.log("anything", post);
      res.status(200).json(post);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

//POST
server.post("/posts", async (req, res) => {
  const post = req.body; //express.json() middleware
  if (post.title && post.contents) {
    try {
      const response = await db.insert(post);
      res.status(201).json(response);
      //200-299: success, 300-399: redirection, 400=499: client error, 500+: server error
    } catch (ex) {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

//PUT
server.put("/posts/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(404).json({ message: "Post does not exist" }));
});

//DELETE
server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id).then(count => {
    if (count) {
      res
        .status(204)
        .json({ url: "/posts", operation: `DELETE for post with id ${id}` });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

server.listen(9000, () => console.log("API on port 9k"));
// add your server code starting here
