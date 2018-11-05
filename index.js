// import your node modules

const express = require('express');
const server = express();
const db = require('./data/db.js');
const getPosts = require('./getPosts')
const getById = require('./getById')

// add your server code starting here
//



server.get('/', (req, res)=> {
  res.send('hello from express');
})

server.get('/api/posts', getPosts);


// server.get('/api/post/:id', getById)

server.get('/api/posts/:id', (req, res)=> {
  const {id} = req.params;
  console.log(req.params)
  db.findById(id)
    .then(post => {
      //we check for a post and if there's a post length. Even if there is one post. We send the post. Otherwise we send the error message.
      if(post && post.length) {
        res.status(200)
        .json(post);

      } else {
        res.status(404)
        .json({message: 'There is not post with that id'})
      }
    })

})



server.post('api/posts', (req, res) => {
  res.status(200)
} )


server.delete('api/posts/', (req, res) => {
  res.status(204)
})

server.listen(5000, (res, req) => {
  console.log('the server is listening on 5000')
})
