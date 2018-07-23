// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(express.json());
server.use(bodyParser.json());
// add your server code starting here
server.get('/api/posts', (req, res) => {
  db.find().then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).json({errorMessage: "The posts could not be retrieved"});
  })
});


server.listen(8000, () => console.log('App is listening...'));
