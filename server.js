// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
const bodyParser = require("body-parser");
// add your server code starting here

server.use(bodyParser.json());

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(users => {
      res.json(users[0]);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.post("/api/post", (req, res) => {
  const { title, contents } = req.body;
  const post = { title: title, contents: contents };
  db
    .insert(post)
    .then(res.redirect("/api/posts"))
    .catch(error => {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  const usrPost = { title: title, contents: contents };
  db
    .update(id, usrPost)
    .then(res.redirect("/api/posts"))
    .catch(error => {
      res
        .status(400)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  db.remove(id)
  .then(res.redirect('/api/posts'))
  .catch(error => {
      res
        .status(404)
        .json({message: "The post with the specified ID does not exist."})
  })
});

const port = 5000;
server.listen(port, () => console.log("Api running on port 5000"));
