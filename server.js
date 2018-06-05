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
    db
      .find()
        .then(posts =>{
            res.status(201).json(res)
        })
        .catch(error =>{
            return sendUserError(500, "There was an error while retrieving these posts", res);
        })
})

server.post('/api/posts', (req, res) =>{
    if(!title||!contents){
        sendUserError(400, "Please provide title and contents for the post", res);
    }
    db
        .insert({title, contents})
        .then(posts =>{
            res.status(201).json(res)
            return;
        })
        .catch(err=>{
            sendUserError(500, "There was an error while saving this post to the database", res);
            return;
        })
})

server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    
    db  
        .findById(id)
            .then(post =>{
                if(post.length===0){
                    sendUserError(404, "The post with the specified ID does not exist", res)
                    return;
                }
                res.status(200).json(res)
            })
            .catch(err=>{
                sendUserError(500, "There was an error in retrieving this post", res)
            });
})

server.delete('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    db
        .remove(id)
          .then(post =>{
              if(post.length===0){
                  sendUserError(404, "The post with the specified ID does not exist")
                  return;
              }
              res.status(200).json({Success: `${id} was successfully removed`})
          })
          .catch(err=>{
              sendUserError(500, "There was an error in removing this post", res)
          });
})

server.put('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    const { title, content } = req.body;
    if(!title||!content){
        sendUserError(400, "Please provide title and contents for the post", res);
    }
    db
        .update(id, { title, content })
            .then(post=>{
                if(post.length===0){
                    sendUserError(404, "The post with the specified ID does not exist", res)
                    return;
                }
                res.status(200).json({Success: `Post was successfully updated`})
                return;
            })
            .catch(err=>{
                sendUserError(500, "The information could not be modified", res)
            })
    })



server.listen(port, () =>{console.log(`Server is listening on port ${port}`)});
