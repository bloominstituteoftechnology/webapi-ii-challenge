// import your node modules

const db = require("./data/db.js");
const cors = require("cors");

// add your server code starting here
const express = require("express");
const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "findById failed", error: err });
    });
});

// This way works - going to try an async/await style
// server.post('/api/posts', (req, res) => {
//   const { title, contents } = req.body;
//   const newPost = { title, contents };

//   if(!newPost || !newPost.title || !newPost.contents){
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide title and contents for the post." });
//   } else {
//     db.insert(newPost)
//       .then(insertedPost => {
//         res.status(201).json({ 'Post Created!': insertedPost });
//       })
//       .catch(err => {
//         res.send(err);
//       })
//   }
// });

server.post("/api/posts", async (req, res) => {
  try {
    const postData = req.body;
    if (!newPost || !newPost.title || !newPost.contents) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    } else {
      db.insert(newPost)
        .then(insertedPost => {
          res.status(201).json({ "Post Created!": insertedPost });
        })
        .catch(err => {
          res.send(err);
        });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: "error creating post", error: error });
  }
});

server.put("/api/posts/:id", (req, res) => {
  let { id } = req.params;
  let updatedPost = req.body;

  db.findById(id)
    .then(updatePost => {
      if (updatePost.length > 0) {
        if (!updatedPost || !updatedPost.title || !updatedPost.contents) {
          res
            .status(400)
            .json({
              errorMessage: "Please provide title and contents for the post."
            });
        } else {
          db.update(id, updatedPost)
            .then(updatePost => {
              res.status(201).json({ "Post Updated!": updatePost });
            })
            .catch(err => {
              res.send(err);
            });
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The post information could not be modified."
        });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.remove(id).then(count => {
          res.status(200).json(count);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(9000, () => console.log("Listening on 9000"));
