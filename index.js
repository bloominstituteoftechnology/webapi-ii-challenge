// import your node modules

const db = require("./data/db.js");
const express = require("express");

// add your server code starting here

const app = express();
app.use(express.json());

app.get("/api/posts", (req, res) => {
  db.find().then(
    doc => {
      res.send(doc);
    },
    err => res.status(500).json({ error: "The posts information could not be retrieved" })
  );
});

app.get(`/api/posts/:id`, (req, res) => {
  const id = req.params.id;

  db.findById(id).then(doc => {
    if (isNaN(id)) {
      return res.status(500).json({ error: "The post information could not be retrieved." });
    } else if (JSON.stringify(doc).length === 2) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.send(doc);
  });
});

app.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id).then(
    doc => {
      res.status(200).json({
        url: `/hobbits/${id}`,
        operation: `DELETE for hobbit with id ${id}`
      });
    },
    err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  );
});

app.listen(3000, () => console.log("The server is up and listening on port 3000"));
