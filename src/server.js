/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ title: 'First post' }, { doge: 'MacGruber' }];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/", (req, res) => {
    res.send("testeroo!");
})

server.get("/posts", (req, res) => {
    posts.forEach(post => {
        let key = Object.keys(post);
        let value = Object.values(post);
        let valSplit = value[0].split(" ");
        let query = req.query.term;

        if (!query){
            console.log("No query provided");
            res.json(posts);
        } else {
            if (query === key[0] || valSplit.indexOf(query) > -1){
                res.json(post);
            } 
        }
    })
})


module.exports = { posts, server };