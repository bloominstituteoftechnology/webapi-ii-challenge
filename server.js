// import your node modules

const db = require('./data/db.js');

const bodyParser = require("body-parser");
const morgan = require('morgan');
const helmet = require('helmet');

// add your server code starting here

const express = require('express');
const server = express();

// middleware

// server.use(bodyParser.json());
// logger
server.use(morgan('dev'));
// security
server.use(helmet());
// express -- replaces body-parser
server.use(express.json());



let nextId = 7;
function getNewId() {
    return nextId++;
  }

// Endpoints:

server.get('/', function(req, res) {
    res.send('Api walking fast')
})

server.get('/api/posts', (req,res) => {
    // get data
     db.find()
     // send the data
     .then(posts => {
         res.json(posts);
     })
     // send error if there is one
     .catch(error => {
         res.status(500).json({ error: "The posts information could not be retrieved." });
     });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(posts => {
        res.json(posts[0]);
    }).catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});

// First Post Solution:
server.post('/api/posts', (req, res) => {
    const checkTitle = req.body.title;
    const checkContent = req.body.contents;
    const post = req.body;
    if(checkTitle === undefined || checkContent === undefined) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      return;
    } else {
      db.insert(post)
      .then(posts => {
          res.status(201).json(posts)
          return posts;
      })
      .catch(error => {
          res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
    }
   
  });

// Second Post Solution:
// server.post('/api/posts', (req, res) => {
//     const post = req.body;
//     db.insert(post)
   
//     .then(newId => {
//         console.log('newId', newId)
//         return newId
//     })
//     .then(id => {
//         console.log('id.id', id.id)
//         return db.findById(id.id)
//         // res.json('HELLO')
//     })
//     .then(p => {
//         console.log('p', p)
//         // console.log('p.id', p.id)
//         res.status(200).json(p)
//     })
//     .catch(error => {
//         res.status(500).json(error)
//     })
//   });

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let post;

  db.findById(id)
  .then(response => {
      // Makes a copy of the post that is about to be deleted so that you can
      // return that object if the delete does not work.
      // Since id is an object, it will be returned with curly brackets unless [0]
      // is added
      post = {...response[0] };
      
      db.remove(id)
      .then(response => {
          res.status(200).json(post);
      })
      .catch(error => {
          res.status(500).json(error);
      })
  })
  .catch(error => {
      res.status(500).json(error);
  })
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const checkTitle = req.body.title;
  const checkContent = req.body.contents;
  
  db.update(id, update)
  .then(count => {
      if (count > 0) {
          db.findById(id).then(updatedPosts => {
              res.status(200).json(updatedPosts[0])
          })
      } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
  })
  .then(check => {
    if(!checkTitle || !checkContent) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  })
  .catch(error => {
      res.status(500).json(error);
  });
});


const port = 5050;
server.listen(port, () => console.log('API Running on port 5050'));