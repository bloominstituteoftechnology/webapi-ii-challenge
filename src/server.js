/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ title: 'First post!' }, { doge: "MacGruber!" }];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/", (req, res) => {
    res.send("testeroo!");
})

server.get("/posts", (req, res) => {
    const { term } = req.query.term;
    if (!term){
        res.json(posts);
        console.log("No term inputted");
    } else {
       return posts.forEach(post => {
            let keys = Object.keys(post);
            let keySplit = keys[0].split(" ");
            let values = Object.values(post);
            let valSplit = values[0].split(" ");
            if (keySplit.indexOf(term) > -1 || valSplit.indexOf(term) > -1){
                res.json(post);
            } else {
                res.status(STATUS_USER_ERROR);
                res.send("No such term found");
            }
        })
    }
})


module.exports = { posts, server };
