const router = require('express').Router();
const db = require('../data/db.js')

router.get('/', (req, res) => {
     const query = req.query;
     console.log(query)

     db.find(query)
     .then(item => {
          res.status(200).json(item)
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({
               message: "Error retrieving post"
          })
     })
})

router.get('/:id', (req, res) => {
     db.findById(req.params.id)
     .then(post => {
          res.status(200).json(post)
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({
               message: "Error retrieving post"
          })
     })
})

router.get('/:id/comments', (req, res) => {
     db.findPostComments(req.params.id)
     .then(post => {
          res.status(200).json(post)
     })
})

router.post('/', (req, res)=> {
     db.insert(req.body)
     .then(post => {
          res.status(201).json(post)
     })
     .catch(error => {
          res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
     })
})

// TODO: REWORK
router.post('/:id/comments', (req, res)=> {
     db.insertComment(req.body)
     .then(comment => {
          res.status(201).json(comment)
     })
})


router.delete('/:id', (req,res)=> {
     db.remove(req.params.id)
     .then(post => {
          res.status(201).json(post)
     })
})


router.put('/:id', (req, res) => {
     db.update(req.params.id, req.body)
     .then(post => {
          res.status(201).json(post)
     })
})



module.exports = router;


/*
TODO: NOTES
* POST / - DONE 
creates a post 

* POST /:id/comments
creates a comment for the post with specified ID 

* GET / - DONE
gets all of the posts 

* GET /:id - DONE
gets the post with that ID

* GET /:id/comments - DONE 
gets all of the comments from that post with ID

* DELETE /:id - DONE 

* PUT  /:id - DONE 

*/