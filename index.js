// import your node modules

const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
//



server.get('/', (req, res)=> {
  res.send('hello from express');
})


server.listen(5000, (res, req) => {
  console.log('the server is listening on 5000')
})
