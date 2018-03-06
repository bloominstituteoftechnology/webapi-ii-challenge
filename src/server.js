const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

let nextId = 1;

function getNextId() {
    return nextId++;
}

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/', (req, res) => {
    res.send('<h1>Welcome to the Jungle!</h1>');
}

server.get('/posts', (req, res) => {
        const searchTerm = req.query.term;
        if (searchTerm) {
            const filteredPosts = posts.filter(post => {
                return (
                    post.title.includes(searchTerm) || post.contents.includes(searchTerm)
                );
            });
            res.status(200).json(filteredPosts);
        } else {
            res.status(200).json(posts);
        }
    })

module.exports = { posts, server };

server.post('./posts', (req, res) => {
    const { title, contents } = req.body;
    if (title && contents) {
        const id = getNextId();
        const post = req.body;
        post.id = id;
        posts.push(post);
        res.status(200).json(post);
    } else {
        res.status(STATUS_USER_ERROR).json({ error: 'Please provide title contents.'});
    }
});
