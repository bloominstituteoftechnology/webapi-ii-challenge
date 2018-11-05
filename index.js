// import your node modules
const express = require('express')
const db = require('./data/db.js');
const port = 3334
const server = express()
server.use(express.json())
// add your server code starting here

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
  };

server.get('/', (req,res) => res.send('<h1>sup</h1>'))

server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
      res.json({ posts });
    }).catch(err => sendUserError(400, 'No data here', res));
  });
  
server.get("/api/posts/:id", (req, res) => {
    const {id} = req.params
    db.findById(id).then(post => {
        if (post[0]){
            res.json(post[0])
        }
        else{
            sendUserError(400, `No post at ${id}`, res)
        }
    })
})


server.listen(port,()=> console.log(`I hear you ${port}`))