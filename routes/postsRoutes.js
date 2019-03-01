const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const post = req.body;
  //if the title or the contents are missing them send an error
  !req.body.title || !req.body.contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : db
        .insert(post)
        .then(({ id }) => {
          db.findById(id).then(post => {
            res.status(201).json(post);
          });
        })
        .catch(error =>
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          })
        );
});

//and get a single post by it's ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      post.length > 0
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      console.log(count);
      count < 1
        ? res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        : res.status(200).json({ message: "Post Was Successfully Deleted" });
    })
    .catch(error =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

module.exports = router;
