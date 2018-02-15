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
                post.title.includes(seachTerm) || post.contents.includes(term)
            );
        });
        res.status(STATUS_OK).json(filtered);
    } else {
        res.status(STATUS_OK).json(posts);
    }
});

server.post('/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if (!title || !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Please provide title and contents.' });
        return;
    }

    const addPost = { id, title, contents };
    id++;
    posts.push(addPost);
    res.status(STATUS_OK);
    res.json({ posts });
    return;
});

server.put('/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const id = req.body.id;
    console.log(title, contents, id);
    if (!title || !contents || !id) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Please provide title, contents and ID' });
        return;
    }
    let updateIndex = posts.findIndex((post) => post.id === id);
    if (updateIndex < 0) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Please provide existing ID value' });
        return;
    }
    let updated = { id, title, contents };
    posts[updateIndex] = updated;
    res.status(STATUS_OK);
    res.json({ posts });
    return;
});

server.delete('/posts', (req, res) => {
    const id = req.body.id;

    if (!id) {
        res.status(STATUS_USER_ERROR);
        res.JSON({ err: 'Please provide ID' });
        return;
    }
    let updateIndex = posts.findIndex((post) => post.id === id);
    console.log('Index Found at', updateIndex);
    if (updateIndex < 0) {
        res.status(STATUS_USER_ERROR)
        res.json({ error: 'Please provide existing ID' });
        return;
    }
    posts.splice(updateIndex, 1);
    res.status(STATUS_OK);
    res.json({ posts });
    return;
});

module.exports = { posts, server };
