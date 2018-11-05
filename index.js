// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');
const server = express();

server.get('/api/posts',(req,res) => {
    db.insert(req);
    res.send("Post Has been Inserted");
})

server.listen(5000,() => console.log("server is running"));
