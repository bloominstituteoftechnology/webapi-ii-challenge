// implement your API here
// import db from "./data/db.js"; //ES2015 modules
const express = require("express");

const db = require("./data/db.js"); // Common JS

const server = express();

// This is what we need to parse our data!
server.use(express.json());

const errorReport = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

//post requests
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    errorReport(400, "You forgot your title and or contents, buddy!", res);
    return;
  }
  db.insert({
    title,
    contents
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      errorReport(
        500,
        "There was some trouble adding this user to the database.",
        res
      );
    });
});

// trying to get all users
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).send({ posts });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .errorReport(500, "The users information could not be retrived", res);
    });
});

// trying to find user at particular id
server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (!post) {
        {
          errorReport(500, "There is no user with that id!"), res;
        }
      }
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      errorReport(500, "There was an error looking up that user", res);
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => res.status(200).json(post));
      } else {
        res.status(404).json({ message: "The user does not exist!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    errorReport(400, "You forgot your title and or contents, buddy!", res);
    return;
  }
  db.findById(id).then(post => {
    if (post) {
      db.update(id, req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

server.listen(5001, () => console.log("API running on port 5001"));
