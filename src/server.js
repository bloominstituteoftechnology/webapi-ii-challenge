const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
    const searchTerm = req.query.term;
    if (searchTerm) {
        const filtered = posts.filter((post) => {
            return (
                post.title.includes(seachTerm) || post.content.includes(term)
            );
        });
        res.status(STATUS_OK).json(filtered);
    } else {
        res.status(STATUS_OK).json(posts);
    }
})


server.post('/posts', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Please provide title and content.' });
        return;
    }

    const addPost = { id, title, content };
    id++;
    posts.push(addPost);
    res.status(STATUS_OK);
    res.json({ posts });
    return;
});

module.exports = { posts, server };
