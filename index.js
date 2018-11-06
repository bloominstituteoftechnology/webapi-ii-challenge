const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.listen(9000, () => console.log("Listening on port 9000."));

const sendUserError = (status, msg, res, err) => {
  res.status(status).json({ error: msg });
  console.error(err);
  return;
};

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      sendUserError(
        500,
        "The posts information could not be retrieved.",
        res,
        err
      );
    });
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
      sendUserError(
        500,
        "The posts information could not be retrieved.",
        res,
        err
      );
    });
});

server.post("/api/posts/", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!newPost) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
    return;
  }
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      sendUserError(
        500,
        "There was an error while saving the post to the database",
        res,
        err
      );
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.remove(id).then(count => {
          res
            .status(200)
            .json(`Deleted ${count} post. Post id ${id} successfully deleted.`);
        });
      } else {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      sendUserError(500, "The post could not be removed", res, err);
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title && !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
    return;
  }
  db.findById(id)
    .then(post => {
      const postToUpdate = { title, contents };
      if (post.length > 0) {
        db.update(id, postToUpdate).then(count => {
          res
            .status(200)
            .json(`Updated ${count} post. Post id ${id} successfully updated.`);
        });
      } else {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      sendUserError(
        500,
        "The post information could not be modified.",
        res,
        err
      )
    );
});

server.get("/posts", (req, res) => {
  console.dir(req, { depth: 1 });
  const { id } = req.query;

  if (id) {
    db.findById(id).then(posts => res.send(posts));
  } else {
    db.find().then(posts => res.send(posts));
  }
});
