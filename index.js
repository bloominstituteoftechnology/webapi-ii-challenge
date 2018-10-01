// import your node modules
const express =  require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

const port = 7777;
server.listen(port, console.log(`=-=-= Server Active On Port ${port} =-=-=`));

server.get('/', (request, response) => {
    response.send(`<h1>Welcome to the LOTR Post Server!</h1>`);
});

server.get('/api/posts', (request, response) => {
    db.find()
    .then(posts => response.json(posts))
    .catch(error => response.send(error))
});

server.get('/api/posts/:id', (request, response) => {
    db.findById(request.params.id)
    .then(post => response.json(post))
    .catch(error => response.send(error))
});

server.post('/api/posts', (request, response) => {
    db.insert(request.body)
    .then(postId => response.json(postId))
    .catch(error => response.send(error))
});

server.put('/api/posts/:id', (request, response) => {
    db.update(request.params.id, request.body)
    .then(updated => {
        if(updated) {
            response.send(updated)
        }
    })
    .catch(error => response.send(error))
});

server.delete('/api/post/:id', (request, response) => {
    db.remove(request.params.id)
    .then()
    .catch()
});
