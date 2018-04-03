// import your node modules
const express = require('express');

const db = require('./data/db.js');

const morgan = require('morgan');

const server = express();

const bodyParser = require('body-parser');

const helmet = require('helmet')

// Middleware

server.use(bodyParser.json())

server.use(morgan('dev'));

server.use(helmet());


const port = 5000;

// add your server code starting here





server.get('/', function(req, res) {
    res.json({ API: 'Running...'});
})

server.get('/api/posts', function(req, res) {
    
    db
    .find()
    .then (users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json.error
    })
})

server.get('/api/posts/:id', function(req, res) {
    const { id } = req.params;

    
    
    db
    .findById(id)
    .then (posts => {
        if (posts[0]) res.json(posts[0]);
        else {
            res.status(404).json({message: "The post with the specified ID does not exist."})        
        }
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

server.post('/api/posts', function(req, res) {
    
    
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post'})
    }

    console.log(post);

    db
    .insert(post)
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

server.delete('/api/posts/:id', function(req, res) {
    const { id } = req.params;

    if (id === undefined) {
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }

    db
    .remove(id)
    .then(posts => {
        res.status(201).json(posts[id]);
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be removed."})
    })
})

server.put('/api/posts/:id', (req, res) => {
      const { id } = req.params;
      const { title, contents } = req.body;
      const updatedPost = { title, contents };
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
        return;
      }
      db
        .update(id, updatedPost)
        .then(posts => {
          if (posts.length < 1) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          } else {
            res.status(200).json(updatedPost);
          }
        })
        .catch(error => {
          res.status(500).json({ error: 'The post information could not be modified.' });
        });
    });





server.listen(port, () => console.log('Running on port 5000'));