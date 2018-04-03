// import your node modules

const db = require('./data/db.js');

const bodyParser = require("body-parser");


// add your server code starting here

const express = require('express');
const server = express();
server.use(bodyParser.json());

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
    db.findById(id).then(users => {
        res.json(users[0]);
    }).catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});

// First Post Solution:
// server.post('/api/posts', (req, res) => {
//     const post = req.body;
//     db.insert(post)
//     .then(posts => {
//         res.status(201).json(post)
//     })
//     .catch(error => {
//         res.status(500).json(error)
//     })
//   });

// Second Post Solution:
server.post('/api/posts', (req, res) => {
    const post = req.body;
    db.insert(post)
   
    .then(newId => {
        console.log('newId', newId)
        return newId
    })
    .then(id => {
        console.log('id.id', id.id)
        return db.findById(id.id)
        // res.json('HELLO')
    })
    .then(p => {
        console.log('p', p)
        // console.log('p.id', p.id)
        res.status(200).json(p)
    })
    .catch(error => {
        res.status(500).json(error)
    })
  });

  server.delete('/api/posts/:id', (req, res) => {
    const post = req.body
    db.remove(post)
    .then(posts => {
        res.status(201).json(post);
    })
    // send error if there is one
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });

})

const port = 5050;
server.listen(port, () => console.log('API Running on port 5050'));