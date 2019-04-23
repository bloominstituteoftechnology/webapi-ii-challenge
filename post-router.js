const express = require("express");
const router = express.Router();
const db = require("./data/db");
router.use(express.json());

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Something is missing."
    });
  } else {
    db.insert({ title, contents })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "There was an error while saving the post to the database"
        });
      });
  }
});

router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Could not secure" });
    });
});

router.get("/:id", (req, res) => {
  const postid = req.params.id;
  db.findById(postid)
    .then(id => {
      if (id) {
        db.findById(postid).then(findId => {
          res.status(200).json(findId);
        });
      } else {
        res.status(404).json({ message: " No ID found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Could not secure" });
    });
});

router.delete("/:id", (req, res) => {
  const postid = req.params.id;
  db.remove(postid)
    .then(post => {
      if (post) {
        db.remove(postid).then(removepost => {
          res.status(201).json(removepost);
        });
      } else {
        res.status(404).json({
          error: err,
          mesage: "The user with specified ID does no exist"
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  const postId = req.params.id;

  db.update(postId, { title, contents })
    .then(posts => {
      if (posts) {
        db.findById(postId).then(updatepost => {
          res.status(201).json(updatepost);
        });
      } else {
        res.status(404).json({ message: "nope" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "could not update" });
    });
});

module.exports = router;
