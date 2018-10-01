// import your node modules
const express = require('express');
const cors = require('cors');
// const connect = require('connect');
// const {withRouter} = require('react-router-dom');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(cors());

server.get('/', (request, response) => {response.send('<h1>Home Page</h1>');
});

server.get('/api/posts', (request, response) => {
    db.find()
    .then(posts => {
        // console.log('\n** posts **', posts);
        response.json(posts);
    })
    .catch(err => response.send(err));
});

server.get('/api/posts/:id', (request, response) => {
    const id = request.params.id;
    db.findById(id)
    .then(post => {
        // console.log('\n** users **', post);
        response.json(post);
    })
    .catch(err => response.send(err));
});


const port = 8000;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} === \n`));