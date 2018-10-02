// import your node modules
const express =  require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(cors());

const port = 7777;
server.listen(port, console.log(`=-=-= Server Active On Port ${port} =-=-=`));

server.get('/', (request, response) => {
    response.send(`<h1>Welcome to the LOTR Post Server!</h1>`);
});

server.get('/api/posts', (request, response) => {
    const error500 = { message: "The posts information could not be retrieved" };
    db.find()
    .then(posts => response.json(posts))
    .catch(
        error => {
            response.status(500).send(JSON.stringify(error500))
        })
});

server.get('/api/posts/:id', (request, response) => {
    const error404 = { message: "The post with the specified ID does not exist." };
    db.findById(request.params.id)
    .then(post => 
        {   if (post.length > 0) {
            response.json(post)}
            else response.status(404).send(JSON.stringify(error404));
        })
    .catch(error => response.send(error))
});

server.post('/api/posts', (request, response) => {
    if(request.body.title && request.body.contents) {
    db.insert({title: request.body.title, contents: request.body.contents})
    .then(postId => response.json(postId))
    .catch(error => response.status(500).send(error))    
}});

// server.put('/api/posts/:id', (request, response) => {
//     db.update(request.params.id, request.body)
//     .then(updated => {
//         if(updated) {
//             response.send(updated)
//         }
//     })
//     .catch(error => response.send(error))
// });

// server.delete('/api/post/:id', (request, response) => {
//     db.remove(request.params.id)
//     .then()
//     .catch()
// });
