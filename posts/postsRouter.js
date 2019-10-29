const router = require('express').Router();
const db = require('../data/db.js')

// * GET all posts
router.get('/', (req, res) => {
     const query = req.query;
     console.log(query)

     db.find(query)
     .then(item => {
          res.status(200).json(item)
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({ error: "The posts information could not be retrieved." })
     })
})

// * GET post by ID
router.get('/:id', (req, res) => {
 db.findById(req.params.id)
     .then(post => {
          if(post){
               res.status(200).json(post)
          } else{
               res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({ error: "The posts information could not be retrieved." })
     })
})


// * GET comment by ID
router.get('/:id/comments', (req, res) => {
     db.findPostComments(req.params.id)
     .then(post => {
          if(post){
               res.status(200).json(post)
          } else{
               res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
     })
     .catch(error => {
          res.status(500).json({ error: "The comments information could not be retrieved." })
     })
})




// * POST new post 
router.post('/', (req, res)=> {
     db.insert(req.body)
     .then(post => {
          if(post){
               res.status(201).json(post)
          } else{
               res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
          }
     })
     .catch(error => {
          res.status(500).json({ error: "There was an error while saving the post to the database" })
     })
})

// * POST new comment
router.post('/:id/comments', (req, res)=> {

     const id = req.params.id;
     const newComment = {...req.body, post_id:id};

     db.findById(id)
     .then(post => {
          if(post){
               db.insertComment(newComment)
               .then(comment => res.status(201).json(comment))
               .catch(error => res.status(400).json({ errorMessage: "Please provide text for the comment." }))
          }else{
               res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
     })
     .catch(error => {
          res.status(500).json({ error: "There was an error while saving the comment to the database" })
     })
})


router.delete('/:id', (req,res)=> {
     db.remove(req.params.id)
     .then(post => {
          if(post){
               res.status(201).json(post)
          } else{
               res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
     })
     .catch(error => {
          res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
     })
})


router.put('/:id', (req, res) => {
     db.update(req.params.id, req.body)
     .then(post => {
          if(post){
               res.status(201).json(post)
          } else{
               res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
     })
     .catch(error => {
          res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
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