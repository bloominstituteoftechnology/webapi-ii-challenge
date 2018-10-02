// import your node modules

const db = require("./data/db.js");
const express = require("express");
const cors = require("cors");

const server = express();
// add your server code starting here
server.use(cors()); //connect to react

server.use(express.json()); // format our req.body obj

server.get("/", (req, res) => {
  //request/route handler
  res.send("<h1>Hello World</h1>");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("\n** posts **", posts);
      res.status(200).json(posts);
    })
    .catch(err =>
      res.status(500).send({
        error: "There was an error while saving the post to the database"
      })
    );
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      console.log("post", post);
      res.json(post);
    })
    .catch(err =>
      res
        .status(404)
        .send({ message: "The post with the specified ID does not exist." })
    );
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };
  db.insert(newPost).then(post => {
    res.json(post);
  });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = db.findById(id);
  if (foundPost) {
    console.log("post found");
    db.remove(id).then(posts => {
      console.log(posts);
      res.json(posts);
    });
  }
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };
  db.update(id, newPost).then(post => res.json(post));
});

//watch for traffic on specific port
const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
