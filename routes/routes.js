const express = require('express');
const db = require('../data/db.js');
const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(allPosts => res.status(200).json(allPosts))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Couldn't find posts"})
    })
});

router.post('/', (req, res) => {
  const {postTitle, postContent} = req.body;

  if(postTitle && postContent){
    db.insert({postTitle, postContent})
      .then()
  }
  else {
    console.log("Placeholder")
  }
})


module.exports = router;