// 1. Inside folder: yarn
// 2. Inside folder: yarn add express
// 3. nodemon server.js
const express = require('express');

const db = require('./data/db.js');
const server = express();


// root of our site
// req is a requestHandler
server.get('/', (req, res) => {
  res.send('Hello Kat')
})

// server.get('/hobbits', (req, res) => {
//   const hobbits = [
//     {
//       id: 1, 
//       name: 'Samwise Gamgee'
//     },
//     { 
//       id: 2,
//       name: 'Frodo Baggins'
//     }
//   ]

//   res.status(200).json(hobbits)
// })

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      posts 
      ? res.status(200).json(posts) 
      : res.status(404).json({ message: 'posts not found'});
      
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The posts information could not be retrieved.",
        error: err })
    })
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      posts 
      ? res.status(200).json(posts) 
      : res.status(404).json({ message: 'posts not found'});
      
    })
    .catch(err => {
      res.status(500).json({ 
        message: "The posts information could not be retrieved.",
        error: err })
    })
})









server.listen(8000, () => {console.log('API running on port 8000')})