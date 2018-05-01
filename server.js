// import your node modules
const express = require("express");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const db = require("./data/db.js");
const server = express();
const cors = require('cors');


// middleware
// server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(express.json());
server.use(helmet());
server.use(cors());
// add your server code starting here

// server GET, return 'API is running'
server.get("/", (req, res) => {
  res.send("API is running");
});

// server GET, find "posts", then return it.
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// server GET, find by ID first, then return "post"
server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "Post not found. Try again." });
      } else {
        res.json(post[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// server POST, Insert post, then give response, which is id of the post
server.post("/api/posts", (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });
    });
});

/* TWO ways to use delete */

// server DELETE, find post by id, then all details of the post (content + title) is defined as 'post'.
// delete the 'post' then return the title, content, time, and id of the post deleted.

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0] };
      db
        .remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json({ error: "Nothing to delete" });
        });
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot update the post" });
    });
});

// server DELETE, find post by id, delete post.
// Give boolean respons of 1 or 0 for successful deletion.

// server.delete("/api/posts/:id", (req, res) => {
//   const id = req.params.id;

//   db
//     .remove(id)
//     .then(response => {
//       res.status(201).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Nothing to delete" });
//     });
// });

/* ALSO TWO ways to use update! */

// server PUT, find post by id, update post by items specified.
// Postman e.g.: {title: "chnaged title"} will passed along to change title of post.
// Give boolean respons of 1 or 0 for successful edit.

// server.put("/api/posts/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedPost = req.body;

//   db
//     .update(id, updatedPost)
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Cannot Update" });
//     });
// });

// server PUT, find post by id, then all details of the post (content + title) is defined as 'post'.
// update the 'post' then return the title, content, time, and id of the post updated.

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;

  db
    .update(id, updatedPost)
    .then(response => {
      if (response > 0) {
        db
          .findById(id)
          .then(post => {
            res.status(200).json(post[0]);
          })
          .catch(error => {
            res.status(500).json({ error: "Cannot update the post" });
          });
      } else {
        res.status(404).json({ msg: "post is not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot update the post" });
    });
});

server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));
