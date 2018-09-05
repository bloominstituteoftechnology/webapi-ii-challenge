// import your node modules
const express = require('express'); 
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());


server.get('/posts', (req, res) => {
  res.send('Hello');
})

server.listen(7000, () => console.log('\n== API on port 7k ==\n'));