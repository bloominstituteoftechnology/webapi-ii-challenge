const express = require("express");
const cors = require("cors");
const posts = require("./data/db");

const server = express();

server.use(cors());
server.use(express.json());

// BEGINNING OF END POINTS

server.post("/api/posts", createPost);
server.post("/api/posts/:id/comments", createComment);
server.get("/api/posts", getPosts);
server.get("/api/posts/:id", getIndividualPost);
server.get("/api/posts/:id/comments", getComments);
server.delete("/api/posts/:id", deletePost);
server.put("/api/posts/:id", updatePost);

// END OF END POINTS

// BEGINNING OF REQUEST HANDLERS

function createPost(req, res) {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
      .end();
  }
  posts
    .insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        })
        .end();
    });
}

function createComment(req, res) {
  const { text } = req.body;
  const { id } = req.params;
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." })
      .end();
  } else {
    posts
      .findById(id)
      .then(data => {
        if (data.length === 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        } else {
          posts
            .insertComment(req.body)
            .then(data => {
              res.status(201).json(data);
            })
            .catch(error => {
              res
                .status(500)
                .json({
                  error:
                    "There was an error while saving the comment to the database"
                })
                .end();
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function getPosts(req, res) {
  posts
    .find()
    .then(data => {
      res
        .status(200)
        .json(data)
        .end();
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
        .end();
    });
}

function getIndividualPost(req, res) {
  const { id } = req.params;
  posts
    .findById(id)
    .then(data => {
      if (data.length === 0) {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
        .end();
    });
}

// MY SOLUTION BELOW

// function getComments(req, res) {
//   const { id } = req.params;
//   posts
//     .findById(id)
//     .then(data => {
//       if (data.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       } else {
//         posts
//           .findPostComments(id)
//           .then(data => {
//             res.status(200).json(data);
//           })
//           .catch(error => {
//             res.json(500).json({
//               error: "The comments information could not be retrieved."
//             });
//           });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// GABE SOLUTION BELOW

function getComments(req, res) {
  const { id } = req.params;
  posts
    .findById(id)
    .then(data => {
      if (data.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return posts.findPostComments(id);
      }
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function deletePost(req, res) {
  const { id } = req.params;
  posts
    .remove(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
          .end();
      } else {
        res.status(200).json({ message: "the post was deleted" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post could not be removed" })
        .end();
    });
}

function updatePost(req, res) {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
      .end();
  } else {
    posts
      .update(id, req.body)
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        } else {
          res.status(200).json(data);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
          .end();
      });
  }
}

// END OF REQUEST HANDLERS

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
