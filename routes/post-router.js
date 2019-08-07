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
});

// GET post by Id
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  console.log('post ID', postId)
  const postData = req.body;
  console.log('post data', postData)

  Data.findById(postId)
    .first()
    .then(post => {
      if(post){
        console.log('post', post)
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(400).json({ message: "The post information could not be retrieved." })
    })
});

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
});

// PUT data into an existing post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if(!updates.title || !updates.contents){
    res.status(400).json({ message: "Please provide title and contents for the post." })
  } else {
    Data.update(id, updates)
    .then(updatedPost => {
      res.status(200).json(updatedPost)
    })
    .catch(error => {
      res.status(500).json({ message: "The post information could not be modified." })
    })
  }
});

// DELETE post by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params)

})

module.exports = router