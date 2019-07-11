const express = require("express");

const db = require("./db.js")

const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
  const post = req.body;
db.insert(post)
  .then( postResponse => {
    // console.log("post", post);
    // console.log("contents", post.contents);
    if(post.title && post.contents){
      res.status(201).json(postResponse);
    } 
    else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  })
  .catch(error => {
    res.status(500).json(error);
      //: "There was an error while saving the post to the database"}
  })
});
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
db.insertComment(comment)
  .then( commentResponse => {
    // console.log("post", post);
    // console.log("contents", post.contents);
    if(post.title && post.contents){
      res.status(201).json(commentResponse);
    } 
    else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  })
  .catch(error => {
    res.status(500).json(error);
      //: "There was an error while saving the post to the database"}
  })
});



router.get("/", (req, res) => {
  
  db.find().then(posts => {
    res.status(200).json(posts);
  }).catch(error => {
    res.status(500).json(error);
  })
})

module.exports = router;