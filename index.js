// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

// add your server code starting here

const server = express();
server.use(express.json());
server.use(cors());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length !== 0) {
        console.log(post);
        res.status(200).json(post);
      } else {
        console.log(post);
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// server.post("/api/posts", (req, res) => {
//   db.insert(req.body)
//     .then(postId => {
//       return db.findById(postId.id)
//         .then(post => {
//           res.status(201).json(post);
//         })
//         .catch(error => {
//           res.status(500).json({
//             error: "There was an error while saving the post to the database"
//           });
//         });
//     })
//     .catch(error => {
//       res.status(400).json({
//         errorMessage: "Please provide title and contents for the post."
//       });
//     });
// });

server.post('/api/posts', async (req, res) => {
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    const post = await db.findById(postId.id);
    res.status(201).json(post);
  } catch (error) {
    if (error.errno === 19) {
      res.status(400).json({ message: "There was an error while saving the post to the database" });
    }

    res.status(500).json({ message: "Please provide title and contents for the post." });
  }
});

server.delete("/api/posts/:id", (req, res) => {
    db.remove(req.params.id)
    //  Promise.reject(new Error('testing'))
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
