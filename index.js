// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const logger = require('morgan');

const PORT = 9000;


// add your server code starting here

const server = express();

server.use(helmet());
server.use(cors({origin: 'http://localhost:3000'}));
server.use(express.json());
//server.use(logger('short'));

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
      if (post.length !== 0) {
        res.status(200).json(post[0]);
      } else {
        res.status(404).json({ 
          message: `The post with id: ${req.params.id} does not exist`
        });      
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: `The post with id: ${req.params.id} could not be retrieved.`
        });
    })
})

/*
 * DELETE - /api/posts/:id
 * Removes the post with the specified id and returns the deleted post. 
 *
  * */
server.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recordsDeleted = await db.remove(id);
    if (recordsDeleted === 1) {
      res.status(200).json(recordsDeleted);
    } else {
      res.status(404).json({ 
        message: `Could not delete record because it does not exist`
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'error deleting post', error })
  }
  
  /* remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted. */

});

/*
 * PUT - /api/posts/:id
 * Updates the post with the specified id using data from the request body. 
 * Returns the modified document, NOT the original.
 *
  * */
server.put('/api/posts/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(count => {
      if (count !== 0) {
        res.status(200).json({ message: `post with id: ${req.params.id} updated` });
      } else {
        res.status(404).json({
          message: `Post with id: ${req.params.id} could not be updated`
      })

      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Internal server error could not update post with id: ${req.params.id}`
      })
    }) 
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));
