const router = require('express').Router();
const Data = require('../data/db');


// GET all posts
router.get('/', (req, res) => {
  Data.find()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({ message: "The posts information could not be retrieved." })
  })
})

// GET post by Id
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  console.log('post ID', postId)
  const postData = req.body;
  console.log('post data', postData)

  if(!postId){
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  } else {
    Data.findById(postId)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(400).json({ message: "The post information could not be retrieved." })
    })
  }
})

// POST new post 
router.post('/', (req, res) => {
  const postData = req.body;
  console.log('post data POST', postData);

  if(!postData.title || !postData.contents) {
    res.status(400).json({ message: "Please provide title and contents for the post." })
  } else {
    Data.insert(postData)
    .then(post => {
      res.status(201).json(post)
      console.log('post', post)
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error while saving the post to the database" })
    })
  }
})


module.exports = router