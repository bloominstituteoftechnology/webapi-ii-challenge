const express = require('express');
const db = require('./data/db')

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});



server.get('/api/posts', async (req,res) =>{
  try{
    const posts = await db.find()
    console.log(posts)
    res.status(200).json(posts)
    // (posts.length > 0) ? res.status(200).json(posts) : 
    //   res.status(404).json({ message: "The users information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The users information could not be retrieved."})
  }
  
})


server.get('/api/posts/:id', async (req,res) =>{

  //Using .then().catch()
  // db.findById(req.params.id)
  //   .then( post => {
  //     (post.length > 0) ? res.status(200).json(post) : res.status(404).json({ message: "The post with the specified ID does not exist." })
  //     // res.status(200).json(post)
  //   })
  //   .catch( error => res.status(500).json({ error: "The user information could not be retrieved." }))

  
  // Using Async/Await
  try{
    const post = await db.findById(req.params.id)
    (post.length > 0) ? res.status(200).json(post) : 
      res.status(404).json({ message: "The post with the specified ID does not exist." })
  }
  catch (err){
    res.status(500).json({error: 'The user information could not be retrieved.'})
  }
})






server.listen(8000, () => console.log('API running on port 8000'));
