// implement your API here
// introduce how routing works

// import express from 'express'; // ES2015 modules > export default someCode;

const express = require('express'); // CommonJS modules > module.exports = someCode;
const cors = require('cors'); // install this package to connect from react
const db = require('./data/db.js');

const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj.

server.get('/', (req, res) => {
  //< ---- Route Handler ^^^
  // request/route handler
  res.send('<h1>Hello FSW13!</h1>');
});

server.get('/api/about', (req, res) => {
  res.status(200).send('<h1>About Us</h1>');
});

server.get('/api/contact', (req, res) => {
  res
    .status(200)
    .send('<div><h1>Contact</h1><input placeholder="email" /></div>');
});

// #################### POST #######################

// #################### GET #######################
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id) // pull in database from '.db' then Get 'ID' from 'req.params'
  .then((post) => {
   //  Below we create some logic to check what will be retunred either the 'ID' or an '404 status'
    if (post.length === 0) { // Says if post doesn't exist then run code below
      return res
      .status(404)
      .json({message: "The post with the specified ID does not exist."});
    } else
    console.log(post);
   res.status(200).json(post); // If post exists send the post/response.
  })
  .catch(() => 
 //  Error
    res.status(404)
    .json({message: "The post with the specified ID does not exist."})
  )
})

// #################### POST #######################
server.post('/api/posts', (req, res) => {
  const { name, bio } = req.body;
  const newPost = { name, bio };
  db.insert(newPost)
    .then(postID => {
      const { id } = postID;
      db.findById(id).then(post => {
        console.log(post);
        if (!post) {
          return res
            .status(422)
            .send({ Error: `Post does not exist by that id ${id}` });
        }
        res.status(201).json(post);
      });
    })
    .catch(err => console.error(err));
});

// #################### DELETE #######################
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

// #################### PUT #######################
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  // ALWAYS CHECK YOUR UPDATES AND RESPOND ACCORDINGLY, THIS ENDPOINT ISNT FINISHED
  const newPost = { name, bio };
  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(err => console.error(err));
});
// watch for traffic in a particular computer port
const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);

// http://localhost:3000 > the 3000 is the port.
// 80: http, 443: https, 25: email servers
// npm run server or yarn server in our case