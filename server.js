// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/posts', async (req, res) => {

  try {
  
    // resolves to an array
    const posts = await db.find()
    res.status(200).json(posts)

  } catch(e) {

    res.status(500).json(e)

  }
   
})

server.listen(5000, () => console.log('💵'))

// add your server code starting here
