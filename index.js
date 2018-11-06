// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here

const server = express();

server.get("/", (req, res) => {
  res.json({ hello: "testing" });
});

server.use(express.json());

// get
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "failed", error: err });
    });
});

// get by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user.length) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed", error: err });
    });
});

// // post
// server.post("/api/users/", (req, res) => {
//   console.log(req.body);
//   let newPost = req.body;
//   if (!newPost.title || !newPost.contents) {
//     res.status(400).json({ errorMessage: "error" })
//   } else {
//     db.insert(newPost)
//     .then(post => {
//       res.status(201).json(post)
//     })
//     .catch(err => {
//       res.status(500).json({ message: "failed", error: err })
//     })
// }
// }

server.post("/api/users/", (req, res) => {
  console.log(req.body);
  // res.send('success');
  let newpost = req.body;

  if (!newpost.title || !newpost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(newpost)
      .then(addedPost => {
        res.status(201).json(newpost);
      })
      .catch(error => {
        res.status(500).json({
          error:
            "There was an error while saving the post to the database. The error is ",
          error
        });
      });
  }
});

// put

server.put("/api/users/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

// delete

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting user" });
    });
});

// server listen
server.listen(9000, () => console.log("the server is alive"));
