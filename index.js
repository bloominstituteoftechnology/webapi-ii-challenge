// import your node modules
const express =require('express');
const db = require('./data/db.js');
const server = express()
const port = 3005;
const cors = require('cors');
// add your server code starting here
server.use(cors());// connect to react
server.use(express.json());//use json data

//Get requests
server.get('/api/posts', (req,res)=>{
  db.find()
  .then(posts=>{
    console.log('success',posts);
     res.status(200).json(posts);
  })
  .catch(err => res.send(err))
})

 server.get(`/api/posts/:id`, (req,res) =>{
   db.findById(req.params.id)
   .then(post =>{
     console.log("success", post);
     res.status(200).json(post);
   })
   .catch(err => res.send(err))
 });
 //delete request
server.delete('/api/posts/:id',(req,res)=> {
  const {id} = req.params;
  db.remove(id)
  .then(removedPost=>{
    res.json(removedPost);
   console.log(removedPost)
  })
});

//Post request
 server.post(`/api/posts`, (req,res) =>{
   const {title, content} = req.body;
   const newPost = {title, content}
   console.log(newPost);
   res.send('Success');
   db.insert(newPost)
   .then(post =>{
     console.log("success", post);

   })
   .catch(err => res.send(err))
 });
 //Put request
  server.put(`/api/posts/:id`,(req,res)=>{
     const {title, content} = req.body;
     const newPost = {title, content};
     const {id} = req.params;
     res.send('Success');
     db.update(id,newPost)
     .then(post => {
       console.log('sucess',post)
     })
     .catch(err=>{

     })
  })

//listening on 3005
server.listen(port,()=>{
  console.log(`\n=== Api Running On ${port} ===\n` )
})
