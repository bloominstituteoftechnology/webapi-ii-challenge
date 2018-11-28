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

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
