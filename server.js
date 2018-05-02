// // import your node modules
 const express = require('express');
 const db = require('./data/db');

// // add your server code starting here
// //This is a test and to submit the PR

 const server = express();

//  server.post('/api/posts', (req, res) => {
//     db
//        .find() // this returns a promise.
//        .then(posts => {
//            res.json(posts);
//        })
//        .catch(err => {
//            res.status(500).json({err: err});
//        })
// })

 server.get('/api/posts', (req, res) => {
     db
        .find() // this returns a promise.
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({err: err});
        })
 })
 
 server.get('/api/posts/:id', (req, res) => {
    db
       .findById(id) // this returns a promise.
       .then(post => {
           res.json(post);
       })
       .catch(err => {
           res.status(500).json({err: err});
       })
})

server.delete('/api/posts', (req, res) => {
    db
       .find() // this returns a promise.
       .then(posts => {
           res.json(posts);
       })
       .catch(err => {
           res.status(500).json({err: err});
       })
})


server.put('/api/posts', (req, res) => {
    db
       .find() // this returns a promise.
       .then(posts => {
           res.json(posts);
       })
       .catch(err => {
           res.status(500).json({err: err});
       })
})

 server.listen(5000, () =>   console.log(`\n== API Running on port 5000 ==\n`));