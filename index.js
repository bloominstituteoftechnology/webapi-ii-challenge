// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());

const port = 8000;
server.listen(port, () => 
    console.log(`Server is listening to Port ${port}`)
)

server.get('/api/posts', (request, response) => {
    db.find()
        .then(posts => {
            response.status(200).json(posts);
        })
        .catch(error => response.send(error));
});

server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.findById(id)
        .then(post => {
            response.status(200).json(post);
        })
        .catch(error => response.send(error))
});

server.post('api/posts/', (request, response) => {
    const { title, contents } = request.body;
    const newPost = { title, contents };

    db.insert(newPost)
        .then(postID => {
            const { id } = postID;
            db.findById(id).then( post => {
                if(!post) {
                    return response
                        .status(422)
                        .send({Error: `Post does not exist at ID ${id}`});
                } else if (!newPost.title || !newPost.contents) {
                    return response
                        .status(422)
                        .send({Error: `Post missing title or contents`});
                }
                response.status(201).json(user);
            });
        })
        .catch(error => response.send(error));
})

server.delete('/api/posts/:id', (request, response) => {
    const id = request.params.id;

    db.remove(id)
        .then(removedPost => {
            response.status(200).json(removedPost);
        })
        .catch(error => response.send(error));
});