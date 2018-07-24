// import your node modules
const express = require('express')
const helmet = require('helmet')
const db = require('./data/db.js');
// add your server code starting here
const server = express()

server.use(helmet())

//GET ReQUEST /api/posts
server.get('/api/posts', async (req, res) =>{
  try {
    const posts =  await db.find()
    res.status(200).json(posts)
  }
  catch(err){
     res.status(500).json({ error: "The posts information could not be retrieved." })
  }
})

// GET ReQuest /api/post/:id

server.get('/api/posts/:id', async ( req, res) => {
    const { id } = req.params
    try {
        const post = await db.findById(id)
        if(post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{
            res.status(200).json(post)
        }

    }
    catch(err){
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
} )




server.listen(8000, () => {
    console.log('API IS RUNNING!!!!')
})
