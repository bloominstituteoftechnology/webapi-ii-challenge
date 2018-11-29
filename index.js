// import your node modules
const express =require('express');


const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT =4000

server.get('/api/posts', (req, res) =>{
    
});

server.get(`/api/posts/:id`, (req, res) =>{

});

server.listen(PORT, () =>{
    console.log(`server is up and running on port ${PORT}`);
});