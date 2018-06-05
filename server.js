// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const port = 5555;
const server = express();

server.use(express.json());
server.use(cors({
    credentials:true,
}));

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error:message});
    return;
};

server.get('/', (req, res) =>{
    res.send("<h1>Hello from Express No. 2!!</h1>");
});

server.get('/api/posts', (req, res) =>{
    const {title, contents} = req.body;
    if(!title||!contents){
        sendUserError(400, "Please provide title and contents", res);
    }
    db
      .find()
        .then(posts =>{
            res.status(201).json(res)
        })
        .catch(error =>{
            return sendUserError(500, "There was an error while saving this post", res);
        })
})

server.post('/api/posts', (req, res) =>{
    db
      .insert({title, contents})
        .then(posts =>{
            res.json()
        })
})
server.listen(port, () =>{console.log(`Server is listening on port ${port}`)});
