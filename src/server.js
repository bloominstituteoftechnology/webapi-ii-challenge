const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const server = express();

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
//GET /posts
server.get('/posts', function(req, res) {
    const term = req.query.term;
    if (term) {
        const filtered = posts.filter((post) => {
            return post.title.indexOf(term) !== -1 ||
                post.contents.indexOf(term) !== -1;
        });
        res.json(filtered);
    } else {
        res.json(posts);
    }
});

//post
server.post('/posts', function(req, res) {
    const { title, contents } = req.body;

    if (!title) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a post title' });
        return;
    }
    if (!contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a post title' });
        return;
    }

    const post = { id: nextID, title, contents };
    nextID += 1;

    posts.push(post);
    res.json(post);
});

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;

    if (!id) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a post id' });
        return;
    }
    if (!title) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a post title' });
        return;
    }
    if (!contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide post contents' });
        return;
    }
    const post = posts.find(p => p.id === id);
    if (!post) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: `Couldn't find a post with id ${id}`});
        return;
    }
    post.title = title;
    post.contents = contents;
    res.json(post);
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a post id' });
        return;
    }
    posts = posts.filter(p => p.id !== id);
    res.json({ success: true });
});


//put

//delete


module.exports = { posts, server };
