// import your node modules
const express = require("express");
const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get("/api/posts/:postid", (req, res) => {
  const id = req.params.postid;

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
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//   server.post('/api/posts/', (req, res) => {
//     const newPost = req.body;

//     db.insert(newPost)
//       .then(newPost => {
//           if (newPost) {
//               res.status(201).json(newPost);
//           } else {
//             res.status(404).json({ errorMessage: "Please provide title and contents for the post." });
//           }
//       })
//       .catch(err => res.status(500).json({error: "There was an error while saving the post to the database"  }));
//   });

server.post("/api/posts", (req, res) => {
  const newPost = req.body; // reads information from the body of the request
  console.log(newPost);

  if (!newPost.title || !newPost.contents) {
    return res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
  db.insert(newPost) // returns a promise, so we need to use .then
  .then(result => {
    db.findById(result.id)
      .then(post => {
            res.status(201).json(post);
            console.log('This is a post', post);
      })
      .catch(err =>
        res.status(500).json({ message: "The post with the specified ID does not exist.", error: err })
      );
  })
  .catch(err =>
    res.status(500).json({ error: "There was an error while saving the post to the database"  })
  );
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => {
          res.status(200).json(post);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.listen(5000, () => console.log("Server is running"));
