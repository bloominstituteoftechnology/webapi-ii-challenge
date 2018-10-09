// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

const server = express();
server.use(cors());
server.use(express.json());

const missingDataError = {
  errorMessage: "Please provide title and contents for the post."
};
const invalidTypeError = {
  errorMessage: "Post title and contents must be a string."
};
const postNotFound = {
  errorMessage: "The post with the specified ID does not exist."
};
const single500 = {
  errorMessage: "The post information could not be retrieved"
};

// add your server code starting here
const server = express();

server.use(cors());

// Returns an array of all the post objects contained in the database
server.get("/api/posts", (req, res) => {
  const error500 = {
    errorMessage: "The posts information could not be retrieved"
  };
  db.find()
    .then(posts => res.status(200).send(posts))
    .catch(error => {
      res.status(500).json(error500);
    });

  // Creates a post using the information sent inside the request body
  server.post("/api/posts", (req, res) => {
    // Destructuring for Validation
    const { title, contents } = req.body;

    // Unique Error Messages
    const errorSavingPost = {
      errorMessage: "There was an error while saving the post to the database."
    };

    // Error Handling Conditionals
    if (!title && !contents) {
      res.status(400).send(missingDataError);
    }
    if ((!typeof title === typeof contents) === "string") {
      res.status(400).send(invalidTypeError);
    }
    // Database Promise Method
    db.insert({ title, contents })
      .then(postId => res.status(201).send(postId))
      .catch(() => res.status(500).send(errorSavingPost));
  });

  // Returns the post object with the specified id
  server.get("api/posts/:id", (req, res) => {
    db.findById(req.params.id)
      .then(post => {
        if (post.length > 0) {
          res.status(200).send(post);
        } else res.status(404).send(postNotFound);
      })
      .catch(error => res.status(500).send(single500));
  });

  // Removes the post with the specified id and returns the deleted post
  server.delete("/api/posts/:id", (req, res) => {
    // Unique Error Messages
    const error500 = { errorMessage: "The post could not be removed" };

    // Database Promise Methods
    db.findById(req.params.id)
      .then(post => {
        if (post.length > 0) {
          db.remove(req.params.id)
            .then(deleted => {
              if (!deleted) {
                res.status(404).send("squiggly");
              }
              res.status(200).send(post);
            })
            .catch(() => res.status(500).send(error500));
        } else {
          res.status(404).send(postNotFound);
        }
      })
      .catch(() => res.status(500).send(single500));
  });

  // Updates the post. Returns the modified document, NOT the original.
  server.put("/api/posts/:id", (req, res) => {
    // Destructuring for Validation
    const { title, contents } = req.body;

    // Unique Error Messages
    const error500 = {
      errorMessage: "The post information could not be modified."
    };

    // Error Handling Conditionals
    if (!title && !contents) {
      res.status(400).send(missingDataError);
    }
    if ((!typeof title === typeof contents) === "string") {
      res.status(400).send(invalidTypeError);
    }
    db.update(req.params.id, { title, contents })
      .then(updated => {
        if (updated) {
          db.findById(req.params.id)
            .then(post => {
              if (post.length > 0) {
                res.status(200).send(post);
              } else {
                res.status(404).send(postNotFound);
              }
            })
            .catch(() => res.status(500).send(single500));
        } else {
          res.status(404).send(postNotFound);
        }
      })
      .catch(() => res.status(500).send(error500));
  });

  // Activates Server Port
  const port = 3333;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
