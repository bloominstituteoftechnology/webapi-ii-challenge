const express = require("express");
const db = require("./data/db.js");

const app = express();
const PORT = 3000;

// Endpoints
app.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get posts." });
    });
});

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(error => {
      res.status(404).json({ message: `User ${id} does not exist.` });
    });
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
