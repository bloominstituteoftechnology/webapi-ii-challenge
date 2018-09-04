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
  db.findById(`/posts/${id}`)
    .then(post => {
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
      console.log( 'in the if')
    try {
      const response = await db.insert(post);
      res.status(201).json(post);
      //200-299: success, 300-399: redirection, 400=499: client error, 500+: server error
    } catch (ex) {
      res
        .status(500)
        .json({
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
server.put("/posts", (req, res) => {
  const post = posts.find(post => post.id == req.params.id);
  db.update();
  if (!post) {
    res.status(404).json({ message: "Post does not exist" });
  } else {
    Object.assign(post, req.body);
    res.status(200).json({ post });
  }
});

//DELETE
server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.remove(`/posts/${id}`).then(post => {
    res
      .status(200)
      .json({ url: "/posts", operation: `DELETE for post with id ${id}` })
      .catch(err => {
        console.error("error", err);
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  });
});

server.listen(9000, () => console.log("API on port 9k"));
// add your server code starting here
