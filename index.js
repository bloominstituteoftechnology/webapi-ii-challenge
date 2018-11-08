// import your node modules
const express = require("express");
const server = express();
server.use(express.json());

const db = require("./data/db.js");

// GET
server.get("/", (req, res) => {
  res.status(200).send("<h1>This better work I swear to god</h1>");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Error 500: Post not found." });
    });
});

// POST
server.post("/api/posts", async (req, res) => {
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    console.log("post title:", postData.title);

    if (!postData.title || !postData.contents) {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }

    res.status(201).json(postId);
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

// PUT
server.put("/api/posts/:id", (req, res) => {
  const userData = req.body;
  db.update(req.params.id, userData)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
});

// DELETE
server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      res.status(204).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(9000, () => console.log("Server is live!"));