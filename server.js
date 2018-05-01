// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

// GET posts; find()
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500) // 500 Server Error
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET posts by ID; findById()
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404) // 404 Not Found
          .json({ error: "The post with the specified ID does not exist." });
      } else {
        res.json(post[0]); // Returns first element of array
      }
    })
    .catch(error => {
      res.status(500).json({
        // 500 Server Error
        error: "The post information could not be retrieved."
      });
    });
});

// POST new post; insert()
server.post("/api/posts", (req, res) => {
  const post = req.body;

  // Make sure title AND content provided
  if (post.title && post.contents) {
    db
      .insert(post)
      .then(response => {
        res.status(201).json(response); // 201 Created
      })
      .catch(error => {
        res.status(500).json({
          // 500 Server Error
          error: "There was an error while saving the post to the database."
        });
      });
  } else {
    res.status(400).json({
      // 400 Bad Request - include title AND contents
      error: "Please provide title and contents for the post."
    });
  }
});

//PUT new post; update()
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  // Check for both title AND contents
  if(!(data.title && data.contents)) {
      res.status(400).json({
          error: "Please provide title and contents for the post."
      })
  }

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(posts => {
          res.status(200).json(posts[0]); // 200 OK
        });
      } else {
        res
          .status(400) // 400 Bad Request
          .json({ error: "Bad request. Please fill out required fields" });
      }
    })
    .catch(error => {
      res.status(500).json(error); // 500 Server Error
    });
});

// DELETE post; remove()
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0] };

      db.remove(id).then(response => {
        res.status(200).json(response);
      });
    })
    .catch(error => {
      res.status(500).json({
        error: "The post could not be deleted."
      });
    });
});

server.listen(5000, () => console.log("\n== Server running on port 5000 ==\n"));
