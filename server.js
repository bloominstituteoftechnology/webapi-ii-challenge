// import your node modules
const express = require('express');
const db = require('./data/db.js');
const posts =require('./data/seeds/posts.js');
const bodyParser = require('body-parser');


// add your server code starting here
const server = express();
server.use(bodyParser.json());

// server.get('/', function(req, res) {
//   res.json({ api: 'Running...' });
// });

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;

  if(title === undefined || contents === undefined) {
      res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
  } else {
      const newPost = {title, contents}
      db.insert(newPost)
      .then(newId => {
          res.status(201).json(newPost)
      })
      .catch(error => {
          res.status(500).json({errorMessage: 'There was an error while saving the post to the database.'})
      });
  }
});

server.get('/api/posts', (req, res) => {
  db
    .find().then(posts => {
      res.json(posts);
  })
    .catch(error => {
      res.status(500).json({errorMessage: "The posts information could not be retrieved."});
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      if(posts.length === 0){
        res.status(404).json({error: 'The post with the specified ID does not exist'})
      } else {
        res.json(posts);
      }
    })
    .catch(error => {
      res.status(500).json({error: 'The post information could not be retrieved'});
    })
});

server.delete('/api/posts/:id', (req,res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(deletions =>{
      if(deletions === 0) {
        res.error(404).json({message: 'The post with the specified ID does not exist.'})
      }
      else{
        res.status(200).json({message: `Post ${id} Deleted.`})
      }
  })
  .catch(error => {
      res.status(500).json('The post could not be removed.')
  })
})



const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
