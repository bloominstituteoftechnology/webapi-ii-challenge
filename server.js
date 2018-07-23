// import your node modules
const express = require('express');
const db = require('./data/db.js');


// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    res.send('Hello World');
  });

  server.get('/users', (req, res) => {
    const users = [
      {
        id: 1,
        name: 'User1',
      },
      {
        id: 2,
        name: 'User2',
      },
    ];
  
    
  
    res.status(200).json(users);
  });
  server.listen(9000, () => console.log('API running on port 9000'));