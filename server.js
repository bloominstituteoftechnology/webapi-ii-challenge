const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const PORT = 3030;
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();

server.listen(PORT);
server.use(bodyParser.json());

let posts = [];
let postId = 100;

const writePosts = _ => {
    fs.writeFileSync('posts.txt', JSON.stringify(posts), 'utf8');
};

const loadFile = _ => {
    posts = JSON.parse(fs.readFileSync('posts.txt', 'utf8'));
};

loadFile();

server.get('/posts', (req, res) => {
    // fs.readFile('');
    res.json(posts);
});

server.get('/', (req, res) => {
    res.send(
        '<p>Hello Troy!</p>'+
        '<p>The fun stuff is at /posts</p>'
    );
});
