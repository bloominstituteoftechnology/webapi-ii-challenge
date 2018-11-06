// import your node modules

const db = require("./data/db.js");

// add your server code starting here

const express = require("express");
const server = express();
server.use(express.json());

server.get("/api/posts", (req, res) => {
  console.log(req.params);
  db.find()
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved.",
        error: err
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved.",
        error: err
      });
    });
});

server.post("/api/posts", async (req, res) => {
  try {
    const addedPost = req.body;
    const postId = await db.insert(addedPost);
    const post = await db.findById(postId.id);
    res.status(201).json(post);
  } catch (error) {
    let message = "error creating the post";

    if (error.errno === 19) {
      message = "please provide both the title and the content";
    }

    res.status(500).json({ message, error });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) res.json(count);
      else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved.",
        error: err
      });
    });
});

server.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  let editedPost = req.body;

  if(!editedPost.title || !editedPost.contents){
      res.status(400)
      .json({errorMessage: "Please provide title and contents for the post."})
  }
  try {
    const count = await db.update(id, editedPost);
    console.log("count at put = ", count);
    if (count) {
      editedPost = await db.findById(id);
      res.status(200).json(editedPost);
    }
    else{
        res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    }
  } catch (error) {
      console.log(error);
    res.status(500).json({
      error: "The post information could not be modified.",
      error
    });
  }
});

server.listen(9000, console.log("\n Server ALIVE \n"));

//below post handler works and return id
// server.post("/api/posts", (req, res) => {
//   const addedPost = req.body;
// console.log(addedPost);
//   // - cancel the request.
//   // - respond with HTTP status code `400` (Bad Request).
//   // - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

//   if (addedPost.title && addedPost.contents) {
//     db.insert(addedPost)
//       .then(id => {
//         res.json(id);
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: "error: There was an error while saving the post to the database",
//           error: err
//         });
//       });
//   } else
//     res
//       .status(400)
//       .json({
//         errorMessage: "Please provide title and contents for the post."
//       });
// });
