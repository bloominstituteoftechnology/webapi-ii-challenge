// import your node modules
const db = require('./data/db.js');
const express = require('express');
var cors = require('cors');
const server = express();

server.use(cors());

// add your server code starting here
//GET	'/api/posts'
//returns an array of all the post objects contained in the database.
server.get('/api/posts', (request, response) => {
     db.find() //calling find returns a promise that resolves to an array of all the posts contained in the database.
       .then(posts => {
           response.status(200).json(posts);
        })
       .catch(error => {
            response.status(500).json({error : 'The post could not be retrieved'})
        })
})

//GET	'/api/posts/:id' 	Returns the post object with the specified id.
server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    db.findById(id)
      .then(post => {
            if(post.length !== 0) {
                response.status(200).json(post);
            } else {
                response.status(404).json({message : `The post with id : ${id} does not exist `})
            }
       })
      .catch(error => {
            response.status(500).json({error : 'The post could not be retrieved'});
       })
})

server.listen(9000, () => console.log('server is live'));
