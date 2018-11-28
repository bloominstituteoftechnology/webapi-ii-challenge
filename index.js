// import your node modules
const db = require('./data/db.js');

const express = require('express');
const server = express();
const PORT = 3000;

// add your server code starting here

server.get('/', (req , res) => {
    res.send('Shot in the dark..')
})

server.listen(PORT, () => {
    console.log(`My server is running on port ${PORT}`);
});
