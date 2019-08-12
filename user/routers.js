const express = require("express");
const DB = require("../data/db.js");
const router = express.Router();

//get
router.get("/", (req, res) => {
  DB.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    DB.findById(id)
      .then(userId => res.status(200).json(userId))
      .catch(err => {
        err
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

//post
router.post("/", (req, res) => {
  const blogBody = req.body;
  const { title, contents } = req.body;
  if (title && contents) {
    DB.insert(blogBody)
      .then(blogs => {
        console.log(blogs);
        res.status(201).json(blogs);
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

//deletereq,r
router.delete("/", (req, res) => {
  const { id } = req.params;
  if (id) {
    DB.remove(id)
      .then(user => res.status(200).json(user))
      .catch(err =>
        res.status(500).json({ error: "The post could not be removed" })
      );
  } else
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
});
router.put("/:id", (req, res) => {
  //get your id
  const { id } = req.params;
  //get your body of data
  const blogInfo = req.body;
  //get the title and content
  const { title, contents } = req.body;

  console.log(title, contents);
  // if no id do this
  if (!id) {
    DB.update(id, blogInfo).then(user =>
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    );
  }

  //if no title or no content do this
  else if (!title) {
    DB.update(id, blogInfo).then(user =>
      res.status(400).json({
        errorMessage: "Please provide title for the post."
      })
    );
  }

  //if no title or no content do this
  else if (!contents) {
    DB.update(id, blogInfo).then(user =>
      res.status(400).json({
        errorMessage: "Please provide contents for the post."
      })
    );
  }

  //if every thing is correct do this
  else
  {  DB.update(id, blogInfo)
      .then(user => res.status(200).json(user))
      .catch(err =>
        res
          .status(500)
          .json({ message: "you fucked up the backend j check it my guy." })
      );}
});

module.exports = router;
