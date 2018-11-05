// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const server = express();
server.use(cors());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res
      .status(200)
      .json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved'});
    })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post && post.length) {
        res
          .status(200)
          .json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved' });
    })
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if ( !post.title || !post.contents || post.title === '' || post.contents === ''){
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post.' })
  } else {
    db.insert(post)
      .then(post => {
        res
          .status(201)
          .json(post)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'There was an error while saving the post to the database.'})
      })
  }
})

// server.delete('/api/posts/:id', (req, res) => {
//   const { id } = req.params.id;
//   const removing = db.remove(id)
//     .then(
//       if (removing === 0) {
//         res
//           .status()
//       }
//     )
// })

// server.put('/api/posts/:id', (req, res) => {
// const { id } = req.params.id;
// db.update(id, req.body)
// res
    // .status(200)
    // .json({ url: '/api/posts/:id', operation: 'PUT'})
// When the client makes a PUT request to /api/posts/:id:
//
// If the post with the specified id is not found:
//
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:
//
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:
//
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:
//
// update the post document in the database using the new information sent in the reques body.
// return HTTP status code 200 (OK).
// return the newly updated post.
// })
//


// add your server code starting here
server.listen(9000, () => console.log('the server lives on port 9000'));
