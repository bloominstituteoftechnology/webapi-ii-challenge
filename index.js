const express = require("express");
const db = require("./data/db.js");
const server = express();
const cors = require("cors");

//middleware
server.use(express.json());
server.use(cors());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res.send({ error: "The posts information could not be retrieved." })
    );
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The post couldn't be retrieved" });
    });
});

server.post("/api/posts", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
  try {
    let data = await db.insert(req.body);
    return res.status(201).json({
      id: data.id,
      title: req.body.title,
      contents: req.body.contents
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.remove(id)
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The post could not be removed" });
        });
    }
  });
});

//updates the post and returns the updated array of posts
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = { title, contents };

  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    db.findById(id).then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    });
  }

  db.update(id, post)
    .then(res.status(200))
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });

  db.findById(id).then(post => {
    if (post) {
      res.status(200).json(post);
    }
  });
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
