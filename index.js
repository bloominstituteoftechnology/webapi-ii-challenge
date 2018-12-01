// import your node modules
const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = 4000;

server.use(express.json());

const serverMessage = (res, status, message) => {
  res.status(status).json({ message: message });
};

const message404 = "The post with the specified ID does not exist.";

const message400 = "Please provide title and contents for the post.";

const retrievalMessage = "The post information could not be retrieved.";

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      serverMessage(res, 500, retrievalMessage);
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.json(post);
      } else {
        serverMessage(res, 404, message404);
      }
    })
    .catch(err => {
      serverMessage(res, 500, retrievalMessage);
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post)
      .then(idInfo => {
        db.findById(idInfo.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        serverMessage(
          res,
          500,
          "There was an error while saving the post to the database"
        );
      });
  } else {
    serverMessage(res, 400, message400);
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(num => {
      if (!num) {
        serverMessage(res, 404, message404);
      } else {
        serverMessage(res, 200, "successfully deleted");
      }
    })
    .catch(err => {
      serverMessage(res, 500, "The post could not be removed");
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (post.title && post.contents) {
    db.update(id, post)
      .then(num => {
        if (!num) {
          serverMessage(res, 404, message404);
        } else {
          db.findById(id).then(post => {
            res.json(post);
          });
        }
      })
      .catch(err => {
        serverMessage(res, 500, "The post information could not be modified");
      });
  } else {
    serverMessage(res, 400, message400);
  }
});

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
