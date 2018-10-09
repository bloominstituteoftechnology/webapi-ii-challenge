// import your node modules
const express =require('express');
const db = require('./data/db.js');
const server = express()
const port = 3005;
const cors = require('cors');
// add your server code starting here
server.use(cors());


server.get('/api/posts', (req,res)=>{
  db.find()
  .then(posts=>{
    console.log('success',posts);
     res.status(200).json(posts);
  })
  .catch(err => res.send(err))
})










server.listen(port,()=>{
  console.log(`\n=== Api Running On ${port} ===\n` )
})
