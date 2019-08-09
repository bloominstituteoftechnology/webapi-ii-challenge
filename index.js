const express = require('express')

const db = require('./data/db.js')

const server = express()
server.use(express.json())


// POST  //Works ok
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body
  console.log(req.body)

  if(!title || !contents) {
    res.status(400)
    .json({ error: "Please provide title and contents for the post."})
  } else {
    db.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(() => {
      res.status(500).json({
         error: "There was an error while saving the post to the database"
      })
    })
  }
})


//POST MESSAGE // implement messaging
//insertComment(): calling insertComment while passing it a comment object will add it to the database and return an object with the id of the inserted comment. 
//The object looks like this: { id: 123 }. This method will throw an error if the post_id field in the comment object does not match a valid post id in the database.

server.post('/api/posts/:id/comments', async (req, res) => {

   const commentInfo = {...req.body, post_id: req.params.id }
  //  const post_id = req.params.id
  //  const text = req.body

  // if(!user) {
//   res.status(404).json({
//    message: "The post with the specified ID does not exist." 
//   })
// } else if(!text) {
//  res.status(404).json({
//    message: "Please provide text for the comment." 
//   })
// } else {}

    try {
      const newComment = await db.insertComment(commentInfo)
      res.status(201).json(newComment)
    } catch {
      res.status(500).json( {
        message: "There was an error while saving the comment to the database"
     })
    }
})


// GET // Works ok
//find(): calling find returns a promise that resolves to an array of all the posts contained in the database.

server.get('/api/posts', (req, res) => {
  db.find()
  .then(allPosts => {
    res.status(200).json(allPosts)
  })
  .catch(() => {
    res.status(500).json({
      error: "The posts information could not be retrieved." 
  })
 })
})


//GET POSTS by ID // implement messaging
//findById(): this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404)
      .json({ message: 'The post with the specified ID does not exist.'})
    }
  })
  .catch(() => {
    res.status(500)
    .json({ error: 'The post information could not be retrieved.'})
  })
})



// GET POST COMMENTS BY POST ID // implement messaging
// Returns an array of all the comment objects associated with the post with the specified id.
//findCommentsById(): accepts an id and returns the comment associated with that id.
//findPostComments(): the findPostComments accepts a postId as its first parameter and returns all comments on the post associated with the post id.
server.get('/api/posts/:id/comments', (req, res) => {
  const postId = req.params.id
  db.findPostComments(postId)
  .then(comment => {
    if(comment) {
      res.status(200).json(comment)
    } else {
      res.status(404)
      .json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(() => {
    res.status(500)
    .json({ error: "The comments information could not be retrieved." })
  })
})


//DELETE // implement messaging
//Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

//remove(): the remove method accepts an id as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
server.delete('/api/posts/:id', (req, res) => {
  //const { id } = req.params;
  const id = req.params.id
 
  db.remove(id)
  .then(deletedPost => {
     if(deletedPost) {
       res.json(deletedPost)
     } else {
       res.status(404).json({
          message: "The post with the specified ID does not exist." 
       })
     }
    })
    .catch(() => {
      res.status(500).json({error: "The user could not be removed."})
    })
  })



  // PUT // Works ok
  //Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

  //update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.

  server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body

    if(!title || !contents) {
      res.status(400)
      .json({ message: "Please provide title and contents for the post." })
    } else {
       db.update(req.params.id, req.body)
       .then(post => {
          if(post) {
            res.status(200).json(post)
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist." 
            })
          }
       })
       .catch(() => {
          res.status(500).json({
            error: "The post information could not be modified." 
          })
       })
     }
  })



server.listen(4000, () => {
  console.log('Server is listening on port 4000')
})