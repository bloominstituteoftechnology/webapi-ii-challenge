const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
// posts is an array of objects - { title: "The post title", contents: "The post contents" }

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
// If the client provides the query-string parameter term, filter the posts to those that have the term in their title or contents (or both), and send down those posts in a JSON response.
// Otherwise, send down the full array of posts as a JSON response.
    const { term } = req.query;
    if (term) {
        const arraySearch = posts.filter((post) => {
            return (
                post.title.toLowerCase().includes(term.toLowerCase()) ||
                post.contents.toLowerCase().includes(term.toLowerCase())
            );
        });
        if (arraySearch.length < 1) {
            res.status(404);
            res.json(`${term} not found`);
        } else {
            res.json(arraySearch);
        }
    } else {
        res.json(posts);
    }
});

let idCounter = 0;
const newPost = {};
server.post('/posts', (req, res) => {
// Ensure that the client provides both title and contents in the request body. If any of these don't exist, send an object of the form { error: "Error message" } as a JSON response. Make sure to respond with an appropriate status code.
// If all fields are provided, create a new post object. Assign the post a unique, numeric id property that will act as its identifier, and add it to the posts array. Return the newly created post object, with its assigned id, to the client in a JSON response.
    const { title, contents } = req.body;
    if (!title && !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Error message' });
    } else {
        // console.log({ title, contents });
        idCounter++;
        const newPost = {
            id: idCounter,
            title: title,
            contents: contents
        };
        posts.push(newPost);
        res.status(STATUS_SUCCESS);
        res.json(newPost);
    }
});

server.put('/posts', (req, res) => {
// Ensure that the client provides id, title, and contents in the request body. If any of these don't exist, send an object of the form { error: "Error message" } as a JSON response. Make sure to respond with an appropriate status code.
// If the id doesn't correspond to a valid post, respond with an error in the same form as above.
// Modify the post with the given id, updating its title and contents. Respond with the newly updated post object in a JSON response.
    const { id, title, contents } = req.body;
    console.log(req.body);
    if (id && title && contents) {
        posts.forEach((post) => {
            if (post.id === id) {
                post.id = id;
                post.title = title;
                post.contents = contents;
            // updatedPost = { 
            //     id: id,
            //     title: title,
            //     contents: contents 
            // };
            // post = updatedPost;
            res.status(STATUS_SUCCESS);
            res.json(post);
            } else {
                res.status(STATUS_USER_ERROR);
                res.json({ error: 'id not found' });
            }
        });
    } else {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'id, title, contents not found' });
    }
});

server.delete('/posts', (req, res) => {
// Ensure that the client provides an id in the request body, and that the id corresponds to a valid post. If there's an error, send an object of the form { error: "Error message" } as a JSON response. Make sure to respond with an appropriate status code.
// Remove the post with the given id from the array of posts. Return the object { success: true } in a JSON response.
    const { id } = req.body;
    if (id) {
        posts.forEach(post => {
            if (post.id === id) {
                let remainingPosts = posts.filter((post) => {
                    return post.id !== id;
                });
                posts = remainingPosts;
                res.status(STATUS_SUCCESS);
                res.json({ success: true });
            } else {
                res.status(STATUS_USER_ERROR);
                res.json({ error: 'id not found' });
            }
        });
    } else {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'id not found' });
    }
});

module.exports = { posts, server };
