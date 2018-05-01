const express = require('express')
const server = express();
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const helmet = require('helmet');
server.use(helmet());
server.use(bodyParser.json());
server.get('/', (req,res)=>{
    //  res.send("api is running")
     res.send('<div> hello </div>')
}
)
server.get('/posts' , (req,res)=>{
      db 
      .find()
      .then(posts =>{
        res.json(posts)
      })
      .catch(err =>{
          res.json({error: err})
      }
    )
   
      
})
server.get('/posts/:id', (req,res)=>{
    const id = req.params.id;
    
    db
    .findById(id)
       .then((posts)  => {
        
                      if ( posts.length === 0){
                                 res.status(404).json({ warning:"user not found "})
                       }
                      else{
                              res.json(posts[0])
                       }
         })
    
        .catch(err =>{
        res.status(500).json({error: err})
        }
    )
    
})
 
server.post('/posts', (req, res)=>{  
      
        db
            .insert({title:req.body.title, contents: req.body.contents})
            .then(post => {
                res.json(post);
            })
            .catch(err => {
                console.log(err);
            });

})
server.delete('/posts/:id', (req, res) => {
 const id = req.params.id
        db
        .remove(id)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        });

})

server.delete('/posts', (req, res) => {
    const {id} = req.query
    db
        .remove(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

})

server.put('/posts/:id', (req, res) => {
    const id = req.params.id
   
    console.log(req.body);
    db
        .update(id, { title: req.body.title, contents:req.body.contents})
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
           
            res.status(500).json({ error: err })
        });

})




server.listen(5001);
