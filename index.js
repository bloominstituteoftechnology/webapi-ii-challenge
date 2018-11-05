// import your node modules

const express = require('express');
const server = express();
const db = require('./data/db.js');
const getPosts = require('./getPosts')

// add your server code starting here
//



server.get('/', (req, res)=> {
  res.send('hello from express');
})

server.get('/api/posts', (req, res)=> {
  db.find()
    .then(posts => {
    res.status(200).json(posts);
    })
    .catch(err => {
    res
      .status(500)
      .json({message: 'We failed to get the users', error: err})
    })
})

server.get('/api/posts/:id', (req, res)=> {
  const {id} = req.params;
  //db function
  db.findById(id)
    //then we use the then func pass in the anon function
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res
      .status(500)
      .json({message: 'We failed to get the users', error: err})
    })
})

server.listen(5000, (res, req) => {
  console.log('the server is listening on 5000')
})
