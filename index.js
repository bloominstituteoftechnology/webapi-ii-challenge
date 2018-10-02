// import your node modules



// add your server code starting here
// import your node modules
const express = require('express');
 const db = require('./data/db.js');
 const server = express();
 const cors = require('cors');
 server.use(cors());
 server.get('/', (req, res) => { //request/route handler
    res.send('Hello Chris');
});
 server.get('/api/posts', (req, res) =>{
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => res.send(err))
});
 // add your server code starting here
 const port = 8000;
server.listen(port, () => console.log(`===API running on port ${port}===`));

server.get('/api/contact', (req, res) => {
  res
    .status(200)
    .send('<div><h1>Contact</h1><input placeholder="email" /></div>');
});
