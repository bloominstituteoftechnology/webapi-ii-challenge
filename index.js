// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(cors());

server.get('/api/posts', (request, response) => {
    db
        .find()
        .then(posts => {
            console.log('posts: ', posts)
            response.json(posts) 
        })
        .catch(err => response.send(err))
});

// server.post('/api/posts', (request, response) => {
//     const {title, contents} = request.body;
//     const newPost = {title, contents};

//     db.insert(newPost)
//         .then(postId => {
//             const {id} = postId;
//             db.findById(id).then(post => {
//                 if(title === null || contents === null){
//                     return response.status(400).send({errorMessage: "No title or contents provided for post."})
//                 }
//                 console.log(post);
//                 if (!post) {
//                     return response
//                     .status(422)
//                     .send({Error: `No post with that id ${id} exists.`})
//                 } else if (!post.title || !post.body){
//                     return response
//                     .status(400)
//                     .send({Error: `Title or contents missing from post`})
//                 } else {
//                     response.status(201).send(post);
//                 }
//             })
//             .catch(err => response.status(500).send({error: 'Error while saving post to database.'}))
//         })
// })

const port = 3000;

server.listen(port, () => 
    console.log(`API is running on port ${port}.`)
);
