// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = 4000;
// add your server code starting here
server.get('/api/post', (req, res) =>{
   
})




server.listen(PORT, ()=>{
    console.log(`Server works you did not break it, it's on port ${PORT}!`)
})
