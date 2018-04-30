const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./data/db.js");

app.use(bodyParser.json());
app.listen(5000);

// root url

app.get("/", function(req, res) {
  res.json({ api: "Server is running" });
});

// get all posts

app.get("/api/posts", function(req, res) {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(`{error: "Post info retrieving error" }`);
    });
});

// get post by id

app.get("/api/posts/:id", function(req, res) {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(...post);
      } else {
        res.status(404).json({ errorMessage: "Such post does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "There was an error with the request" });
    });
});

// post route

app.post("/api/posts", function(req, res) {
  let post = req.body;

  if (post.title && post.contents) {
    db
      .insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// app.delete("/api/posts/:id", function(req, res) {
//   const id = req.params.id;

//   db
//     .remove(id)
//     .then(response => {
//       if (response === 0) {
//         res.status(404).json({ errorMessage: "No such post exists" });
//       } else {
//         res.status(200).json(post);
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ errorMessage: "Something gone wrong" });
//     });
// });

// delete route

app.delete(`/api/posts/:id`, function(req, res) {
  const id = req.params.id;
  db
    .findById(id)
    .then(response => {
      if (response.length > 0) {
        const post = { ...response[0] };
        db.remove(id).then(resp => {
          res.status(200).json(post);
        });
      } else {
        res.status(404).json({ message: `The post was not found.` });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: `he post could not be removed. Internal server error!`
      });
    });
});

// update route

app.put("/api/posts/:id", function(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (!data.title || !data.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db
    .update(id, data)
    .then(response => {
      if (response > 0) {
        db.findById(id).then(post => {
          res.status(200).json(post);
        });
      } else {
        res.status(404).json({ errorMessage: "No such post found" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});
