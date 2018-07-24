// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());


server.post('/api/posts', async (req, res) => {

  if (!req.body || !req.body.title || !req.body.contents) {
    
    res.status(400).json({ error: "Please provide title and contents for the post" })

  }

  try {

    // we are destructuring because db.insert returns an object with an id field
    const { title, contents } = req.body
    const { id } = await db.insert({ title, contents })
    const savedPost = await db.findById(id)
    
    res.status(201).json(savedPost)

  } catch(e) {

    res.status(500).json({ error: "There was an error while saving the post to the database", e })

  }

})


server.get('/api/posts', async (req, res) => {

  try {
  
    // resolves to an array
    const posts = await db.find()
    res.status(200).json(posts)

  } catch(e) {

    res.status(500).json({ error: "The posts information could not be retrieved." })

  }
   
})

server.get('/api/posts/:id', async (req, res) => {
  
  const { id } = req.params

  try {

    // + before a string is a short hand type coercion
    const post = await db.findById(+id)  

    post.length > 0 ? res.status(200).json(post)
                    : res.status(400).json({ message: "The post with the specified ID does not exist." })

  } catch(e) { 
  
    res.status(500).json({ error: "The post information could not be retrieved." })

  }


})

server.delete('/api/posts/:id', async (req, res) => {

  const { id } = req.params

  try {

    const post = await db.findById(+id) 

    if (post.length > 0) {
      
      const numOfDeletedRecords = await db.remove(+id) 
      
      if (numOfDeletedRecords > 0) {
        
        res.status(200).json({ message: "Successfully deleted", post})

      }

    } else {

      res.status(404).json({ message: "The post with the specified ID does not exist." })

    }

  } catch(e) {

    res.status(500).json({ error: "The post could not be removed", e }) 
    
  }

})

server.put('/api/posts/:id', async (req, res) => {

  if (!req.body || !req.body.title || !req.body.contents) {

    res.status(400).json({ error: "Please provide title and contents for the post" })

  }

  try {

    const { id } = req.params
    const { title, contents } = req.body
    const post = await db.findById(+id)

    if (post.length > 0) {

      const numOfUpdatedRecords = await db.update(+id, { title, contents })

      if (numOfUpdatedRecords > 0) {

        const updatedPost = await db.findById(+id)
        res.status(200).json(updatedPost)

      }

    } else {
      
      res.status(404).json({ message: "The post with the specified ID does not exist." })

    }

  } catch(e) {

    res.status(500).json({ error: "The post information could not be modified", e }) 

  }


})






server.listen(5000, () => console.log('💵'))

// add your server code starting here
