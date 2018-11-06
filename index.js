// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

// add your server code starting here

//middleware
server.use(express.json());

//GET request for /api/posts

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The posts information could not be retrieved." });
    });
});

//GET request posts by ID

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
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

//POST request

server.post("/api/posts", async (req, res) => {
  try {
    const postsData = req.body;
    const postsId = await db.insert(postsData);
    res.status(201).json(postsId);
  } catch (error) {
    res.status(500).json({ message: 'error grabbing the post', error })
  }
});

//DELETE request

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: '1000 years of shame, we failed to delete the post' })
    })
});

//PUT request




server.listen(8000, () => console.log("Server is listening on port 8000"));
