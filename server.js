// import your node modules
const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const helmet = require('helmet');

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
const db = require('./data/db.js');

const server = express();

// middleware
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
// server.use(helmet());

// add your server code starting here

// const userError = (msg, res) => {
//     res.status(422);
//     res.json({ Error: msg });
//     return;
// }

// const requestError = (msg, res) => {
//     res.status(404);
//     res.json({ Error: msg});
//     return;
// }


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if(title === undefined || contents === undefined) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'})
    }
    
    else{
        const newPost = {title, contents}
        db.insert(newPost)
        .then(newId =>{
            res.status(201).json(newPost)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while saving the post to the database.'})
        })
    }



})

server.get('/api/posts', (req, res) => {

    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({error: 'The posts information could not be retrieved'});
        })
});
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
        .findById(id)
        .then(posts => {
            if(posts.length === 0){
                res.status(404).json({error: 'The post with the specified ID does not exist'})
            }
            else{
            res.json(posts);
            }
        })
        .catch(error => {
            res.status(500).json({error: 'The post information could not be retrieved'});
        })
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body;
    if(title === undefined || contents === undefined){
        res.error(400).json({errorMessage: 'Please provide title and contents for the post.'})
    }
    else{
    const newPost = { title, contents}    
    db
    .update(id, newPost)
   
    .then(insertions => {
        if(insertions === 0){
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
        else{
            res.status(200).json({message: `Updated post ${id}`})
        }
     }
    )
    .catch(error => {
        res.status(500).json({error: 'The post information could not be modified.'})
    })
    }
})

server.delete('/api/posts/:id', (req,res) => {
    const { id } = req.params;

    db

    .remove(id)
    .then(deletions =>{
        
        if(deletions === 0) {
            res.error(404).json({message: 'The post with the specified ID does not exist.'})
        }
        else{
            res.status(200).json({message: `Post ${id} Deleted.`})
        }
  
    })
    .catch(error => {
        res.status(500).json('The post could not be removed')
    })
})


const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));