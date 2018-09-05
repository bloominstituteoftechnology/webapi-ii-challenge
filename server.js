// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();
// add your server code starting here
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ errorMsg: "Could not get" });
    });
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res
      .status(400)
      .json({ errorMsg: "Please provide title and content" });
  } else {
    db.insert({ title, contents })
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({ errorMsg: "Could not post" });
      });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(id => {
      if (id === 0) {
        res
          .status(404)
          .json({ errorMsg: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ msg: "deleted", id });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    const { title, contents } = req.body;

  if (!title || !contents) {
    return res
      .status(400)
      .json({ errorMsg: "Please provide title and content" });
  }
    db.update(req.params.id, req.body)
    .then(data => {
        if (data === 0) {
            res
              .status(404)
              .json({ errorMsg: "The post with the specified ID does not exist." });
          }
        res.json(data);
    })
    .catch(err => {
        console.log(err)
        res.json(err);
    })
})

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
