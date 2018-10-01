// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

// const sendUserError = (msg, res) => {
//   res.status(500);
//   res.json({ Error: msg });
//   return;
// };

server.get('/', (req, res) => {
  res.send('This is a GET TEST');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.status(500).send({error: "The posts information could not be retrieved."}));

});

const port = 9000;
server.listen(port, () => 
  console.log(`\n=== API running on port ${port} ===\n`)
  );
