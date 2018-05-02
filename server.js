const express = require('express')
const server = express();
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
server.use(cors());
server.use(helmet());

server.use(bodyParser.json());




server.get('/', (req,res)=>{  
     res.send('<div> hello </div>')
}
)
server.get('/posts' , (req,res)=>{
    console.log('hittititit')
      db 
      .find()
      .then(posts =>{
        res.json(posts)
      })
      .catch(err =>{
          res.status(500).json({error: err})
      }
    )
   
      
})
server.get('/posts/:id', (req,res)=>{
    const id = req.params.id;
    
    db
    .findById(id)
       .then((posts)  => {
        
                      if ( posts.length === 0){
                        res.status(404).json({ warning:"users not found "})
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
                 res.status(500).json({ error: err})
            });

})
server.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    let postDeleted
        
    db 
        .findById(id)
        .then( foundPost =>{
         postDeleted = { ...foundPost[0]}
        
        })
 
     db
        .remove(id)
        .then(post => {
            res.json(postDeleted);
        })
        .catch(err => {
           
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
           
            res.status(500).json({ error: err })
        });

})

server.put('/posts/:id', (req, res) => {
    const id = req.params.id
    let updatedPost;
    
 
    db
        .update(id, { title: req.body.title, contents:req.body.contents})
        .then(response => {
    db
        .findById(id)
        .then(postsById => {
            updatedPost = { ...postsById[0] };
        res.status(200).json(updatedPost);

        })         
        })
        .catch(err => {
           
            res.status(404).json({ error: 'post not found' })
        });

})
server.listen(5001);
