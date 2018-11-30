// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 4000;

server.use(express.json());


// GET	/api/posts	Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      res.status(200).json(posts);
    })
    .catch( err => {
      res.status(500).json({ error: "The posts information could not be retrieved."});
    })
});

// GET	/api/posts/:id	Returns the post object with the specified id.
server.get( '/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)

    // We have a result from db - send it out if it is valid
    .then( post => {
      //Check for an empty array
      if( post.length === 0 ){
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        res.status(200).json(post);
      }
      // res.status(200).json(posts);
    })
    // No valid response from db
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved."});
    })
});

// POST	/api/posts	Creates a post using the information sent inside the request body.
server.post( '/api/posts', (req, res) => {
  const post = req.body;
  console.log("req body:", post );
  
  if ( !post.title || !post.contents ){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post"});
  } else {
    db.insert(post)
      .then( postId => {
        // 201 if good, 500 if bad
        db.findById( postId.id )
          .then( post => {
            res.json(post);
          })
      })
      .catch( err => {
        res.status(500).json({ error: "There was an error while saving the post to the database"});
      });
  }

  // status 201 - created
  // db.insert
  //   db.findById(idInfo.id).then();


  //const {title, contents} = req.params;
  // if( !req.params.title || !req.params.contents ){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post."});
  // }
  // else {
  //   res.json({message: "Success"})
  // }
});


// PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. 
//      Returns the modified document, NOT the original.
// const user = req.body;
// const { id } = req.params;


// DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
// db.remove(id).then(count)
// Listener:
server.listen( PORT, () => {
  console.log( `Server started on port: ${PORT}`)
});