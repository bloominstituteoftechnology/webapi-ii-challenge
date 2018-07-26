// import your node modules

const db = require("./data/db.js");

// add your server code starting here
const express = require("express");

const server = express();
server.use(express.json()); // Body parser.

// CORS
const cors = require("cors");
server.use(cors());

// Async / Await
server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.post("/api/posts", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please proivde a title and contents for the post."
    });
  }
  try {
    const newpostID = await db.insert({ title, contents });
    console.log("newpostID is: ", newpostID);
    try {
      const post = await db.findById(post.id);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database."
    });
  }
});

server.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

server.delete("/api/posts/:id", async (req, res) => {
  try {
    const postToDelete = await db.findById(req.params.id);
    if (postToDelete.length === 0) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).json(postToDelete);
    try {
      const count = await db.remove(req.params.id);
      if (count === 0)
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.put("/api/posts/:id", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents)
    res
      .status(400)
      .json({ errorMessage: "Please provide title and content for the post." });
  try {
    const updatedPost = await db.update(req.params.id, { title, contents });
    if (updatedPost.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    try {
      const newPost = await db.findById(req.params.id);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

/*// Promises & Callbacks
// Get Request
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});



// Post Request
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  }
  db.insert({ title, contents })
    .then(posts => res.status(201).json({ title, contents }))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

// Get Specific Request
server.get("/api/posts/:id", (req, res) => {
  console.log("req.params: ", req.params);
  console.log("req.params.id: ", req.params.id);
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length !== 0) {
        return res.status(200).json(posts);
      } else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// Delete Request
server.delete("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
      res.status(200).json(response);
      db.remove(req.params.id)
        .then(count => {
          if (count === 0)
            return res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
        })
        .catch(err =>
          res.status(500).json({ error: "The post could not be removed" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

// Put Request
server.put("/api/posts/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.update(req.params.id, { title, contents })
          .then(count => {
            console.log(count);
            db.findById(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});*/

server.listen(8000, () => console.log("API running on port 8000"));
