const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3030;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{
    title: "The post title",
    contents: "The post contents"
}];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(cors());

server.get('/posts', (req, res) => {

    console.log('it is hitting the server');

    res.status(200).json(posts);

});

module.exports = { posts, server, port };
