// import your node modules
const express = require('express');
const db = require('./data/db.js');

// module.exports = {
//     find,
//     findById,
//     insert,
//     update,
//     remove,
//   };
let hobbits = {
        title: "The post title",
        contents: "The post contents"
    }
let nextId = 3;
  
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
     db.find()
     .then(resolved => res.status(200).json((resolved)))
     .catch(error => console.log(error));
})
server.post('/', (req, res) => {
    let post = req.body;
    db.insert(post)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(400).json(error));
})

server.get('/api/posts/:id', (req, res) => {
    res.send(db.findById(1))
})
server.delete('/api/posts/:id', (req, res) => {
    res.send('delete request ...')
})
server.put('/api/posts/:id', (req, res) => {
    res.send('put request ...')
})

const PORT_NUMBER = 8000;
server.listen(PORT_NUMBER, () => console.log(`API running on port ${PORT_NUMBER}`));
// add your server code starting here
