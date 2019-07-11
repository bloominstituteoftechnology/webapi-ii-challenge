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
  const text = req.body.text;
  const id = req.params.id;

db.findById(id).then(found =>{
  //res.status(200).json(found);
  if(found && found.length){
    db.insertComment({text: text, post_id: id})  
  .then( commentResponse => {
      console.log("text", text);
      console.log("id", id);
      if(text){
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
  } else{
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  }  
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
    if(posts && posts.length){
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }  
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
    if(commentRes && commentRes.length){
      res.status(200).json(commentRes);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
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
    if(postRes && postRes.length){
      res.status(200).json(postRes);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist to delete." });
    }
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
  .then(() => {
    //res.status(200).json(updated);
    db.findById(id)
    .then(postRes => {
      console.log(id);
      if(postRes && postRes.length){
        res.status(200).json(postRes);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist to delete." });
      }
    })
  })
  .catch(error => {
    res.status(500).json(error);
  })
  
})

module.exports = router;