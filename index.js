// import your node modules
const express = require('express');
const db = require('./data/db.js');

const PORT = '5000';

// add your server code starting here
const server = express();

server.get('/api/posts', (req,res) => {
      db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "posts not found!"
            });
        });
});

server.get('/api/posts/:id', (req, res) => {
     const {id} = req.params;
     db.findById(id)
       .then( post => {
           if(post.length) {
               res.send(post);
           } else {
               res.status(404)
                  .json({errorMessage: "This doesn't seem to be functional"})
           }
       })
       .catch(error => {
              res.status(500)
                 .json({
                     errorMessage: 'Not working'
                 })
       })
})

server.listen(PORT, () => {
     console.log(`localhost is runs on ${PORT}`);
})