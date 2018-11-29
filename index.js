// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000;

server.get('/', (req,res) => {
  res.json({message: 'server is listening'})
})

server.get('/api/posts', (req, res) => {
  db.find()
  .then((posts) => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500)
    .json({message: 'The posts information could not be retrieved.'})
  });
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
db.findById(id)
.then((post) => {
    if (post.length === 1){
        res.json(post); 
    }
   else {
    res
    .status(404)
    .json({message: 'The post with the specified ID does not exist.'}
    )}
})
.catch(err => {
    res
    .status(500)
    .json({message: 'The post information could not be retrieved.'})
});
})


server.listen(PORT, () =>{
  console.log(`listening on ${PORT}`)
});
