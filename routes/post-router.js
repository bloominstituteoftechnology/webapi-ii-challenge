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
  console.log('psot data', postData)

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



module.exports = router