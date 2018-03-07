const bodyParser = require('body-parser');
const express = require('express');
const STATUS_SUCCESS = 200; //OK
const STATUS_USER_ERROR = 422; //Unprocessable Entity
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
//const posts = [];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
let idCounter = 2;
// TODO: your code to handle requests
let posts = [{
        id: 0,
        title: "First post title",
        contents: "First post contents"
    },
    {
        id: 1,
        title: "Second post title",
        contents: "Second post contents"
    },
    {
        id: 2,
        title: "Third post title",
        contents: "Third post contents"
    }
]
server.get("/users/:id/", (req, res) => {
    const {
        id
    } = req.params;
    res.status(200);
    res.send(posts[id])
});
server.get('/posts/:term/', (req, res) => {
    const {
        term
    } = req.params;
    let result = [];
    if (term) {
        for (let post in posts) {
            if (posts[post].title.toLowerCase().includes(term.toLowerCase()) ||
                posts[post].contents.toLowerCase().includes(term.toLowerCase())) {
                result.push(posts[post]);
            }
        }
        res.status(STATUS_SUCCESS);
        (result.length === 0) ? res.send(posts): res.send(result);
    } else {
        res.status(STATUS_SUCCESS);
        res.send(posts);
    }
});
server.post('/posts/', (req, res) => {
    /*let {
      post
    }=req.body;*/
    let post = req.body;
    console.log('dddd', post)
    if (!post.title || !post.contents) {
        res.status(STATUS_USER_ERROR)
        let msg = {
            error: "'Please fill out the whole post.'"
        };
        res.json(msg);
    } else {
        idCounter++;
        post.id = idCounter;
        posts[idCounter] = post;
        res.status(STATUS_SUCCESS);
        res.send(post);
    }
});
server.put('/posts/', (req, res) => {
    let newPost = req.body;
    let post;
    if (!newPost || !newPost.id || !newPost.contents || !newPost.title || !(newPost.id in posts)) {
        res.status(STATUS_USER_ERROR)
        let msg = {
            error: "'Please fill out the whole post.'"
        };
        res.json(msg);
    } else {
        res.status(STATUS_SUCCESS);
        for (let i in posts) {
            if (posts[i].id == newPost.id) {
                console.log('success');
                posts[i].title = newPost.title;
                posts[i].contents = newPost.contents;
            }
        }
        res.send(posts)
    }
});
server.delete('/posts/', (req, res) => {
    let post = req.body;
    if (!post || !(post.id in posts)) {
        res.status(STATUS_USER_ERROR)
        let msg = {
            error: "'Please give a valid id.'"
        };
        res.json(msg);
    } else {
        for (let i in posts) {
            if (posts[i].id == post.id) {
                posts.splice(i, 1)
            }
        }
        res.status(STATUS_SUCCESS);
        res.send(posts);
    }
});
module.exports = {
    posts,
    server
};
