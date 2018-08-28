// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("This is working");
});

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);

      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      console.log(post);
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("error", err);

      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/posts", (req, res) => {
  const newPost = req.body;

  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database"
          });
      });
  } else {
    res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
});

server.delete("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      db.remove(post[0].id)
        .then(count => {
          console.log(count);
          if (count) {
            res.status(200).json(post);
          } else {
            res
              .status(404)
              .json({
                message: "The post with the specified ID does not exist."
              });
          }
        })
        .catch(err => {
          console.log("error", err);

          res.status(500).json({ error: "The post could not be removed" });
        });
    })
    .catch(err => {
      console.log("error", err);
    });
});

server.put("/posts/:id", (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (req.body.title && req.body.contents) {
    db.update(req.params.id, req.body)
      .then(count => {
        if (count) {
          db.findById(req.params.id)
            .then(post => {
              console.log(post);
              if (post.length > 0) {
                res.status(200).json(post);
              } else {
                res
                  .status(404)
                  .json({
                    message: "The post with the specified ID does not exist."
                  });
              }
            })
            .catch(err => {
              console.log("error", err);

              res
                .status(500)
                .json({
                  error: "The post information could not be retrieved."
                });
            });
        } else {
          res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist."
            });
        }
      })
      .catch(err => {
        console.log("error", err);

        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
});

server.listen(8000, () => console.log("\n== API on port 8k==\n"));
