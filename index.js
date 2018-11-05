// import your node modules
const express = require('express')
const db = require('./data/db.js');
const cors = require('cors')
const port = 3334
const server = express()
server.use(express.json())
server.use(cors())
// add your server code starting here

const sendUserError = (status, errorMessage, res) => {
    res.status(status).json({ error: errorMessage });
  };

server.get('/', (req,res) => res.send('<h1>sup</h1>'))

server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
       if(posts.length){
         res.json({ posts });  
       }
       else{
           sendUserError(500, "The posts information could not be retrieved.", res)
       }
    })
  });
  
server.get("/api/posts/:id", (req, res) => {
    const {id} = req.params
    db.findById(id).then(post => {
        if (post[0]){
            res.json(post[0])
        }
        else{
            sendUserError(404, "The post with the specified ID does not exist.", res)
        }
    })
})

server.post('/api/posts', (req, res) => {
    const { title, contents} = req.body;
    if (!title || !contents){
        sendUserError(400, "Please provide title and contents for the post.", res)
        return
    }
    db.insert({title, contents}).then(id => {
        res.status(201).json(id.id)
    })
})

server.delete('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
    db.remove(id)
    .then(response =>{
        if (!response){
            sendUserError(404,"The post with the specified ID does not exist.",res);
            return;
        }
        res.json({ success: `User with id: ${id} removed from system` })
    })
})

server.put('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
    const { title, contents} = req.body;
    if (!title || !contents){
        sendUserError(400, "Please provide title and contents for the post.", res)
        return;
    }
    db.update(id, {title,contents}).then(
        db.
        findById(id).then(post => res.json(post))
        )
})

server.listen(port,()=> console.log(`I hear you ${port}`))