// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/posts', async (req, res) => {

  try {
  
    // resolves to an array
    const posts = await db.find()
    res.status(200).json(posts)

  } catch(e) {

    res.status(500).json(e)

  }
   
})

server.post('/api/posts', async (req, res) => {

  if(!req.body || !req.body.title || !req.body.contents) {
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

server.listen(5000, () => console.log('💵'))

// add your server code starting here
