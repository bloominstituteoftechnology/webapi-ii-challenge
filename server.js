// // import your node modules
 const express = require('express');
 const db = require('./data/db');

// // add your server code starting here
// //This is a test and to submit the PR

 const server = express();

 // add middleware
 server.use(express.json);

 server.post('/api/users/', (req, res) => {
     const user = req.body;

    user.insert(obj)
       .then(response => {
           res.status(201).json(response);
       })
       .catch(err => {
           res.status(500).json({err: err});
       })
})

 server.get('/api/posts', (req, res) => {
     db
        .find() // this returns a promise.
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            // cancel the request using abort?
            res.abort();
            res.status(500).json({error: 'The posts infromation could not be retrived'});
        })
 })
 
 server.get('/api/posts/:id', (req, res) => {
    db
       .findById(id) // this returns a promise.
       .then(post => {
           if(req === res) {
            res.json(post);  
           } else {
               res.status(404).json({message: 'The post with the specified ID does not exist.'})
           }
       })
       .catch(error => {
           res.abort();
           res.status(500).json({error: 'The post information could not be retrived '});
       })
})

server.delete('/api/posts/:id', (req, res) => {
    db
       .findById(id) // this returns a promise.
       .then(post => {
        if(req === res) {
            res.json(post);  
           } else {
               res.status(404).json({message: 'The post with the specified ID does not exist.'})
           }
       })
       .catch(error => {
           res.abort();
           res.status(500).json({error: 'The post could not be removed'});
       })
})


// server.put('/api/posts/:id', (req, res) => {
//     db
//        .findById(id) // this returns a promise.
//        .then(posts => {
//            res.json(posts);
//        })
//        .catch(err => {
//            res.status(500).json({err: err});
//        })
// })

 server.listen(5000, () =>   console.log(`\n== API Running on port 5000 ==\n`));