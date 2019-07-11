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
    console.log("response", comment);
    if(comment.text){
      res.status(201).json(commentResponse);
    } 
    else {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
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
router.get("/:id", (req, res) => {
  const id = req.params.id;
  //console.log("id", id)
  db.findById(id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  //console.log("id", id)
  db.findPostComments(id)
  .then(commentRes => {
    res.status(200).json(commentRes);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id)
  db.findById(id)
  .then(postRes => {
    res.status(200).json(postRes);
  })
  .catch(error => {
    res.status(500).json(error);
  })

  db.remove(id)
  .then(commentRes => {
    res.status(200).json(commentRes);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const change  = req.body;

  db.update(id, change)
  .then(updated =>{
    //res.status(200).json(updated);
    db.findById(id)
    .then(postRes => {
      console.log(id);
      res.status(200).json(postRes);
    })
  })
  .catch(error => {
    res.status(500).json(error);
  })
  
})

module.exports = router;