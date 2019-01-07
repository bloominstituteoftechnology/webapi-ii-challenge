// import your node modules
const db = require("./data/db.js");
const express = require("express");

// add your server code starting here
const app = express();
app.use(express.json());

app.get("/api/posts", (req, res) => {
  db.find().then(
    doc => {
      res.status(200).send(doc);
    },
    err => res.status(500).json({ error: "The posts information could not be retrieved" })
  );
});

app.get(`/api/posts/:id`, (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post[0]) {
        res.json(post[0]);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db.findById(id)
    .then(post => {
      post = post[0];
      if (post) {
        db.remove(id).then(doc => res.status(200).json(post));
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }));
});

app.listen(3000, () => console.log("The server is up and listening on port 3000"));
