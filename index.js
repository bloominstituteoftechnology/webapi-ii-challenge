// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const PORT = 9000;


// add your server code starting here

const server = express();

server.use(helmet());
server.use(cors({origin: 'http://localhost:3000'}));
server.use(express.json());
server.use(logger('short'));

/*
 * POST - /api/posts 	
 * Creates a post using the information sent inside the request body. 
 *
  * */
server.post('/api/posts/', (req, res) => {
  console.log(req.body);
  db.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The posts could not be posted." 
        });
    })
})


/*
 * GET - /api/posts 	
 * Returns an array of all the post objects contained in the database.
 * 
  * */
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The posts could not be retrieved." 
        });
    })
});

/*
 * GET - /api/posts/:id
 * Returns the post object with the specified id.
 * 
  * */
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The posts could not be retrieved." 
        });
    })
})

/*
 * DELETE - /api/posts/:id
 * Removes the post with the specified id and returns the deleted post. 
 *
  * */
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let deletedPost = {};
  let responseObj = {};
  db.findById(id).then(post => {
    console.log(post)
    if (post === []) { 
      res.status(404);
      responseObj = {
        message: req.params.id + ' does not exist'
      }
    }
    deletedPost = post;
    db.remove(req.params.id)
      .then(data => {
        res.status(500);
        responseObj = deletedPost;
      })
      .catch(err => {
        console.log(err)
        res.status(500);
        responseObj = { 
          message: 'Could not access server',
          error: err
        }
      })
  })
  .catch(err => {
    res.status(500)
    responseObj = { 
      message: 'Could not access server',
      error: err
    }
  });
  console.log(responseObj)
  //res.json(response)
  res.send(responseObj)

  /* remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted. */

});

/*
 * PUT - /api/posts/:id
 * Updates the post with the specified id using data from the request body. 
 * Returns the modified document, NOT the original.
 *
  * */
server.put('/api/posts/:id', (req, res) => {
  res.status(500).json({
    params: req.params.id,
    body: req.body
  })
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));
