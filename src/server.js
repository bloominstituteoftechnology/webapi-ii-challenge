/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ title: 'First post', content: "I like turtles" }, { title: 'Doge 1', content: "MacGruber" }];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/", (req, res) => {
    res.send("testeroo!");
})

server.get("/posts", (req, res) => {
    let term = req.query.term.toLowerCase();

    if (!term) {
        res.json(posts);
        res.end();
    }

    posts.forEach(post => {
        let title = post.title.toLowerCase().split(" ");
        let content = post.content.toLowerCase().split(" ");
        if (title.indexOf(term) > -1 || content.indexOf(term) > -1){
            console.log("Result found!")
            res.json(post);
        }
    })
})

server.post("/posts", (req, res) => {
    const body = req.body;
    posts.push(body);
    res.send(posts);
})


module.exports = { posts, server };