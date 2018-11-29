// import your node modules

const express = require("express");

const db = require("./data/db.js");

const server = express();
const PORT = 3030;
server.use(express.json());

// add your server code starting here

const statusMessage = (code, message) => {
  res.status(code).json({ error: message });
};

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      statusMessage(500, "The posts information could not be retrieved.");
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.json(post);
      } else {
        statusMessage(404, "The post with the specified ID does not exist.");
      }
    })
    .catch(err => {
      statusMessage(500, "The post information could not be retrieved.");
    });
});

server.post("/api/posts", async (req, res) => {
  const post = req.body;
  if (post.title && post.contents !== "") {
    try {
      const userId = await db.insert(post);
      const userPost = await db.findById(userId.id);
      res.status(201).json(userPost);
    } catch (err) {
      statusMessage(
        500,
        "There was an error while saving the post to the database"
      );
    }
  } else {
    statusMessage(400, "Please provide title and contents for the post.");
  }
});
server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const updated = req.body;
  db.update(id, updated)
    .then(count => {
      if (count) {
        if (updated.title && updated.contents !== "") {
          res.status(200).json(updated);
        } else {
          statusMessage(400, "Please provide title and contents for the post.");
        }
      } else {
        statusMessage(404, "The post with the specified ID does not exist.");
      }
    })
    .catch(err => {
      statusMessage(500, "The post information could not be modified.");
    });
});

server.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await db.findById(id);
  db.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json(deleted);
      } else {
        statusMessage(404, "The post with the specified ID does not exist.");
      }
    })
    .catch(err => {
      statusMessage(500, "The post could not be removed");
    });
});

server.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
