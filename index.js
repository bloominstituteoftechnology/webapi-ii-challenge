// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const PORT = 9000;


// add your server code starting here

const server = express();

server.use(cors({origin: 'http://localhost:3000'}));

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The posts could not be retrieved." 
        });
    })
});

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));
