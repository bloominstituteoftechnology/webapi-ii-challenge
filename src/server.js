const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
    const term = req.query.term;
    if (!term) {
        res.json(posts);
    } else {
        const termSearch = posts.filter(post => {
            if (post.title.toLowerCase().includes(term) || post.contents.toLowerCase().includes(term)) {
                return post;
            }
        })
        res.send(termSearch);
    }
});

server.post('/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if (!title || !contents || title.length === 0 || contents.length === 0) {
        res.status(STATUS_USER_ERROR);
        res.json({error: "Must provide both title and contents"});
    } else {
        const newPost = {
            id,
            title,
            contents
        }
        posts.push(newPost);
        res.json(newPost);
        ++id;
    }
});

module.exports = { posts, server };
