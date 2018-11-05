// import your node modules

const db = require("./data/db.js");

// add your server code starting here

const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "No content here, please see /api/posts to begin" });
});


///


server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be received." });
    });
});

///

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post && post.length) {
        return res.status(200).json(post);
      } else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

///

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
  db.insert({title, contents})
    .then(post => {
        res.status(201).json(post);
      })
    .catch(error =>
      res
        .status(400)
        .json({
          error: "There was an error while saving the post to the database."
        })
    );
} else {
    return res
    .status(400)
    .json({
      errorMessage: "Please provide title and contents for the post."
    });
}

});

///

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
      if (post && post.length) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed." });
    });
});


server.put("/api/posts/:id", (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;
    if (title && contents) {
        db.update(id, {title, contents})
        .then(post => {
            console.log(post)
            if (post === 0) {
                res.status(404).json({message: 'The post with the specified ID does not exist.'})
            } else {
                res.status(200).json(post)
            }
        })
    } else {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
    }
})






////
server.listen(9000, () => console.log("Server listening at port 9000"));
