// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

const bodyParser = require('body-parser'); server.use(bodyParser.json()); 

// add your server code starting here
server.get('/', (req, res)=>{
    res.send({ api: 'Running...' })
})

server.get('/api/posts', (req, res)=> {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })

    server.get('/api/posts/:id', (req, res)=> {
        const{ id } = req.params;
        db
            .findById(id)
            .then(posts => {
                res.json(posts[0]);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    server.post('/api/posts', (req, res) => {
              const  post = req.body;
        db
            .insert(post)
            .then(post => {
                res.json(posts)
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    server.delete('/api/posts/:id', (req, res)=> {
        const { id }= req.params;
        db
            .remove(id)
            .then(posts=> {
                res.json(posts)
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })
    
    server.put('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        const post = req.body;
        db.update(id, post)
          .then(posts => {
            res.json(posts);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      });


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'))
