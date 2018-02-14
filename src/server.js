const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const POST_ADDED = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 1;


const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
    const term = req.query.term;
    if (term) {
        const filtered = posts.filter((post) => {
            return (
                post.title.includes(term) || post.contents.includes(term)
            );
        });
        res.status(200).json(filtered);
    } else {
        res.status(200).json(posts);
    }
})

server.post('/posts', (req,res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if(!title || !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must provide a title and content' });
        return;
    }
    const addPost = {id, title, contents};
    id++;
    posts.push(addPost);
    res.status(POST_ADDED);
    res.json({ posts });
    return;
});

// POST /posts
//Require client: title || contents in req body
// JSON error object - needs appropriate status code
//If all correct, create new post object
//Post needs unique, numeric id and add to post array
//return newly created post object with assigned id to client in a JSON response


module.exports = { posts, server };
