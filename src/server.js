const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
    {
        title: "First",
        contents: "Contract FAIRLIGHT-EXCALIBUR LLC. for all your needs",
        id: 0
    },
    {
        title: "Second",
        contents: "i never get first post...",
        id: 1
    }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get("/posts", function( req, res ) {
    res.status(200).json(posts);
});

server.get("/posts/:term", function( req, res ) {
    const post = posts.find(post => post.title.includes(req.params.term) || post.contents.includes(req.params.term));
    res.status(200).json(post);
});

server.post("/posts", function( req, res ) {
    if(typeof req.body.title == 'string' && typeof req.body.contents == 'string'){
        let post = {title: req.body.title, contents: req.body.contents, id: posts.length}
        posts.push(post);
        res.status(200).json(post);
    } else {
        res.status(503).json({ error: "POST: missing title and/or body"});
    }
});

server.put("/posts", function( req, res ) {
    if(typeof req.body.title == 'string' && typeof req.body.contents == 'string' && typeof req.body.id == 'string'){
        if(parseInt(req.body.id) && parseInt(req.body.id) <= posts.length){
            let post = {title: req.body.title, contents: req.body.contents, id: req.body.id}
            posts[req.body.id] = post;
            res.status(200).json(post);
        } else {
            console.log(parseInt(req.body.id));
            res.status(503).json({ error: "POST: ID not found"});
        }
    } else {
        res.status(503).json({ error: "POST: missing title, body, or ID"});
    }
});

server.delete("/posts/:id", function(req, res){
    if(req.params.id && req.params.id <= posts.length) {
        posts = posts.splice(req.params.id, 1);
        res.status(200).json({success: true});
    }
    else{
        res.status(404).json({ error: "DELETE: could not find item to be deleted"});
    }
});

module.exports = { posts, server };
