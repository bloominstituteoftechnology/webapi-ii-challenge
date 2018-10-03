// import your node modules
//imports express
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

// add your server code starting here
//creat server
const server = express();
server.use(cors());
server.use(express.json());

//###################request handlers########################
server.get("/", (req, res) => {
  res.send("act like you are working");
});

server.get("/api/posts/", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: "The posts information could not be retrieved." })
    );
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        return res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: "The posts information could not be retrieved." })
    );
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  db.remove(id)
    .then(removedPost => {
      console.log("Removed Post: " + removedPost);
      if (!removedPost) {
        return res
          .status(404)
          .send({ Error: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "You did it and we are proud of you" });
      }
    })
    .catch(err =>
      res.status(500).send({ error: "The post could not be removed" })
    );
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        res.status(201).send(post);
      });
    })
    .catch(err => {
      if (!title || !contents) {
        return res.status(400).send({
          errorMessage: "Please provide title and contents for the post."
        });
      } else if (!post) {
        return res
          .status(422)
          .send({ Error: `Post does not exist with that id ${id}` });
      } else {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      }
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  const newPost = { title, contents };
  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      if(!title || !contents){
        res.status(400).send({  errorMessage: "Please provide title and contents for the post."}) 
       } else if(!post){
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      } else {
          res.status(200).json(req.body); 
    }})
    .catch(err =>
      res
        .status(500)
        .send({ error: "The post information could not be modified" })
    );
});

//watches for traffic on specific port
const port = 7000;
server.listen(port, () => console.log(`API running on port ${port}`));
