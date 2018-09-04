const express = require("express"); // CommonJS

const db = require("./data/db.js");

const server = express();

//configure middleware for the server
server.use(express.json());

//configure routing (routing is also a form of middleware)
server.get("/", (req, res) => {
  res.send("hello cs12");
});

// GET to /api/posts/ complete
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);

      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET to /api/posts/:id
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params; // same as const id = req.params.id
  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(204).json(posts)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("error:", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// POST complete
server.post("/api/posts", async (req, res) => {
  // http message = header + body(data)
  const post = req.body; //this requires the express.json() middleware

  if (post.title && post.contents) {
    try {
      const response = await db.insert(post);
      res.status(201).json({ message: "post created successfully" });
      // 200-299 success (created in ^ case), 300-399: redirection, 400-499 client error, 500+ server error
    } catch (ex) {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        });
    }
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
  // equivilent to the above try and catch (not the if else thats extra example). below is promise (not async)
  //   db.insert(user)
  //     .then(response => response.status(201).json(response))
  //     .catch(err => res.status(500).json(err));
});

// DELETE
server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params; // same as const id = req.params.id
  
    db.remove(id).then(count => {
      if (count) {
          res.status(204).end()
      } else {
          res.status(404).json({ message: "The post with the specified ID does not exist."})
      }
      })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }));
    });
  
// PUT
server.put("/api/posts/:id", (req, res) => {
    db.update(req.params.id, req.body).then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({message: 'update failed'}))
}) 
//start the server
server.listen(9000, () => console.log("\n== API on port 9K ==\n"));
